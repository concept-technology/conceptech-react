import axios from "axios";
import Cookies from "js-cookie";
// export const SITE_DOMAIN = import.meta.env.VITE_API_URL;
export const SITE_DOMAIN = 'https://api.conceptsoftwares.com'
export const token = Cookies.get('accessToken')
// export const SITE_DOMAIN = "https://api.conceptsoftwares.com"
const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  withCredentials: true, // Allow HTTP-only cookies to be sent with requests
});

export default apiClient;
