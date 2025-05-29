import dotenv from "dotenv";
import express from "express";
import mongoose from "mongoose";

dotenv.config();
const app = express();
app.use(express.json());

app.post("/api/contact/submit", (req, res) => {
  console.log("✅ TEST route hit");
  console.log("📦 Request body:", req.body);
  res.json({ success: true, message: "Test route is working!" });
});

mongoose
  .connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ MongoDB connected (test)");
    app.listen(5001, () => {
      console.log("🚀 Test server running on http://localhost:5001");
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection failed (test):", err.message);
  });
