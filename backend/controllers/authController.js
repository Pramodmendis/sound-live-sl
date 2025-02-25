import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/users.js'; // Ensure correct path

dotenv.config();

// User Signup & Login Controller
export const authController = {
  // Signup Function
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) return res.status(400).json({ msg: 'User already exists' });

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);

      // Create new user
      user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.status(201).json({ token, user: { id: user._id, username, email } });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  },

  // Login Function
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      // Check if user exists
      const user = await User.findOne({ email });
      if (!user) return res.status(400).json({ msg: 'User not found' });

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) return res.status(400).json({ msg: 'Invalid credentials' });

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: '1h',
      });

      res.json({ token, user: { id: user._id, username: user.username, email: user.email } });
    } catch (err) {
      res.status(500).json({ msg: 'Server error' });
    }
  },
};
