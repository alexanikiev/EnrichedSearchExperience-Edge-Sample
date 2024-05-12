var rp = require('request-promise');
var fs = require('fs-extra');
var os = require('os');
var axios = require('axios');
var FormData = require('form-data');
const { v4 } = require('uuid');

function extractText(req, res) {
  const workDir = `${os.tmpdir()}/${v4()}`;
  const filePath = `${workDir}/${req.files.upload.name}`;
    
  fs.ensureDir(workDir)
  .then(() => req.files.upload.mv(filePath))
  .then(() => rp({
    method: 'POST',
    uri: 'http://ocr:9969/vision/v2.0/read/core/Analyze',
    formData: {
        file: fs.createReadStream(filePath)
    }
  }))
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