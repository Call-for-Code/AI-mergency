const ibmdb = require('ibm_db');

const config = require('./db-credentials.json');

const incidentTable = 'INCIDENTS';
const callTable = 'CALLS';
const responseTable = 'RESPONSES';

let conn;
let insertIncidentRecordStmt;
let newIncidentRecordStmt;

// init connection
try {
  conn = ibmdb.openSync(config.connectionString);
  insertIncidentRecordStmt = conn.prepareSync(
    `insert into ${incidentTable} `
      + '(STATUS, ADDRESS_CITY, ADDRESS_STREET, ADDRESS_STREET_NB, ADDRESS_APARTMENT, ADDRESS_DETAILS, '
      + 'POS_LONGITUDE, POS_LATITUDE, TYPE, DETAILS, LIVES_AT_RISK, RESPONSE_ID, STATUS_SIZE) '
      + ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)',
  );
  newIncidentRecordStmt = conn.prepareSync(
    `select * from final table (insert into ${incidentTable} `
      + '(STATUS, ADDRESS_CITY, ADDRESS_STREET, ADDRESS_STREET_NB, ADDRESS_APARTMENT, ADDRESS_DETAILS, '
      + 'POS_LONGITUDE, POS_LATITUDE, TYPE, DETAILS, LIVES_AT_RISK, RESPONSE_ID, STATUS_SIZE) '
      + ' values (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?))',
  );
} catch (e) {
  throw new Error(`Cannot initialize database: ${e.message}`);
}

function incidentRecordToArray(record) {
  // console.log(`Incident record: ${record}`);
  // console.log(record);
  const {
    STATUS: status = null,
    ADDRESS_CITY: city = null,
    ADDRESS_STREET: street = null,
    ADDRESS_STREET_NB: houseNbr = 0,
    LONGITUDE: longitude = 0,
    LATITUDE: latitude = 0,
    TYPE: type = null,
    DETAILS: details = null,
    LIVES_AT_RISK: livesAtRisk0,
    STATUS_SIZE: statusSize = 10,
  } = record;
  const appt = null;
  const addressDetails = null;
  const responseId = 0;
  const livesAtRisk = Number.isInteger(livesAtRisk0) ? livesAtRisk0 : -1;
  const out = [status, city, street, parseInt(houseNbr, 10), appt, addressDetails,
    longitude.toString(), latitude.toString(), type, details, livesAtRisk, responseId, statusSize];
  // console.log(`Incident: ${out}`);
  return out;
}

const promiseWrap = (fn, preprocessResult = x => x) => (
  new Promise((resolve, reject) => fn((err, result) => {
    if (err !== null) {
      return reject(err);
    }
    return resolve(preprocessResult(result));
  }))
);

// get all incidents async
exports.getIncidents = () => (
  promiseWrap(cb => conn.query(`select * from ${incidentTable}`, cb))
);

// get incident by id
exports.getIncident = (incidentId) => {
  const queryString = `select * from ${incidentTable} where ID = ${incidentId}`;
  return promiseWrap(cb => conn.query(queryString, cb), inc => inc[0]);
};

// get all calls
exports.getCalls = () => (
  promiseWrap(cb => conn.query(`select * from ${callTable}`, cb))
);

// get call by id
exports.getCall = (callId) => {
  const queryString = `select * from ${callTable} where ID = ${callId}`;
  return promiseWrap(cb => conn.query(queryString, cb), call => call[0]);
};

// create new incident with status 'Open' and retrieve it to get the Id
exports.createIncident = () => {
  const sqlStmt = 'select * from final table ('
    + `insert into ${incidentTable} (status) values ('Open')`
    + ')';
  const result = conn.queryResultSync(sqlStmt);
  const incident = result.fetchSync();
  result.closeSync();
  return incident;
};

// create new incident with status 'Open' and retrieve it to get the Id
exports.createIncidentWithData = (incidentData) => {
  const result = newIncidentRecordStmt.executeSync(incidentRecordToArray(incidentData));
  const incident = result.fetchSync();
  result.closeSync();
  return incident;
};

// create new call refering to incident incidentId and retrieve it to get the Id
exports.createCall = (callData) => {
  const result = conn.queryResultSync(
    'select * from final table ('
      + `insert into ${callTable} (TIME, INCIDENT_ID, PHONE_NUMBER) `
      + `values ('${callData.TIME}', ${callData.INCIDENT_ID}, '${callData.PHONE_NUMBER}')`
      + ')',
  );
  const call = result.fetchSync();
  result.closeSync();
  return call;
};

