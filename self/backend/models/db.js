// db.js
import mongoose from "mongoose";
import dotenv from "dotenv";

dotenv.config();

const MONGO_URI = process.env.MONGODB_URI;

const connectDB = async () => {
  try {
    await mongoose.connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true
    });
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ DB connection error:", err.message);
    process.exit(1); // Optional: Exit process if DB connection fails
  }
};

export default connectDB;
