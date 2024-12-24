import axios from "axios";
import { SITE_DOMAIN } from "./ApiClint";
import Cookies from "js-cookie";

const refreshToken = async () => {
  const refreshToken = Cookies.get("refresh_token");

  if (!refreshToken) {
  
    console.error("No refresh token found.");
    throw new Error("No refresh token available. Please log in again.");
  }

  try {
    const response = await axios.post(
      `${SITE_DOMAIN}/api/token/refresh/`,
      { refresh: refreshToken }, // Ensure the correct key is used
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    const newAccessToken = response.data.access;

    // Save the new access token in cookies
    Cookies.set("access_token", newAccessToken, {
      secure: true, // Only for HTTPS
      sameSite: "Strict", // Adjust based on your security requirements
    });

    return newAccessToken; // Return the new access token
  } catch (error) {
    console.error("Token refresh failed:", error.response?.data || error.message);

    if (error.response?.status === 401) {
      // Refresh token is invalid or expired, redirect to login
      console.error("Refresh token expired. Redirecting to login...");
    }

    throw error; // Propagate the error to the caller
  }
};

export default refreshToken;
