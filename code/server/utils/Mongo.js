const mongoose = require('mongoose');

mongoose.Promise = global.Promise;

//Update: edge -> ese
function connect() {
    return mongoose.connect('mongodb://mongo:9993/ese?ssl=false', {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });
}

module.exports = { connect, mongoose };