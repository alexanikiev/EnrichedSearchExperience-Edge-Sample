const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const UserSchema = new Schema({
    id: String,
    name: String,
    description: String,
    category: String,
    classification: String,
    type: String,
    settings: Schema.Types.Mixed
});

const UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;