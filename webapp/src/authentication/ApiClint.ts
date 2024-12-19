import axios from 'axios';
import refreshToken from './refreshToken';

export const SITE_DOMAIN = 'https://tmsx99-8000.csb.app/'

// const apiClient = axios.create({
//   baseURL: SITE_DOMAIN, // Base API URL
// });

// // Request Interceptor (optional, for adding Authorization header)
// apiClient.interceptors.request.use((config) => {
//   const token = localStorage.getItem('accessToken');
//   if (token) {
//     config.headers.Authorization = `Bearer ${token}`;
//   }
//   return config;
// });

// // Response Interceptor (to handle token expiration)
// apiClient.interceptors.response.use(
//   (response) => response, // Pass through if successful
//   async (error) => {
//     const originalRequest = error.config;
//     if (error.response?.status === 401 && !originalRequest._retry) {
//       originalRequest._retry = true; // Prevent infinite loops
//       try {
//         const newAccessToken = await refreshToken();
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;
//         return apiClient(originalRequest); // Retry the original request
//       } catch (refreshError) {
//         console.error("Refresh token failed:", refreshError);
//         return Promise.reject(refreshError); // Reject if refresh fails
//       }
//     }
//     return Promise.reject(error);
//   }
// );


const apiClient = axios.create({
  baseURL: SITE_DOMAIN, // Base API URL
  withCredentials: true, // Send cookies with requests
});



export default apiClient;
