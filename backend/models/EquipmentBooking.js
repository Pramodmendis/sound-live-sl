import mongoose from "mongoose";

const equipmentBookingSchema = new mongoose.Schema(
  {
    eventType: { type: String, required: true },
    eventLocation: { type: String, required: true },
    eventDescription: { type: String, required: true },
    selectedEquipment: [{ type: String }],
    paymentMethod: { type: String, default: "payhere" },
    paymentType: { type: String, default: "full" },
    payhereOrderId: { type: String },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled"],
      default: "Pending",
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "Client", required: true },
    
  },
  { timestamps: true }
);

export default mongoose.model("EquipmentBooking", equipmentBookingSchema);
