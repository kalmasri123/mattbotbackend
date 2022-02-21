import * as express from 'express';
import api from 'routes';
import * as dotenv from 'dotenv';
import * as bodyParser from 'body-parser';
import { readSync } from 'fs';
import * as cookieParser from 'cookie-parser';
import { UserObj } from '@models/User';
dotenv.config();

const app = express();
const PORT = process.env.port || 3000;
const MONGO_URI = process.env.MONGOURI;
const mongoose = require('mongoose');
// declare global {
//     namespace Express {
//         interface Request {
//             user: UserObj;
//         }
//     }
// }

mongoose.connect(MONGO_URI);
app.use(cookieParser());
app.use(bodyParser.json());
app.use('/api', api);
app.use(function (err, req, res, next) {
    console.log(err);
    switch (err.name) {
        case 'DiscordAuthError':
            res.status(401).json({ success: false, reason: 'UNAUTHORIZED' });
            break;
        default:
            res.status(500).json({ success: false, reason: 'SERVER_ERROR' });
    }
    res.status(500).json({ message: err.message });
});
app.listen(PORT, () => {
    console.info(`Now listening on Port: ${PORT}`);
});
