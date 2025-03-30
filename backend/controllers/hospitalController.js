const { getNearbyHospitals } = require("../services/hospitalService");

exports.getHospitals = async (req, res) => {
  const { latitude, longitude } = req.query;

  try {
    const hospitals = await getNearbyHospitals(latitude, longitude);
    res.status(200).json({ hospitals });
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};