import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useToast, Button } from '@chakra-ui/react';
import { token } from '../api/apiClient';
const Logout: React.FC = () => {
  const navigate = useNavigate();
  const toast = useToast();
  const handleLogout = async () => {
    try {
      if (!token) {
        throw new Error("No token found");
      }

      navigate('/');
      location.reload()
           
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
