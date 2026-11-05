
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");

const contentRoutes = require("../routes/contentRoutes");
const responseRoutes = require("../routes/responseRoutes");

const errorHandler = require("../middleware/errorHandler");

const app = express();

// MIDDLEWARE
app.use(helmet());

app.use(
    cors({
        origin: process.env.CLIENT_URL || "http://localhost:5173",
        methods: ["GET", "POST"],
        allowedHeaders: ["Content-Type"]
    })
);

app.use(express.json({ limit: "10kb" }));

// HOME
app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Angry Bird Friendship API Running"
    });
});

// HEALTH CHECK
app.get("/api/health", (req, res) => {
    res.json({
        success: true,
        status: "Online",
        uptime: process.uptime()
    });
});

// API ROUTES
app.use("/api/content", contentRoutes);

app.use("/api/responses", responseRoutes);

// ERROR HANDLER
app.use(errorHandler);

// 404
app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "Route not found"
    });
});

module.exports = app;
