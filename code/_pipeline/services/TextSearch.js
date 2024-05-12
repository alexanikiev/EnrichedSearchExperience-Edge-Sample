var rp = require('request-promise');

function createDocument(documentid, name, description, collections, tags) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sql/document`,
    body: JSON.stringify({ documentid, name, description, collections, tags, metadata: '' }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  return rp(options);
}

function createBatchDocumentSentences(documentid, chunks) {
  const requests = chunks.map(chunk => {
    return createDocumentSentences(documentid, chunk)
    .then(data => {
        return data;
    });
  });
    
  return Promise.all(requests);
}

function createBatchDocumentLinkedEntities(documentid, chunks) {
  const requests = chunks.map(chunk => {
    return createDocumentLinkedEntities(documentid, chunk)
    .then(data => {
        return data;
    });
  });
    
  return Promise.all(requests);
}

function createBatchDocumentKeyPhrases(documentid, chunks) {
  const requests = chunks.map(chunk => {
    return createDocumentKeyPhrases(documentid, chunk)
    .then(data => {
        return data;
    });
  });
    
  return Promise.all(requests);
}

function createBatchDocumentTriples(documentid, chunks) {
  const requests = chunks.map(chunk => {
    return createDocumentTriples(documentid, chunk)
    .then(data => {
        return data;
    });
  });
    
  return Promise.all(requests);
}

function createDocumentSentences(documentid, chunk) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sql/documentsentences`,
    body: JSON.stringify({ documentid, sentences: chunk }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
      
  return rp(options);
}

function createDocumentLinkedEntities(documentid, chunk) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sql/documentlinkedentities`,
    body: JSON.stringify({ documentid, linkedentities: chunk }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
         
  return rp(options);
}

function createDocumentKeyPhrases(documentid, chunk) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sql/documentkeyphrases`,
    body: JSON.stringify({ documentid, keyphrases: chunk }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
            
  return rp(options);
}

function createDocumentTriples(documentid, chunk) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/sql/documenttriples`,
    body: JSON.stringify({ documentid, triples: chunk }),
    headers: {
      'Content-Type': 'application/json',
      'Accept': 'application/json'
    }
  };
              
  return rp(options);
}

module.exports = {
  createDocument,
  createBatchDocumentSentences,
  createBatchDocumentLinkedEntities,
  createBatchDocumentKeyPhrases,
  createBatchDocumentTriples
};