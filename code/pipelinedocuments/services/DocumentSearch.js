var rp = require('request-promise');

function createDocument(id, name, description, content, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/elasticsearch/document',
    body: JSON.stringify({ id, name, description, content, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  //console.log(`[DOCUMENT] ${id}: CREATING ELASTICSEARCH DOCUMENT STARTED`);
  return rp(options);
}

module.exports = {
  createDocument
};