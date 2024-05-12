var rp = require('request-promise');

function createDocumentImage(name, content) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/storage/create',
    body: JSON.stringify({ documentFileName: `${name}.txt`,
                           documentFileContent: content }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  return rp(options);
}

module.exports = {
    createDocumentImage
};