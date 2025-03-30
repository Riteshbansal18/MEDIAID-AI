const Tesseract = require("tesseract.js");

exports.extractTextFromImage = async (imagePath) => {
  try {
    const { data } = await Tesseract.recognize(imagePath, "eng");
    return data.text;
  } catch (error) {
    throw new Error("Failed to extract text from image.");
  }
};