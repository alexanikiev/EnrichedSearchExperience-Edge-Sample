const EntityModel = require('../models/Entity');

function createEntities(req, res) {
  const { entities } = req.body;
  EntityModel.insertMany(entities)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createEntity(req, res) {
  const { id, name, description, tags, hierarchies } = req.body;
  var entity = { id, name, description, tags, hierarchies, category: 'Entity', classification: 'Default', type: 'Default' };
  new EntityModel(entity)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readEntities(req, res) {
  EntityModel.find({ category: 'Entity' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readEntity(req, res) {
  var id = req.params.id;
  EntityModel.findOne({ id, category: 'Entity' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateEntities(req, res) {

}

function updateEntity(req, res) {

}

function deleteEntities(req, res) {
  EntityModel.deleteMany({ category: 'Entity' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteEntity(req, res) {
  var id = req.params.id;
  EntityModel.findOneAndRemove({ _id: id, category: 'Entity' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createEntities,
    createEntity,
    readEntities,
    readEntity,
    updateEntities,
    updateEntity,
    deleteEntities,
    deleteEntity
};