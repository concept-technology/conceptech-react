import React from 'react';
import { Button, Icon } from '@chakra-ui/react';
import { FaGoogle } from 'react-icons/fa';

const GoogleLoginButton: React.FC = () => {
  const handleGoogleLogin = async () => {
    try {
      // Step 1: Make a GET request to your backend to get the Google login URL
      const response = await fetch('http://localhost:8000/auth/google/');
      const data = await response.json();

      // Step 2: Redirect the user to Google login URL
      if (data.login_url) {
        window.location.href = data.login_url;
      }
    } catch (error) {
      console.error('Error fetching Google login URL:', error);
    }
  };

  return (
    <Button
      leftIcon={<Icon as={FaGoogle} />}
      colorScheme="red"
      variant="outline"
      width="full"
      onClick={handleGoogleLogin}
    >
      Login with Google
    </Button>
  );
};

export default GoogleLoginButton;
