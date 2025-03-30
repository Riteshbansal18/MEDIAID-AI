import React from "react";
import { Link, useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    navigate("/login");
  };

  return (
    <nav className="bg-blue-600 p-4 text-white">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-xl font-bold">
          MediAid-AI
        </Link>
        <div className="flex space-x-4">
          <Link to="/dashboard" className="hover:text-gray-200">
            Dashboard
          </Link>
          <Link to="/profile" className="hover:text-gray-200">
            Profile
          </Link>
          <button onClick={handleLogout} className="hover:text-gray-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;