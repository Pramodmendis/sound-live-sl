import AdminUser from "../models/AdminUser.js";

//Add a Sub Admin by super admin only
export const addSubAdmin = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    const existing = await AdminUser.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Admin already exists" });
    }

    const newAdmin = new AdminUser({
      username,
      email,
      password,
      role: "admin",
    });

    const saved = await newAdmin.save();
    res.status(201).json({ message: "Sub-admin added", admin: saved });
  } catch (err) {
    res.status(500).json({ message: "Failed to add sub-admin", error: err.message });
  }
};


//View All Admins
export const getAllAdmins = async (req, res) => {
  try {
    const admins = await AdminUser.find().select("-password");
    res.status(200).json(admins);
  } catch (err) {
    res.status(500).json({ message: "Failed to fetch admins" });
  }
};

//Delete Admin (Only sub-admins, not super)
export const deleteAdmin = async (req, res) => {
  try {
    const { id } = req.params;

    const adminToDelete = await AdminUser.findById(id);
    if (!adminToDelete) {
      return res.status(404).json({ message: "Admin not found" });
    }

    if (adminToDelete.role === "super") {
      return res.status(403).json({ message: "Cannot delete a super admin" });
    }

    await AdminUser.findByIdAndDelete(id);
    res.status(200).json({ message: "Admin deleted" });
  } catch (err) {
    res.status(500).json({ message: "Failed to delete admin" });
  }
};

//Promote/Demote Admin (Only by Super Admin)
export const toggleAdminRole = async (req, res) => {
  try {
    const { id } = req.params;

    const admin = await AdminUser.findById(id);
    if (!admin) {
      return res.status(404).json({ message: "Admin not found" });
    }

    admin.role = admin.role === "super" ? "admin" : "super";
    const updated = await admin.save();

    res.status(200).json(updated);
  } catch (err) {
    res.status(500).json({ message: "Failed to toggle admin role" });
  }
};
