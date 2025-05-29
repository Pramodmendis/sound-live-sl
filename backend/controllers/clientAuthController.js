import bcrypt from 'bcryptjs';
import ClientUser from '../models/ClientUser.js';
import { generateToken } from '../utils/generateToken.js';
import sendResetCodeEmail from "../utils/sendResetCodeEmail.js";
import { sendWelcomeEmail } from "../utils/sendWelcomeEmail.js";

// client Signup
export const registerClientUser = async (req, res) => {
  const { username, email, password } = req.body;

  const existingUser = await ClientUser.findOne({ email });
  if (existingUser) {
    return res.status(400).json({ message: 'User already exists.' });
  }

  const user = await ClientUser.create({ username, email, password });
  await sendWelcomeEmail(user.email, user.username);

  res.status(201).json({
    _id: user._id,
    username: user.username,
    email: user.email,
    token: generateToken(user._id),
  });
};

//client Login
export const loginClientUser = async (req, res) => {
  const { email, password } = req.body;

  const user = await ClientUser.findOne({ email });

  if (user && (await user.matchPassword(password))) {
    res.json({
      _id: user._id,
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
      token: generateToken(user._id),
    });
  } else {
    res.status(401).json({ message: 'Invalid email or password' });
  }
};

// Forgot Password with 6-digit code
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  const user = await ClientUser.findOne({ email });

  if (!user) {
    return res.status(404).json({ message: 'User not found' });
  }

  const resetCode = Math.floor(100000 + Math.random() * 900000).toString();
  user.resetPasswordCode = resetCode;
  user.resetPasswordExpire = Date.now() + 10 * 60 * 1000;
  await user.save();

  try {
    await sendResetCodeEmail(email, resetCode);

    console.log(`🔐 6-digit Reset Code for ${email}: ${resetCode}`);
    res.json({ message: 'Reset code sent to your email.' });
  } catch (error) {
    console.error("❌ Failed to send reset email:", error);
    res.status(500).json({ message: 'Failed to send reset code email.' });
  }
};

// Reset Password with code
export const resetPassword = async (req, res) => {
  const { email, resetCode, password } = req.body;

  const user = await ClientUser.findOne({
    email,
    resetPasswordCode: resetCode,
    resetPasswordExpire: { $gt: Date.now() },
  });

  if (!user) {
    return res.status(400).json({ message: 'Invalid or expired reset code' });
  }

  const salt = await bcrypt.genSalt(10);
  user.password = await bcrypt.hash(password, salt);
  user.resetPasswordCode = undefined;
  user.resetPasswordExpire = undefined;
  await user.save();

  res.json({ message: 'Password reset successful.' });
};

//client Update Profile
export const updateClientProfile = async (req, res) => {
  try {
    const userId = req.clientUser._id;

    const { username, email, currentPassword, newPassword } = req.body;

    const user = await ClientUser.findById(userId);

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    // Update username and email
    user.username = username || user.username;
    user.email = email || user.email;

    // Update password if needed
    if (currentPassword && newPassword) {
      const isMatch = await user.matchPassword(currentPassword);
      if (!isMatch) {
        return res.status(400).json({ message: 'Current password incorrect' });
      }
      user.password = newPassword;
    }

    // Update profile picture
    if (req.file) {
      user.profilePicture = req.file.filename;
    }

    await user.save();

    res.json({
      username: user.username,
      email: user.email,
      profilePicture: user.profilePicture,
    });
  } catch (err) {
    console.error('Update Profile Error:', err);
    res.status(500).json({ message: 'Server error. Please try again later.' });
  }
};
