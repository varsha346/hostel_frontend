import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:8080", // <-- make sure backend is running on 8080
  headers: {
    "Content-Type": "application/json",
  },
  withCredentials: true, // ✅ needed if you're using cookies/JWT stored in cookies
});

export default axiosInstance;
