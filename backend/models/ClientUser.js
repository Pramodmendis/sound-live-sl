import bcrypt from 'bcryptjs';
import mongoose from 'mongoose';

const ClientUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  profilePicture: { type: String, default: '' },
  resetPasswordCode: String,
  resetPasswordExpire: Date,

}, { timestamps: true });

ClientUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

ClientUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

export default mongoose.model('ClientUser', ClientUserSchema);
