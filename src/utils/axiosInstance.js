import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080",
  withCredentials: true, // must match backend allowCredentials
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
