import express from "express";
import {
    exportSubscribersCSV,
    getAllSubscribers,
    sendNewsletter,
    subscribeEmail,
    unsubscribeEmail,
} from "../controllers/subscribeController.js";

const router = express.Router();

router.post("/", subscribeEmail);
router.get("/unsubscribe", unsubscribeEmail);
router.get("/", getAllSubscribers);
router.get("/export", exportSubscribersCSV);
router.post("/send-newsletter", sendNewsletter);

export default router;
