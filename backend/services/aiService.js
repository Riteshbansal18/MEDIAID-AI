// Simulated AI-based scheme matching logic
exports.matchSchemes = (userData) => {
    const { medicalCondition, incomeLevel, age } = userData;
  
    // Example logic
    const schemes = [
      { name: "Ayushman Bharat", eligibility: "Major treatments", income: "Below 5 LPA" },
      { name: "EWS Scheme", eligibility: "Economically Weaker Sections", income: "Below 3 LPA" },
      { name: "Senior Citizen Health Plan", eligibility: "Age > 60", income: "Any" },
    ];
  
    const matchedSchemes = schemes.filter((scheme) => {
      if (medicalCondition === "Major treatments" && incomeLevel === "Below 5 LPA") {
        return true;
      }
      if (incomeLevel === "Below 3 LPA") {
        return true;
      }
      if (age > 60) {
        return true;
      }
      return false;
    });
  
    return matchedSchemes;
  };