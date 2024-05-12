var rp = require('request-promise');
var fs = require('fs-extra');
var os = require('os');
var axios = require('axios');
var FormData = require('form-data');

function detectObjects(filePath) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/customvision/objects',
    formData: {
        upload: fs.createReadStream(filePath)
    },
    headers: {
        /* 'Content-Type': 'multipart/form-data' */
    }
  };
    
  //console.log(`[IMAGE]: EXTRACTING TEXT STARTED`);
  return rp(options);
}

module.exports = {
    detectObjects
};