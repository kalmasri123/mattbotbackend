import * as mongoose from 'mongoose';

const Response = new mongoose.Schema({
    sentence: { type: String, required: true },
    category: { type: String, required: true },
});
export default mongoose.model('Response', Response);
