import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import conig from './modules/application/config/index'
import {router as ApplicationRouter} from './modules/application/index'
import multer from 'multer'
import bodyParser from 'body-parser'
import passport from 'passport'
import cookieParser from 'cookie-parser'
import User from './modules/user/documents/User.js'
import {Order} from './modules/application/documents/Order.js'
import { getList } from './modules/application/routes/orders.js'
import session from 'express-session';
const MongoStore = require('connect-mongo')(session);
const app = express();

mongoose.connect('mongodb://localhost/MyDatabase');
app.use(passport.initialize());
app.use(passport.session());
passport.use(User.createStrategy());

app.use(multer().fields());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req, res, next) => {
    req.path.indexOf('api/1') != -1 ?
        next() :
        res.sendFile(path.resolve(__dirname, '../public/index.html'));
});



app.use(session({
    secret: 'secret',
    store: new MongoStore({ mongooseConnection: mongoose.connection }),
    resave: true,
    saveUninitialized: true
}));


passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.get('/api/1/profile', (req, res, next) => {
    res.json(req.session || {})
});

app.post('/api/1/login', passport.authenticate('local'),
    function (req, res) {
        req.session.user = JSON.stringify(req.user);
        res.json(req.user);
        console.log(req.user);

        //mongoose.connection.collections['users'].drop( function(err) {
        //    console.log('collection dropped');
        //});

    });

app.get('/api/1/usersList', function(req, res) {
    User.find({}, function(err, users) {
        var userMap = {};

        users.forEach(function(user) {
            userMap[user._id] = user;
        });

        res.json(userMap);
    });
});

app.post('/api/1/register', (req, res, next) => {
    const username = req.body.username;
    const password = req.body.password;
    User.register(new User({username: username}),
        password, (err) => {
            if (err) {
                console.log('error while user register!', err);
                res.json({
                    name: err.name,
                    message: err.message
                });
                return
            }
            console.log('user registered!');
            res.json({
                name: 'Register successful!',
                username: username
            });


        });
});


app.get('/api/1/logout', function (req, res) {
    req.logout();
    req.session.destroy();
    res.json({message: "Success", ok: 'ok'});
    console.log('Logout Success!');
});


app.use(ApplicationRouter);
app.listen(conig.port);
console.log('Server running at port ' + conig.port);