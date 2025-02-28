import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import User from '../models/users.js';

dotenv.config();

export const authController = {
  // User Registration
  register: async (req, res) => {
    try {
      const { username, email, password } = req.body;

      console.log("Registering user:", username, email);

      // Check if user already exists
      let user = await User.findOne({ email });
      if (user) {
        console.log("User already exists:", user.email);
        return res.status(200).json({
          msg: "User already exists",
          user: {
            id: user._id,
            username: user.username,
            email: user.email,
          },
        });
      }

      // Hash the password
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash(password, salt);
      console.log("Hashed Password:", hashedPassword);

      // Create new user
      user = new User({
        username,
        email,
        password: hashedPassword,
      });

      await user.save();
      console.log("User saved:", user._id);

      // Ensure JWT secret exists
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing in .env file");
        return res.status(500).json({ msg: "Server error: JWT secret missing" });
      }

      // Generate JWT token
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(201).json({
        msg: "User registered successfully",
        token,
        user: {
          id: user._id,
          username,
          email,
        },
      });
    } catch (err) {
      console.error("Error in Register Route:", err);
      res.status(500).json({ msg: "Server error", error: err.message });
    }
  },

  // User Login
  login: async (req, res) => {
    try {
      const { email, password } = req.body;

      if (!email || !password) {
        return res.status(400).json({ msg: "Please provide email and password" });
      }

      const user = await User.findOne({ email });
      if (!user) {
        return res.status(404).json({ msg: "User not found" });
      }

      // Compare passwords
      const isMatch = await bcrypt.compare(password, user.password);
      if (!isMatch) {
        console.log(`Invalid password for: ${email}`);
        return res.status(401).json({ msg: "Invalid email or password" });
      }

      // Generate JWT token
      if (!process.env.JWT_SECRET) {
        console.error("JWT_SECRET is missing in .env file");
        return res.status(500).json({ msg: "Server error: JWT secret missing" });
      }

      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
        expiresIn: "1h",
      });

      res.status(200).json({
        msg: "Login successful",
        token,
        user: {
          id: user._id,
          username: user.username,
          email: user.email,
        },
      });
    } catch (err) {
      console.error("Login Error:", err);
      res.status(500).json({ msg: "Internal server error" });
    }
  },
};

