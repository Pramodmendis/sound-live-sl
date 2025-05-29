/*import EquipmentBooking from "../models/EquipmentBooking.js";

export const handlePayHereCallback = async (req, res) => {
  const { order_id, status_code } = req.body;

  try {
    if (!order_id) return res.status(400).send("Missing order ID");

    const bookingId = order_id.replace("Equipment_", "");
    const booking = await EquipmentBooking.findById(bookingId);
    if (!booking) return res.status(404).send("Booking not found");

    if (status_code === "2") {
      booking.paymentStatus = "Paid";
      await booking.save();
      console.log(`✅ Booking ${bookingId} marked as Paid via PayHere callback`);
    }

    res.status(200).send("Payment callback handled");
  } catch (err) {
    console.error("❌ PayHere notify error:", err);
    res.status(500).send("Callback error");
  }
};*/
