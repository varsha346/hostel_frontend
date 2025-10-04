import React from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";
import axiosInstance from "../utils/axiosInstance";

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStarted = async () => {
    const token = Cookies.get("token");

    if (token) {
      try {
        // Validate token with backend
        await axiosInstance.get("/auth/check");

        const decoded = jwtDecode(token);
        if (decoded.userType === "Warden") navigate("/warden-dashboard");
        else if (decoded.userType === "Student") navigate("/student-dashboard");
      } catch (err) {
        // Token invalid or expired, go to login
        navigate("/auth");
      }
    } else {
      // No token, go to login
      navigate("/auth");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-blue-100">
      <div className="text-center">
        <h1 className="text-3xl font-bold mb-6">Welcome to Hostel Portal</h1>
        <p className="text-gray-700 mb-6">Get started by logging in</p>
        <button
          onClick={handleGetStarted}
          className="bg-blue-600 text-white px-6 py-2 rounded-lg"
        >
          Get Started
        </button>
      </div>
    </div>
  );
};

export default LandingPage;
