import {GoogleLogin } from "@react-oauth/google";
import apiClient from './ApiClint';


const GoogleLoginButton = () => {
    const handleSuccess = async (credentialResponse) => {
        const token = credentialResponse.credential; // Extract credential token
        try {
            const res = await apiClient.post('/auth/social/google/', {
                access_token: token, // Send the token to the backend
            });
            console.log('Login successful:', res.data);
        } catch (error) {
            console.error('Login failed:', error);
        }
    };

    const handleError = () => {
        alert("An error occurred during login. Please try again.");
        console.error("Google login error");
    };

    return (
            <div className="App">
                <GoogleLogin onSuccess={handleSuccess} onError={handleError} />
            </div>
    );
};

export default GoogleLoginButton;
