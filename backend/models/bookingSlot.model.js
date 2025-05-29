import mongoose from "mongoose";

const bookingSlotSchema = new mongoose.Schema({
  type: {
    type: String,
    enum: ["equipment", "studio", "band"],
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
  startTime: {
    type: String,
  },
  endTime: {
    type: String,
  },
  bandId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Band",
  }
});

export default mongoose.model("BookingSlot", bookingSlotSchema);
