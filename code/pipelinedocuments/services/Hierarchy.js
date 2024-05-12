var rp = require('request-promise');

function createHierarchies(req, res) {
  var options = {
    method: 'POST',
    uri: 'http://server:9990/mongo/hierarchies',
    body: null
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteHierarchies(req, res) {
  var options = {
    method: 'DELETE',
    uri: 'http://server:9990/mongo/hierarchies'
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
  createHierarchies,
  deleteHierarchies
};