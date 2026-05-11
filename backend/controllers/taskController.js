const Task = require("../models/Task");

const getHome = (req, res) => {
    res.json({
        message: "Welcome to Student Portal Backend"
    });
};

// GET all tasks
const getTasks = async (req, res,next) => {
    try {
        const { status, search, sort } = req.query;

        let query = {
            userId: req.user.userId
        };

        // filter by status
        if (status) {
            query.status = status;
        }

        // search by title
        if (search) {
            query.title = {
                $regex: search,
                $options: "i"
            };
        }

        let tasksQuery = Task.find(query);

        // sort by date
        if (sort === "latest") {
            tasksQuery = tasksQuery.sort({ createdAt: -1 });
        } else if (sort === "oldest") {
            tasksQuery = tasksQuery.sort({ createdAt: 1 });
        }

        const tasks = await tasksQuery;

        res.json(tasks);

    } catch (error) {
       next(error);
    }
};
// POST create task
const createTask = async (req, res,next) => {
    try {
        const newTask = new Task({
            ...req.body,
            userId: req.user.userId
        });

        const savedTask = await newTask.save();
        res.status(201).json(savedTask);

    } catch (error) {
       next(error);
    }
};
const updateTask = async (req, res,next) => {
    try {
        const updatedTask = await Task.findByIdAndUpdate(
            req.params.id,
            req.body,
            { returnDocument: "after" }
        );

        if (!updatedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json(updatedTask);
    } catch (error) {
       next(error);
    }
};
const deleteTask = async (req, res,next) => {
    try {
        const deletedTask = await Task.findByIdAndDelete(req.params.id);

        if (!deletedTask) {
            return res.status(404).json({ message: "Task not found" });
        }

        res.json({ message: "Task deleted successfully" });
    } catch (error) {
        next(error);
    }
};

module.exports = {
    getHome,
    getTasks,
    createTask,
    updateTask,
    deleteTask
};