
import {
  Box,
  Button,
  Input,
  FormControl,
  FormLabel,
  FormErrorMessage,
  Heading,
  useToast,
} from '@chakra-ui/react';
import { useForm } from 'react-hook-form';
import axios from 'axios';

const PasswordReset = () => {
  const { handleSubmit, register, formState: { errors, isSubmitting } } = useForm();
  const toast = useToast();

  const query = new URLSearchParams(window.location.search);
  const uidb64 = query.get('uidb64');
  const token = query.get('token');

  const onSubmit = async (data) => {
    try {
      await axios.post('api/password-reset/request/', {
        uidb64,
        token,
        new_password: data.newPassword,
      });
      toast({
        title: 'Password reset successful.',
        description: 'You can now log in with your new password.',
        status: 'success',
        duration: 5000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: error.response?.data?.error || 'Failed to reset password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="400px" mx="auto" mt="8" p="6" borderWidth="1px" borderRadius="md" boxShadow="lg">
      <Heading as="h2" size="lg" mb="4">
        Reset Your Password
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <FormControl isInvalid={errors.newPassword} mb="4">
          <FormLabel>New Password</FormLabel>
          <Input
            type="password"
            placeholder="Enter a new password"
            {...register('newPassword', {
              required: 'Password is required',
              minLength: {
                value: 8,
                message: 'Password must be at least 8 characters',
              },
            })}
          />
          <FormErrorMessage>{errors.newPassword && errors.newPassword.message}</FormErrorMessage>
        </FormControl>
        <Button type="submit" colorScheme="blue" isFullWidth isLoading={isSubmitting}>
          Reset Password
        </Button>
      </form>
    </Box>
  );
};

export default PasswordReset;
