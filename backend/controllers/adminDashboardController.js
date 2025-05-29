import ClientUser from "../models/ClientUser.js";
import EquipmentBooking from "../models/EquipmentBooking.js";
import StudioBooking from "../models/StudioBooking.js";

export const getAdminDashboardStats = async (req, res) => {
  try {
    const totalUsers = await ClientUser.countDocuments();
    const totalStudioBookings = await StudioBooking.countDocuments();
    const totalEquipmentBookings = await EquipmentBooking.countDocuments();

    res.status(200).json({
      totalUsers,
      totalStudioBookings,
      totalEquipmentBookings,
      totalAdmins: 1,
    });
  } catch (error) {
    console.error("Admin dashboard stats error:", error);
    res.status(500).json({ message: "Failed to load dashboard stats" });
  }
};
