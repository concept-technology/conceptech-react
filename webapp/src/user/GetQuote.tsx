import React from "react";
import { Box, Heading, Text,} from "@chakra-ui/react";

const GetQuote: React.FC = () => {
  return (
    <Box textAlign="center" mt={20}>
      <Heading>Request a Free Quote</Heading>
      <Text mt={4}>Describe your project, and we’ll get back to you with a free quote.</Text>
      {/* Add your form or additional content here */}
    </Box>
  );
};

export default GetQuote;
