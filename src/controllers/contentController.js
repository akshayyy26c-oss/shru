
const db = require("../config/db");

exports.getContent = async (req, res, next) => {
    try {
        const [rows] = await db.query(
            "SELECT * FROM content ORDER BY id ASC"
        );

        res.status(200).json({
            success: true,
            count: rows.length,
            data: rows
        });
    } catch (error) {
        next(error);
    }
};
