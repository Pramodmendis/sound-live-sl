import mongoose from "mongoose";

const bandBookingSchema = new mongoose.Schema(
  {
    bandId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Band",
      required: true,
    },
    clientId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "ClientUser",
      required: true,
    },
    eventDate: {
      type: String,
      required: true,
    },
    eventTime: {
      type: String,
      required: true,
    },
    location: {
      type: String,
      required: true,
    },
    hours: {
      type: Number,
      required: true,
    },
    totalPrice: {
      type: Number,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
    },
    payhereOrderId: {
      type: String,
    },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled"],
      default: "Pending",
    },
    paymentStatus: {
      type: String,
      enum: ["Pending", "Paid"],
      default: "Pending",
    },
    adminStatus: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled"],
      default: "Pending",
    },
  },
  { timestamps: true }
);

export default mongoose.model("BandBooking", bandBookingSchema);
