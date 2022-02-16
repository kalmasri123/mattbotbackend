import * as mongoose from 'mongoose';
const User = new mongoose.Schema({
    authMethod: { type: String, required: true },
    userId: { type: String, required: true },
});
export default mongoose.model('User', User);
