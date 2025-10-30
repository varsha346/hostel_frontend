import React, { useState , useEffect } from "react";
import axiosInstance from "../utils/axiosInstance";
import { useNavigate, Link ,useLocation} from "react-router-dom";
import Cookies from "js-cookie";
import { jwtDecode } from "jwt-decode";

const LoginSignup = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [loginData, setLoginData] = useState({ email: "", password: "" });
  const [signupData, setSignupData] = useState({ name: "", email: "", password: "", userType: "" });
  const [loginError, setLoginError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

 useEffect(() => {

  if (document.referrer.includes("/landing")) return;
  const checkSession = async () => {
    try {
      const res = await axiosInstance.get("/auth/check");
      if(res.data.message === "valid session") {
        if(res.data.userType === "Warden") navigate("/warden-dashboard");
        else if(res.data.userType === "Student") navigate("/student-dashboard");
      }
    } catch(err) {
      console.log("Token invalid or expired", err);
    }
  };

  checkSession();

}, []);

  
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
  <div
    className="flex items-center justify-center min-h-screen"
    style={{
      background: 'linear-gradient(to right, #0b0c59 50%, #ffffff 50%)',
    }}
  >
    {/* Outer rectangular card */}
    <div className="flex w-[900px] h-[550px] rounded-2xl overflow-hidden shadow-2xl bg-white">
      
      {/* LEFT SECTION */}
      <div className="w-1/2 bg-[#0b0c59] flex flex-col justify-center items-center text-white relative">
        <div className="text-center px-6">
          <h1 className="text-4xl font-semibold mb-2">DormLink</h1>
          <p className="text-2xl font-bold">
          <span className="text-[#a7b3ff]">Welcome to your DormLink!  glad to have you here</span>
          </p>
        </div>
        {/* subtle circle designs */}
        <div className="absolute w-24 h-24 rounded-full border border-[#4b4d8a] top-10 left-10 opacity-40"></div>
        <div className="absolute w-16 h-16 rounded-full border border-[#4b4d8a] bottom-10 right-10 opacity-40"></div>
      </div>

      {/* RIGHT SECTION */}
      <div className="w-1/2 flex flex-col justify-center px-10 py-8 bg-white">
        <h2 className="text-3xl font-semibold text-[#0b0c59] mb-6 text-center">
          {isLogin ? "Login" : "Sign Up"}
        </h2>

        {/* Toggle Buttons */}
        <div className="flex justify-between mb-6 bg-gray-100 rounded-lg overflow-hidden">
          <button
            className={`w-1/2 py-2 font-semibold transition-all duration-300 ${
              isLogin ? "bg-[#0b0c59] text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setIsLogin(true)}
          >
            Login
          </button>
          <button
            className={`w-1/2 py-2 font-semibold transition-all duration-300 ${
              !isLogin ? "bg-[#0b0c59] text-white" : "text-gray-600 hover:bg-gray-200"
            }`}
            onClick={() => setIsLogin(false)}
          >
            Sign Up
          </button>
        </div>

        {/* LOGIN FORM */}
        {isLogin ? (
          <form className="flex flex-col gap-4" onSubmit={handleLogin}>
            <input
              type="email"
              placeholder="Email"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b0c59]"
              onChange={(e) =>
                setLoginData({ ...loginData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b0c59]"
              onChange={(e) =>
                setLoginData({ ...loginData, password: e.target.value })
              }
            />

            {loading && (
              <p className="text-[#0b0c59] text-center">Logging in...</p>
            )}
            {loginError && (
              <p className="text-red-600 text-center">{loginError}</p>
            )}

            <button
              type="submit"
              className="p-3 bg-[#0b0c59] text-white rounded-lg hover:bg-[#10127a] transition-all duration-300 font-semibold"
            >
              Login
            </button>
            <button
            onClick={() => {
              window.location.href = "http://localhost:8080/oauth2/authorization/google";
            }}
          >
            Login with Google
          </button>
            <Link
              to="/forgot-password"
              className="text-[#0b0c59] text-sm mt-2 text-center hover:underline"
            >
              Forgot Password?
            </Link>
          </form>
        ) : (
          // SIGNUP FORM
          <form className="flex flex-col gap-4" onSubmit={handleSignup}>
            <input
              type="text"
              placeholder="Name"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b0c59]"
              onChange={(e) =>
                setSignupData({ ...signupData, name: e.target.value })
              }
            />
            <input
              type="email"
              placeholder="Email"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b0c59]"
              onChange={(e) =>
                setSignupData({ ...signupData, email: e.target.value })
              }
            />
            <input
              type="password"
              placeholder="Password"
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b0c59]"
              onChange={(e) =>
                setSignupData({ ...signupData, password: e.target.value })
              }
            />
            <select
              required
              className="p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-[#0b0c59]"
              onChange={(e) =>
                setSignupData({ ...signupData, userType: e.target.value })
              }
            >
              <option value="">Select Usertype</option>
              <option value="Student">Student</option>
              <option value="Warden">Warden</option>
            </select>

            <button
              type="submit"
              className="p-3 bg-[#0b0c59] text-white rounded-lg hover:bg-[#10127a] transition-all duration-300 font-semibold"
            >
              Sign Up
            </button>
          </form>
        )}
      </div>
    </div>
  </div>
);

}
export default LoginSignup;