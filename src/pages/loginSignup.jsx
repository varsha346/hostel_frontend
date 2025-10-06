import React, { useState } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link } from "react-router-dom";
import Cookies from "js-cookie";
// We don't need jwtDecode anymore since we'll mock the decoded data
// import { jwtDecode } from "jwt-decode"; 
import { toast } from "react-toastify"; // Added toast import for feedback

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  // Removed signupData state since signup is mocked out
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  // --- MOCK LOGIN FUNCTION ---
  const handleLogin = async (e) => {
    e.preventDefault();
    setLoginError("");
    setLoading(true);

    // Simulate network delay
    await new Promise(resolve => setTimeout(resolve, 800));

    // 1. CHECK MOCK CREDENTIALS
    const email = loginData.email.toLowerCase();
    let userType = null;
    let dashboardPath = null;
    const MOCK_TOKEN = "MOCKED_JWT_TOKEN_FOR_FRONTEND_TESTING"; // Dummy token value

    if (email === "warden@test.com") {
      userType = "Warden";
      dashboardPath = "/warden-dashboard";
    } else if (email === "student@test.com") {
      userType = "Student";
      dashboardPath = "/student-dashboard";
    } else {
      // Simulate login failure for all other attempts
      setLoginError("Mock Login Failed: Use 'warden@test.com' or 'student@test.com' to bypass authentication.");
      setLoading(false);
      return;
    }

    // 2. SIMULATE SUCCESSFUL LOGIN
    try {
      console.log(`MOCK LOGIN SUCCESSFUL: Logging in as ${userType}`);
      
      // Manually set the cookie/token as the backend normally would
      // In a real scenario, the token would be decoded to get the userType.
      // Here, we manually determine userType and set a dummy token.
      Cookies.set("token", MOCK_TOKEN, { expires: 7 }); 

      toast.success(`Mock Login Success! Redirecting to ${userType} Dashboard.`, { autoClose: 2000 });

      // 3. NAVIGATE
      setTimeout(() => {
        navigate(dashboardPath);
      }, 100); // Quick navigation after mock success
    
    } catch (error) {
      // Should not happen with mock logic, but good practice
      console.error("Mock logic error:", error);
      setLoginError("An unexpected error occurred during mock login.");
    } finally {
      setLoading(false);
    }
  };

  // --- MOCK SIGNUP FUNCTION ---
  const handleSignup = async (e) => {
    e.preventDefault();
    console.log("SIGNUP MOCKED: Backend is down. Cannot register new users.");
    toast.error("Signup is disabled because the backend connection is currently broken.", { autoClose: 4000 });
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
            <div className="p-3 bg-yellow-100 border border-yellow-300 rounded-lg text-sm mb-2">
              **MOCK MODE ACTIVE:** Use `warden@test.com` or `student@test.com`
            </div>
            <input
              type="email"
              placeholder="Email"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setLoginData({ ...loginData, email: e.target.value })}
            />
            <input
              type="password"
              placeholder="Password (Any value)"
              required
              className="p-3 border rounded-lg"
              onChange={(e) => setLoginData({ ...loginData, password: e.target.value })}
            />

            {loading && <p className="text-blue-600">Logging in (Mocking)...</p>}
            {loginError && <p className="text-red-600">{loginError}</p>}

            <button type="submit" className="p-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
              Login
            </button>
            <Link to="/forgot-password" className="text-blue-700 text-sm mt-2">
              Forgot Password?
            </Link>
          </form>
        ) : (
          // ------------------ SIGNUP FORM (Disabled) ------------------
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <div className="p-3 bg-red-100 border border-red-300 rounded-lg text-sm mb-2 text-center font-bold">
              SIGNUP DISABLED: Backend is required for registration.
            </div>
            <input type="text" placeholder="Name" className="p-3 border rounded-lg bg-gray-50" disabled />
            <input type="email" placeholder="Email" className="p-3 border rounded-lg bg-gray-50" disabled />
            <input type="password" placeholder="Password" className="p-3 border rounded-lg bg-gray-50" disabled />
            <select className="p-3 border rounded-lg bg-gray-50" disabled>
              <option value="">Select Usertype</option>
            </select>

            <button type="submit" className="p-3 bg-gray-400 text-white rounded-lg cursor-not-allowed" disabled>
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default LoginSignup;
