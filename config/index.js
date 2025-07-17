const mongoose = require("mongoose");
const dotenv = require("dotenv");

dotenv.config();

const connectDB = async (callback) => {
  try {
    await mongoose.connect(process.env.MONGO_URL);

    console.log("✅ MongoDB connected successfully 🚀🚀💘❤️");

    if (callback) {
      callback();
    }
  } catch (error) {
    console.error("❌ MongoDB connection error:", error.message);
    process.exit(1); // Stop the server if DB connection fails
  }
};

module.exports = connectDB;
