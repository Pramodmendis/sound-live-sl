import express from "express";
import {
    cancelEquipmentBooking,
    confirmEquipmentBooking,
    createEquipmentBooking,
    downloadEquipmentInvoice,
    getAllEquipmentBookings,
    getClientEquipmentBookings,
    initiateEquipmentPayment,
    updateEquipmentBookingStatus
} from "../controllers/equipmentBookingController.js";

import { requireAdminAuth } from "../middleware/requireAdminAuth.js";
import requireClientAuth from "../middleware/requireClientAuth.js";

const router = express.Router();

router.post("/add", requireClientAuth, createEquipmentBooking);
router.patch("/confirm/:id", confirmEquipmentBooking);
router.patch("/update-status/:id", updateEquipmentBookingStatus);
router.get("/all", getAllEquipmentBookings);
router.get("/invoice/:id", downloadEquipmentInvoice);
router.get("/admin/all", requireAdminAuth, getAllEquipmentBookings);
router.post("/equipment/initiate-payment", initiateEquipmentPayment);
router.get('/client', getClientEquipmentBookings);
router.patch("/cancel/:id", requireAdminAuth, cancelEquipmentBooking);



export default router;
