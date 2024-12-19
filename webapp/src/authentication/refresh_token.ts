import apiClient, { SITE_DOMAIN } from "./ApiClint";


const refreshToken = async () => {
  try {
    const response = await apiClient.post(`${SITE_DOMAIN}/api/token/refresh/`);
    return response.data.access; // Return the new access token
  } catch (error) {
    console.error('Token refresh failed:', error);
    throw error;
  }
};

export default refreshToken;

