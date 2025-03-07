import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { 
  Box, 
  Button, 
  FormControl, 
  FormLabel, 
  Input, 
  Stack, 
  Heading, 
  Text, 
  useToast, 
  IconButton 
} from '@chakra-ui/react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import apiClient from '../api/authApi';


const PasswordResetForm: React.FC = () => {
  const { uid, token } = useParams<Record<string, string>>();
  const navigate = useNavigate();
  const toast = useToast();

  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const handleResetPassword = async () => {
    if (!uid || !token) {
      toast({
        title: 'Invalid Request',
        description: 'Missing user ID or token.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'New password and confirmation do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await apiClient.post('api/password-reset/confirm/', {
        uid,
        token,
        new_password: newPassword,
      });

      toast({
        title: 'Password Reset Successful',
        description: 'You can now log in with your new password.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/login');
    } catch (error: any) {
      toast({
        title: 'Reset Failed',
        description: error.response?.data?.error || 'Invalid or expired reset link.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="lg" mx="auto" py={10} px={6} bg="white" boxShadow="lg" borderRadius="md" mt={6}>
      <Heading as="h2" textAlign="center" size="xl" mb={6} color="purple.600">
        Reset Password
      </Heading>

      <Stack spacing={6}>
        <FormControl id="newPassword" isRequired>
          <FormLabel>New Password</FormLabel>
          <Box position="relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <IconButton
              aria-label="Toggle Password Visibility"
              icon={showNewPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => setShowNewPassword(!showNewPassword)}
              variant="link"
              color="gray.500"
            />
          </Box>
        </FormControl>

        <FormControl id="confirmPassword" isRequired>
          <FormLabel>Confirm New Password</FormLabel>
          <Box position="relative">
            <Input
              type={showConfirmPassword ? 'text' : 'password'}
              placeholder="Confirm new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <IconButton
              aria-label="Toggle Password Visibility"
              icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => setShowConfirmPassword(!showConfirmPassword)}
              variant="link"
              color="gray.500"
            />
          </Box>
        </FormControl>

        <Button colorScheme="blue" size="lg" leftIcon={<FaLock />} onClick={handleResetPassword}>
          Reset Password
        </Button>
      </Stack>

      <Text mt={4} textAlign="center" color="gray.600">
        Remember your password?{' '}
        <Button variant="link" colorScheme="blue" onClick={() => navigate('/login')}>
          Login
        </Button>
      </Text>
    </Box>
  );
};

export default PasswordResetForm;
