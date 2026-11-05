
const express = require("express");
const cors = require("cors");
const helmet = require("helmet");
const compression = require("compression");
const cookieParser = require("cookie-parser");
const morgan = require("morgan");
const rateLimit = require("express-rate-limit");

const contentRoutes = require("./routes/contentRoutes");
const responseRoutes = require("./routes/responseRoutes");
const errorHandler = require("./middleware/errorHandler");

const app = express();

app.use(helmet());

app.use(cors({
    origin: process.env.FRONTEND_URL || true,
    credentials: true
}));

app.use(compression());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({ extended: true }));
app.use(cookieParser());
app.use(morgan("combined"));

app.use(rateLimit({
    windowMs: 15 * 60 * 1000,
    limit: 100,
    standardHeaders: "draft-8",
    legacyHeaders: false
}));

app.get("/", (req, res) => {
    res.json({
        success: true,
        message: "Angry Bird Backend is running!"
    });
});

app.use("/api/content", contentRoutes);
app.use("/api/responses", responseRoutes);

app.use((req, res) => {
    res.status(404).json({
        success: false,
        message: "API route not found"
    });
});

app.use(errorHandler);

module.exports = app;
