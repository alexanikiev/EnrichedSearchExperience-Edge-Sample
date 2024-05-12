var rp = require('request-promise');

function extractDocumentLanguages(chunk) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/languagedetection/languages`,
    body: JSON.stringify({ content: chunk }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
    
  return rp(options);
}

function extractBatchDocumentKeyPhrases(chunks) {
  const requests = chunks.map(chunk => {
    return extractDocumentKeyPhrases(chunk)
    .then(data => {
        return data;
    });
  });
    
  console.log(`[DOCUMENT]: EXTRACTING BATCH KEY PHRASES STARTED`);
  return Promise.all(requests);
}

function extractBatchDocumentSentiments(req, res) {
    //todo:
}
  
function extractDocumentKeyPhrases(chunk) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/keyphraseextraction/keyphrases`,
    body: JSON.stringify({ content: chunk }),
    headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
    }
  };
        
  console.log(`[DOCUMENT]: EXTRACTING KEY PHRASES STARTED >> ${chunk}`);
  return rp(options);
}


module.exports = {
    extractDocumentLanguages,
    extractBatchDocumentKeyPhrases,
    extractBatchDocumentSentiments
};