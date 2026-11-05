
require("dotenv").config();

const app = require("./app");
const db = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        await db.query("SELECT 1");

        console.log("MySQL connected successfully");

        app.listen(PORT, "0.0.0.0", () => {
            console.log(`Server running on port ${PORT}`);
        });
    } catch (error) {
        console.error("Database connection failed:", error.message);
        process.exit(1);
    }
}

startServer();
