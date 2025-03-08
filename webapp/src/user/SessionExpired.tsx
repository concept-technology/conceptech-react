import { Box, Button, Text, VStack } from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";

const SessionExpired = () => {
  const navigate = useNavigate();

  const handleLoginRedirect = () => {
    navigate("/login"); // Adjust the route as needed
  };

  return (
    <Box height="100vh" display="flex" justifyContent="center" alignItems="center" bg="gray.100">
      <VStack spacing={4} p={8} bg="white" boxShadow="lg" borderRadius="md" textAlign="center">
        <Text fontSize="2xl" fontWeight="bold" color="red.500">
          Session Expired
        </Text>
        <Text fontSize="md" color="gray.600">
          Your session has expired due to inactivity. Please log in again to continue.
        </Text>
        <Button colorScheme="teal" onClick={handleLoginRedirect}>
          Go to Login
        </Button>
      </VStack>
    </Box>
  );
};

export default SessionExpired;