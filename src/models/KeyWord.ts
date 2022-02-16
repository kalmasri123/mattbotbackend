import * as mongoose from 'mongoose';
const KeyWord = new mongoose.Schema({
    magnitude: { type: Number, required: true },
    word: { type: String, required: true },
    category: { type: String, required: true },
});
export default mongoose.model('KeyWord', KeyWord);
