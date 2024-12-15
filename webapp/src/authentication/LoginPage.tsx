import React from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, Icon, useToast } from '@chakra-ui/react';
import { FaGoogle, FaFacebook } from 'react-icons/fa';

import { Link, useNavigate } from 'react-router-dom';
import apiClient from './ApiClint';

interface LoginFormData {
  username: string;
  password: string;
}

const LoginPage: React.FC = () => {
  const { handleSubmit, register, formState: { errors } } = useForm<LoginFormData>();
  const toast = useToast();
  const navigate = useNavigate();

  const onSubmit: SubmitHandler<LoginFormData> = async (data) => {
    try {
      const response = await apiClient.post("/auth/token/login/", {
        username: data.username,
        password: data.password,
      });
  
      const { auth_token } = response.data;
      localStorage.setItem('authToken', auth_token); // Save the token
      navigate("/account/profile");
  
      toast({
        title: 'Login successful.',
        description: `Welcome back, ${data.username}!`,
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Login failed:", error);
      toast({
        title: "Login failed.",
        description: "Invalid credentials.",
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
        <Heading mb={6} textAlign="center" color="purple.600">Login</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <Input
                id="username"
                type="text"
                placeholder="Enter your username"
                {...register('username', { required: 'Username is required' })}
              />
            </FormControl>

            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <Input
                id="password"
                type="password"
                placeholder="Enter your password"
                {...register('password', { required: 'Password is required' })}
              />
            </FormControl>

            <Button colorScheme="blue" type="submit" width="full">
              Log In
            </Button>

            <Text textAlign="center" mt={4}>OR</Text>

            {/* Google Login Button */}
            <Button
              leftIcon={<Icon as={FaGoogle} />}
              colorScheme="red"
              variant="outline"
              width="full"
              onClick={() => (window.location.href = '/auth/google/')}
            >
              Login with Google
            </Button>

            {/* Facebook Login Button */}
            <Button
              leftIcon={<Icon as={FaFacebook} />}
              colorScheme="facebook"
              variant="outline"
              width="full"
              onClick={() => (window.location.href = '/auth/facebook/')}
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
