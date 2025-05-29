import jwt from "jsonwebtoken";
import AdminUser from "../models/AdminUser.js";

export const requireAdminAuth = async (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return res.status(401).json({ message: "Not authorized" });
  }

  try {
    const token = authHeader.split(" ")[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.admin = await AdminUser.findById(decoded.id).select("-password");
    next();
  } catch (err) {
    console.error(err);
    res.status(401).json({ message: "Token failed" });
  }
};

export const requireSuperAdmin = (req, res, next) => {
  if (req.admin && req.admin.role === "super") {
    next();
  } else {
    res.status(403).json({ message: "Access denied. Super admin only." });
  }
};
