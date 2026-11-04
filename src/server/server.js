
require("dotenv").config();

const app = require("./app");
const { connectDB, pool } = require("./config/db");

const PORT = process.env.PORT || 5000;

async function startServer() {
    try {
        // CONNECT MYSQL
        await connectDB();

        // START EXPRESS
        const server = app.listen(PORT, () => {
            console.log("----------------------------------");
            console.log("ANGRY BIRD FRIENDSHIP SERVER");
            console.log("----------------------------------");
            console.log(`Server: http://localhost:${PORT}`);
            console.log(`Environment: ${process.env.NODE_ENV}`);
            console.log("----------------------------------");
        });

        // GRACEFUL SHUTDOWN
        const shutdown = () => {
            console.log("Shutting down server...");

            server.close(async () => {
                await pool.end();
                process.exit(0);
            });
        };

        process.on("SIGINT", shutdown);
        process.on("SIGTERM", shutdown);

    } catch (error) {
        console.error("Server startup failed:", error.message);
        process.exit(1);
    }
}

startServer();
