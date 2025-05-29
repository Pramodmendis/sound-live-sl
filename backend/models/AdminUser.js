import bcrypt from "bcryptjs";
import mongoose from "mongoose";

const adminUserSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["super", "admin"], default: "admin" },
}, { timestamps: true });

// Hash before save
adminUserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
  next();
});

// Match password
adminUserSchema.methods.matchPassword = async function (enteredPassword) {
  return await bcrypt.compare(enteredPassword, this.password);
};

const AdminUser = mongoose.model("AdminUser", adminUserSchema);
export default AdminUser;
