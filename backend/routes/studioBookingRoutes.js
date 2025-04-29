import express from "express";
import { addStudioBooking, getAllStudioBookings, updateStudioBookingStatus } from "../controllers/studioBookingController.js";
import requireClientAuth from "../middleware/requireClientAuth.js";

const router = express.Router();

router.post("/add", requireClientAuth, addStudioBooking);
router.get("/all", getAllStudioBookings);
router.patch("/update-status/:id", updateStudioBookingStatus);

export default router;
