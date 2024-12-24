import React, { useEffect, useState } from "react";
import {
  Box,
  Heading,
  Text,
  VStack,
  useToast,
  Spinner,
  Alert,
  AlertIcon,
  IconButton,
  Tooltip,
  Flex,
  Button,
} from "@chakra-ui/react";
import { FaDatabase } from "react-icons/fa"; // Database Icon
import Cookies from "js-cookie";
import apiClient from "../authentication/ApiClint";

interface DatabaseDetail {
  id: number;
  db_name: string;
  db_username: string;
  db_password: string;
  db_url: string;
}

const DatabaseDetailView: React.FC = () => {
  const [loading, setLoading] = useState<boolean>(true);
  const [databaseDetail, setDatabaseDetail] = useState<DatabaseDetail[]>([]);
  const [error, setError] = useState<string | null>(null);
  const toast = useToast();

  useEffect(() => {
    const fetchDatabaseDetail = async () => {
      const token = Cookies.get("access_token");
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/database/view/`, {
          headers: { Authorization: `Bearer ${token}` },
        });

        // Log API response for debugging
        console.log("API Response:", response.data);

        const details = Array.isArray(response.data)
          ? response.data
          : response.data.databases || [];

        setDatabaseDetail(details);
      } catch (err: any) {
        const errorMsg = err.response?.data?.error || "Failed to load data";
        setError(errorMsg);
        toast({
          title: "Error",
          description: errorMsg,
          status: "error",
          duration: 5000,
          isClosable: true,
        });
      } finally {
        setLoading(false);
      }
    };

    fetchDatabaseDetail();
  }, [toast]);

  const copyToClipboard = (text: string) => {
    navigator.clipboard.writeText(text);
    toast({
      title: "Copied to Clipboard",
      description: "The database URL has been copied.",
      status: "success",
      duration: 3000,
      isClosable: true,
    });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <Spinner size="xl" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg" bg="white">
        <Alert status="error">
          <AlertIcon />
          {error}
        </Alert>
      </Box>
    );
  }

  if (databaseDetail.length === 0) {
    return (
      <Box maxW="md" mx="auto" p={6} borderWidth="1px" borderRadius="lg" bg="white">
        <Heading size="lg" textAlign="center">
          No Database Found
        </Heading>
        <Text mt={4} textAlign="center">
          The requested database details could not be found.
        </Text>
      </Box>
    );
  }

  return (
    <Box
      maxW="md"
      mx="auto"
      mt={10}
      p={6}
      borderWidth="1px"
      borderRadius="lg"
      boxShadow="lg"
      bg="white"
    >
      <Heading size="lg" mb={4} textAlign="center">
        Database Details
      </Heading>
      <VStack spacing={4} align="start">
        {databaseDetail.map((db) => (
          <Box
            key={db.id}
            p={5}
            borderWidth="1px"
            borderRadius="md"
            w="full"
            bg="gray.50"
            boxShadow="sm"
          >
            <Flex align="center" mb={3}>
              <Box as={FaDatabase} color="teal.500" boxSize="6" mr={3} />
              <Heading size="md">{db.db_name}</Heading>
            </Flex>
            <Text>
              <strong>Username:</strong> {db.db_username}
            </Text>
            <Text mb={3}>
              <strong>Password:</strong> {db.db_password}
            </Text>
            <Flex align="center">
              <Text flex="1">
                <strong>Connection URL:</strong> {db.db_url}
              </Text>
              <Tooltip label="Copy URL to clipboard" aria-label="Copy URL">
                <IconButton
                  aria-label="Copy URL"
                  icon={<FaDatabase />}
                  onClick={() => copyToClipboard(db.db_url)}
                  size="sm"
                  variant="outline"
                  colorScheme="teal"
                  ml={3}
                />
              </Tooltip>
            </Flex>
          </Box>
        ))}
      </VStack>
    </Box>
  );
};

export default DatabaseDetailView;
