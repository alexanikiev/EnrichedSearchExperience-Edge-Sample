var rp = require('request-promise');

function createDocuments(documents) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/documents',
    body: null
  };
    
  return rp(options);
}

function createDocument(id, name, description, collections, tags) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/document',
    body: JSON.stringify({ id, name, description, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
  
  //console.log(`[DOCUMENT] ${id}: CREATING MONGO DOCUMENT STARTED`);
  return rp(options);
}

function deleteDocuments(documents) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/documents'
  };
    
  return rp(options);
}

function deleteDocument(id) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/document',
    body: null
  };
    
  return rp(options);
}

module.exports = {
  createDocuments,
  createDocument,
  deleteDocuments,
  deleteDocument
};