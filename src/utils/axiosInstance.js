import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // <-- backend port
  headers: {
    "Content-Type": "application/json",
  },
});

export default axiosInstance;
