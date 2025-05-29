import express from "express";
import {
    adminLogin,
    adminSignup,
} from "../controllers/adminAuthController.js";
import {
    addSubAdmin,
    deleteAdmin,
    getAllAdmins,
    toggleAdminRole,
} from "../controllers/adminUserController.js";
import { requireAdminAuth, requireSuperAdmin } from "../middleware/requireAdminAuth.js";

const router = express.Router();

router.post("/signup", adminSignup);
router.post("/login", adminLogin);

router.post("/add", requireAdminAuth, requireSuperAdmin, addSubAdmin);
router.get("/all", requireAdminAuth, getAllAdmins);
router.delete("/delete/:id", requireAdminAuth, requireSuperAdmin, deleteAdmin);
router.patch("/toggle-role/:id", requireAdminAuth, requireSuperAdmin, toggleAdminRole);

export default router;
