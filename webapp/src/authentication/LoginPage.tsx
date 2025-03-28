import React, { useEffect } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Link as ChakraLink,
  useToast,
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { AppDispatch, RootState } from "../app/store";
import { CredentialResponse, GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID, SITE_DOMAIN } from "../api/apiClient";
import { Helmet } from "react-helmet-async";
import { loginUser } from "../features/auth/authThunks";
import axios from "axios";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginProps {
  onGoogleLogin: (response: any) => void; // Google login success callback
  onLoginSubmit: (data: LoginFormData) => void; // Form submission handler
}

interface GoogleLoginApiResponse {
  success: boolean;
  user: {
    username: string;
    email: string;
  };
  message?: string;
}

const LoginPage: React.FC<LoginProps> =() => {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();
  const toast = useToast();
  const dispatch = useDispatch<AppDispatch>();

  // Get Redux auth state
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account/profile");
    }
  }, [isAuthenticated, navigate]);



  const handleLoginFormSubmit: SubmitHandler<LoginFormData> = async (data: any) => {
    try {
      await dispatch(loginUser(data)).unwrap();
      toast({
        title: "Login successful.",
        description: `Welcome back, ${data.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      navigate("/account/profile");
  

    } catch (error: any) {
      toast({
        title: "Invalid login attempt.",
        description: error || "An unknown error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  const handleGoogleLoginSuccess = async (response:CredentialResponse) => {
    try {
  
      const googleToken = response.credential;
  
      if (!googleToken) {
        throw new Error("Google login failed: No token received.");
      }
  
      const res = await axios.post<GoogleLoginApiResponse>(
        `${SITE_DOMAIN}/api/auth/google/login/`,
        { token: googleToken }, // ✅ Send full token, not googleId
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true, // If using cookies
        }
      );
      const data = res.data;
  
      if (data.success) {
        navigate("/account/profile");
        toast({
          title: "Google login successful.",
          description: `Welcome back, ${data.user.username}!`,
          status: "success",
          duration: 3000,
          isClosable: true,
        });
      } else {
        toast({
          title: "Google login failed.",
          description: data.message || "An error occurred.",
          status: "error",
          duration: 3000,
          isClosable: true,
        });
      }
    } catch (error: any) {
      console.error("Axios Error:", error.response?.data || error.message);
  
      toast({
        title: "Login error.",
        description:
          error.response?.data?.message || "An unexpected error occurred.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  

  return (
    <>
    <Helmet>
      <title>concept tech | login</title>
      <meta property="og:description" content="Login to your account and access our products and services" />
      <meta property="description" content="Login to your account and access our products and services" />
    </Helmet>
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, blue.400, purple.500)"
      py={8}
    >
      <Box maxWidth="sm" width="full" p={6} borderRadius="lg" bg="white" boxShadow="xl">
        <Heading mb={6} textAlign="center" color="purple.600">
          Login
        </Heading>

        <form onSubmit={handleSubmit(handleLoginFormSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">E-mail or Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter E-mail or username"
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 4, message: "Username must be at least 4 characters" },
                })}
              />
              <Text color="red.500" fontSize="sm">{errors.username?.message}</Text>
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", {
                  required: "Password is required",
                  minLength: { value: 6, message: "Password must be at least 6 characters" },
                })}
              />
              <Text color="red.500" fontSize="sm">{errors.password?.message}</Text>
            </FormControl>

            {error && (
              <Text color="red.500" fontSize="sm" textAlign="center">
                {error}
              </Text>
            )}

            <Button colorScheme="blue" type="submit" width="full" isLoading={loading}>
              Log In
            </Button>

            <Text textAlign="center" mt={4}>OR</Text>

            <GoogleOAuthProvider  clientId={GOOGLE_CLIENT_ID}>
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={()=>navigate('/')}
            />
            </GoogleOAuthProvider>

            <Text textAlign="center" mt={2}>
              Don't have an account?{" "}
              <ChakraLink as={Link} to="/signup" color="blue.500">
                Sign up
              </ChakraLink>
            </Text>

            <Text textAlign="center" mt={2}>
              Forgot password?{" "}
              <Link to="/password-reset/request" style={{ color: "blue.500" }}>
                Reset it here
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
    </>

  );
};

export default LoginPage;
