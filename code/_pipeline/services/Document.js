var rp = require('request-promise');

function createDocuments(documents) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/documents`,
    body: null
  };
    
  return rp(options);
}

function createDocument(id, name, description, collections, tags) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/document`,
    body: JSON.stringify({ id, name, description, collections, tags }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
  
  return rp(options);
}

function deleteDocuments(documents) {
  var options = {
    method: 'DELETE',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/documents`
  };
    
  return rp(options);
}

function deleteDocument(id) {
  var options = {
    method: 'DELETE',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/document`,
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