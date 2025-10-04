import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", userType: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  
  // ------------------ LOGIN ------------------
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    try {
      await axiosInstance.post("/auth/login", loginData, { withCredentials: true });

      // ✅ Get token from cookie
      const token = Cookies.get("token");
      if (token) {
        const decoded = jwtDecode(token);
        const userType = decoded.userType;

        // ✅ Navigate based on userType
        if (userType === "Warden") {
          navigate("/warden-dashboard");
        } else if (userType === "Student") {
          navigate("/student-dashboard");
        } else {
          navigate("/dashboard"); // fallback
        }
      } else {
        setLoginError("No token found. Please try again.");
      }
    } catch (error) {
      const msg = error?.response?.data?.error || "Login failed. Please try again.";
      setLoginError(msg);
    } finally {
      setLoading(false);
    }
  };

  // ------------------ SIGNUP ------------------
  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/register", signupData);
      alert("Signup successful! Please login.");
      setIsLogin(true);
    } catch (error) {
      console.log("Signup Failed:", error.response?.data || error.message);
      alert(error.response?.data?.error || "Signup failed!");
    }
  };

  return (
    <div className="flex h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md p-8 bg-white rounded-xl shadow-lg">
        {/* Switch between login and signup */}
        <div className="flex justify-between mb-6">
          <button
            className={`w-1/2 py-2 font-bold ${isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-bold ${!isLogin ? "bg-blue-600 text-white" : "bg-gray-200"}`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* ------------------ LOGIN FORM ------------------ */}
        {isLogin ? (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            {loading && <p className="text-blue-600">Logging in...</p>}
            {loginError && <p className="text-red-600">{loginError}</p>}

            <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login
            </button>
            <Link to="/forgot-password" className="text-blue-700 text-sm mt-2">
              Forgot Password?
            </Link>
          </form>
        ) : (
          // ------------------ SIGNUP FORM ------------------
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setSignupData({ ...signupData, name: e.target.value })}
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setSignupData({ ...signupData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setSignupData({ ...signupData, password: e.target.value })}
            />
            <select
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setSignupData({ ...signupData, userType: e.target.value })}
            >
              <option value="">Select Usertype</option>
              <option value="Student">Student</option>
              <option value="Warden">Warden</option>
            </select>

            <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;