import * as mongoose from 'mongoose';
export interface UserObj {
    authMethod:string,
    userId: string
}
const User = new mongoose.Schema<UserObj>({
    authMethod: { type: String, required: true },
    userId: { type: String, required: true },
});
export default mongoose.model('User', User);
