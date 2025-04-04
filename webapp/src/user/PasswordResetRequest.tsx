import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  Text,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { SITE_DOMAIN } from '../api/apiClient';

const PasswordResetRequest = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();

  const onSubmit = async (data) => {
    try {
      await axios.post(`${SITE_DOMAIN}/api/password-reset/`, { email: data.email });

      toast({
        title: 'Password reset link sent.',
        description: 'Check your email for the reset link.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to send password reset link. Please try again later.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="md" boxShadow="lg">
      <Heading as="h2" size="lg" mb="4">
        Password Reset Request
      </Heading>
      <Text mb="4">Enter your email address to receive a password reset link.</Text>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.email} mb="4">
          <FormLabel>Email Address</FormLabel>
          <Input
            type="email"
            placeholder="Enter your email"
            aria-label="Email Address"
            {...register('email', { 
              required: 'Email is required',
              pattern: {
                value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                message: 'Enter a valid email address'
              }
            })}
          />
          <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" isFullWidth isLoading={isSubmitting}>
          Send Reset Link
        </Button>

        <Link to="/login">
          <Button mt={4} variant="outline" colorScheme="blue" isFullWidth>
            Back to Login
          </Button>
        </Link>
      </form>
    </Box>
  );
};

export default PasswordResetRequest;
