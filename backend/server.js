import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
import express from "express";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import { connectDB } from "./config/db.js";
import adminRoutes from "./routes/adminRoutes.js";
import clientAuthRoutes from "./routes/clientAuthRoutes.js";
import equipmentBookingRoutes from "./routes/equipmentBookingRoute.js";
import paymentRoutes from "./routes/paymentRoutes.js";
import studioBookingRoutes from "./routes/studioBookingRoutes.js";


dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
const uploadsDir = path.join(process.cwd(), 'uploads');
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir);
}

// Connect to MongoDB before starting the server
connectDB()
  .then(() => {
    console.log("✅ Database connected successfully");

    // Middleware
    app.use(cors({ origin: "*" }));
    app.use(express.json());
    app.use(cookieParser());
    app.use("/uploads", express.static(path.join(path.resolve(), "uploads")));
    app.use(express.urlencoded({ extended: true }));

    // Routes
    app.use("/api/equipment-bookings", equipmentBookingRoutes);
    app.use("/api/admin", adminRoutes);
    app.use("/api/auth", clientAuthRoutes);
    app.use('/uploads', express.static(uploadsDir));
    app.use("/api/studioBookings", studioBookingRoutes);
    app.use("/api/payments", paymentRoutes);


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
