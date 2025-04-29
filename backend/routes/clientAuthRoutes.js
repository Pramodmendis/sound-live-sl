import express from 'express';
import {
    forgotPassword,
    loginClientUser,
    registerClientUser,
    resetPassword,
    updateClientProfile,
} from '../controllers/clientAuthController.js';
import protectClient from '../middleware/requireClientAuth.js';
import upload from '../middleware/upload.js';

const router = express.Router();

router.post('/signup', registerClientUser);
router.post('/login', loginClientUser);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);

router.put('/update-profile', protectClient, upload.single('profilePicture'), updateClientProfile);

export default router;
