import EquipmentBooking from "../models/EquipmentBooking.js";
import { generateInvoice } from "../utils/generateInvoice.js";
import { sendReceiptEmail } from "../utils/sendReceiptEmail.js";

// Save Equipment Booking Before Payment
export const createEquipmentBooking = async (req, res) => {
  try {
    const {
      eventType,
      eventLocation,
      eventDescription,
      selectedEquipment,
      phone,
      email,
    } = req.body;

    if (
      !eventType ||
      !eventLocation ||
      !selectedEquipment?.length ||
      !phone ||
      !email
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const totalPrice = selectedEquipment.reduce(
      (sum, item) => sum + (item.price || 0),
      0
    );

    const newBooking = new EquipmentBooking({
      clientId: req.clientUser._id,
      eventType,
      eventLocation,
      eventDescription,
      selectedEquipment,
      phone,
      email,
      totalPrice,
      paymentStatus: "Pending",
      adminStatus: "Pending",
    });

    //Add PayHere Order ID (for notify_url)
    newBooking.payhereOrderId = `Equipment_${newBooking._id}`;

    const saved = await newBooking.save();
    res.status(201).json({ message: "Booking saved", booking: saved });
  } catch (err) {
    console.error("❌ Equipment booking error:", err);
    res.status(500).json({ message: "Failed to save booking" });
  }
};


//Confirm Payment After PayHere Success
export const confirmEquipmentBooking = async (req, res) => {
  try {
    const booking = await EquipmentBooking.findById(req.params.id);
    if (!booking)
      return res.status(404).json({ message: "Booking not found" });

    booking.paymentStatus = "Paid";
    await booking.save();

    const filePath = `./invoices/equipment-invoice-${booking._id}.pdf`;
    await generateInvoice(booking, filePath, "Equipment");
    await sendReceiptEmail(booking.email, booking, "Equipment");

    res.status(200).json({ message: "Payment confirmed", booking });
  } catch (err) {
    console.error("❌ Payment confirm error:", err);
    res.status(500).json({ message: "Failed to confirm booking" });
  }
};

//Update Admin Status
export const updateEquipmentBookingStatus = async (req, res) => {
  try {
    const { status } = req.body;

    const updated = await EquipmentBooking.findByIdAndUpdate(
      req.params.id,
      { adminStatus: status },
      { new: true }
    );

    if (!updated)
      return res.status(404).json({ message: "Booking not found" });

    res.status(200).json({ message: "Admin status updated", booking: updated });
  } catch (err) {
    console.error("❌ Admin update error:", err);
    res.status(500).json({ message: "Failed to update status" });
  }
};

//Get All Equipment Bookings (Admin)
export const getAllEquipmentBookings = async (req, res) => {
  try {
    const bookings = await EquipmentBooking.find()
      .populate("clientId", "username email")
      .sort({ createdAt: -1 });

    res.status(200).json(bookings);
  } catch (err) {
    console.error("❌ Fetch bookings error:", err);
    res.status(500).json({ message: "Failed to fetch bookings" });
  }
};

//Download PDF Invoice
export const downloadEquipmentInvoice = async (req, res) => {
  const filePath = `./invoices/equipment-invoice-${req.params.id}.pdf`;
  res.download(filePath);
};


//Initiate Payment
export const initiateEquipmentPayment = async (req, res) => {
  try {
    const {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,
      order_id,
      items,
      amount,
      currency,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
    } = req.body;

    if (!merchant_id || !return_url || !notify_url || !order_id || !items || !amount || !email || !phone) {
      return res.status(400).json({ message: "Missing required payment fields" });
    }

    console.log("✅ Sending PayHere payload:", {
      merchant_id,
      return_url,
      cancel_url,
      notify_url,
      order_id,
      items,
      amount,
      currency,
      first_name,
      last_name,
      email,
      phone,
      address,
      city,
      country,
    });

    res.status(200).json({ payload: req.body });
  } catch (err) {
    console.error("❌ Payment initiation error:", err);
    res.status(500).json({ message: "Internal server error" });
  }
};


export const getClientEquipmentBookings = async (req, res) => {
  try {
    const { email } = req.query;
    const bookings = await EquipmentBooking.find({ email }).sort({ createdAt: -1 });
    res.status(200).json(bookings);
  } catch (error) {
    res.status(500).json({ message: 'Failed to fetch equipment bookings.' });
  }
};


export const cancelEquipmentBooking = async (req, res) => {
  try {
    const booking = await EquipmentBooking.findById(req.params.id);
    if (!booking) return res.status(404).json({ message: "Booking not found" });

    if (booking.paymentStatus === "Paid")
      return res.status(400).json({ message: "Cannot cancel a paid booking" });

    await booking.deleteOne();
    res.status(200).json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("❌ Cancel error:", err);
    res.status(500).json({ message: "Cancel failed" });
  }
};
