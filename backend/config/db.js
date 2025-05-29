import dotenv from "dotenv";
import mongoose from "mongoose";

dotenv.config();

const connectDB = async () => {
  const maxRetries = 5;
  let retries = maxRetries;

  while (retries) {
    try {
      console.log("🔍 MONGODB_URI:", process.env.MONGODB_URI);

      const conn = await mongoose.connect(process.env.MONGODB_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
      });

      console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
      break;
    } catch (error) {
      console.error(`❌ MongoDB Connection Error: ${error.message}`);
      retries -= 1;

      if (retries === 0) {
        console.error("💥 Failed to connect to MongoDB after multiple attempts.");
        process.exit(1);
      }

      console.log(`🔁 Retrying to connect... (${maxRetries - retries}/${maxRetries})`);
      await new Promise(res => setTimeout(res, 5000));
    }
  }
};

export { connectDB };
