import { CustomSanitizer, CustomValidator } from 'express-validator';
import * as mongoose from 'mongoose';
const ObjectId = mongoose.Types.ObjectId;

export const toObjectId: CustomSanitizer = (value) => {
    return new ObjectId(value);
};
export const isObjectId: CustomValidator = async (value) => {
    return ObjectId.isValid(value);
};
