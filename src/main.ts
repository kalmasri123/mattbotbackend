import * as express from 'express';
import api from 'routes';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { readSync } from 'fs';
import * as cookieParser from 'cookie-parser';
dotenv.config();

const app = express();
const PORT = process.env.port || 3000;
const MONGO_URI = process.env.MONGOURI;
const mongoose = require('mongoose');

mongoose.connect(MONGO_URI);
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', api);
app.use(function (err, req, res, next) {
    console.log(err);
    res.status(500).json({ message: err.message });
});
app.listen(PORT, () => {
    console.info(`Now listening on Port: ${PORT}`);
});
