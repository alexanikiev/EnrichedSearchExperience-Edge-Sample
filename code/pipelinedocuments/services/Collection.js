var rp = require('request-promise');

function createCollections(req, res) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/collections',
    body: null
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteCollections(req, res) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/collections'
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
  createCollections,
  deleteCollections
};