var rp = require('request-promise');

function createTopics(req, res) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/topics`,
    body: null
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteTopics(req, res) {
  var options = {
    method: 'DELETE',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/topics`
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
  createTopics,
  deleteTopics
};