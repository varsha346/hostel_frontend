import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",  // backend URL
  withCredentials: true,             // 🔑 ensures cookies are sent
  headers: {
    "Content-Type": "application/json",
  },
});

// ✅ Response Interceptor: handle expired/invalid token
axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      // token expired or not valid anymore
      window.location.href = "/auth"; 
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
