import React from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  Button,
  Link,
  Icon,
} from "@chakra-ui/react";
import {
  FaPhoneAlt,
  FaEnvelope,
  FaQuestionCircle,
  FaArrowLeft,
} from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import Footer from "../Home-page/components/Footer";

const Support = () => {
  const navigate = useNavigate();

  return (
    <>
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="gray.50"
        borderRadius="md"
        boxShadow="lg"
      >
        <Text ml={2}>Back</Text>

        <Heading as="h1" size="xl" mb={6} color="teal.600" textAlign="center">
          Customer Support
        </Heading>
        <Text fontSize="lg" mb={6} color="gray.700" textAlign="center">
          We're here to help! Reach out to us with any questions or concerns you
          may have.
        </Text>
        <VStack spacing={6} align="stretch">
          {/* Support Contact Information */}
          <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Heading as="h3" size="md" mb={2} color="teal.500">
              <Icon as={FaPhoneAlt} mr={2} /> Phone Support
            </Heading>
            <Text mb={2}>Call us directly for immediate assistance:</Text>
            <Text fontSize="lg" fontWeight="bold" color="gray.800">
              <Link href="tel:+2348143006319">+2348143006319</Link>
            </Text>
            <Text fontSize="sm" color="gray.500">
              Available: Mon-Fri, 9 AM - 6 PM (GMT)
            </Text>
          </Box>

          <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Heading as="h3" size="md" mb={2} color="teal.500">
              <Icon as={FaEnvelope} mr={2} /> Email Support
            </Heading>
            <Text mb={2}>
              Send us an email, and we’ll get back to you as soon as possible:
            </Text>
            <Link
              href="mailto:support@concept-techsolutions.com"
              color="teal.400"
              fontWeight="bold"
            >
              support@concept-tech.dev
            </Link>
          </Box>

          {/* Frequently Asked Questions */}
          <Box bg="white" p={6} borderRadius="md" boxShadow="sm">
            <Heading as="h3" size="md" mb={2} color="teal.500">
              <Icon as={FaQuestionCircle} mr={2} /> Frequently Asked Questions
              (FAQs)
            </Heading>
            <Text mb={4}>
              Before contacting support, you may find quick answers in our{" "}
              <Link color="teal.400" href="/faq" fontWeight="bold">
                FAQ section
              </Link>
              .
            </Text>
            <Button colorScheme="teal" variant="solid" as={Link} href="/faq">
              Go to FAQ
            </Button>
          </Box>
        </VStack>
      </Box>
      <Footer />
    </>
  );
};

export default Support;
