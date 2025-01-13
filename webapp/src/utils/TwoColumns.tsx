import  { useState } from "react";
import { Box, Button, VStack, Text } from "@chakra-ui/react";

const TwoColumnComponent = () => {
    
  // Define the valid keys for the pages object
  type PageKey = "Home" | "About" | "Services" | "Contact";
  const [currentPage, setCurrentPage] = useState<PageKey>("Home");

  const pages: Record<PageKey, JSX.Element> = {
    Home: <Text fontSize="xl">Welcome to the Home Page!</Text>,
    About: <Text fontSize="xl">Learn more About Us on this page.</Text>,
    Services: <Text fontSize="xl">These are our Services.</Text>,
    Contact: <Text fontSize="xl">Get in touch with us on the Contact Page.</Text>,
  };

  return (
    <Box display="flex" height="100vh">
      {/* Left Column */}
      <Box width="30%" bg="gray.100" p={4}>
        <VStack spacing={4} align="stretch">
          {Object.keys(pages).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page as PageKey)} // Ensure TypeScript knows this is a valid key
              colorScheme="teal"
              variant={currentPage === page ? "solid" : "outline"}
            >
              {page}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Right Column */}
      <Box width="70%" bg="white" p={8}>
        {pages[currentPage]}
      </Box>
    </Box>
  );
};

export default TwoColumnComponent;
