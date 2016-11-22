

var mongoose = require('mongoose');
   var config = require('./config');
mongoose.connect(config.dbConnection);
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error'));
db.once('open', function callback() {
    console.log("Connection with database succeeded.");
});
exports.mongoose = mongoose;
exports.db = db;