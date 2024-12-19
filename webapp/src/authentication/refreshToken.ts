import axios from 'axios';
import { SITE_DOMAIN } from './ApiClint';

const refreshToken = async () => {
  try {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) {
      throw new Error("No refresh token available.");
    }

    const response = await axios.post(`${SITE_DOMAIN}/api/token/refresh/`, { refresh: refreshToken });
    const { access } = response.data;

    // Update the access token in local storage
    localStorage.setItem('accessToken', access);
    return access; // Return the new access token
  } catch (error) {
    console.error("Error refreshing token:", error);
    throw error; // Let the caller handle this
  }
};

export default refreshToken;
