var rp = require('request-promise');

function createUsers(req, res) {
  var options = {
    method: 'POST',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/users`,
    body: null
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteUsers(req, res) {
  var options = {
    method: 'DELETE',
    uri: `http://${process.env.SERVER_HOST}:${process.env.SERVER_PORT}/mongo/users`
  };
    
  rp(options)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
  createUsers,
  deleteUsers
};