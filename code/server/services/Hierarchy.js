const HierarchyModel = require('../models/Hierarchy');

function createHierarchies(req, res) {
  const { hierarchies } = req.body;
  HierarchyModel.insertMany(hierarchies)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createHierarchy(req, res) {
  const { id, name, description, children } = req.body;
  var hierarchy = { id, name, description, children, category: 'Hierarchy', classification: 'Default', type: 'Default' };
  new HierarchyModel(hierarchy)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readHierarchies(req, res) {
  HierarchyModel.find({ category: 'Hierarchy' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readHierarchy(req, res) {
  var id = req.params.id;
  HierarchyModel.findOne({ id, category: 'Hierarchy' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateHierarchies(req, res) {

}

function updateHierarchy(req, res) {

}

function deleteHierarchies(req, res) {
  HierarchyModel.deleteMany({ category: 'Hierarchy' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteHierarchy(req, res) {
  var id = req.params.id;
  HierarchyModel.findOneAndRemove({ _id: id, category: 'Hierarchy' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createHierarchies,
    createHierarchy,
    readHierarchies,
    readHierarchy,
    updateHierarchies,
    updateHierarchy,
    deleteHierarchies,
    deleteHierarchy
};