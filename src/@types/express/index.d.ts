import { UserObj } from '@models/User';

declare global {
    namespace Express {
        interface Request {
            user: UserObj;
        }
    }
}
