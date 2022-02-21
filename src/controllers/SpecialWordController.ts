import { NextFunction, Request, Response } from 'express';
import SpecialWord from '@models/SpecialWord';
import { body, param, validationResult } from 'express-validator';
import * as mongoose from 'mongoose';
import { getMongoError } from '@utils/errors';
import { isObjectId, toObjectId } from '@utils/sanitizers';
const ObjectId = mongoose.Types.ObjectId;
export const all = async (req: Request, res: Response, next: NextFunction) => {
    const query = await SpecialWord.find();
    return res.json(query);
};
export const addValidator = [
    body('phrase').isString(),
    body('category').isString(),
];
export const updateValidator = [
    body('phrase').isString(),
    param('id').custom(isObjectId).customSanitizer(toObjectId),
];
export const add = async (req: Request, res: Response, next: NextFunction) => {
    let err = null;
    console.log('adding');

    const { phrase, category } = req.body;
    const query = new SpecialWord({ phrase, category });
    await query.save().catch((el) => (err = getMongoError(el)));
    if (err) return next(err);
    return res.status(201).json({ success: true });
};
export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { phrase } = req.body;
    const id = req.params['id'];
    const updateResult = await SpecialWord.updateOne({ _id: id }, { phrase });
    console.log(updateResult);
    res.json({ success: true });
};
