const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const DocumentSchema = new Schema({
    id: String,
    name: String,
    description: String,
    tags: [String],
    collections: [String],
    category: String,
    classification: String,
    type: String
});

const DocumentModel = mongoose.model('Document', DocumentSchema);

module.exports = DocumentModel;