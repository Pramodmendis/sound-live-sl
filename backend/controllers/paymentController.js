import BandBooking from "../models/BandBooking.js";
import EquipmentBooking from "../models/EquipmentBooking.js";
import StudioBooking from "../models/StudioBooking.js";

export const handlePayHereCallback = async (req, res) => {
  const { order_id, status_code } = req.body;

  try {
    if (status_code === "2") {
      const [serviceType, bookingId] = order_id.split("_");

      let BookingModel;
      if (serviceType === "Studio") BookingModel = StudioBooking;
      else if (serviceType === "Equipment") BookingModel = EquipmentBooking;
      else if (serviceType === "Band") BookingModel = BandBooking;

      if (!BookingModel) return res.status(400).send("Invalid service type");

      await BookingModel.findByIdAndUpdate(bookingId, {
        paymentStatus: "Paid",
      });

      return res.status(200).send("Payment updated");
    }

    res.status(400).send("Invalid payment status");
  } catch (err) {
    console.error("PayHere callback error:", err);
    res.status(500).send("Server error");
  }
};
