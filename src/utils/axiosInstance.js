import axios from "axios";
import { toast } from "react-toastify";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true,
  headers: { "Content-Type": "application/json" },
});

// Request interceptor (optional)
axiosInstance.interceptors.request.use(
  (config) => config,
  (error) => Promise.reject(error)
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      toast.error("Session expired! Please login again.", { autoClose: 3000 }); 
      setTimeout(() => {
        window.location.href = "/auth"; // redirect after showing message
      }, 3000); // matches toast autoClose
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
