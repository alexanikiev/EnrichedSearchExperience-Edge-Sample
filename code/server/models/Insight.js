const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const InsightSchema = new Schema({
    id: String,
    name: String,
    description: String,
    notes: String,
    tags: [String],
    hierarchies: [String],
    category: String,
    classification: String,
    type: String
});

const InsightModel = mongoose.model('Insight', InsightSchema);

module.exports = InsightModel;