import express from "express";
import {
    addReplyToComment,
    deleteHomeComment,
    getHomeComments,
    postHomeComment,
    updateHomeComment,
} from "../controllers/commentController.js";

const router = express.Router();

// Comments for Home page
router.get("/home", getHomeComments);
router.post("/home", postHomeComment);
router.put("/home/:id", updateHomeComment);
router.delete("/home/:id", deleteHomeComment);

// Replies
router.post("/home/:id/reply", addReplyToComment);

export default router;
