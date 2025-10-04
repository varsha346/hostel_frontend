import React, { useState } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import axiosInstance from "../utils/axiosInstance";

const ResetPassword = () => {
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  // Get token from URL query param
  const [searchParams] = useSearchParams();
  const token = searchParams.get("token");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    if (newPassword !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    try {
      const res = await axiosInstance.post("/auth/reset-password", { token, newPassword });
      setMessage(res.data.message || "Password reset successful!");
      setTimeout(() => navigate("/login"), 2000); // redirect to login
    } catch (err) {
      setError(err.response?.data?.error || "Invalid or expired token");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Reset Password</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="password"
            placeholder="New Password"
            required
            className="p-3 border rounded-lg"
            value={newPassword}
            onChange={(e) => setNewPassword(e.target.value)}
          />
          <input
            type="password"
            placeholder="Confirm Password"
            required
            className="p-3 border rounded-lg"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
          />
          <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Reset Password
          </button>
        </form>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ResetPassword;
