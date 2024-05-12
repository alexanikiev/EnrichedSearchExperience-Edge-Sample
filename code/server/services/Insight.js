const InsightModel = require('../models/Insight');

function createInsights(req, res) {
  const { insights } = req.body;
  InsightModel.insertMany(insights)
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function createInsight(req, res) {
  const { id, name, description, notes, tags, hierarchies } = req.body;
  var insight = { id, name, description, notes, tags, hierarchies, category: 'Insight', classification: 'Default', type: 'Default' };
  new InsightModel(insight)
  .save()
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readInsights(req, res) {
  InsightModel.find({ category: 'Insight' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function readInsight(req, res) {
  var id = req.params.id;
  InsightModel.findOne({ id, category: 'Insight' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function updateInsights(req, res) {

}

function updateInsight(req, res) {

}

function deleteInsights(req, res) {
  InsightModel.deleteMany({ category: 'Insight' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

function deleteInsight(req, res) {
  var id = req.params.id;
  InsightModel.findOneAndRemove({ _id: id, category: 'Insight' })
  .then(data => res.json(data))
  .catch(error => res.status(500).send(error));
}

module.exports = {
    createInsights,
    createInsight,
    readInsights,
    readInsight,
    updateInsights,
    updateInsight,
    deleteInsights,
    deleteInsight
};