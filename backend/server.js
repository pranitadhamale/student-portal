
const express = require("express");
const cors = require("cors");
const app = express();
const connectDB = require("./config/db");
const taskRoutes = require("./routes/taskRoutes");
const userRoutes = require("./routes/userRoutes");
const errorHandler = require("./middleware/errorHandler");
const adminRoutes = require("./routes/adminRoutes");
connectDB();
// middleware
app.use(cors());
app.use(express.json());
app.use((req, res, next) => {
    console.log(`${req.method} ${req.url}`);
    next();
});
// routes
app.use("/tasks", taskRoutes);
app.use("/users",userRoutes);
app.use("/admin", adminRoutes);
app.use(errorHandler);

app.listen(5000, () => {
    console.log("Server running on http://localhost:5000");
});