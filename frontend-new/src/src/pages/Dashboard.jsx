import React, { useState, useEffect } from "react";
import { schemeApi, documentApi, hospitalApi } from "../services/api";
import { toast } from "react-toastify";

const Dashboard = () => {
  const [schemes, setSchemes] = useState([]);
  const [hospitals, setHospitals] = useState([]);
  const [file, setFile] = useState(null);
  const [extractedText, setExtractedText] = useState("");
  const [loadingSchemes, setLoadingSchemes] = useState(true);
  const [loadingHospitals, setLoadingHospitals] = useState(true);

  useEffect(() => {
    // Fetch Matched Schemes
    schemeApi
      .matchSchemes({ medicalCondition: "Major treatments", incomeLevel: "Below 5 LPA", age: 30 })
      .then((response) => {
        setSchemes(response.data.schemes);
      })
      .catch(() => toast.error("Failed to fetch schemes."))
      .finally(() => setLoadingSchemes(false));

    // Fetch Nearby Hospitals
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        hospitalApi
          .getNearbyHospitals(latitude, longitude)
          .then((response) => setHospitals(response.data.hospitals))
          .catch(() => toast.error("Failed to fetch hospitals."))
          .finally(() => setLoadingHospitals(false));
      },
      () => {
        toast.error("Please enable location access.");
        setLoadingHospitals(false);
      }
    );
  }, []);

  const handleFileUpload = async () => {
    if (!file) {
      toast.error("Please select a file.");
      return;
    }

    try {
      const response = await documentApi.uploadDocument(file);
      setExtractedText(response.data.text);
      toast.success("Document processed successfully!");
    } catch (error) {
      toast.error("Failed to process document.");
    }
  };

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Dashboard</h1>

      {/* Matched Schemes Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Matched Schemes</h2>
        {loadingSchemes ? (
          <p className="text-gray-600">Loading schemes...</p>
        ) : schemes.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {schemes.map((scheme, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-600">{scheme.name}</h3>
                <p className="text-gray-600">{scheme.eligibility}</p>
                <p className="text-gray-600">{scheme.income}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No schemes found.</p>
        )}
      </div>

      {/* Nearby Hospitals Section */}
      <div className="mb-8">
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Nearby Hospitals</h2>
        {loadingHospitals ? (
          <p className="text-gray-600">Fetching nearby hospitals...</p>
        ) : hospitals.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {hospitals.map((hospital, index) => (
              <div key={index} className="bg-white p-4 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-blue-600">{hospital.display_name}</h3>
                <p className="text-gray-600">{hospital.type}</p>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-600">No hospitals found nearby.</p>
        )}
      </div>

      {/* Document Upload Section */}
      <div>
        <h2 className="text-2xl font-semibold mb-4 text-gray-700">Upload Document</h2>
        <div className="bg-white p-6 rounded-lg shadow-md">
          <input type="file" onChange={(e) => setFile(e.target.files[0])} className="mb-4" />
          <button
            onClick={handleFileUpload}
            className="bg-blue-600 text-white p-2 rounded-lg hover:bg-blue-700 transition duration-300"
          >
            Upload and Process
          </button>
          {extractedText && (
            <div className="mt-4 p-4 bg-gray-50 rounded-lg">
              <h3 className="text-lg font-semibold text-gray-700">Extracted Text:</h3>
              <p className="text-gray-600">{extractedText}</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
