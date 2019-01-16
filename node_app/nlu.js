const NaturalLanguageUnderstandingV1 = require('watson-developer-cloud/natural-language-understanding/v1');

const config = require('./nlu-credentials.json');

const nlu = new NaturalLanguageUnderstandingV1({
  version: config.version,
  iam_apikey: config.apikey,
  url: config.url
});

const parameters = {
  text: '',
  language: 'en',
  // return_analyzed_text: true,
  features: {
    entities: {
      emotion: false,
      sentiment: false,
      mentions: true, // should return offsets, doesn't work anyway
      model: '20:4e8cb1a6-5779-4909-8053-19f900719bbc',
    },
  },
};

exports.analyze = (text, callback) => {
  parameters.text = text;
  return nlu.analyze(parameters, callback);
};

// nlu.listModels({}, (err, response) => {
//   if (err) {
//     console.log('error:', err);
//   } else {
//     console.log(JSON.stringify(response, null, 2));
//   }
// });
