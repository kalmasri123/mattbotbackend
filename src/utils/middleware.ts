import User from '@models/User';
import { NextFunction, Request } from 'express';
import { getDiscordUserFromAccessToken, TokenSet } from './discord';
import { DiscordAuthError } from './errors';

export const discordGuard = async (req: Request, res: Express.Response, next: NextFunction) => {
    try {
        const { accessToken, refreshToken }: TokenSet = req.cookies;
        console.log(req.cookies);
        if (!accessToken) return next(new DiscordAuthError());
        const discordUser = await getDiscordUserFromAccessToken(accessToken);
        const user = await User.findOneAndUpdate(
            { userId: discordUser.id },
            { $set: { username: discordUser.username, avatar: discordUser.avatar } },
        );
        req.user = user;

        next();
    } catch (err) {
        next(err);
    }
};
