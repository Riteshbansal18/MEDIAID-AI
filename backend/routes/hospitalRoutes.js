const express = require("express");
const { getHospitals } = require("../controllers/hospitalController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.get("/nearby", verifyToken, getHospitals);

module.exports = router;