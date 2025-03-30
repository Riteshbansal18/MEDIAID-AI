const express = require("express");
const { getMatchedSchemes } = require("../controllers/schemeController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.post("/match", verifyToken, getMatchedSchemes);

module.exports = router;