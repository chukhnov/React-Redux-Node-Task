import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import conig from './modules/application/config/index'
import {router as ApplicationRouter} from './modules/application/index'
var LocalStrategy = require('passport-local').Strategy;
var passportLocalMongoose = require('passport-local-mongoose');
var passport = require('passport');

mongoose.connect('mongodb://localhost/MyDatabase');
const app = express();


app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req, res, next) => {
    req.path.indexOf('api/1') != -1 ? next() : res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

var Schema = mongoose.Schema;
var UserSchema = new Schema({
    username: String,
    password: String
});

UserSchema.plugin(passportLocalMongoose);
var UserDetails = mongoose.model('User',UserSchema);

passport.use(new LocalStrategy(UserDetails.authenticate()));

passport.serializeUser(UserDetails.serializeUser());
passport.deserializeUser(UserDetails.deserializeUser());




app.get('/loginFailure' , function(req, res, next){
    res.send('Failure to authenticate');
});

app.get('/loginSuccess' , function(req, res, next){
    res.send('Successfully authenticated');
});

app.post('/login',
    passport.authenticate('local', {
        successRedirect: '/loginSuccess',
        failureRedirect: '/loginFailure'
    }));



app.post('/register', function(req, res, next) {
    UserDetails.register(new UserDetails({username: req.body.username}), req.body.password, function(err) {
        if (err) {
            console.log('error while user register!', err);
            return next(err);
        }
        console.log('user registered!');
        res.end('Strategy');
        res.redirect('/');
    });
});

app.use(ApplicationRouter);
app.listen(conig.port);
console.log('Server running at port ' + conig.port);
