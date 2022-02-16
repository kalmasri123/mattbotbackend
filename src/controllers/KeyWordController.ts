import { NextFunction, Request, Response } from 'express';
import KeyWord from '@models/KeyWord';
import { body, param, validationResult } from 'express-validator';
import * as mongoose from 'mongoose';
import { getMongoError } from '@utils/errors';
import { isObjectId, toObjectId } from '@utils/sanitizers';
const ObjectId = mongoose.Types.ObjectId;
export const all = async (req: Request, res: Response, next: NextFunction) => {
    const query = await KeyWord.find();
    return res.json(query);
};
export const addValidator = [
    body('word').isString(),
    body('category').isString(),
    body('magnitude').isInt().toInt(),
];
export const updateValidator = [
    body('magnitude').isInt().toInt(),
    param('id').custom(isObjectId).customSanitizer(toObjectId),
];
export const add = async (req: Request, res: Response, next: NextFunction) => {
    let err = null;
    console.log('adding');

    const { word, category, magnitude } = req.body;
    const query = new KeyWord({ word, category, magnitude });
    await query.save().catch((el) => (err = getMongoError(el)));
    if (err) return next(err);
    return res.status(201).json({ success: true });
};
export const update = async (req: Request, res: Response, next: NextFunction) => {
    const { magnitude } = req.body;
    const id = req.params['id'];
    const updateResult = await KeyWord.updateOne({ _id: id }, { magnitude });
    console.log(updateResult);
    res.json({ success: true });
};
