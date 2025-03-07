import axios from "axios";
import { SITE_DOMAIN } from "./apiClient";
import Cookies from "js-cookie";

const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  headers: { "Content-Type": "application/json" },
});

apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken"); // Fetch token from cookies
  if (token) {
    config.headers.Authorization = `Bearer ${token}`; // Attach token
  }
  return config;
});

export default apiClient;
