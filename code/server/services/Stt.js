var rp = require('request-promise');
var fs = require('fs-extra');
var os = require('os');
var axios = require('axios');
var FormData = require('form-data');
const { v4 } = require('uuid');
var sdk = require("microsoft-cognitiveservices-speech-sdk");

function extractText(req, res) {
  const workDir = `${os.tmpdir()}/${v4()}`;
  const filePath = `${workDir}/${req.files.upload.name}`;

  var speechConfig = sdk.SpeechConfig.fromHost(new URL("ws://stt:9968/speech/recognition/conversation/cognitiveservices/v1"));
  speechConfig.speechRecognitionLanguage = "en-US";

  var content = "";
    
  fs.ensureDir(workDir)
  .then(() => req.files.upload.mv(filePath))
  .then(() => {
    var pushStream = sdk.AudioInputStream.createPushStream();
    fs.createReadStream(filePath).on('data', function(arrayBuffer) {
        pushStream.write(arrayBuffer.slice());
    }).on('end', function() {
        pushStream.close();
    });

    let audioConfig = sdk.AudioConfig.fromStreamInput(pushStream);
    
    var reco = new sdk.SpeechRecognizer(speechConfig, audioConfig);

    reco.recognizing = (s, event) => {
        //console.log('(recognizing) Text: ' + event.result.text);
    };

    reco.recognized = (s, event) => {
      if (event.result.reason === sdk.ResultReason.NoMatch) {
          var noMatchDetail = sdk.NoMatchDetails.fromResult(event.result);
          //console.log('(recognized)  Reason: ' + sdk.ResultReason[event.result.reason] + ' NoMatchReason: ' + sdk.NoMatchReason[noMatchDetail.reason]);
      } else {
          try {
              const obj = JSON.parse(event.result.json);
              content = event.result.text;
              //console.log('(recognized)  Reason: ' + sdk.ResultReason[event.result.reason] + ' Text: ' + event.result.text);
          } catch (err) {
              //console.error(err);
          }
      }
    };

    return new Promise((resolve, reject) =>
    reco.recognizeOnceAsync(
        function (result) {
          reco.close();
          reco = undefined;
          resolve(content);
        },
        function (err) {
          reco.close();
          reco = undefined;
          reject(err);
    }));
  })
  .then(data => res.send(data))
  .catch(error => res.status(500).send(error))
  .finally(() => fs.remove(workDir));
}

function extractMetadata(req, res) {
  const workDir = `${os.tmpdir()}/${v4()}`;
  const filePath = `${workDir}/${req.files.upload.name}`;
    
  fs.ensureDir(workDir)
  .then(() => req.files.upload.mv(filePath))
  .then(() => rp({
    method: 'POST',
    uri: 'http://tika:9986/meta/form',
    formData: {
        upload: fs.createReadStream(filePath)
    }
  }))
  .then(data => res.send(data))
  .catch(error => res.status(500).send(error))
  .finally(() => fs.remove(workDir));
}

module.exports = {
    extractText,
    extractMetadata
};