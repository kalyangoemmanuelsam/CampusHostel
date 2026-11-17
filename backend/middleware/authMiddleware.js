
const jwt = require("jsonwebtoken");

// Verify that the user is logged in
exports.protect = (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith("Bearer ")) {
            return res.status(401).json({
                message: "Access denied. Please log in."
            });
        }

        const token = authHeader.split(" ")[1];

        if (!process.env.JWT_SECRET) {
            console.error("JWT_SECRET is missing from environment settings.");

            return res.status(500).json({
                message: "Server authentication configuration error."
            });
        }

        const decoded = jwt.verify(
            token,
            process.env.JWT_SECRET
        );

        req.user = {
            id: decoded.id,
            role: decoded.role
        };

        next();

    } catch (error) {
        return res.status(401).json({
            message: "Invalid or expired authentication token."
        });
    }
};

// Restrict access to hostel owners
exports.ownerOnly = (req, res, next) => {
    if (!req.user || req.user.role !== "owner") {
        return res.status(403).json({
            message: "Access denied. Hostel owner account required."
        });
    }

    next();
};
