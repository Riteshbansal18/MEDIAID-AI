const axios = require("axios");

exports.getNearbyHospitals = async (latitude, longitude) => {
  try {
    const response = await axios.get(
      `https://nominatim.openstreetmap.org/search?format=json&q=hospital&lat=${latitude}&lon=${longitude}&zoom=15`
    );
    return response.data;
  } catch (error) {
    throw new Error("Failed to fetch hospital data.");
  }
};