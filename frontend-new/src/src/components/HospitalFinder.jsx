// src/components/HospitalFinder.js
import React, { useState, useEffect } from "react";
import { hospitalApi } from "../services/api";
import { toast } from "react-toastify";

const HospitalFinder = () => {
  const [hospitals, setHospitals] = useState([]);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        hospitalApi
          .getNearbyHospitals(latitude, longitude)
          .then((response) => setHospitals(response.data.hospitals))
          .catch(() => toast.error("Failed to fetch hospitals."));
      },
      () => toast.error("Please enable location access.")
    );
  }, []);

  return (
    <div className="bg-white p-6 rounded-lg shadow-md">
      <h2 className="text-2xl font-semibold mb-4 text-gray-700">Nearby Hospitals</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {hospitals.map((hospital, index) => (
          <div key={index} className="bg-white p-4 rounded-lg shadow-md">
            <h3 className="text-xl font-bold text-blue-600">{hospital.display_name}</h3>
            <p className="text-gray-600">{hospital.type}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HospitalFinder;