const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const CollectionSchema = new Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    classification: String,
    type: String
});

const CollectionModel = mongoose.model('Collection', CollectionSchema);

module.exports = CollectionModel;