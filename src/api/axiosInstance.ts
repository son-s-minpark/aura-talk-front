import axios, { InternalAxiosRequestConfig, AxiosError } from "axios";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/",
  timeout: 100000,
  headers: {
    "content-type": "application/json",
    accept: "application/json",
  },
});

// 요청 인터셉터
axiosInstance.interceptors.request.use((config: InternalAxiosRequestConfig) => {
  const accessToken = sessionStorage.getItem("authorization");

  if (accessToken) {
    config.headers["Authorization"] = `Bearer ${accessToken}`;
  }

  return config;
});

// 응답 인터셉터
axiosInstance.interceptors.response.use(
  (response) => response,
  async (error: AxiosError) => {
    if (!error.config) return Promise.reject(error);

    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // accessToken이 만료되었고, 재시도 요청이 아닌 경우
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const refreshToken = sessionStorage.getItem("refreshToken");

        if (!refreshToken) {
          console.error("No refresh token available.");
          return Promise.reject(error);
        }

        const { data } = await axios.post(
          "http://localhost:3000/auth/refresh",
          {
            refreshToken,
          }
        );

        sessionStorage.setItem("authorization", data.accessToken);

        originalRequest.headers["Authorization"] = `Bearer ${data.accessToken}`;
        return axiosInstance(originalRequest);
      } catch (refreshError) {
        console.error("Failed to refresh token:", refreshError);
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  }
);

export default axiosInstance;
