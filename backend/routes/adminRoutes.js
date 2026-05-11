const express = require("express");
const router = express.Router();
const User = require("../models/User");
const Task = require("../models/Task");
const authMiddleware = require("../middleware/authMiddleware");

router.get("/dashboard", authMiddleware, async (req, res) => {
    try {
        const totalUsers = await User.countDocuments();
        const totalTasks = await Task.countDocuments();
        const completedTasks = await Task.countDocuments({
            status: "Completed"
        });
        const pendingTasks = await Task.countDocuments({
            status: "Pending"
        });

        res.json({
            totalUsers,
            totalTasks,
            completedTasks,
            pendingTasks
        });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
});

module.exports = router;