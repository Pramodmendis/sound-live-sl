import express from "express";
import { addStudioBooking, cancelStudioBooking, confirmStudioBookingPayment, getAllStudioBookings, getClientStudioBookings, updateStudioBookingStatus } from "../controllers/studioBookingController.js";
import requireClientAuth from "../middleware/requireClientAuth.js";

const router = express.Router();

router.post("/add", requireClientAuth, addStudioBooking);
router.get("/all", getAllStudioBookings);
router.patch("/update-status/:id", updateStudioBookingStatus);
router.patch("/confirm/:id", confirmStudioBookingPayment);
router.get('/client', getClientStudioBookings);
router.patch("/cancel/:id", cancelStudioBooking);
//router.get("/invoice/:id", downloadStudioInvoice);


export default router;
