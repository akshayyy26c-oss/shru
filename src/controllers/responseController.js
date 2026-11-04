
const { pool } = require("../config/db");

// =================================
// SAVE RESPONSE
// =================================

exports.saveResponse = async (req, res, next) => {
    try {
        const { questionId, answer } = req.body;

        const id = Number(
            String(questionId ?? "").replace(/^q/i, "")
        );

        const normalizedAnswer =
            String(answer ?? "").toLowerCase();

        // VALIDATION
        if (
            !Number.isInteger(id) ||
            id < 1 ||
            !["yes", "no"].includes(normalizedAnswer)
        ) {
            return res.status(400).json({
                success: false,
                message: "Invalid question ID or answer"
            });
        }

        // CHECK QUESTION
        const [questions] = await pool.execute(
            `SELECT id, question
             FROM questions
             WHERE id = ? AND is_active = TRUE`,
            [id]
        );

        if (questions.length === 0) {
            return res.status(404).json({
                success: false,
                message: "Question not found"
            });
        }

        // INSERT RESPONSE
        const [result] = await pool.execute(
            `INSERT INTO responses
             (question_id, answer)
             VALUES (?, ?)`,
            [id, normalizedAnswer]
        );

        // GET INSERTED RESPONSE
        const [savedResponse] = await pool.execute(
            `SELECT
                r.id,
                r.question_id AS questionId,
                q.question,
                r.answer,
                r.created_at AS createdAt
             FROM responses r
             JOIN questions q
                ON r.question_id = q.id
             WHERE r.id = ?`,
            [result.insertId]
        );

        console.log("New Friendship Response:", savedResponse[0]);

        return res.status(201).json({
            success: true,
            message: "Response saved successfully",
            data: savedResponse[0]
        });

    } catch (error) {
        next(error);
    }
};


// =================================
// GET ALL RESPONSES
// =================================

exports.getResponses = async (req, res, next) => {
    try {
        const [responses] = await pool.execute(`
            SELECT
                r.id,
                r.question_id AS questionId,
                q.question,
                r.answer,
                r.created_at AS createdAt
            FROM responses r
            INNER JOIN questions q
                ON r.question_id = q.id
            ORDER BY r.created_at DESC
        `);

        res.status(200).json({
            success: true,
            total: responses.length,
            data: responses
        });

    } catch (error) {
        next(error);
    }
};


// =================================
// RESPONSE STATISTICS
// =================================

exports.getStatistics = async (req, res, next) => {
    try {
        const [statistics] = await pool.execute(`
            SELECT
                q.id AS questionId,
                q.question,

                COUNT(r.id) AS totalResponses,

                SUM(
                    CASE WHEN r.answer = 'yes'
                    THEN 1 ELSE 0 END
                ) AS yesCount,

                SUM(
                    CASE WHEN r.answer = 'no'
                    THEN 1 ELSE 0 END
                ) AS noCount

            FROM questions q

            LEFT JOIN responses r
                ON q.id = r.question_id

            GROUP BY q.id, q.question

            ORDER BY q.id ASC
        `);

        res.status(200).json({
            success: true,
            data: statistics
        });

    } catch (error) {
        next(error);
    }
};
