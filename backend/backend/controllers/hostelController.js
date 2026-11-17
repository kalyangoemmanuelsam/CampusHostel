
const Hostel = require("../models/Hostel");

// Add a new hostel
exports.createHostel = async (req, res) => {
    try {
        const {
            name,
            description,
            location,
            monthlyRent,
            facilities,
            availableRooms,
            photos
        } = req.body;

        if (
            !name ||
            !description ||
            !location ||
            monthlyRent === undefined
        ) {
            return res.status(400).json({
                message: "Please provide the hostel name, description, location and monthly rent."
            });
        }

        const rent = Number(monthlyRent);
        const rooms = Number(availableRooms ?? 0);

        if (!Number.isFinite(rent) || rent < 0 ||
            !Number.isInteger(rooms) || rooms < 0) {
            return res.status(400).json({
                message: "Rent and available rooms must be valid non-negative numbers."
            });
        }

        const hostel = await Hostel.create({
            name: name.trim(),
            ownerId: req.user.id,
            description: description.trim(),
            location: location.trim(),
            monthlyRent: rent,
            facilities: Array.isArray(facilities) ? facilities : [],
            availableRooms: rooms,
            photos: Array.isArray(photos) ? photos : [],
            status: "pending"
        });

        res.status(201).json({
            message: "Hostel submitted successfully for administrator approval.",
            hostel
        });

    } catch (error) {
        console.error("Create hostel error:", error);

        res.status(500).json({
            message: "Unable to create hostel listing."
        });
    }
};

// Get hostels belonging to the logged-in owner
exports.getMyHostels = async (req, res) => {
    try {
        const hostels = await Hostel.find({
            ownerId: req.user.id
        }).sort({ createdAt: -1 });

        res.status(200).json({
            count: hostels.length,
            hostels
        });

    } catch (error) {
        console.error("Get owner hostels error:", error);

        res.status(500).json({
            message: "Unable to retrieve your hostel listings."
        });
    }
};
