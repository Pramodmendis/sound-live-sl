import express from "express";
import { getAdminDashboardStats } from "../controllers/adminDashboardController.js";

const router = express.Router();

router.get("/stats", getAdminDashboardStats);

export default router;
