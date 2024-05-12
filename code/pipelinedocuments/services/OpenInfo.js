var rp = require('request-promise');

function extractBatchDocumentTriples(chunks) {
  const requests = chunks.map(chunk => {
    return extractDocumentTriples(chunk)
    .then(data => {
        return data;
    });
  });
    
  return Promise.all(requests);
}

function extractDocumentTriples(chunk) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/stanfordcorenlp/triples',
    body: JSON.stringify({ content: chunk }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
        
  return rp(options);
}

module.exports = {
  extractBatchDocumentTriples
};