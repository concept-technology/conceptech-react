import React, { useState } from 'react';
import { Box, Button, FormControl, FormLabel, Input, Stack, Heading, useToast, IconButton } from '@chakra-ui/react';
import { FaLock, FaEye, FaEyeSlash } from 'react-icons/fa';
import apiClient, { token } from '../authentication/ApiClint';
import { useNavigate } from 'react-router-dom';
import BackButton from '../utils/BackButton';

const ChangePasswordForm: React.FC = () => {
  const toast = useToast();
  const [currentPassword, setCurrentPassword] = useState<string>('');
  const [newPassword, setNewPassword] = useState<string>('');
  const [confirmPassword, setConfirmPassword] = useState<string>('');
  const [showPassword, setShowShowPassword] = useState<boolean>(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState<boolean>(false);

  const navigate = useNavigate(); // ✅ Corrected use of useNavigate()
  const handleChangePassword = async () => {
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
      await apiClient.post(
        '/api/change-password/',
        {
          current_password: currentPassword,
          new_password: newPassword,
        },
        { headers: { Authorization: `Bearer ${token}` } }
      );

      toast({
        title: 'Password Changed Successfully',
        description: 'Your password has been updated.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });

      navigate('/account/profile'); // ✅ Fixed navigation
    } catch (error: any) {
      toast({
        title: 'Change Failed',
        description: error.response?.data?.error || 'Failed to change password.',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
    }
  };

  return (
    <Box maxW="lg" mx="auto" py={10} px={6} bg="white" boxShadow="lg" borderRadius="md" mt={6}>
        <BackButton/>
      <Heading as="h2" textAlign="center" size="xl" mb={6} color="purple.600">
        Change Password
      </Heading>

      <Stack spacing={6}>
        <FormControl id="currentPassword" isRequired>
          <FormLabel>Current Password</FormLabel>
          <Box position="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter current password"
              value={currentPassword}
              onChange={(e) => setCurrentPassword(e.target.value)}
            />
            <IconButton
              aria-label="Toggle Password Visibility"
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => setShowShowPassword(!showPassword)}
              variant="link"
              color="gray.500"
            />
          </Box>
        </FormControl>

        <FormControl id="newPassword" isRequired>
          <FormLabel>New Password</FormLabel>
          <Box position="relative">
            <Input
              type={showPassword ? 'text' : 'password'}
              placeholder="Enter new password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
            />
            <IconButton
              aria-label="Toggle Password Visibility"
              icon={showPassword ? <FaEyeSlash /> : <FaEye />}
              position="absolute"
              right="2"
              top="50%"
              transform="translateY(-50%)"
              onClick={() => setShowShowPassword(!showPassword)}
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

        <Button colorScheme="blue" size="lg" leftIcon={<FaLock />} onClick={handleChangePassword}>
          Change Password
        </Button>
      </Stack>
    </Box>
  );
};

export default ChangePasswordForm;
