import { NextFunction, Request, Response } from 'express';
import KeyWord from '@models/KeyWord';
import { body, cookie, param, validationResult } from 'express-validator';
import * as mongoose from 'mongoose';
import { DiscordAuthError, DiscordTokenExpiredError, getMongoError } from '@utils/errors';
import { isObjectId, toObjectId } from '@utils/sanitizers';
import {
    getDiscordUserFromAccessToken,
    getTokenPairFromCode,
    refreshAccessToken,
    TokenSet,
} from '@utils/discord';
const ObjectId = mongoose.Types.ObjectId;
import User from '@models/User';
function setCookies(tokens: TokenSet, res: Response) {
    res.cookie('accessToken', tokens.accessToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 7,
    });

    res.cookie('refreshToken', tokens.refreshToken, {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 90,
    });
    res.cookie('authMethod', 'discord', {
        secure: process.env.NODE_ENV !== 'development',
        httpOnly: true,
        maxAge: 1000 * 60 * 60 * 24 * 90,
    });
}
export const tokenValidator = [cookie('accessToken').exists(), cookie('refreshToken').exists()];

export const me = async (req: Request, res: Response, next: NextFunction) => {
    try {
        const user = await User.find({ id: req.user.userId });
        res.json(user);
    } catch (err) {
        next(err);
    }
};

export const refresh = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let refreshToken = req.cookies['refreshToken'];
        if (!refreshToken) throw new DiscordAuthError();

        const tokens: TokenSet = await refreshAccessToken(refreshToken);
        setCookies(tokens, res);
        res.json({ success: true });
    } catch (err) {
        res.clearCookie('refreshToken');
        res.clearCookie('accessToken');
        res.clearCookie('authMethod');
        next(err);
    }
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
    try {
        let err;
        const tokens = await getTokenPairFromCode(req.query.code?.toString()).catch(
            (error) => (err = error),
        );
        if (err) return next(err);
        const discordUser = await getDiscordUserFromAccessToken(tokens.accessToken);

        let user = await User.findOne({ userId: discordUser.id, authMethod: 'discord' });
        if (!user) {
            user = new User({ userId: discordUser.id, authMethod: 'discord' });
            await user.save();
        }

        setCookies(tokens, res);

        res.json({ success: true });
    } catch (err) {
        next(err);
    }
};
