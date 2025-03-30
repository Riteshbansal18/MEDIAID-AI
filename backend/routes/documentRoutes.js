const express = require("express");
const { uploadDocument, processDocument } = require("../controllers/documentController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Protected route
router.post("/upload", verifyToken, uploadDocument, processDocument);

module.exports = router;