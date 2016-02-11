var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
var User = new Schema({
    username: String,
    email: {type: String, default: "test@dispostable.com"},
    password: String
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);
