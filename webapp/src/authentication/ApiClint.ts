import axios from "axios";

export const SITE_DOMAIN = import.meta.env.VITE_API_URL;

const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  withCredentials: true, // Allow HTTP-only cookies to be sent with requests
});

export default apiClient;
