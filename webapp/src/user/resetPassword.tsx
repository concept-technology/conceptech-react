import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, Text, useToast, useBreakpointValue, IconButton, InputProps } from '@chakra-ui/react';
import { FaLock, FaArrowLeft, FaEye, FaEyeSlash } from 'react-icons/fa';
import apiClient from '../authentication/ApiClint';
import { useNavigate } from 'react-router-dom';

const ResetPassword: React.FC = () => {
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showCurrentPassword, setShowCurrentPassword] = useState<boolean>(false);
  const [showNewPassword, setShowNewPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);
  const toast = useToast();
  const navigate = useNavigate();

  // Responsive padding value
  const paddingValue = useBreakpointValue({ base: '4', md: '6' });

  const handleResetPassword = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: "The new password and confirmation password do not match.",
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    const token = localStorage.getItem('authToken');
    try {
      await apiClient.put('/auth/users/reset_password/', {
        current_password: currentPassword,
        new_password: newPassword,
      }, {
        headers: { Authorization: `Token ${token}` },
      });

      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been successfully reset.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/account/profile'); // Redirect to the profile page after reset
    } catch (error) {
      console.error('Failed to reset password:', error);
      toast({
        title: 'Password Reset Failed',
        description: 'There was an error resetting your password. Please try again.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  // Toggle password visibility
  const togglePasswordVisibility = (field: 'current' | 'new' | 'confirm') => {
    if (field === 'current') {
      setShowCurrentPassword(!showCurrentPassword);
    } else if (field === 'new') {
      setShowNewPassword(!showNewPassword);
    } else if (field === 'confirm') {
      setShowConfirmPassword(!showConfirmPassword);
    }
  };

  return (
    <Box
      maxW="lg"
      mx="auto"
      py={10}
      px={6}
      bg="white"
      boxShadow="lg"
      borderRadius="md"
      mt={6}
    >
      <Heading as="h2" textAlign="center" size="xl" mb={6} color="purple.600">
        Reset Password
      </Heading>

      <IconButton
        aria-label="Back"
        icon={<FaArrowLeft />}
        onClick={() => navigate('/account/profile')}
        variant="link"
        colorScheme="blue"
        mb={6}
      />

      <Stack spacing={6}>
        <FormControl id="currentPassword" isRequired>
          <FormLabel>Current Password</FormLabel>
          <Box position="relative">
            <Input
              type={showCurrentPassword ? 'text' : 'password'}
              placeholder="Enter your current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <IconButton
              aria-label="Show/Hide Password"
              icon={showCurrentPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => togglePasswordVisibility('current')}
              variant="link"
              color="gray.500"
            />
          </Box>
        </FormControl>

        <FormControl id="newPassword" isRequired>
          <FormLabel>New Password</FormLabel>
          <Box position="relative">
            <Input
              type={showNewPassword ? 'text' : 'password'}
              placeholder="Enter your new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <IconButton
              aria-label="Show/Hide Password"
              icon={showNewPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => togglePasswordVisibility('new')}
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
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <IconButton
              aria-label="Show/Hide Password"
              icon={showConfirmPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => togglePasswordVisibility('confirm')}
              variant="link"
              color="gray.500"
            />
          </Box>
        </FormControl>

        <Button
          colorScheme="blue"
          size="lg"
          leftIcon={<FaLock />}
          onClick={handleResetPassword}
          isFullWidth
        >
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

export default ResetPassword;
