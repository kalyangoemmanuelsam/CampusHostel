
const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const cors = require("cors");
const helmet = require("helmet");
const morgan = require("morgan");

// Load environment settings
dotenv.config();

// Create the application
const app = express();

// Middleware
app.use(express.json());
app.use(cors());
app.use(helmet());
app.use(morgan("dev"));
// Authentication routes
const authRoutes = require("./routes/authRoutes");

app.use("/api/auth", authRoutes);
// Welcome route
app.get("/", (req, res) => {
    res.send("Welcome to CampusHostel API!");
});

// Test route
app.get("/api/status", (req, res) => {
    res.json({
        message: "CampusHostel backend is running successfully!",
        status: "Online"
    });
});

// Server port
const PORT = process.env.PORT || 5000;

// Connect to MongoDB and start server
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
        console.log("MongoDB connected successfully!");

        app.listen(PORT, () => {
            console.log(`CampusHostel server running on port ${PORT}`);
        });
    })
    .catch((error) => {
        console.error("MongoDB connection failed:", error.message);
    });


