const mongoose = require("mongoose");

// 🔥 Hardcoded MongoDB connection string
const MONGO_URI = "mongodb+srv://ar162387:nVZcE5KNnO37ArtW@aroundyou.4ir5t.mongodb.net/?retryWrites=true&w=majority&appName=aroundyou";

const connectDB = async () => {
    try {
        await mongoose.connect(MONGO_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log("✅ MongoDB Connected");
    } catch (error) {
        console.error("❌ MongoDB Connection Error:", error);
        // process.exit(1);
    }
};

module.exports = connectDB;
