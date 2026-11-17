
const mongoose = require("mongoose");

const studentSchema = new mongoose.Schema({
    fullName: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true
    },
    phone: {
        type: String,
        required: true
    },
    university: {
        type: String,
        default: "Bugema University"
    },
    passwordHash: {
        type: String,
        required: true
    },
    favourites: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Hostel"
    }]
}, { timestamps: true });

module.exports = mongoose.model("Student", studentSchema);

