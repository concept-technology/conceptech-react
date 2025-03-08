import { useEffect } from "react";
import { useDispatch } from "react-redux";
import Cookies from "js-cookie";
import { refreshToken } from "../../../features/auth/authThunks";

const TokenRefresh = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    const interval = setInterval(() => {
      dispatch(refreshToken())
        .unwrap()
        .then((newToken) => {
          Cookies.set("accessToken", newToken);
        })
        .catch(() => {
          console.error("Failed to refresh token");
        });
    }, 10 * 60 * 1000); // Refresh every 10 minutes (adjust as needed)

    return () => clearInterval(interval); // Cleanup on unmount
  }, [dispatch]);

  return null; // This component doesn't render anything
};

export default TokenRefresh;
