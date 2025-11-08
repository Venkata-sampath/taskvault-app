const express = require("express");
const dotenv = require("dotenv").config();
const connectDb = require("./config/dbConnection");
const errorHandler = require("./middleware/errorHandler");

connectDb();
const app = express();

// Middleware
app.use(express.json());

// Auth Routes
app.use("/api/auth", require("./routes/authRoutes"));

// User Routes
app.use("/api/user/task", require("./routes/userTaskRoutes"));

// Admin Routes
app.use("/api/admin", require("./routes/adminRoutes"));

// Error Handler
app.use(errorHandler);

// Start the Server
const PORT = process.env.PORT || 7002;
app.listen(PORT, () => {
    console.log(`Server is running at port ${PORT}`)
});