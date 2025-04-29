import express from "express";
import { addEquipmentBooking, getAllEquipmentBookings, updateEquipmentBookingStatus } from "../controllers/equipmentBookingController.js";
import requireClientAuth from "../middleware/requireClientAuth.js";

const router = express.Router();

router.post("/add", requireClientAuth, addEquipmentBooking);
router.get("/all", getAllEquipmentBookings);
router.patch("/update-status/:id", updateEquipmentBookingStatus);

export default router;
