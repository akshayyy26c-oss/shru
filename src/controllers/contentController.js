
const { pool } = require("../config/db");

// GET ALL QUESTIONS AND JOKES
exports.getContent = async (req, res, next) => {
    try {
        const [questions] = await pool.execute(`
            SELECT
                id,
                question,
                yes_response AS yesResponse,
                no_response AS noResponse
            FROM questions
            WHERE is_active = TRUE
            ORDER BY id ASC
        `);

        const [jokes] = await pool.execute(`
            SELECT
                id,
                joke
            FROM jokes
            WHERE is_active = TRUE
            ORDER BY id ASC
        `);

        res.status(200).json({
            success: true,

            data: {
                title: "Hey, Angry Bird!",

                subtitle:
                    "I have an extremely serious matter to discuss. It involves friendship, one bus journey, and your very talented anger management skills.",

                questions,
                jokes,

                successMessage: {
                    title: "Mission Successful!",
                    subtitle:
                        "The fight is cancelled. Friendship subscription renewed permanently.",
                    footer:
                        "Tomorrow, same bus stop, same friendship?"
                }
            }
        });

    } catch (error) {
        next(error);
    }
};
