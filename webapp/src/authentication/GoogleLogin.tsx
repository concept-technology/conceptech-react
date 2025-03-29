import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { RootState } from "../app/store";
import { GOOGLE_CLIENT_ID} from "../api/apiClient";
import { Button, Stack, useToast } from "@chakra-ui/react";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { googleLogin } from "../features/auth/authThunks";

const GoogleLoginHandler = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const toast = useToast()
    const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);
  
    const [isProcessing, setIsProcessing] = useState(false);
  
    const handleGoogleLoginSuccess = async (response: CredentialResponse) => {
      if (isProcessing) return; // Prevent multiple requests
  
      setIsProcessing(true);
      try {
        const googleToken = response.credential;
        if (!googleToken) throw new Error("Google login failed: No token received.");
  
        // Dispatch Google login thunk
        dispatch(googleLogin(googleToken));
  
      } catch (error: any) {
        console.error("Google Login Error:", error.message);
        toast({
          title: "Login error.",
          description: error.message || "An unexpected error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      } finally {
        setIsProcessing(false);
      }
    };
  
    // Redirect after successful login
    useEffect(() => {
      if (isAuthenticated) {
        navigate("/account/profile");
      }
    }, [isAuthenticated, navigate]);
  
    // Show error toast if login fails
    useEffect(() => {
      if (error) {
        toast({
          title: "Google login failed.",
          description: error,
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    }, [error]);
  return(
    <>
    {loading && <Stack direction="row" gap="4" align="center">
      <Button loading loadingText="loading">
        
      </Button>
    </Stack>}
{!loading &&

<GoogleOAuthProvider  clientId={GOOGLE_CLIENT_ID}>
<GoogleLogin
  onSuccess={handleGoogleLoginSuccess}
  onError={()=>navigate('/')}
  />
  </GoogleOAuthProvider>}
        </>
    
  ); // This component handles login but does not render UI
};

export default GoogleLoginHandler;
