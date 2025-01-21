
import React, { useEffect, useState } from "react";
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
  Link as ChakraLink,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { useNavigate, Link } from "react-router-dom";

import axios from "axios";
import apiClient, { SITE_DOMAIN } from "./ApiClint";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

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
  const { isAuthenticated} = useAuth();
  const [isLoading, setIsLoading] = useState(false);

    if (isAuthenticated) {
      navigate("/account/profile");
    }

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    setIsLoading(true);
    try {
      const response = await apiClient.post(`/api/auth/user/login/`, data);
      Cookies.set("access", response.data.__AccessTOKen__, { secure: false });
      Cookies.set('refresh',response.data.__AccessTOKenref__)
      setIsLoading(false)
      navigate("/account/profile");
      // Display success message
      toast({
        title: "Login successful.",
        description: `Welcome back, ${data.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      
      
    } catch (error: any) {
      console.error("Login error:", error);
      
      const errorMessage =
      error.response?.data?.detail ||
      error.response?.data?.error ||
      "An unknown error occurred.";
      
      // Display error message
      setIsLoading(false)
      toast({
        title: "Invalid login attempt.",
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
                {...register("username", {
                  required: "Username is required",
                  minLength: { value: 4, message: "Username must be at least 4 characters" },
                })}
              />
              <Text color="red.500" fontSize="sm">
                {errors.username?.message}
              </Text>
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
              <Text color="red.500" fontSize="sm">
                {errors.password?.message}
              </Text>
            </FormControl>

            <Button
              colorScheme="blue"
              type="submit"
              width="full"
              isLoading={isLoading}
            >
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
              Don't have an account?{" "}
              <ChakraLink href="/signup" color="blue.500">
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
  );
};

export default LoginPage;
