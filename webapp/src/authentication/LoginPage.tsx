//

import React from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  Stack,
  Heading,
  Text,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate, Navigate, Link, useLocation } from "react-router-dom";

import axios from "axios";
import { SITE_DOMAIN } from "./ApiClint";
import { useAuth } from "./AuthContext";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm<LoginFormData>();
  const toast = useToast();
  const navigate = useNavigate();
  const { isAuthenticated, login } = useAuth();
  const location = useLocation();

  const from = location.state?.from?.pathname || "/";
  // Redirect logged-in users to the profile page
  if (isAuthenticated) {
    return <Navigate to="/account/profile" replace />;
  }
  
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await axios.post(`${SITE_DOMAIN}/api/auth/user/login/`, data, {
        withCredentials: true, // Allow cookies in the request/response
      });
  
      toast({
        title: "Login successful.",
        description: `Welcome back, ${data.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
  
      login(); // Set authentication state
      navigate(from, { replace: true }); // Redirect to the referring page
    } catch (error: any) {
      console.error("Login error:", error);
  
      const errorMessage =
        error.response?.data?.detail ||
        error.response?.data?.error ||
        "An unknown error occurred.";
  
      toast({
        title: "Login failed.",
        description: errorMessage,
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };
  
  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, blue.400, purple.500)"
      py={8}
    >
      <Box
        maxWidth="sm"
        width="full"
        p={6}
        borderRadius="lg"
        bg="white"
        boxShadow="xl"
      >
        <Heading mb={6} textAlign="center" color="purple.600">
          Login
        </Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register("password", { required: "Password is required" })}
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" width="full">
              Log In
            </Button>

            <Text textAlign="center" mt={4}>
              OR
            </Text>

            <Button
              leftIcon={<Icon as={FaGoogle} />}
              colorScheme="red"
              variant="outline"
              width="full"
            >
              Login with Google
            </Button>

            <Button
              leftIcon={<Icon as={FaFacebook} />}
              colorScheme="facebook"
              variant="outline"
              width="full"
            >
              Login with Facebook
            </Button>

            <Text textAlign="center" mt={2}>
              Don't have an account? <a href="/signup">Sign up</a>
            </Text>

            <Text textAlign="center" mt={2}>
              forgot password{" "}
              <Link to="/password-reset/request" color="blue.100">
                {" "}
                reset
              </Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;


