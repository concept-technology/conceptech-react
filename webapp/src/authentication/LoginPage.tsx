import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
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
} from "@chakra-ui/react";
import { useNavigate, Link } from "react-router-dom";
import { useSelector } from "react-redux";
import { RootState } from "../app/store";
import { GoogleLogin, GoogleOAuthProvider } from "@react-oauth/google";
import { GOOGLE_CLIENT_ID } from "../api/apiClient";
import { Helmet } from "react-helmet-async";

export interface LoginFormData {
  username: string;
  password: string;
}

export interface LoginProps {
  onGoogleLogin: (response: any) => void; // Google login success callback
  onLoginSubmit: (data: LoginFormData) => void; // Form submission handler
}

const LoginPage: React.FC<LoginProps> = ({onGoogleLogin,onLoginSubmit}:LoginProps) => {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>();
  const navigate = useNavigate();

  // Get Redux auth state
  const { isAuthenticated, loading, error } = useSelector((state: RootState) => state.auth);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account/profile");
    }
  }, [isAuthenticated, navigate]);




  return (
    <>
    <Helmet>
      <title>account | login</title>
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

        <form onSubmit={handleSubmit(onLoginSubmit)}>
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
            onSuccess={onGoogleLogin}
            onError={()=>navigate('/')}
            />
            </GoogleOAuthProvider>


            {/* <Button leftIcon={<Icon as={FaFacebook} />} colorScheme="facebook" variant="outline" width="full">
              Login with Facebook
            </Button> */}

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
