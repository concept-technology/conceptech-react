import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import apiClient from "../api/ApiClient";

const GoogleAuthCallback: React.FC = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    const code = urlParams.get("code");

    if (code) {
      apiClient
        .post("/auth/google/token/", { code })
        .then((response) => {
          localStorage.setItem("authToken", response.data.access_token);
          navigate("/account/profile");
        })
        .catch(() => navigate("/login"));
    } else {
      navigate("/login");
    }
  }, [navigate]);

  return <p>Processing authentication...</p>;
};

export default GoogleAuthCallback;
