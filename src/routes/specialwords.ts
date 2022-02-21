import * as SpecialWordController from '@controllers/SpecialWordController';
import * as express from 'express';
import { validate } from '@utils/validate';
const SpecialWordsRouter = express.Router();
SpecialWordsRouter.get('/', SpecialWordController.all);

SpecialWordsRouter.post('/add', validate(SpecialWordController.addValidator), SpecialWordController.add);
SpecialWordsRouter.post(
    '/update/:id',
    validate(SpecialWordController.updateValidator),
    SpecialWordController.update,
);

export default SpecialWordsRouter;
