/**
 * Copyright 2017, Google, Inc.
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 *    http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

/**
 * This application demonstrates how to perform basic recognize operations with
 * with the Google Cloud Speech API.
 *
 * For more information, see the README.md under /speech and the documentation
 * at https://cloud.google.com/speech/docs.
 */
// Updated to conform to more modern Javascipt practices.

function parseData(data, interimResults) {
  const complete = [];
  const interim = [];
  data.results.forEach((result) => {
    const current = result.alternatives[0];
    if (result.isFinal || !interimResults) {
      complete.push(current.transcript);
    } else {
      interim.push(current.transcript);
    }
  });
  return { complete, interim };
}

module.exports = {
  streamingRecognize(stream, encoding, sampleRateHertz, languageCode, onData) {
    // [START speech_streaming_recognize]

    // Imports the Google Cloud client library
    const speech = require('@google-cloud/speech').v1p1beta1;

    // Creates a client
    const client = new speech.SpeechClient({ keyFilename: 'google-speech-credentials.json' });

    const request = {
      config: {
        encoding,
        sampleRateHertz,
        languageCode,
        model: 'phone_call',
        useEnhanced: true,
        enableAutomaticPunctuation: true,
        enableSpeakerDiarization: false,
        // diarizationSpeakerCount: 2,
        speechContexts: [{
          phrases: [
            'Howard County 9-1-1',
            'Ellicott City',
            'Tiber',
            'lady stuck in the building',
          ],
        }],
      },
      interimResults: true,
    };

    // Stream the audio to the Google Cloud Speech API
    const recognizeStream = client
      .streamingRecognize(request)
      .on('error', console.error)
      .on('data', (data) => {
        const parsed = parseData(data, request.interimResults);
        onData(parsed.complete, parsed.interim);
      });

    // Stream an audio file from disk to the Speech API, e.g. "./resources/audio.raw"
    stream.pipe(recognizeStream);
    // [END speech_streaming_recognize]
  },

};
