var rp = require('request-promise');

function extractLanguages(req, res) {
  var { content } = req.body;
  var options = {
      method: 'POST',
      uri: 'http://languagedetection:9984/text/analytics/v2.1/languages',
      body: JSON.stringify({
          documents: [
          {
              id: "1",
              text: content
          }
          ]
      }), 
      headers: {
          'Content-Type': 'application/json',
          'Accept': 'application/json'
      }
      };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function extractKeyPhrases(req, res) {
  var { content } = req.body;
  var options = {
      method: 'POST',
      //uri: 'http://keyphraseextraction:9985/text/analytics/v2.1/keyPhrases',
      uri: 'http://keyphraseextraction:9985/text/analytics/v2.1/keyPhrases',
      body: JSON.stringify({
      documents: [
        {
          language: "en",
          id: "1",
          text: content
        }
      ]
      }), 
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      }
  };

  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function extractSentiments(req, res) {
}

module.exports = {
    extractLanguages,
    extractKeyPhrases,
    extractSentiments
};