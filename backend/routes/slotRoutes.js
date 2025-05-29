import express from "express";
import { createMultipleSlots, getSlotsByBand } from "../controllers/slotController.js";
import { requireAdminAuth } from "../middleware/requireAdminAuth.js";
import BookingSlot from "../models/bookingSlot.model.js";

const router = express.Router();

router.post("/create-multiple", requireAdminAuth, createMultipleSlots);
router.get("/get-band-slots/:bandId", getSlotsByBand);

router.get("/equipment", async (req, res) => {
  try {
    const slots = await BookingSlot.find({ type: "equipment" }).sort({ date: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching slots" });
  }
});

router.get("/studio", async (req, res) => {
  try {
    const slots = await BookingSlot.find({ type: "studio" }).sort({ date: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching studio slots" });
  }
});

router.get("/band", async (req, res) => {
  try {
    const slots = await BookingSlot.find({ type: "band" }).sort({ date: 1 });
    res.json(slots);
  } catch (err) {
    res.status(500).json({ message: "Error fetching band slots" });
  }
});

export default router;