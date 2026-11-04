

function errorHandler(error, req, res, next) {
    console.error("API Error:", error);

    if (error.type === "entity.parse.failed") {
        return res.status(400).json({
            success: false,
            message: "Invalid JSON request"
        });
    }

    res.status(500).json({
        success: false,
        message: "Internal server error"
    });
}

module.exports = errorHandler;
