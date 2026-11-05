
const express = require("express");
const router = express.Router();

const {
    saveResponse
} = require("../controllers/responseController");

router.post("/", saveResponse);

module.exports = router;
