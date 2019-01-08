const app = require('express')();
const bodyParser = require('body-parser');
const request = require('request');
const http = require('http').Server(app);
const io = require('socket.io')(http);
const fs = require('fs');
const nlu = require('./nlu.js');
const db = require('./db.js');
const stt = require('./stt.js');
const dbReset = require('./setupDB');
const daas = require('./daas-credentials.json');

// Bootstrap application settings
require('./config/express')(app);

let transcriptionId = 0;

app.use(bodyParser.json());

// this is strictly necessary instead of using app.listen. Otherwise
// socket.io will not work
const port = process.env.PORT || 3000;
const uri = process.env.URL || `http://localhost:${port}`;
http.listen(port, () => console.log(`Listening on port: ${port}.`));

app.get('/', (req, res) => res.render('index'));

app.get('/resetdb', () => dbReset.reset());

app.get('/map', (req, res) => {
  const user = daas.username;
  const pwd = daas.password;
  const buffer = Buffer.from(`${user}:${pwd}`).toString('base64');
  const auth = `Basic ${buffer}`; request.post({
    headers: { 'content-type': 'application/json', Authorization: auth },
    url: daas.url,
    //this string concatenation looks but, but that's how it worked..
    body: '{ "expiresIn": 3600, "webDomain": "' + uri +'"}', 
  }, (error, response, body) => {
    if (error) {
      console.log(error);
    } else {
      const { sessionCode } = JSON.parse(body);
      console.log(`session Code ${sessionCode}`);

      res.json({ sessionCode });
    }
  });
});

app.get('/incidents', (req, res) => {
  Promise.all([db.getIncidents(), db.getCalls()])
    .then((results) => {
      const [incidents, calls] = results;
      // attach calls to incidents, better do this inside of db?
      const incidentMap = new Map(
        incidents.map(inc => [inc.ID, { ...inc, calls: [] }]),
      );
      calls.forEach(call => incidentMap.get(call.INCIDENT_ID).calls.push(call));
      res.status(200);
      res.json(Array.from(incidentMap.values()));
    })
    .catch((err) => {
      console.log(err);
      res.sendStatus(500);
    });
});

app.post('/incident', (req, res) => {
  const incident = req.body;
  let incidentFromDb = db.createIncidentWithData(incident);
  incidentFromDb = {
    ...incidentFromDb,
    calls: incident.calls.map(call => db.createCall({ ...call, INCIDENT_ID: incidentFromDb.ID })),
  };
  // error handling would be nice
  res.status(200);
  res.json(incidentFromDb);
});

function isValidColumn(key) {
  return /^[A-Z_]+$/.test(key);
}

app.put('/incident', (req, res) => {
  let incident = req.body;
  const callsFromDb = incident.calls.map((call) => {
    if (call.ID) {
      return call;
    }
    return db.createCall({ ...call, INCIDENT_ID: incident.ID });
  });
  incident = { ...incident, calls: callsFromDb };
  db.getIncident(incident.ID)
    .then((oldIncident) => {
      Object.keys(incident).forEach((key) => {
        if (isValidColumn(key) && incident[key] !== oldIncident[key]) {
          db.updateIncident(incident.ID, key, incident[key], Function.prototype);
        }
      });
    })
    .catch(err => console.log(err));
  res.status(200);
  res.json('done');
});

app.post('/call', (req, res) => {
  const call = req.body;
  const callFromDb = db.createCall(call);
  res.status(200);
  res.json(callFromDb);
});

// accepts object with { filename: 'audio/file.raw' }
app.post('/recognize', (req, res) => {
  const { filename } = req.body;
  const { id: speaker } = req.query;

  const Throttle = require('throttle');
  // Only stream audio in roughly playback speed.
  // For uncompressed 16bit * 48000 samples per second, 96kB
  const throttle = new Throttle(96000);

  const stream = fs.createReadStream(filename).pipe(throttle);

  stt.streamingRecognize(stream, 'LINEAR16', 48000, 'en-US', (complete, current) => {
    if (complete.length > 0) {
      const text = complete.join('\n');
      const id = transcriptionId;
      transcriptionId += 1;
      console.log(text);
      io.emit('transcription', {
        time: Date.now(),
        speaker,
        id,
        text,
      });
      nlu.analyze(text, (err, response) => {
        if (err) {
          console.log(`Error: ${err}`);
        } else {
          console.log(response.entities);
          io.emit('nlu', {
            id,
            text,
            entities: response.entities,
          });
        }
      });
    } else {
      io.volatile.emit('interim', { text: current.join('\n'), speaker });
    }
  });

  res.send(Date.now().toString());
});

process.on('SIGINT', () => {
  console.log('Closing DB connection.');
  io.emit('disconnect', 'SIGINT');
  db.disconnect();
  console.log('Database connection closed.');
  process.exit(0);
});

module.exports = app;
