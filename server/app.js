import express from 'express'
import path from 'path'
import mongoose from 'mongoose'
import conig from './modules/application/config/index'

import {router as ApplicationRouter} from './modules/application/index'

const app = express();
mongoose.connect('mongodb://localhost/test');
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
});
app.use(express.static(path.resolve(__dirname, '../public')));
app.use((req, res, next) => {
    req.path.indexOf('api/1') != -1 ? next() : res.sendFile(path.resolve(__dirname, '../public/index.html'))
});

app.use(ApplicationRouter);

app.listen(conig.port);