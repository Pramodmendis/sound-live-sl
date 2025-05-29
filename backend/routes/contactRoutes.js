import express from "express";
import {
    getAllMessages,
    handleContactForm,
    sendReply,
} from "../controllers/contactController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.post("/submit", handleContactForm);
router.get("/all", requireAdminAuth, getAllMessages);
router.post("/reply/:id", requireAdminAuth, sendReply);

export default router;
