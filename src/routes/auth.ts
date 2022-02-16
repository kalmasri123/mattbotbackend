import * as AuthController from '@controllers/AuthController';
import * as express from 'express';
import { validate } from '@utils/validate';
const AuthRouter = express.Router();
AuthRouter.get('/discord/callback', AuthController.login);
AuthRouter.get('/discord/me', validate(AuthController.tokenValidator), AuthController.me);
AuthRouter.get('/discord/refresh_token', AuthController.refresh);
export default AuthRouter;
