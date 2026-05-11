const express = require("express");
const router = express.Router();
const authMiddleware = require("../middleware/authMiddleware");
const Task = require("../models/Task");

const {
    createTask,
    updateTask,
    deleteTask
} = require("../controllers/taskController");

// GET TASKS (ROLE BASED)
router.get("/", authMiddleware, async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 5;
        const skip = (page - 1) * limit;

        // ROLE BASED QUERY
        let query = {};

        if (req.user.role === "User") {
            query.userId = req.user.userId;
        }

        const totalTasks = await Task.countDocuments(query);

        const completedCount = await Task.countDocuments({
            ...query,
            status: "Completed"
        });

        const pendingCount = await Task.countDocuments({
            ...query,
            status: "Pending"
        });

        const tasks = await Task.find(query)
              .skip(skip)
              .limit(limit)
              .sort({ createdAt: -1 })
              .lean();

        res.json({
            currentPage: page,
            totalPages: Math.ceil(totalTasks / limit),
            totalTasks,
            completedCount,
            pendingCount,
            tasks
        });

    } catch (err) {
        res.status(500).json({ message: err.message });
    }
});

router.post("/", authMiddleware, createTask);
router.put("/:id", authMiddleware, updateTask);
router.delete("/:id", authMiddleware, deleteTask);

module.exports = router;