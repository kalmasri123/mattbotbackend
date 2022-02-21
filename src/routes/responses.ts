import * as ResponseController from '@controllers/ResponseController';
import * as express from 'express';
import { validate } from '@utils/validate';
const ResponsesRouter = express.Router();
ResponsesRouter.get('/', ResponseController.all);

ResponsesRouter.post('/add', validate(ResponseController.addValidator), ResponseController.add);
ResponsesRouter.post(
    '/update/:id',
    validate(ResponseController.updateValidator),
    ResponseController.update,
);

export default ResponsesRouter;
