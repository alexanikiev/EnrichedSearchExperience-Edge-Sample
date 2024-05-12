const CollectionModel = require('../models/Collection');

function createCollections(req, res) {
  const { collections } = req.body;
  CollectionModel.insertMany(collections)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createCollection(req, res) {
  const { id, name, description } = req.body;
  var collection = { id, name, description, category: 'Collection', classification: 'Default', type: 'Default' };
  new CollectionModel(collection)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readCollections(req, res) {
  CollectionModel.find({ category: 'Collection' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readCollection(req, res) {
  var id = req.params.id;
  CollectionModel.findOne({ id, category: 'Collection' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateCollections(req, res) {

}

function updateCollection(req, res) {

}

function deleteCollections(req, res) {
  CollectionModel.deleteMany({ category: 'Collection' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteCollection(req, res) {
  var id = req.params.id;
  CollectionModel.findOneAndRemove({ _id: id, category: 'Collection' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createCollections,
    createCollection,
    readCollections,
    readCollection,
    updateCollections,
    updateCollection,
    deleteCollections,
    deleteCollection
};