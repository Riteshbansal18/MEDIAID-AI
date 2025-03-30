// backend/server.js
const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const schemeRoutes = require("./routes/schemeRoutes");
const hospitalRoutes = require("./routes/hospitalRoutes");
const documentRoutes = require("./routes/documentRoutes");

// Load environment variables
dotenv.config();

// Initialize Express app
const app = express();
const authRoutes = require("./routes/authRoutes");
// Middleware
app.use(cors()); // Enable CORS
app.use(express.json()); // Parse JSON request bodies'
app.use("/api/schemes", schemeRoutes);
app.use("/api/documents", documentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/hospitals", hospitalRoutes);
app.get("/", (req, res) => {
  res.send("MediAid-AI Backend is running!");
});

// Start the server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
}); 