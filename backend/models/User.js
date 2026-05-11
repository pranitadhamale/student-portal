const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },

    email: {
        type: String,
        required: true,
        unique: true
    },

    password: {
        type: String,
        required: true
    },

    createdAt: {
        type: Date,
        default: Date.now
    },

    role: {
        type: String,
        enum: ["Admin", "User"],
        default: "User"
    }

});

module.exports = mongoose.model("User", userSchema);