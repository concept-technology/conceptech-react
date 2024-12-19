import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, Button } from '@chakra-ui/react';
import apiClient from './ApiClint';

const Logout: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();

  const handleLogout = async () => {
    try {
      const token = localStorage.getItem('accessToken'); // Retrieve the auth token
      if (!token) {
        throw new Error("No token found");
      }

      // Send a POST request to Djoser's logout endpoint
      await apiClient.post(
        "/auth/token/logout/",
        {}, // No body is needed
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem('accessToken');

      // Redirect to login page
      navigate('/login');

      // Show success toast
      toast({
        title: "Logged out successfully.",
        description: "You have been logged out.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Logout failed:", error);

      toast({
        title: "Logout failed.",
        description: "An error occurred while logging out.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  return (
    <Button colorScheme="red" onClick={handleLogout}>
      Logout
    </Button>
  );
};

export default Logout;
