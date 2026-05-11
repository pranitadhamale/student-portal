const mongoose = require("mongoose");

const taskSchema = new mongoose.Schema({
    title: String,
    description: String,
    status: String,
    userId: {
        type: String,
        required: true
    }
}, { timestamps: true });

module.exports = mongoose.model("Task", taskSchema);