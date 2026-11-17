const express = require("express");

const {
    registerStudent,
    registerOwner,
    loginUser
} = require("../controllers/authController");

const router = express.Router();

router.post("/register/student", registerStudent);

router.post("/register/owner", registerOwner);

router.post("/login", loginUser);

module.exports = router;
