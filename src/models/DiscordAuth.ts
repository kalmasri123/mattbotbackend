import mongoose from 'mongoose';
const DiscordAuth = new mongoose.Schema({
    refreshToken: { type: String, required: true },
    accessToken: { type: String, required: true },
    id: { type: String, required: true },
    expirationDate: { type: Number, required: true },
});
export default mongoose.model('DiscordAuth', DiscordAuth);
