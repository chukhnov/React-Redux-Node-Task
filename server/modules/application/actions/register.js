//import express from 'express'
//import {router as ApplicationRouter} from '/modules/application/index'
//import path from 'path'
//
//const app = express();
//app.use(ApplicationRouter);
//app.use(express.static(path.resolve(__dirname, '../public')));
//app.use((req, res, next) => {
//    req.path.indexOf('api/1') != -1 ?
//        next() :
//        res.sendFile(path.resolve(__dirname, '../public/index.html'));
//});
//
//
//
//app.post('/api/1/register', (req, res, next) => {
//    const username = req.body.username;
//    const password = req.body.password;
//    User.register(new User({username: username}),
//        password, (err) => {
//            if (err) {
//                console.log('error while user register!', err);
//                res.json({
//                    name: err.name,
//                    message: err.message
//                });
//                return
//            }
//            console.log('user registered!');
//            res.json({
//                name: 'Register successful!',
//                username: username
//            });
//
//
//        });
//});