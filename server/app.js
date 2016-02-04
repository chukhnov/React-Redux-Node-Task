import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import conig from './modules/application/config/index'
import {router as ApplicationRouter} from './modules/application/index'
import multer from 'multer'
import bodyParser from 'body-parser'
import passport from 'passport'
import User from './modules/user/documents/User.js'
const app = express();
mongoose.connect('mongodb://localhost/MyDatabase');

app.use(multer().fields());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req, res, next) => {
    req.path.indexOf('api/1') != -1 ? next() : res.sendFile(path.resolve(__dirname, '../public/index.html'));
});

passport.use(User.createStrategy());
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
app.use(passport.initialize());
app.use(passport.session());


app.post('/api/1/login', passport.authenticate('local'), function (req, res) {
    console.log('Login successful!');
});


app.post('/api/1/register', (req, res, next) => {
    console.log(req.body.username);
    res.send('fuck')
    if (!req.body.username && !req.body.password) {
        res.send('ERROR');
    }
    //else {
    //    User.register(new User({username: req.body.username}), req.body.password, (err) => {
    //        if (err) {
    //            console.log('error while user register!', err);
    //            return
    //        }
    //        console.log('user registered!');
    //        res.send('OK');
    //    });
    //}

});

app.use(ApplicationRouter);
app.listen(conig.port);
console.log('Server running at port ' + conig.port);