const express = require("express");
const router = express.Router();

const {
    createHostel,
    getMyHostels
} = require("../controllers/hostelController");

const {
    protect,
    ownerOnly
} = require("../middleware/authMiddleware");

router.post("/", protect, ownerOnly, createHostel);

router.get("/my-hostels", protect, ownerOnly, getMyHostels);

module.exports = router;
