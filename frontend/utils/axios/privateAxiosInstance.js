import axios from "axios";
import { sanitizeData } from "../security/sanitize";

// Base URL for the API
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL;

// Create private Axios instance
const privateAxiosInstance = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
});

// Request interceptor: add Authorization header + sanitize + content-type handling
privateAxiosInstance.interceptors.request.use(
  (config) => {
    const token =
      typeof window !== "undefined" ? localStorage.getItem("l_ac_i") : null;

    if (token) {
      config.headers = {
        ...config.headers,
        Authorization: `Bearer ${token}`,
      };
    }

    const isMultipart =
      config.isMultipart ||                      // explicitly passed
      config.data instanceof FormData ||         // auto-detect
      config.headers?.["Content-Type"] === "multipart/form-data";

    // Sanitize and set headers only if not multipart
    if (config.data && !isMultipart) {
      config.data = sanitizeData(config.data);

      if (!config.headers["Content-Type"]) {
        config.headers["Content-Type"] = "application/json";
      }
    }

    return config;
  },
  (error) => Promise.reject(error)
);

export { privateAxiosInstance as privateAxios };