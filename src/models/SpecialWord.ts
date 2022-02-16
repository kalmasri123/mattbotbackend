import mongoose from 'mongoose';
const SpecialWord = new mongoose.Schema({
    phrase: { type: String, required: true },
    category: { type: String, required: true },
});
export default mongoose.model('SpecialWord', SpecialWord);
