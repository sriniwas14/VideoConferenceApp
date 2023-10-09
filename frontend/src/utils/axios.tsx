import axios from "axios";
const axiosInstance = axios.create({
  baseURL: "http://localhost:4000", // Set your API base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Add an interceptor to set the Authorization header
axiosInstance.interceptors.request.use(
  (config) => {
    // Get the token from localStorage
    const token = localStorage.getItem("token");

    // If a token exists, set the Authorization header
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default axiosInstance;
