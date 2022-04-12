import { Router } from 'express';
import AuthRouter from './auth';
import KeyWordsRouter from './keywords';
import SpecialWordsRouter from './specialwords';
import ResponsesRouter from './responses';
import { discordGuard } from '@utils/middleware';

const api = Router();
api.use('/keywords/', discordGuard,KeyWordsRouter);
api.use('/specialwords/', discordGuard,SpecialWordsRouter);
api.use('/responses/',discordGuard, ResponsesRouter);

api.use('/auth/', AuthRouter);

export default api;
