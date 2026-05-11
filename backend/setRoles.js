const mongoose = require("mongoose");
const User = require("./models/User");

mongoose.connect("mongodb+srv://dhamalepranita07_db_user:pranita2003@cluster0.urtisij.mongodb.net/myDB?appName=Cluster0");

async function updateRole() {
    try {
        const result = await User.findOneAndUpdate(
            { email: "b1@gmail.com" },
            { role: "Admin" },
            { returnDocument: "after" }
        );

        console.log("UPDATED USER:", result);
        process.exit();
    } catch (error) {
        console.log(error);
    }
}

updateRole();