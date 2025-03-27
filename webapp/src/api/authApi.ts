import axios from "axios";
import { SITE_DOMAIN } from "./apiClient";
import Cookies from "js-cookie";
import { store } from "../app/store";
import { refreshToken } from "../features/auth/authThunks";

const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  headers: { "Content-Type": "application/json" },
});


apiClient.interceptors.request.use(
  (config) => {
    const token = Cookies.get("accessToken");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        const newToken = await store.dispatch(refreshToken()).unwrap();     
        Cookies.set("accessToken", newToken);
        originalRequest.headers.Authorization = `Bearer ${newToken}`;
        return apiClient(originalRequest); // Retry failed request
      } catch (refreshError) {
        console.error("Session expired. Please log in again.");
      }
    }

    return Promise.reject(error);
  }
);

export default apiClient;