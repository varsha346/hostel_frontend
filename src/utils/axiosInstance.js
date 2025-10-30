import axios from "axios";
import { toast } from "react-toastify";
import { useLocation } from "react-router-dom";


const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});


const location = window.location.pathname; // gets current frontend route

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    const url = error.config?.url;

    // Only show session expired if user is NOT on /auth frontend page
    if (
      error.response &&
      error.response.status === 401 &&
      location !== "/auth" // frontend route check
    ) {
      toast.error("Session expired! Please login again.", { autoClose: 3000 });
      setTimeout(() => {
        window.location.href = "/auth"; // redirect after showing message
      }, 3000);
    }

    return Promise.reject(error);
  }
);
export default axiosInstance;
