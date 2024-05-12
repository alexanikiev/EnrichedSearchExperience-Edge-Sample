const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const HierarchySchema = new Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    classification: String,
    type: String,
    children: Schema.Types.Mixed
});

const HierarchyModel = mongoose.model('Hierarchy', HierarchySchema);

module.exports = HierarchyModel;