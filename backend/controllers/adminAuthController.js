import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

// Generate token
const generateToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, { expiresIn: "7d" });

//Super admin signup
export const adminSignup = async (req, res) => {
  const { username, email, password } = req.body;

  const existing = await AdminUser.findOne({ email });
  if (existing) return res.status(400).json({ message: "Email already exists" });

  const admin = new AdminUser({ username, email, password, role: "super" });
  await admin.save();

  res.status(201).json({
    _id: admin._id,
    username: admin.username,
    email: admin.email,
    role: admin.role,
    token: generateToken(admin._id),
  });
};

//Admin login
export const adminLogin = async (req, res) => {
  const { email, password } = req.body;

  try {
    const admin = await AdminUser.findOne({ email });

    console.log("🧠 Email:", email);
    console.log("🔍 Found Admin:", admin?.email);
    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await admin.matchPassword(password);
    console.log("🔐 Password match:", isMatch);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    res.status(200).json({
      _id: admin._id,
      username: admin.username,
      email: admin.email,
      role: admin.role,
      token: generateToken(admin._id),
    });
  } catch (err) {
    console.error("❌ Login error:", err);
    res.status(500).json({ message: "Login failed" });
  }
};
