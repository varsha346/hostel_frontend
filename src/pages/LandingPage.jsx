import React from "react";
import { useNavigate } from "react-router-dom";

const LandingPage = () => {
  const navigate = useNavigate();

  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Hostel Portal</h1>
        <p className="text-gray-700 mb-6">Manage rooms, notices, and leave applications easily.</p>
        <button
          onClick={() => navigate("/auth")}
          className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
