var rp = require('request-promise');

function createDocument(id, name, description, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/gremlinserver/document',
    body: JSON.stringify({ id, name, description, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  //console.log(`[DOCUMENT] ${id}: CREATING GREMLINSERVER DOCUMENT STARTED`);
  return rp(options);
}

module.exports = {
  createDocument
};