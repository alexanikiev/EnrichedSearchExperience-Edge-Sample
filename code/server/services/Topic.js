const TopicModel = require('../models/Topic');

function createTopics(req, res) {
  const { topics } = req.body;
  TopicModel.insertMany(topics)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createTopic(req, res) {
  const { id, name, description, tags, hierarchies } = req.body;
  var topic = { id, name, description, tags, hierarchies, category: 'Topic', classification: 'Default', type: 'Default' };
  new TopicModel(topic)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readTopics(req, res) {
  TopicModel.find({ category: 'Topic' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readTopic(req, res) {
  var id = req.params.id;
  TopicModel.findOne({ id, category: 'Topic' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateTopics(req, res) {

}

function updateTopic(req, res) {

}

function deleteTopics(req, res) {
  TopicModel.deleteMany({ category: 'Topic' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteTopic(req, res) {
  var id = req.params.id;
  TopicModel.findOneAndRemove({ _id: id, category: 'Topic' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createTopics,
    createTopic,
    readTopics,
    readTopic,
    updateTopics,
    updateTopic,
    deleteTopics,
    deleteTopic
};