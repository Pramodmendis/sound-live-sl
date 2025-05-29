import dotenv from 'dotenv';
import express from 'express';
import { handlePayHereCallback } from '../controllers/paymentController.js';

dotenv.config();

const router = express.Router();

router.post('/payhere-callback', handlePayHereCallback);

export default router;
