export class AlreadyExistsError extends Error {
    constructor(message = 'Resource Already Exists') {
        super(message); // (1)
        this.name = 'AlreadyExistsError'; // (2)
    }
}
export class DiscordAuthError extends Error {
    constructor(message = 'Unable to Authenticate With Discord') {
        super(message); // (1)
        this.name = 'DiscordAuthError'; // (2)
    }
}
export class DiscordTokenExpiredError extends Error {
    constructor(message = 'Token has expired') {
        super(message); // (1)
        this.name = 'DiscordTokenExpiredError'; // (2)
    }
}
export function getMongoError(err: any) {
    switch (err.code) {
        case 11000:
            return new AlreadyExistsError();
            break;
        default:
            return err;
    }
}
