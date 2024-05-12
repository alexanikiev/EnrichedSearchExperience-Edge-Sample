var rp = require('request-promise');

function createDocument(id, name, description, content, collections, tags) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/elasticsearch/document`,
    body: JSON.stringify({ id, name, description, content, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  return rp(options);
}

module.exports = {
  createDocument
};