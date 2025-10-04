import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";

const ForgotPassword = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage("");
    setError("");

    try {
      const res = await axiosInstance.post("/auth/forgot-password", {
      email: email.trim().toLowerCase() // trim spaces & lowercase
    });
      setMessage(res.data.message || "Reset link sent. Check your email.");
    } catch (err) {
      setError(err.response?.data?.error || "Something went wrong!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        <h2 className="text-2xl font-bold mb-4">Forgot Password</h2>
        <form className="flex flex-col gap-4" onSubmit={handleSubmit}>
          <input
            type="email"
            placeholder="Enter your email"
            required
            className="p-3 border rounded-lg"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
            Send Reset Link
          </button>
        </form>
        {message && <p className="text-green-600 mt-2">{message}</p>}
        {error && <p className="text-red-600 mt-2">{error}</p>}
      </div>
    </div>
  );
};

export default ForgotPassword;
