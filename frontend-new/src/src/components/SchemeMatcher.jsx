// src/components/SchemeMatcher.js
import React, { useState } from "react";
import { schemeApi } from "../services/api";
import { toast } from "react-toastify";

const SchemeMatcher = () => {
  const [medicalCondition, setMedicalCondition] = useState("");
  const [incomeLevel, setIncomeLevel] = useState("");
  const [age, setAge] = useState("");
  const [schemes, setSchemes] = useState([]);

  const handleSchemeMatch = async (e) => {
    e.preventDefault();
    try {
      const response = await schemeApi.matchSchemes({ medicalCondition, incomeLevel, age });
      setSchemes(response.data.schemes);
      toast.success("Schemes matched successfully!");
    } catch (error) {
      toast.error("Failed to match schemes.");
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow-md mb-8">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Match Healthcare Schemes</h2>
      <form onSubmit={handleSchemeMatch}>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Medical Condition</label>
          <input
            type="text"
            value={medicalCondition}
            onChange={(e) => setMedicalCondition(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-sm font-medium text-gray-700">Income Level</label>
          <input
            type="text"
            value={incomeLevel}
            onChange={(e) => setIncomeLevel(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-6">
          <label className="block text-sm font-medium text-gray-700">Age</label>
          <input
            type="number"
            value={age}
            onChange={(e) => setAge(e.target.value)}
            className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <button
          type="submit"
          className="w-full bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
        >
          Match Schemes
        </button>
      </form>

      {/* Display Matched Schemes */}
      <div className="mt-6">
        <h3 className="text-xl font-semibold mb-4 text-gray-700">Matched Schemes</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {schemes.map((scheme, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h4 className="text-lg font-bold text-blue-600">{scheme.name}</h4>
              <p className="text-gray-600">{scheme.eligibility}</p>
              <p className="text-gray-600">{scheme.income}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SchemeMatcher;