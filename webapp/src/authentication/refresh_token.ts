import apiClient from "./ApiClint";

const refreshTokens = async () => {
    const refreshToken = localStorage.getItem("refreshToken");
    if (refreshToken) {
      try {
        const response = await apiClient.post("/auth/token/refresh/", {
          refresh: refreshToken,
        });
        localStorage.setItem("accessToken", response.data.access);
      } catch (error) {
        console.error("Failed to refresh token", error);
      }
    }
  };
  
  export default refreshTokens