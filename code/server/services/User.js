const UserModel = require('../models/User');

function createUsers(req, res) {
  const { users } = req.body;
  UserModel.insertMany(users)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createUser(req, res) {
  const { id, name, description, settings } = req.body;
  var user = { id, name, description, category: 'User', classification: 'Default', type: 'Default', settings };
  new UserModel(user)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readUsers(req, res) {
  UserModel.find({ category: 'User' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readUser(req, res) {
  var id = req.params.id;
  UserModel.findOne({ id, category: 'User' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateUsers(req, res) {

}

function updateUser(req, res) {
  const { id, name, description, settings } = req.body;
  UserModel.findOne({ _id: id, category: 'User' })
  .then(data => {
      if (settings !== undefined) { data.settings = settings; }
      data
      .save()
      .then(result => res.json(result));
  })
  .catch(error => res.status(500).send(error));
}

function deleteUsers(req, res) {
  UserModel.deleteMany({ category: 'User' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteUser(req, res) {
  var id = req.params.id;
  UserModel.findOneAndRemove({ _id: id, category: 'User' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createUsers,
    createUser,
    readUsers,
    readUser,
    updateUsers,
    updateUser,
    deleteUsers,
    deleteUser
};