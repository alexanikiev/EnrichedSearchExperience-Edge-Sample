var rp = require('request-promise');

function createEntities(req, res) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/entities',
    body: null
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteEntities(req, res) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/entities'
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
  createEntities,
  deleteEntities
};