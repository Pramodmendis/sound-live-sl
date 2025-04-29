import mongoose from "mongoose";

const studioBookingSchema = new mongoose.Schema(
  {
    bandName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    date: { type: String, required: true },
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { type: String, default: "payhere" },
    paymentType: { type: String, default: "full" },
    payhereOrderId: { type: String },
    status: {type: String,
      enum: ["Pending", "Accepted", "Cancelled"],
      default: "Pending",
    },
    clientId: { type: mongoose.Schema.Types.ObjectId, ref: "ClientUser", required: true },
  },
  { timestamps: true }
);

export default mongoose.model("StudioBooking", studioBookingSchema);
