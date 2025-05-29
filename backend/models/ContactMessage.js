import mongoose from 'mongoose';

const contactMessageSchema = new mongoose.Schema({
  name: String,
  email: String,
  phone: String,
  message: String,
  reply: { type: String, default: "" },
  isReplied: { type: Boolean, default: false },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model('ContactMessage', contactMessageSchema);
