import { Router } from 'express';
import AuthRouter from './auth';
import KeyWordsRouter from './keywords';
const api = Router();

api.use('/keywords/', KeyWordsRouter);
api.use('/auth/', AuthRouter);

export default api;
