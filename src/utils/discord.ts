import fetch from 'node-fetch';
import { URLSearchParams } from 'url';
import { DiscordAuthError } from './errors';
export interface TokenSet {
    accessToken: string;
    refreshToken: string;
    expirationDate: number;
}
export interface DiscordUser {
    id: string;
    username: string;
    avatar: string;
    discriminator: string;
    public_flags: number;
    flags: number;
    banner: object;
    banner_color: string;
    accent_color: number;
    locale: string;
    mfa_enabled: boolean;
    premium_type: number;
}

export const getDiscordUserFromAccessToken = async (accessToken: string): Promise<DiscordUser> => {
    const res = await fetch('https://discord.com/api/v9/users/@me', {
        method: 'GET',
        headers: {
            Authorization: `Bearer ${accessToken}`,
        },
    });
    if (res.ok) {
        return await res.json();
    } else {
        throw new DiscordAuthError();
    }
};

export const refreshAccessToken = async (refreshToken: string): Promise<TokenSet> => {
    const { DISCORD_CLIENT_ID, DISCORD_CLIENT_SECRET } = process.env;
    const grant_type = 'refresh_token';
    const params = new URLSearchParams();

    params.append('client_id', DISCORD_CLIENT_ID);
    params.append('client_secret', DISCORD_CLIENT_SECRET);
    params.append('grant_type', grant_type);
    params.append('refresh_token', refreshToken);

    const res = await fetch('https://discord.com/api/v9/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
        body: params,
    });
    if (res.ok) {
        const tokens = await res.json();
        const expirationDate = Date.now() + tokens.expires_in * 1000;

        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expirationDate,
            
        };
    } else {
        throw new DiscordAuthError();
    }
};
export const getTokenPairFromCode = async (code: string): Promise<TokenSet> => {
    const { DISCORD_CLIENT_ID, DISCORD_REDIRECT_URI, DISCORD_CLIENT_SECRET } = process.env;
    console.log(DISCORD_REDIRECT_URI)
    const params = new URLSearchParams();
    params.append('client_id', DISCORD_CLIENT_ID);
    params.append('client_secret', DISCORD_CLIENT_SECRET);
    params.append('grant_type', 'authorization_code');
    params.append('code', code);
    params.append('redirect_uri', DISCORD_REDIRECT_URI);
    const res = await fetch('https://discord.com/api/v9/oauth2/token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
            Accept: 'application/json',
        },
        body: params,
    });

    if (res.ok) {
        const tokens = await res.json();
        const expirationDate = Date.now() + tokens.expires_in * 1000;

        return {
            accessToken: tokens.access_token,
            refreshToken: tokens.refresh_token,
            expirationDate,
        };
    } else {
        res.json().then(console.log);
        throw new DiscordAuthError();
    }
};
