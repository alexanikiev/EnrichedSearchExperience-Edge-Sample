var rp = require('request-promise');
var fs = require('fs-extra');
var os = require('os');
var axios = require('axios');
var FormData = require('form-data');

function extractText(filePath) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/tika/text',
    formData: {
        upload: fs.createReadStream(filePath)
    },
    headers: {
        /* 'Content-Type': 'multipart/form-data' */
    }
  };
    
  //console.log(`[DOCUMENT]: EXTRACTING TEXT STARTED`);
  return rp(options);
}

function extractMetadata(filePath) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/tika/metadata',
    formData: {
        upload: fs.createReadStream(filePath)
    },
    headers: {
        /* 'Content-Type': 'multipart/form-data' */
    }
  };
    
  //console.log(`[DOCUMENT]: EXTRACTING METADATA STARTED`);
  return rp(options);
}

module.exports = {
    extractText,
    extractMetadata
};