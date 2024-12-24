import axios from "axios";

export const SITE_DOMAIN =  import.meta.env.VITE_API_URL;
console.log(SITE_DOMAIN)
const apiClient = axios.create({
  baseURL: SITE_DOMAIN,
  withCredentials: true, // Send cookies with requests
});

// // Axios Interceptor for Authorization Header and Token Refresh
// apiClient.interceptors.request.use((config) => {
//   const token = Cookies.get("access_token");
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // apiClient.interceptors.response.use(
// //   (response) => response, // Pass successful responses directly
// //   async (error) => {
// //     if (error.response?.status === 401) {
// //       try {
// //         // Attempt to refresh the token
// //         const refreshResponse = await refreshToken()

// //         const newAccessToken = refreshResponse.data.access_token;
// //         console.log('new refresh token:',newAccessToken)

// //         Cookies.set("access_token", newAccessToken, { secure: true });
// //         localStorage.setItem('authenticated','true')
// //         // Update the access token cookie

// //         // Retry the original request with the new token
// //         error.config.headers.Authorization = `Bearer ${newAccessToken}`;
// //         return apiClient.request(error.config);
// //       } catch (refreshError) {
// //         console.error("Token refresh failed:", refreshError);
// //         useAuth().logout(); // Logout the user on token refresh failure
// //       }
// //     }
// //     return Promise.reject(error); // Reject if not handled
// //   }
// // );

export default apiClient;
