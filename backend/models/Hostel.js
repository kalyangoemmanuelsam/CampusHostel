
const mongoose = require("mongoose");

const hostelSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    ownerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Owner",
        required: true
    },
    description: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    monthlyRent: {
        type: Number,
        required: true,
        min: 0
    },
    facilities: [{
        type: String
    }],
    availableRooms: {
        type: Number,
        default: 0,
        min: 0
    },
    photos: [{
        type: String
    }],
    status: {
        type: String,
        enum: ["pending", "approved", "rejected", "suspended"],
        default: "pending"
    }
}, { timestamps: true });

module.exports = mongoose.model("Hostel", hostelSchema);
