import { body, validationResult } from 'express-validator';

export const validate = (validators) => {
    function verifyResults(req, res, next) {
        console.log('verifying');
        const result = validationResult(req);
        if (!result.isEmpty()) {
            console.log('calling');
            return res.status(400).json(result.array());
        }
        next();
    }
    return [...validators, verifyResults];
};
