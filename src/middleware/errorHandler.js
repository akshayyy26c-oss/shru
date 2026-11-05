
function errorHandler(err, req, res, next) {
    console.error("Backend Error:", err);

    res.status(err.status || 500).json({
        success: false,
        message: "Internal server error"
    });
}

module.exports = errorHandler;
