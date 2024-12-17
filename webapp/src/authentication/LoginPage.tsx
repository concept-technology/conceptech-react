//

import React, { useState } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  InputGroup,
  InputRightElement,
  Stack,
  Heading,
  Text,
  Icon,
  useToast,
} from "@chakra-ui/react";
import { FaGoogle, FaFacebook } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import apiClient from "./ApiClint";
import GoogleLoginButton from "./GoogleLogin";

const backendUrl = "https://tmsx99-8000.csb.app";

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const {
    handleSubmit,
    register,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  // dj-rest-auth login (username/password)
  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await apiClient.post("/dj-rest-auth/login/", {
        username: data.username,
        password: data.password,
      });

      const { access, refresh } = response.data; // Assuming dj-rest-auth returns JWT tokens

      // Store tokens securely
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      // Redirect to user profile
      navigate("/account/profile");

      toast({
        title: "Login successful.",
        description: `Welcome back, ${data.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error: any) {
      const errorMessage =
        error.response?.data?.non_field_errors?.[0] ||
        "An unexpected error occurred. Please try again.";
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
            {/* Username Input */}
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register("username", { required: "Username is required" })}
              />
              <Text color="red.500" fontSize="sm">
                {errors.username && errors.username.message}
              </Text>
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <Input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  {...register("password", {
                    required: "Password is required",
                  })}
                />
                <InputRightElement>
                  <Button
                    h="1.75rem"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? "Hide" : "Show"}
                  </Button>
                </InputRightElement>
              </InputGroup>
              <Text color="red.500" fontSize="sm">
                {errors.password && errors.password.message}
              </Text>
            </FormControl>

            {/* Submit Button */}
            <Button
              colorScheme="blue"
              type="submit"
              width="full"
              isLoading={isSubmitting}
            >
              Log In
            </Button>

            <Text textAlign="center" mt={4}>
              OR
            </Text>
{/* 
  
            <Button
              leftIcon={<Icon as={FaGoogle} />}
              colorScheme="red"
              variant="outline"
              width="full"
              onClick={() => {
                const redirectUri = `${window.location.origin}/account/profile/`;
                window.location.href = `${backendUrl}/dj-rest-auth/google/?next=${encodeURIComponent(
                  redirectUri
                )}`;
              }}
            >
              Login with Google
            </Button> */}

            {/* Facebook Login Button */}
            <GoogleLoginButton/>
            <Button
              leftIcon={<Icon as={FaFacebook} />}
              colorScheme="facebook"
              variant="outline"
              width="full"
              onClick={() => {
                const redirectUri = `${window.location.origin}/account/profile/`;
                window.location.href = `${backendUrl}/dj-rest-auth/facebook/?next=${encodeURIComponent(
                  redirectUri
                )}`;
              }}
            >
              Login with Facebook
            </Button>

            <Text textAlign="center" mt={2}>
              Don't have an account? <Link to="/signup">Sign up</Link>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
