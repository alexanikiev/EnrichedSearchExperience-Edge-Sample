const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const EntitySchema = new Schema({
    id: String,
    name: String,
    description: String,
    tags: [String],
    hierarchies: [String],
    category: String,
    classification: String,
    type: String
});

const EntityModel = mongoose.model('Entity', EntitySchema);

module.exports = EntityModel;