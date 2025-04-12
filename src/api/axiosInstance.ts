import axios from "axios";
import { apiRoute } from "./apiRoute";

const axiosInstance = axios.create({
  baseURL: apiRoute.BASE,
  timeout: 100000,
  headers: {
    "Content-type": "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    if (accessToken) {
      config.headers.Authorization = `Bearer ${accessToken}`;
      console.error(config.headers);
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);
export default axiosInstance;
