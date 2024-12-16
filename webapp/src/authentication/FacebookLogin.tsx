
import FacebookLogin from "react-facebook-login/dist/facebook-login-render-props";
import axios from "axios";

const FacebookAuth = () => {
  const handleResponse = async (response) => {
    try {
      const backendResponse = await axios.post("http://127.0.0.1:8000/auth/social/facebook/", {
        access_token: response.accessToken, // Send token to Django backend
      });
      const { access, refresh } = backendResponse.data; // JWT tokens
      localStorage.setItem("access", access);
      localStorage.setItem("refresh", refresh);
      alert("Login successful!");
    } catch (error) {
      console.error("Error during login:", error);
    }
  };

  return (
    <FacebookLogin
      appId="your-facebook-app-id" // Replace with your Facebook App ID
      callback={handleResponse}
      render={(renderProps) => (
        <button onClick={renderProps.onClick}>
          Login with Facebook
        </button>
      )}
    />
  );
};

export default FacebookAuth;
