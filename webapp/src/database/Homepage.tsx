import React from "react";
import { Box, Button, Heading, Text, VStack, Link, Container, Icon, Stack, SimpleGrid } from "@chakra-ui/react";
import { FaPlusCircle, FaEye } from "react-icons/fa"; // Icons for database, create and view
import Footer from "../Home-page/components/Footer";
import { useNavigate } from "react-router-dom";

const DatabaseHomePage: React.FC = () => {
  const navigate = useNavigate()
  return (
      <>
    <Container maxW="container.lg" py={10} mt={50}>
            <Button onClick={()=>navigate(-1)}>back</Button>
      <VStack spacing={8} align="center">
        {/* Heading Section */}
        
        <Heading as="h1" size="2xl" color="teal.500" textAlign="center">
          Welcome to the Database Service
        </Heading>
        <Text fontSize="lg" color="gray.600" textAlign="center">
          Manage and create your databases with ease.
        </Text>

        {/* Service Offerings Section */}
        <Box maxW="xl" mx="auto" p={6} borderWidth="1px" borderRadius="lg" bg="white" boxShadow="sm">
          <Heading size="lg" mb={4} textAlign="center">
            What We Offer
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8}>
            <Box>
              <Heading size="md" color="teal.500" mb={2}>
                Create Databases
              </Heading>
              <Text>
                Our service allows you to create new databases effortlessly. Set up a database for your project in just a few clicks.
              </Text>
            </Box>
            <Box>
              <Heading size="md" color="teal.500" mb={2}>
                View Your Databases
              </Heading>
              <Text>
                You can easily view all your databases and their details. Check their connection URLs, usernames, and more.
              </Text>
            </Box>
          </SimpleGrid>
        </Box>

        {/* Action Buttons Section */}
        <Stack direction="row" spacing={6} justify="center">
          <Link href="/create/database">
            <Button
              colorScheme="teal"
              leftIcon={<Icon as={FaPlusCircle} />}
              size="lg"
              variant="solid"
            >
              Create Database
            </Button>
          </Link>
          <Link href="/database/view">
            <Button
              colorScheme="teal"
              leftIcon={<Icon as={FaEye} />}
              size="lg"
              variant="outline"
            >
              View Databases
            </Button>
          </Link>
        </Stack>
      </VStack>
    </Container>
    <Footer/>
    </>
  );
};

export default DatabaseHomePage;
