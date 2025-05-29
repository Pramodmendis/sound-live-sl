import ClientUser from "../models/ClientUser.js";

export const getAllClientUsers = async (req, res) => {
  try {
    const users = await ClientUser.find().select("-password");
    res.status(200).json(users);
  } catch (err) {
    console.error("Error fetching client users:", err);
    res.status(500).json({ message: "Failed to load users" });
  }
};