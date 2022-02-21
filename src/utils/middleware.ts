import User from '@models/User';
import { NextFunction, Request } from 'express';
import { getDiscordUserFromAccessToken, TokenSet } from './discord';
import { DiscordAuthError } from './errors';

export const discordGuard = async (req: Request, res: Response, next: NextFunction) => {
    const { accessToken, refreshToken }: TokenSet = req.cookies;
    if (!accessToken) throw new DiscordAuthError();
    const discordUser = await getDiscordUserFromAccessToken(accessToken);
    const user = await User.findOne({ userId: discordUser.id });
    req.user = user;
};
