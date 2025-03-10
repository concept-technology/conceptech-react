import React, { useState } from 'react';
import { useForm, SubmitHandler } from 'react-hook-form';
import {
  Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Heading, Text, useToast, Icon, Spinner
} from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import { Link, useNavigate } from 'react-router-dom';
import apiClient from '../api/authApi';

interface SignupFormData {
  phoneNumber: string;
  username: string;
  password: string;
  re_password: string;
  email: string;
}

const SignupPage: React.FC = () => {
  const { handleSubmit, register, formState: { errors }, getValues } = useForm<SignupFormData>();
  const toast = useToast();
  const navigate = useNavigate();
  
  const [showPassword, setShowPassword] = useState(false);
  const [showre_password, setShowre_password] = useState(false);
  const [loading, setLoading] = useState(false); // Loading state

  const onSubmit: SubmitHandler<SignupFormData> = async (data) => {
    setLoading(true); // Start loading
    try {
      const response = await apiClient.post('/auth/users/', data, {
        headers: { 'Content-Type': 'application/json' },
      });
      toast({
        title: 'Success',
        description: response.data.message || 'Account created successfully!',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Something went wrong!',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, orange.400, pink.500)"
      py={8}
    >
      <Box maxWidth="sm" width="full" p={6} borderRadius="lg" bg="white" boxShadow="xl">
        <Heading mb={6} textAlign="center" color="pink.600">Sign Up</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>

            {/* Email Input */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: 'Invalid email address',
                    }
                  })}
                />
              </InputGroup>
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>

            {/* Username Input */}
            <FormControl isInvalid={!!errors.username}>
              <FormLabel htmlFor="username">Username</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="username"
                  type="text"
                  placeholder="Enter your username"
                  {...register('username', { required: 'Username is required' })}
                />
              </InputGroup>
              {errors.username && <Text color="red.500">{errors.username.message}</Text>}
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password', { required: 'Password is required' })}
                />
                <InputRightElement>
                  <Button variant="ghost" size="sm" onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>

            {/* Confirm Password Input */}
            <FormControl isInvalid={!!errors.re_password}>
              <FormLabel htmlFor="re_password">Confirm Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="re_password"
                  type={showre_password ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  {...register('re_password', { 
                    required: 'Confirm password is required',
                    validate: (value) => value === getValues('password') || 'Passwords do not match'
                  })}
                />
                <InputRightElement>
                  <Button variant="ghost" size="sm" onClick={() => setShowre_password(!showre_password)}>
                    {showre_password ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.re_password && <Text color="red.500">{errors.re_password.message}</Text>}
            </FormControl>

            {/* Submit Button with Loading Indicator */}
            <Button colorScheme="pink" type="submit" width="full" isLoading={loading} loadingText="Signing Up">
              Sign Up
            </Button>

            <Text textAlign="center" mt={4}>OR</Text>

            {/* Google Login Button */}
            <Button leftIcon={<Icon as={FaGoogle} />} colorScheme="red" variant="outline" width="full">
              Sign Up with Google
            </Button>

            {/* Facebook Login Button */}
            <Button leftIcon={<Icon as={FaFacebook} />} colorScheme="facebook" variant="outline" width="full">
              Sign Up with Facebook
            </Button>

            <Text textAlign="center" mt={2}>
              Already have an account? <Link to="/login">Log in</Link>
            </Text>
            <Link to="/password-reset/request">
              <Text>Forgot password?</Text>
            </Link>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
