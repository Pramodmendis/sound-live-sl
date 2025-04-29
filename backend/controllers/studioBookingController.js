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
      paymentMethod,
      paymentType,
      payhereOrderId,
    } = req.body;

    const booking = new StudioBooking({
      bandName,
      email,
      contactNumber,
      date,
      startTime,
      endTime,
      duration,
      totalPrice,
      paymentMethod,
      paymentType,
      payhereOrderId,
      clientId: req.clientUser._id,
    });

    await booking.save();
    res.status(201).json({ message: "Studio booking saved successfully." });
  } catch (error) {
    console.error("Studio booking error:", error);
    res.status(500).json({ message: "Failed to save booking." });
  }
};
