import * as KeyWordController from '@controllers/KeyWordController';
import * as express from 'express';
import { validate } from '@utils/validate';
const KeyWordsRouter = express.Router();
KeyWordsRouter.get('/', KeyWordController.all);

KeyWordsRouter.post('/add', validate(KeyWordController.addValidator), KeyWordController.add);
KeyWordsRouter.post(
    '/update/:id',
    validate(KeyWordController.updateValidator),
    KeyWordController.update,
);

export default KeyWordsRouter;
