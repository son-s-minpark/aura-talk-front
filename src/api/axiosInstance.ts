import axios, { InternalAxiosRequestConfig } from "axios";
import { apiRoute } from "./apiRoute";

const axiosInstance = axios.create({
  baseURL: apiRoute.BASE,
  timeout: 100000,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use(
  (config: InternalAxiosRequestConfig) => {
    const accessToken = localStorage.getItem("accessToken");

    if (accessToken) {
      if (!config.headers["Authorization"]) {
        config.headers["Authorization"] = `Bearer ${accessToken}`;
      }
    } else {
      console.error("인터셉트 에러러");
    }
    console.error(config);

    return config;
  },
  (err) => {
    alert("인터셉트 에러");
    console.error(err);
    return Promise.reject(err);
  }
);

export default axiosInstance;
