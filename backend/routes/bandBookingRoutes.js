import express from "express";
import {
    cancelBandBooking,
    confirmBandBooking,
    createBandBooking,
    downloadBandInvoice,
    getAllBandBookings,
    getClientBandBookings,
    updateBandBookingStatus
} from "../controllers/bandBookingController.js";
import requireClientAuth from "../middleware/requireClientAuth.js";

const router = express.Router();

router.post("/add", requireClientAuth,createBandBooking);
router.get("/all", getAllBandBookings);
router.patch("/update-status/:id", updateBandBookingStatus);
router.patch("/confirm/:id", confirmBandBooking);
router.get("/invoice/:id", downloadBandInvoice);
router.get('/client', getClientBandBookings);
router.patch("/cancel/:id", cancelBandBooking);


export default router;
