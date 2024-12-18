import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const LoginCallback = () => {
    const navigate = useNavigate();

    useEffect(() => {
        const urlParams = new URLSearchParams(window.location.search);
        const accessToken = urlParams.get("access_token");
        const refreshToken = urlParams.get("refresh_token");
        const error = urlParams.get("error");

        if (error) {
            console.error("Login failed:", error);
            alert("An error occurred during login.");
            navigate("/login");
        } else if (accessToken && refreshToken) {
            // Store tokens securely
            localStorage.setItem("accessToken", accessToken);
            localStorage.setItem("refreshToken", refreshToken);

            // Redirect to the profile page
            navigate("/account/profile");
        }
    }, [navigate]);

    return <div>Processing login...</div>;
};

export default LoginCallback;
