import { Router } from 'express';
import AuthRouter from './auth';
import KeyWordsRouter from './keywords';
import SpecialWordsRouter from './specialwords';
import ResponsesRouter from './responses';


const api = Router();

api.use('/keywords/', KeyWordsRouter);
api.use('/specialwords/', SpecialWordsRouter);
api.use('/responses/', ResponsesRouter);

api.use('/auth/', AuthRouter);

export default api;
