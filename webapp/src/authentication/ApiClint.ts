import axios from "axios";
import Cookies from "js-cookie";
import { useAuth } from "./AuthContext";

export const SITE_DOMAIN = "https://3m9yk3-8000.csb.app";

const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  withCredentials: true, // Send cookies with requests
});

// Axios Interceptor for Authorization Header and Token Refresh
apiClient.interceptors.request.use((config) => {
  const token = Cookies.get("accessToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

apiClient.interceptors.response.use(
  (response) => response, // Pass successful responses directly
  async (error) => {
    if (error.response?.status === 401) {
      try {
        // Attempt to refresh the token
        const refreshResponse = await axios.post(
          `${SITE_DOMAIN}/token/refresh/`,
          {},
          { withCredentials: true }
        );
        const newAccessToken = refreshResponse.data.accessToken;

        // Update the access token cookie
        Cookies.set("accessToken", newAccessToken, { secure: true });

        // Retry the original request with the new token
        error.config.headers.Authorization = `Bearer ${newAccessToken}`;
        return apiClient.request(error.config);
      } catch (refreshError) {
        console.error("Token refresh failed:", refreshError);
        useAuth().logout(); // Logout the user on token refresh failure
      }
    }
    return Promise.reject(error); // Reject if not handled
  }
);

export default apiClient;
