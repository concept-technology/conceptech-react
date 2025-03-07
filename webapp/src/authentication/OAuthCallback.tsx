import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";

const OAuthCallback = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const accessToken = urlParams.get("access");
    const refreshToken = urlParams.get("refresh");

    if (accessToken && refreshToken){
      Cookies.set("access", accessToken);
      Cookies.set("refresh", refreshToken);
      navigate("/account/profile");
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return null;
};

export default OAuthCallback;
