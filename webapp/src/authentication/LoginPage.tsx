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
import { FaFacebook } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

import GoogleLoginButton from "./GoogleLogin";
import apiClient from "./ApiClint";

interface LoginFormData {
  username: string;
  password: string;
  error:string
}

const LoginPage: React.FC = () => {
  const { handleSubmit, register, formState } = useForm<LoginFormData>();
  const [showPassword, setShowPassword] = useState(false);
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await apiClient.post("google/token/validate/", data);
      const { access, refresh } = response.data;

      // Store tokens securely
      localStorage.setItem("accessToken", access);
      localStorage.setItem("refreshToken", refresh);

      toast({
        title: "Login successful",
        description: `Welcome back, ${data.username}!`,
        status: "success",
        duration: 3000,
        isClosable: true,
      });

      navigate("/account/profile");
    } catch (error) {
      toast({
        title: "Login failed",
        description:
          error.response?.data?.non_field_errors?.[0] ||
          "An unexpected error occurred",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleFacebookLogin = () => {
    const redirectUri = `${window.location.origin}/account/profile/`;
    const facebookLoginUrl = `/auth/social/facebook/?next=${encodeURIComponent(
      redirectUri
    )}`;
    window.location.href = facebookLoginUrl;
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
            <FormControl>
              <FormLabel>Username</FormLabel>
              <Input {...register("username", { required: true })} />
            </FormControl>

            <FormControl>
              <FormLabel>Password</FormLabel>
              <InputGroup>
                <Input
                  type={showPassword ? "text" : "password"}
                  {...register("password", { required: true })}
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
            </FormControl>

            <Button type="submit" isLoading={formState.isSubmitting}>
              Login
            </Button>

            <Text textAlign="center">OR</Text>
            <GoogleLoginButton />
            <Button
              leftIcon={<Icon as={FaFacebook} />}
              onClick={handleFacebookLogin}
            >
              Login with Facebook
            </Button>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default LoginPage;
