import axios from 'axios';

// Use environment variables for base URL
const apiClient = axios.create({
  baseURL: process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000',
  withCredentials: true, // Includes cookies for cross-origin requests
  headers: { 'Content-Type': 'application/json' },
});

// Add interceptors for tokens and error handling
apiClient.interceptors.request.use(
  (config) => {
    // Use cookies or tokens stored securely to avoid XSS risks
    const token = document.cookie.split('; ').find(row => row.startsWith('accessToken='));
    const accessToken = token ? token.split('=')[1] : null;

    if (accessToken) {
      config.headers['Authorization'] = `Bearer ${accessToken}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    // Handle token expiration (401 Unauthorized)
    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // Use refresh token to obtain a new access token
        const { data } = await axios.post(
          `${process.env.REACT_APP_API_BASE_URL || 'http://localhost:8000'}/auth/token/refresh/`,
          {},
          {
            withCredentials: true, // Send cookies with the refresh request
          }
        );

        // Store the new access token securely in a cookie
        document.cookie = `accessToken=${data.access}; Secure; HttpOnly; SameSite=Strict`;

        // Retry the original request with the new token
        originalRequest.headers['Authorization'] = `Bearer ${data.access}`;
        return apiClient(originalRequest);
      } catch (refreshError) {
        // If refresh fails, clear cookies and redirect to login
        document.cookie = "accessToken=; Max-Age=0; Secure; HttpOnly; SameSite=Strict";
        document.cookie = "refreshToken=; Max-Age=0; Secure; HttpOnly; SameSite=Strict";
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    // Handle other errors globally (e.g., 403 Forbidden, 500 Internal Server Error)
    if (error.response?.status === 403) {
      alert('You do not have permission to perform this action.');
    } else if (error.response?.status === 500) {
      alert('An unexpected server error occurred. Please try again later.');
    }

    return Promise.reject(error);
  }
);

export default apiClient;
