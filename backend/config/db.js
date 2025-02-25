import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config(); // ✅ Ensure .env is loaded

const connectDB = async () => {
  try {
    console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI); // Debug: Check if it prints

    const conn = await mongoose.connect(process.env.MONGODB_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });

    console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
  } catch (error) {
    console.error(`❌ MongoDB Connection Error: ${error.message}`);
    process.exit(1);
  }
};

export { connectDB };
