import BookingSlot from "../models/bookingSlot.model.js";

export const createMultipleSlots = async (req, res) => {
  try {
    const { slots } = req.body;

    if (!Array.isArray(slots) || slots.length === 0) {
      return res.status(400).json({ message: "No slots provided." });
    }

    for (let slot of slots) {
      if (!slot.type || !slot.date) {
        return res.status(400).json({ message: "Each slot must have a type and date." });
      }

      if ((slot.type === "studio" || slot.type === "band") && (!slot.startTime || !slot.endTime)) {
        return res.status(400).json({ message: "Studio and Band slots must include start and end times." });
      }

      if (slot.type === "band" && !slot.bandId) {
        return res.status(400).json({ message: "Band ID is required for band slots." });
      }
    }

    const createdSlots = await BookingSlot.insertMany(slots);
    res.status(201).json({ message: "Slots created successfully.", slots: createdSlots });
  } catch (err) {
    console.error("Slot creation failed:", err.message);
    res.status(500).json({ message: "Server error while creating slots." });
  }
};

export const getSlotsByBand = async (req, res) => {
  try {
    const { bandId } = req.params;
    const slots = await BookingSlot.find({ type: "band", bandId });
    res.status(200).json(slots);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch band slots." });
  }
};
