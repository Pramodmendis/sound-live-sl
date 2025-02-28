import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import authRoutes from "./routes/authRoutes.js";
import EquipmentBookingsRoutes from "./routes/EquipmentBookingsRoutes.js";

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");

    // Middleware
    app.use(cors({ origin: "*" }));
    app.use(express.json());

    // Routes
    app.use("/api/auth", authRoutes);
    app.use("/api/EquipmentBookings", EquipmentBookingsRoutes);
    app.use("/api/admin", adminRoutes);

    // Global Error Handling Middleware
    app.use((err, req, res, next) => {
      console.error("❌ Server Error:", err.message);
      res.status(500).json({ message: "Internal Server Error" });
    });

    // Start Server
    app.listen(PORT, () => {
      console.log(`🚀 Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ Database Connection Failed:", err.message);
    process.exit(1);
  });
