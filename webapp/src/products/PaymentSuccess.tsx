
import {
  Box,
  VStack,
  HStack,
  Text,
  Icon,
  Button,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import { CheckCircleIcon } from "@chakra-ui/icons";
import { useNavigate } from "react-router-dom";


const SuccessPage = ()=>{

  const navigate = useNavigate();

  const handleViewOrder = () => {
    navigate("/orders"); // Adjust this route based on your app's routing
  };

  const handleGoHome = () => {
    navigate("/");
  };

  return (
    <Box
      minH="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bg={useColorModeValue("gray.50", "gray.900")}
      px={4}
    >
      <VStack
        spacing={6}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
        rounded="lg"
        p={8}
        maxW="sm"
        textAlign="center"
      >
        <Icon as={CheckCircleIcon} boxSize={16} color="green.500" />
        <Text fontSize="2xl" fontWeight="bold">
          Payment Successful!
        </Text>
        <Text fontSize="md" color={useColorModeValue("gray.600", "gray.400")}>
          Thank you for your purchase. Your payment has been successfully
          processed. You can view your order details or continue shopping.
        </Text>
        <Image
          src="/assets/success.png" // Replace with your image path
          alt="Success"
          boxSize="150px"
          objectFit="contain"
        />
        <HStack spacing={4}>
          <Button colorScheme="green" onClick={handleViewOrder}>
            View Order
          </Button>
          <Button variant="outline" onClick={handleGoHome}>
            Go to Home
          </Button>
        </HStack>
      </VStack>
    </Box>
  );
};

export default SuccessPage;

