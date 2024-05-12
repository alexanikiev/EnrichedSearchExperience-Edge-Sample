const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const TopicSchema = new Schema({
    id: String,
    name: String,
    description: String,
    tags: [String],
    hierarchies: [String],
    category: String,
    classification: String,
    type: String
});

const TopicModel = mongoose.model('Topic', TopicSchema);

module.exports = TopicModel;