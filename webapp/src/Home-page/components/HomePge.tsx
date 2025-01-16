import {
  Box,
  Flex,
  Heading,
  Text,
  Button,
  Image,
  VStack,

} from "@chakra-ui/react";
import clogo from '../../assets/Images/logo.jpg'

import { Link, useNavigate } from "react-router-dom";
import logo from '../../assets/mylogo.png'
const HomePage = () => {
    const navigate = useNavigate();

    const handleGetQuoteClick = () => {
      navigate("/contact");
    };

  return (
    <Box bg="gray.50" minH="100vh" p={4} mt={'10vh'}>
      {/* Hero Section */}
      <Flex
        align="center"
        justify="space-between"
        direction={{ base: "column", md: "row" }}
        p={8}
        bg="teal.500"
        color="white"
        borderRadius="lg"
        mb={8}
      >
        <VStack align="start" spacing={4}>
          <Heading as="h1" size="2xl" fontWeight="bold">
            Concept Technologies and Software Solutions
          </Heading>
          <Text fontSize="lg" color='whiteAlpha.800'>
            Innovating the future through cutting-edge technology and tailored
            software solutions. Let’s build something extraordinary together.
          </Text>
          <Link to="/contact">
          <Button colorScheme="teal" bg="white" color="teal.500" size="lg">
            Contact Us
          </Button>
          </Link>
        </VStack>
        <Image
          src={clogo}
          alt="Hero Image"
          maxW="500px"
          mt={{ base: 8, md: 0 }}
        />
      </Flex>

      {/* About Section */}
      <Box py={12} textAlign="center">
        <Heading as="h2" size="xl" mb={4}>
          what we do
        </Heading>
        <Text fontSize="lg" color="gray.600" maxW="800px" mx="auto">
          At Concept Technologies and Software Solutions, we are committed to
          delivering exceptional software products that drive innovation and
          success. With a team of skilled developers and industry experts, we
          bring your vision to life.
        </Text>
      </Box>

      {/* Call to Action Section */}
      <Flex
        direction={{ base: "column", md: "row" }}
        justify="center"
        align="center"
        bg="teal.500"
        color="white"
        py={8}
        px={4}
        borderRadius="lg"
      >
        <VStack spacing={4} align="start" textAlign={{ base: "center", md: "left" }}>
          <Heading as="h3" size="lg">
            Ready to Get Started?
          </Heading>
          <Text fontSize="md" color='whiteAlpha.800'>
            Contact us today to discuss your project and learn how we can help
            your business thrive.
          </Text>
        </VStack>
        <Link to="/contact">
        <Button
          colorScheme="teal"
          bg="white"
          color="teal.500"
          size="lg"
          mt={{ base: 4, md: 0 }}
          ml={{ md: 4 }}
          onClick={handleGetQuoteClick}
          >
          Get a Free Quote
        </Button>
          </Link>
      </Flex>
    </Box>
  );
};

export default HomePage;
