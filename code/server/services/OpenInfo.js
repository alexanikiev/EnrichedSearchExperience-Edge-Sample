var rp = require('request-promise');

function extractTriples(req, res) {
  const { content } = req.body;
  var options = {
    method: 'POST',
    //uri: 'http://test:test@stanfordcorenlp:9987/?properties={%22annotators%22%3A%22tokenize%2Cssplit%2Cpos%2Cner%2Cdepparse%2Copenie%22%2C%22outputFormat%22%3A%22json%22}',
    uri: 'http://admin:your_password@stanfordcorenlp:9987/?properties={%22annotators%22%3A%22tokenize%2Cssplit%2Cpos%2Cner%2Cdepparse%2Copenie%22%2C%22outputFormat%22%3A%22json%22}',
    body: content
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function extractTestTriples() {
  var options = {
    method: 'POST',
    uri: 'http://admin:your_password@stanfordcorenlp:9987/?properties={%22annotators%22%3A%22openie%22%2C%22outputFormat%22%3A%22json%22}',
    body: 'Alex lives in Seattle.'
  };
    
  rp(options)
  .then(data => console.log(data))
  .catch(error => console.log(error));
}

extractTestTriples();

module.exports = {
  extractTriples
};