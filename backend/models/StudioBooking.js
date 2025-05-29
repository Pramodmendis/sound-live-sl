import mongoose from "mongoose";

const studioBookingSchema = new mongoose.Schema(
  {
    bandName: { type: String, required: true },
    email: { type: String, required: true },
    contactNumber: { type: String, required: true },
    date: { type: Date, required: true }, // Changed to Date type
    startTime: { type: String, required: true },
    endTime: { type: String, required: true },
    duration: { type: Number, required: true },
    totalPrice: { type: Number, required: true },
    paymentMethod: { 
      type: String, 
      enum: ["payhere", "cash", "bank_transfer"],
      default: "payhere" 
    },
    paymentStatus: {
      type: String,
      enum: ["pending", "completed", "failed", "refunded"],
      default: "pending"
    },
    payhereOrderId: { type: String, index: true },
    paymentId: { type: String },
    paymentDetails: { type: Object },
    status: {
      type: String,
      enum: ["Pending", "Accepted", "Cancelled", "Payment Failed"],
      default: "Pending",
    },
    clientId: { 
      type: mongoose.Schema.Types.ObjectId, 
      ref: "ClientUser", 
      required: true 
    },
  },
  { 
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true } 
  }
);

studioBookingSchema.index({ date: 1, startTime: 1 });
studioBookingSchema.index({ clientId: 1 });
studioBookingSchema.index({ status: 1 });

export default mongoose.model("StudioBooking", studioBookingSchema);