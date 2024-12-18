// 

// GoogleLoginButton.tsx
import React from "react";
import { GoogleLogin, CredentialResponse } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";
import {jwtDecode} from "jwt-decode";
import { useAuth } from "./AuthContext";


interface DecodedToken {
    id: number;
    name: string;
    email: string;
}

const GoogleLoginButton: React.FC = () => {
    const { setUser } = useAuth();
    const navigate = useNavigate();

    const handleSuccess = async (credentialResponse: CredentialResponse) => {
        const token = credentialResponse.credential;
        if (!token) {
            console.error("Google login failed: Invalid credential response");
            return;
        }

        try {
            // Decode the token to extract user info
            const decodedToken = jwtDecode<DecodedToken>(token);

            // Extract user information
            const { id, name, email } = decodedToken;

            // Store the tokens
            localStorage.setItem("accessToken", token);

            // Update the user context
            setUser({ id, name, email });

            // Redirect to profile page
            navigate("/account/profile");

            console.log("Decoded User:", decodedToken);
        } catch (error: any) {
            console.error("Google login failed:", error.response?.data || error.message);
        }
    };

    const handleError = () => {
        alert("An error occurred during Google login. Please try again.");
        console.error("Google login error");
    };

    return <GoogleLogin onSuccess={handleSuccess} onError={handleError} />;
};

export default GoogleLoginButton;
