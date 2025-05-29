import express from "express";
import { getAllClientUsers } from "../controllers/clientUserController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.get("/all", requireAdminAuth, getAllClientUsers);

export default router;