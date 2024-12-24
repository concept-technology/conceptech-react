
import { Box, Heading, Text, Button, Image, VStack } from "@chakra-ui/react";
import { Link } from "react-router-dom";

const NotFound = () => {
  return (
    <Box
      display="flex"
      flexDirection="column"
      alignItems="center"
      justifyContent="center"
      minH="100vh"
      bg="gray.50"
      px={4}
    >
      <VStack spacing={6} textAlign="center">
        <Image
          src="https://via.placeholder.com/400x300?text=404+Error"
          alt="404 Error"
          boxSize="300px"
          objectFit="cover"
        />
        <Heading as="h1" size="2xl" color="red.500">
          404
        </Heading>
        <Text fontSize="lg" color="gray.700">
          Oops! The page you're looking for doesn't exist.
        </Text>
        <Text fontSize="sm" color="gray.500">
          It might have been moved, deleted, or you may have mistyped the URL.
        </Text>
        <Link to="/">
          <Button colorScheme="teal" size="lg">
            Go Back Home
          </Button>
        </Link>
      </VStack>
    </Box>
  );
};

export default NotFound;
