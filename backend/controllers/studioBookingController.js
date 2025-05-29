import crypto from "crypto";
import StudioBooking from "../models/StudioBooking.js";


export const getAllStudioBookings = async (req, res) => {
  try {
    const bookings = await StudioBooking.find().populate("clientId", "username email");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching studio bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const updateStudioBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await StudioBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update booking status" });
  }
};


export const addStudioBooking = async (req, res) => {
  try {
    const {
      bandName,
      email,
      contactNumber,
      date,
      startTime,
      endTime,
      duration,
      totalPrice,
    } = req.body;

    //Generate a unique PayHere order ID
    const payhereOrderId = `Studio_${crypto.randomBytes(8).toString("hex")}_${Date.now()}`;

    //Save booking in DB with generated PayHere ID
    const booking = new StudioBooking({
      bandName,
      email,
      contactNumber,
      date: new Date(date),
      startTime,
      endTime,
      duration,
      totalPrice,
      payhereOrderId,
      clientId: req.clientUser._id,
      status: "Pending",
      paymentStatus: "pending",
    });

    await booking.save();

    //Only return booking ID and PayHere order ID to frontend
    res.status(201).json({
      booking: {
        _id: booking._id,
        payhereOrderId: booking.payhereOrderId,
      },
    });
  } catch (err) {
    console.error("❌ Studio booking error:", err);
    res.status(500).json({ message: "Server error while booking studio" });
  }
};

//Confirm endpoint after PayHere success
export const confirmStudioBookingPayment = async (req, res) => {
  try {
    const { paymentId } = req.body;
    const bookingId = req.params.id;

    const updated = await StudioBooking.findByIdAndUpdate(
      bookingId,
      {
        paymentStatus: "completed",
        status: "Paid",
        paymentId,
      },
      { new: true }
    );

    if (!updated) {
      return res.status(404).json({ message: "Booking not found" });
    }

    res.status(200).json({ message: "Studio booking confirmed" });
  } catch (err) {
    console.error("❌ Confirmation error:", err);
    res.status(500).json({ message: "Payment confirmation failed" });
  }
};

// Get all bookings for a specific client
export const getClientStudioBookings = async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await StudioBooking.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch studio bookings.' });
  }
};


export const cancelStudioBooking = async (req, res) => {
  try {
    const booking = await StudioBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.paymentStatus === "completed")
      return res.status(400).json({ message: "Cannot cancel a paid booking" });

    await booking.deleteOne();
    res.status(200).json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("❌ Cancel error:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
};
