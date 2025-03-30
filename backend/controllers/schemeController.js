const { matchSchemes } = require("../services/aiService");

exports.getMatchedSchemes = async (req, res) => {
  const userData = req.body; // { medicalCondition, incomeLevel, age }

  try {
    const schemes = matchSchemes(userData);
    res.status(200).json({ schemes });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};