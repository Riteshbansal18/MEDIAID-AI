const { extractTextFromImage } = require("../services/ocrService");
const multer = require("multer");

// Set up Multer for file uploads
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + "-" + file.originalname);
  },
});

const upload = multer({ storage });

exports.uploadDocument = upload.single("document");

exports.processDocument = async (req, res) => {
  const filePath = req.file.path;

  try {
    const extractedText = await extractTextFromImage(filePath);
    res.status(200).json({ text: extractedText });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};