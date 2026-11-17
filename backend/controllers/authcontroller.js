const Student = require("../models/Student");
const Owner = require("../models/Owner");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

// Generate authentication token
const generateToken = (id, role) => {
    return jwt.sign(
        { id, role },
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
    );
};

// Register a new student
exports.registerStudent = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters."
            });
        }

        const existingStudent = await Student.findOne({ email });

        if (existingStudent) {
            return res.status(409).json({
                message: "This email is already registered."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const student = await Student.create({
            fullName,
            email,
            phone,
            passwordHash
        });

        res.status(201).json({
            message: "Student registered successfully.",
            student: {
                id: student._id,
                fullName: student.fullName,
                email: student.email,
                role: "student"
            },
            token: generateToken(student._id, "student")
        });

    } catch (error) {
        console.error("Student registration error:", error);

        res.status(500).json({
            message: "Unable to register student."
        });
    }
};

// Register a hostel owner
exports.registerOwner = async (req, res) => {
    try {
        const { fullName, email, phone, password } = req.body;

        if (!fullName || !email || !phone || !password) {
            return res.status(400).json({
                message: "Please fill in all required fields."
            });
        }

        if (password.length < 8) {
            return res.status(400).json({
                message: "Password must contain at least 8 characters."
            });
        }

        const existingOwner = await Owner.findOne({ email });

        if (existingOwner) {
            return res.status(409).json({
                message: "This email is already registered."
            });
        }

        const passwordHash = await bcrypt.hash(password, 12);

        const owner = await Owner.create({
            fullName,
            email,
            phone,
            passwordHash
        });

        res.status(201).json({
            message: "Hostel owner registered successfully.",
            owner: {
                id: owner._id,
                fullName: owner.fullName,
                email: owner.email,
                role: "owner"
            },
            token: generateToken(owner._id, "owner")
        });

    } catch (error) {
        console.error("Owner registration error:", error);

        res.status(500).json({
            message: "Unable to register owner."
        });
    }
};

// Login student or owner
exports.loginUser = async (req, res) => {
    try {
        const { email, password, role } = req.body;

        if (!email || !password || !role) {
            return res.status(400).json({
                message: "Email, password and role are required."
            });
        }

        if (!["student", "owner"].includes(role)) {
            return res.status(400).json({
                message: "Invalid user role."
            });
        }

        const Model = role === "student" ? Student : Owner;

        const user = await Model.findOne({
            email: email.toLowerCase().trim()
        });

        if (!user) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        const passwordCorrect = await bcrypt.compare(
            password,
            user.passwordHash
        );

        if (!passwordCorrect) {
            return res.status(401).json({
                message: "Invalid email or password."
            });
        }

        res.json({
            message: "Login successful.",
            user: {
                id: user._id,
                fullName: user.fullName,
                email: user.email,
                role
            },
            token: generateToken(user._id, role)
        });

    } catch (error) {
        console.error("Login error:", error);

        res.status(500).json({
            message: "Unable to login."
        });
    }
};
