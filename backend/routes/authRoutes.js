// backend/routes/authRoutes.js
const express = require("express");
const { auth } = require("../config/firebase");
const { signup, login } = require("../controllers/authController");
const { verifyToken } = require("../middleware/authMiddleware");

const router = express.Router();

// Signup route
router.post("/signup", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.createUser({
      email,
      password,
    });
    res.status(201).json({ message: "User created successfully", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

// Login route
router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await auth.getUserByEmail(email);
    res.status(200).json({ message: "Login successful", user });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
});

router.get("/profile", verifyToken, (req, res) => {
    res.json({ message: "Profile accessed successfully", user: req.user });
  });

module.exports = router;