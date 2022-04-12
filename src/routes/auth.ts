import * as AuthController from '@controllers/AuthController';
import * as express from 'express';
import { discordGuard } from '@utils/middleware';
import { validate } from '@utils/validate';
const AuthRouter = express.Router();
AuthRouter.get('/discord/callback', AuthController.login);
AuthRouter.get(
    '/discord/me',
    discordGuard,

    AuthController.me,
);
AuthRouter.get('/discord/refresh_token', AuthController.refresh);
export default AuthRouter;
