import * as express from 'express';
import api from 'routes';

import * as bodyParser from 'body-parser';
import * as cookieParser from 'cookie-parser';

import * as cors from 'cors';
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
app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    next()
});
app.use(cors({ origin: 'http://localhost:3001' }));
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
            break;
    }
});
app.listen(PORT, () => {
    console.info(`Now listening on Port: ${PORT}`);
});
