import * as resmodel from '@models/Response';
const ResponseModel = resmodel.default;
import { NextFunction, Request, Response } from 'express';
import { body, param, validationResult } from 'express-validator';
import * as mongoose from 'mongoose';
import { getMongoError } from '@utils/errors';
import { isObjectId, toObjectId } from '@utils/sanitizers';
const ObjectId = mongoose.Types.ObjectId;
export const all = async (req: Request, res: Response, next: NextFunction) => {
    const query = await ResponseModel.find();
    return res.json(query);
};
export const addValidator = [body('category').isString(), body('sentence').isString()];
export const updateValidator = [
    body('sentence').isString(),
    param('id').custom(isObjectId).customSanitizer(toObjectId),
];
export const add = async (req: Request, res: Response, next: NextFunction) => {
    let err = null;

    const { sentence, category } = req.body;
    const query = new ResponseModel({ category, sentence });
    await query.save().catch((el) => (err = getMongoError(el)));
    if (err) return next(err);
    return res.status(201).json({ success: true });
};
export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { magnitude } = req.body;
    const id = req.params['id'];
    const updateResult = await ResponseModel.updateOne({ _id: id }, { magnitude });
    console.log(updateResult);
    res.json({ success: true });
};
