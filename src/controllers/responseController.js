
const db = require("../config/db");

exports.saveResponse = async (req, res, next) => {
    try {
        const { question, answer } = req.body;

        if (
            typeof question !== "string" ||
            typeof answer !== "string" ||
            !question.trim() ||
            !answer.trim()
        ) {
            return res.status(400).json({
                success: false,
                message: "Question and answer are required."
            });
        }

        const [result] = await db.execute(
            "INSERT INTO responses (question, answer) VALUES (?, ?)",
            [question.trim(), answer.trim()]
        );

        res.status(201).json({
            success: true,
            message: "Response saved successfully!",
            id: result.insertId
        });
    } catch (error) {
        next(error);
    }
};
