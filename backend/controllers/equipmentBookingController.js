import EquipmentBooking from "../models/EquipmentBooking.js";

export const getAllEquipmentBookings = async (req, res) => {
  try {
    const bookings = await EquipmentBooking.find().populate("clientId", "username email");
    res.status(200).json(bookings);
  } catch (error) {
    console.error("Error fetching equipment bookings:", error);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

export const updateEquipmentBookingStatus = async (req, res) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    const booking = await EquipmentBooking.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );
    res.status(200).json(booking);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update equipment booking status" });
  }
};

export const addEquipmentBooking = async (req, res) => {
  try {
    const {
      eventType,
      eventLocation,
      eventDescription,
      selectedEquipment,
      paymentMethod,
      paymentType,
      payhereOrderId,
    } = req.body;

    const booking = new EquipmentBooking({
      eventType,
      eventLocation,
      eventDescription,
      selectedEquipment,
      paymentMethod,
      paymentType,
      payhereOrderId,
      clientId: req.clientUser._id,
    });

    await booking.save();
    res.status(201).json({ message: "Equipment booking saved." });
  } catch (error) {
    console.error("Booking error:", error);
    res.status(500).json({ message: "Booking failed." });
  }
};
