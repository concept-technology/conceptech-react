import axios from "axios";

const SITE_DOMAIN = "https://api.conceptsoftwares.com"
const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  withCredentials: true, // Allow HTTP-only cookies to be sent with requests
});

export default apiClient;
