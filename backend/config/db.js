const mongoose = require("mongoose");

const connectDB = async () => {
    try {
        await mongoose.connect("mongodb+srv://dhamalepranita07_db_user:pranita2003@cluster0.urtisij.mongodb.net/myDB?retryWrites=true&w=majority");
        console.log("MongoDB Connected ✅");
    } catch (error) {
        console.log("MongoDB Connection Error ❌", error.message);
        process.exit(1);
    }
};

module.exports = connectDB;