import { Box, Button, Heading, Text, VStack, Icon } from "@chakra-ui/react";
import { WarningTwoIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";

const PaymentCanceled = () => {
  const navigate = useNavigate();

  return (
    <Box display="flex" justifyContent="center" alignItems="center" height="100vh" bgGradient="linear(to-r, red.300, pink.400)">
      <VStack spacing={6} p={8} bg="white" boxShadow="xl" borderRadius="lg" maxW="sm" textAlign="center">
        <Icon as={WarningTwoIcon} w={16} h={16} color="red.500" />
        <Heading size="lg" color="red.600">Payment Canceled</Heading>
        <Text fontSize="md" color="gray.600">Your payment was not completed. Please try again or contact support if you need help.</Text>
        <Button colorScheme="red" size="lg" px={8} borderRadius="full" onClick={() => navigate("/")}>Try Again</Button>
      </VStack>
    </Box>
  );
};

export default PaymentCanceled;
