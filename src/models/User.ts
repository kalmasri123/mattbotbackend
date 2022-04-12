import * as mongoose from 'mongoose';
export interface UserObj {
    authMethod: string;
    userId: string;
    username: string;
    avatar?: string;
}
const User = new mongoose.Schema<UserObj>({
    authMethod: { type: String, required: true },
    userId: { type: String, required: true },
    username: { type: String, required: true },
    avatar: { type: String, required: false },
});
export default mongoose.model('User', User);
