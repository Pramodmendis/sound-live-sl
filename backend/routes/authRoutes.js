import express from 'express';
import { authController } from '../controllers/authController.js';

const router = express.Router();

// Register User
router.post('/register', authController.register);

// Login User
router.post('/login', authController.login);

export default router;