function updateTable(table, id, column, value, cb) {
  let queryString = `update ${table} set ${column} = `;
  if (isNaN(value)) {
    queryString += `'${value}'`;
  } else {
    queryString += value;
  }
  queryString += ` where ID = ${id}`;
  conn.query(queryString, err => cb(err));
}

/**
 * Update an incident.
 * @param id The ID of incident to be updated.
 * @param column The name of the column to be updated.
 * @param value The new column value.
 * @param cb The callback function.
*/
exports.updateIncident = (id, column, value, cb) => {
  return updateTable(incidentTable, id, column, value, cb);
};

/**
 * Update a call.
 * @param id The ID of call to be updated.
 * @param column The name of the column to be updated.
 * @param value The new column value.
 * @param cb The callback function.
*/
exports.updateCall = (id, column, value, cb) => updateTable(callTable, id, column, value, cb);

// execute any sql statement
// for testing purpose only
exports.querySync = querySting => conn.querySync(querySting);

// close db connection
exports.disconnect = () => {
  conn.closeSync((err) => {
    if (err) console.log(err);
  });
};

// load initial data into the INCIDENTS table
exports.loadIncident = (incident) => {
  const ret = insertIncidentRecordStmt.executeSync(incident);
  console.log(`Return value from insert into DB: ${JSON.stringify(ret)}`);
  return ret;
};

// some setup function to drop and create tables

exports.createIncidentsTable = () => {
  console.log('Creating incidents table...');
  conn.querySync(`CREATE TABLE ${incidentTable} (`
    + 'ID INTEGER GENERATED ALWAYS AS IDENTITY, '
    + 'STATUS VARCHAR(20), '
    + 'ADDRESS_CITY VARCHAR(30), '
    + 'ADDRESS_STREET VARCHAR(40), '
    + 'ADDRESS_STREET_NB VARCHAR(10), '
    + 'ADDRESS_APARTMENT VARCHAR(10), '
    + 'ADDRESS_DETAILS VARCHAR(200), '
    + 'POS_LONGITUDE VARCHAR(11), '
    + 'POS_LATITUDE VARCHAR(11), '
    + 'TYPE VARCHAR(50), '
    + 'DETAILS VARCHAR(300), '
    + 'LIVES_AT_RISK INTEGER, '
    + 'RESPONSE_ID INTEGER, '
    + 'STATUS_SIZE INTEGER, '
    + 'PRIMARY KEY(ID)'
    + ')');
  console.log('Done');
};

exports.dropIncidentsTable = () => {
  console.log('Dropping incidents table...');
  conn.querySync(`DROP TABLE ${incidentTable}`);
  console.log('Done');
};

exports.createCallsTable = () => {
  console.log('Creating calls table...');
  conn.querySync(`CREATE TABLE ${callTable} (`
    + 'ID INTEGER GENERATED ALWAYS AS IDENTITY, '
    + 'CALLER VARCHAR(50), '
    + 'TIME VARCHAR(20), '
    + 'PHONE_NUMBER VARCHAR(20), '
    + 'INCIDENT_ID INTEGER, '
    + 'PRIMARY KEY(ID), '
    + `FOREIGN KEY(INCIDENT_ID) REFERENCES ${incidentTable}(ID) `
    + 'ON DELETE RESTRICT'
    + ')');
  console.log('Done');
};

exports.dropCallsTable = () => {
  console.log('Dropping calls table...');
  conn.querySync(`DROP TABLE ${callTable}`);
  console.log('Done');
};

exports.createResponsesTable = () => {
  console.log('Creating responses table...');
  conn.querySync(`CREATE TABLE ${responseTable} (`
    + 'ID INTEGER GENERATED ALWAYS AS IDENTITY, '
    + 'TEAM_NB_MEMBERS INTEGER, '
    + 'EQUIPEMENT VARCHAR(200), '
    + 'POS_LONGITUDE VARCHAR(11), '
    + 'POS_LATITUDE VARCHAR(11), '
    + 'INCIDENT_ID INTEGER, '
    + 'PRIMARY KEY(ID), '
    + `FOREIGN KEY(INCIDENT_ID) REFERENCES ${incidentTable}(ID) `
    + 'ON DELETE RESTRICT'
    + ')');
  console.log('Done');
};

exports.dropResponsesTable = () => {
  console.log('Dropping responses table...');
  conn.querySync(`DROP TABLE ${responseTable}`);
  console.log('Done');
};
