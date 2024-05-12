var rp = require('request-promise');
var fs = require('fs-extra');
var os = require('os');
var axios = require('axios');
var FormData = require('form-data');

function extractText(filePath) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/tika/text`,
    formData: {
        upload: fs.createReadStream(filePath)
    },
    headers: {
        /* 'Content-Type': 'multipart/form-data' */
    }
  };
    
  return rp(options);
}

function extractMetadata(filePath) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/tika/metadata`,
    formData: {
        upload: fs.createReadStream(filePath)
    },
    headers: {
        /* 'Content-Type': 'multipart/form-data' */
    }
  };
    
  return rp(options);
}

module.exports = {
    extractText,
    extractMetadata
};