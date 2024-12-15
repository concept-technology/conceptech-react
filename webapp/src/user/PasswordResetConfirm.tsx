import { useParams } from 'react-router-dom';
import apiClient from '../authentication/ApiClint';
import { useState } from 'react';
import { Box, useToast } from '@chakra-ui/react';


const PasswordResetConfirm: React.FC = () => {
  const { uid, token } = useParams<{ uid: string; token: string }>();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const toast = useToast();

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      toast({
        title: 'Password Mismatch',
        description: 'The passwords do not match.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
      return;
    }

    try {
      await apiClient.post('/auth/users/reset_password_confirm/', {
        uid,
        token,
        new_password: newPassword,
      });

      toast({
        title: 'Password Reset Successful',
        description: 'Your password has been reset successfully.',
        status: 'success',
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      toast({
        title: 'Error',
        description: 'Invalid reset link or token.',
        status: 'error',
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Box>sucessful</Box>
    // JSX form for new password and confirmation
  );
};

export default PasswordResetConfirm