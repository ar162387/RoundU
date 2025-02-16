// const express = require("express");
// const mongoose = require("mongoose");
// const bcrypt = require("bcryptjs");
// const jwt = require("jsonwebtoken");
// const dotenv = require("dotenv");

// dotenv.config();
// const app = express();
// app.use(express.json());

// const mongoUrl = "mongodb+srv://ar162387:nVZcE5KNnO37ArtW@aroundyou.4ir5t.mongodb.net/?retryWrites=true&w=majority&appName=aroundyou";

// mongoose.connect(mongoUrl, { useNewUrlParser: true })
//     .then(() => console.log("Database Connected"))
//     .catch((e) => console.log(e));

// const userSchema = new mongoose.Schema({
//     name: { type: String, required: true },
//     email: { type: String, required: true, unique: true },
//     password: { type: String, required: true },
//     phone: { type: String, required: true },
//     role: { type: String, enum: ["business", "user"], required: true }
// }, { timestamps: true });

// // 🔥 Hash the password before saving
// userSchema.pre("save", async function (next) {
//     if (!this.isModified("password")) return next();
//     const salt = await bcrypt.genSalt(10);
//     this.password = await bcrypt.hash(this.password, salt);
//     next();
// });

// // 🔥 Add `matchPassword` method to compare entered password with hashed password
// userSchema.methods.matchPassword = async function (enteredPassword) {
//     return await bcrypt.compare(enteredPassword, this.password);
// };

// const User = mongoose.model("User", userSchema);
// module.exports = User;

// const generateToken = (id) => {
//     return jwt.sign({ id }, process.env.JWT_SECRET || "mysecret", { expiresIn: "30d" });
// };

// app.post("/signup", async (req, res) => {
//     console.log("Received Request Data:", req.body); // Log what is coming from the frontend

//     const { name, email, password, phone, role } = req.body;

//     if (!name || !email || !password || !phone || !role) {
//         console.log("Missing fields:", { name, email, password, phone, role });
//         return res.status(400).json({ message: "All fields are required" });
//     }

//     try {
//         const existingUser = await User.findOne({ email });
//         if (existingUser) {
//             console.log("User already exists:", email);
//             return res.status(400).json({ message: "User already exists" });
//         }

//         const newUser = new User({ name, email, password, phone, role });
//         await newUser.save();

//         res.status(201).json({
//             _id: newUser.id,
//             name: newUser.name,
//             email: newUser.email,
//             phone: newUser.phone,
//             role: newUser.role,
//             token: generateToken(newUser.id),
//         });

//     } catch (error) {
//         console.error("Signup Error:", error);
//         res.status(500).json({ message: "Server Error", error });
//     }
// });

// app.post("/login", async (req, res) => {
//     try {
//         console.log("Received login request:", req.body); // Debugging

//         const { email, password } = req.body;

//         if (!email || !password) {
//             console.log("Missing fields:", { email, password });
//             return res.status(400).json({ message: "All fields are required" });
//         }

//         const user = await User.findOne({ email });

//         if (!user) {
//             console.log("User not found:", email);
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // 🔥 Ensure `matchPassword` is properly called
//         const isMatch = await user.matchPassword(password);
//         if (!isMatch) {
//             console.log("Invalid password for:", email);
//             return res.status(400).json({ message: "Invalid email or password" });
//         }

//         // 🔥 If login is successful, send token
//         res.json({
//             _id: user.id,
//             name: user.name,
//             email: user.email,
//             role: user.role,
//             token: generateToken(user.id),
//         });

//     } catch (error) {
//         console.error("Server error in login:", error); // Debug the error
//         res.status(500).json({ message: "Server Error", error: error.message });
//     }
// });



// app.get("/", (req, res) => {
//     res.send({ status: "Server Running" });
// });

// app.listen(5001, () => {
//     console.log("Server started on port 5001");
// });


console.log("TOP OF FILE: app.js reached!");
const express = require("express");
const connectDB = require("./config/db");
const authRoutes = require("./routes/authRoutes");

console.log("AFTER REQUIRE STATEMENTS!");

const app = express();
app.use(express.json());

// Connect to MongoDB
connectDB();

// Routes
app.use("/api/auth", authRoutes);

app.get("/", (req, res) => {
    res.send({ status: "Server Running" });
});

// 🔥 Hardcoded PORT
const PORT = 5001;

app.listen(PORT, () => {
    console.log(`🚀 Server started on port ${PORT}`);
});
