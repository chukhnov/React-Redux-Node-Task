var mongoose = require('mongoose'),
    passportLocalMongoose = require('passport-local-mongoose');

var Schema = mongoose.Schema;
var User = new Schema({
    username: String,
    password: String,
    admin: {
        type: Boolean,
        default: false
    },
    selected: {
        type: Boolean,
        default: false
    }
});

User.plugin(passportLocalMongoose);
module.exports = mongoose.model('User', User);

