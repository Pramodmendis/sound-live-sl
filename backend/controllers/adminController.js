import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';
import jwt from 'jsonwebtoken';
import Admin from '../models/Admin.js';
dotenv.config();

const SECRET_KEY = process.env.SECRET_KEY;

export const adminSignup = async (req, res) => {
    try{
        const {username, email, password} = req.body;
        const existingAdmin = await Admin.findOne({email});

        if(existingAdmin){
            return res.status(400).json({message: 'Admin already exists'});
        }

        const newAdmin = new Admin({username, email, password});
        await newAdmin.save();

        res.status(201).json({message: 'Admin created successfully'});
    }catch(error){
        res.status(500).json({message: 'Something went wrong'});
    }
    };


    export const adminLogin = async (req, res) => {
        try {
          const { email, password } = req.body;
          const admin = await Admin.findOne({ email });
      
          if (!admin) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
      
          const isMatch = await bcrypt.compare(password, admin.password);
          if (!isMatch) {
            return res.status(400).json({ message: "Invalid credentials" });
          }
      
          const token = jwt.sign({ id: admin._id }, process.env.JWT_SECRET, { expiresIn: "1h" });
      
          res.status(200).json({
            message: "Login successful",
            token,
            admin: { id: admin._id, email: admin.email },
          });
        } catch (error) {
          console.error("Login error:", error);
          res.status(500).json({ message: "Something went wrong" });
        }
      };