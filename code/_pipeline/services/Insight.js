var rp = require('request-promise');

function createInsights(req, res) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/insights`,
    body: null
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteInsights(req, res) {
  var options = {
    method: 'DELETE',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/insights`
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
  createInsights,
  deleteInsights
};