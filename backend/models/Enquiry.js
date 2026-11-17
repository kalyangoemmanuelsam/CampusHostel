
const mongoose = require("mongoose");

const enquirySchema = new mongoose.Schema({
    studentId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Student",
        required: true
    },
    hostelId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel",
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    status: {
        type: String,
        enum: ["pending", "responded", "closed"],
        default: "pending"
    },
    ownerResponse: {
        type: String,
        default: ""
    }
}, { timestamps: true });

module.exports = mongoose.model("Enquiry", enquirySchema);
