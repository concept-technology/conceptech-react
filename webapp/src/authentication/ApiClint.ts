import axios from "axios";
import Cookies from "js-cookie";
export const SITE_DOMAIN = 'http://localhost:8000'
export const RECAPTCHA_SITE_KEY  = import.meta.env.VITE_RECAPTCHA_SITE_KEY


export const token = Cookies.get('access')
const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  withCredentials: true, // Allow HTTP-only cookies to be sent with requests
});

export default apiClient;
