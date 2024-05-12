const DocumentModel = require('../models/Document');

function createDocuments(req, res) {
  const { documents } = req.body;
  DocumentModel.insertMany(documents)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createDocument(req, res) {
  const { id, name, description, tags, collections } = req.body;
  var document = { id, name, description, tags, collections, category: 'Document', classification: 'Default', type: 'Default' };
  new DocumentModel(document)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readDocuments(req, res) {
  DocumentModel.find({ category: 'Document' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readDocument(req, res) {
  var id = req.params.id;
  DocumentModel.findOne({ id, category: 'Document' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateDocuments(req, res) {

}

function updateDocument(req, res) {

}

function deleteDocuments(req, res) {
  DocumentModel.deleteMany({ category: 'Document' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteDocument(req, res) {
  var id = req.params.id;
  DocumentModel.findOneAndRemove({ _id: id, category: 'Document' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createDocuments,
    createDocument,
    readDocuments,
    readDocument,
    updateDocuments,
    updateDocument,
    deleteDocuments,
    deleteDocument
};