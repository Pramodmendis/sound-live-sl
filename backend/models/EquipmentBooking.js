import mongoose from "mongoose";

const equipmentBookingSchema = new mongoose.Schema(
  {
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientUser",
      required: true,
    },
    eventType: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDescription: { type: String },
    selectedEquipment: [
      {
        id: Number,
        name: String,
        price: Number,
      },
    ],
    phone: { type: String, required: true },
    email: { type: String, required: true },
    totalPrice: { type: Number, required: true },
    paymentStatus: { type: String, default: "Pending" },
    adminStatus: { type: String, default: "Pending" },

    payhereOrderId: { type: String, default: null },
  },
  { timestamps: true }
);

export default mongoose.model("EquipmentBooking", equipmentBookingSchema);
