import BandBooking from "../models/BandBooking.js";
import { generateInvoice } from "../utils/generateInvoice.js";
import { sendReceiptEmail } from "../utils/sendReceiptEmail.js";

// Save booking before payment
export const createBandBooking = async (req, res) => {
  try {
    const { bandId, eventDate, eventTime, location, hours, phone, email, totalPrice } = req.body;

    if (!bandId || !eventDate || !eventTime || !location || !hours || !phone || !email || !totalPrice) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newBooking = new BandBooking({
      bandId,
      eventDate,
      eventTime,
      location,
      hours,
      phone,
      email,
      totalPrice,
      clientId: req.clientUser._id,
      paymentStatus: "Pending",
      adminStatus: "Pending",
    });

    const saved = await newBooking.save();
    res.status(201).json({ message: "Booking saved", booking: saved });
  } catch (err) {
    console.error("Booking creation error:", err);
    res.status(500).json({ message: "Booking failed" });
  }
};

// Confirm payment after PayHere completes
export const confirmBandBooking = async (req, res) => {
  try {
    const booking = await BandBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    booking.paymentStatus = "Paid";
    await booking.save();

    const filePath = `./invoices/band-invoice-${booking._id}.pdf`;
    await generateInvoice(booking, filePath, "Band");
    await sendReceiptEmail(booking.email, booking, "Band");

    res.status(200).json({ message: "Payment confirmed", booking });
  } catch (err) {
    console.error("Payment confirmation failed:", err);
    res.status(500).json({ message: "Failed to confirm payment" });
  }
};

// Admin status control
export const updateBandBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;
    const updated = await BandBooking.findByIdAndUpdate(
      req.params.id,
      { adminStatus: status },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Admin status updated", booking: updated });
  } catch (err) {
    res.status(500).json({ message: "Failed to update admin status" });
  }
};

// Get all bookings (admin view)
export const getAllBandBookings = async (req, res) => {
  try {
    const bookings = await BandBooking.find()
      .populate("bandId", "name")
      .populate("clientId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

// Download invoice
export const downloadBandInvoice = async (req, res) => {
  const filePath = `./invoices/band-invoice-${req.params.id}.pdf`;
  res.download(filePath);
};

// Get booking by ID (for client)
export const getClientBandBookings = async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await BandBooking.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch band bookings.' });
  }
};

//Admin view cancel
export const cancelBandBooking = async (req, res) => {
  try {
    const booking = await BandBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.paymentStatus === "Paid")
      return res.status(400).json({ message: "Cannot cancel a paid booking" });

    await booking.deleteOne();
    res.status(200).json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("Cancel error:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
};
