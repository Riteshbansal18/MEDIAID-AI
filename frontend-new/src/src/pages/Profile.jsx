// frontend/src/pages/Profile.js
import React, { useEffect, useState } from "react";
import { authApi } from "../services/api";
import { toast } from "react-toastify";

const Profile = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await authApi.getProfile(token);
        setUser(response.data.user);
      } catch (error) {
        toast.error("Failed to fetch profile.");
      }
    };

    fetchUserProfile();
  }, []);

  return (
    <div className="min-h-screen bg-gray-100 p-6">
      <h1 className="text-3xl font-bold text-center mb-8 text-gray-800">Profile</h1>
      {user && (
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md mx-auto">
          <h2 className="text-2xl font-semibold text-blue-600 mb-4">{user.name}</h2>
          <p className="text-gray-700"><strong>Email:</strong> {user.email}</p>
          <p className="text-gray-700"><strong>Joined:</strong> {new Date(user.createdAt).toLocaleDateString()}</p>
        </div>
      )}
    </div>
  );
};

export default Profile;