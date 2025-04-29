import express from "express";
import { handlePayHereCallback } from "../controllers/paymentController.js";

const router = express.Router();

router.post("/payhere-callback", handlePayHereCallback);

export default router;
