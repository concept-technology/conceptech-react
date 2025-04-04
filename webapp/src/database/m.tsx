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
  Stack, Table,
  Tbody,
  Thead,
  Th,
  Tr,
  Td
} from "@chakra-ui/react";
import { FaDatabase, FaRegEye, FaRegEyeSlash } from "react-icons/fa"; // Database Icon
import { FiCopy, FiSave } from "react-icons/fi"; // Copy and Save Icons
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import apiClient from "../api/authApi";
import { Helmet } from "react-helmet-async";


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
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false)
  
  useEffect(() => {
    const fetchDatabaseDetail = async () => {
      const token = Cookies.get('access')
      console.log('acces_token',token)
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/database/view/`,{
          headers:{Authorization: `Bearer ${token}` }
        });
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

  const handleBackup = async (db_name: string) => {
    const token = Cookies.get('access')

    try {
      const response = await apiClient.post(
        `/api/database/backup/`,
        { db_name },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({
        title: "Backup Successful",
        description: `Backup for '${db_name}' completed successfully.`,
        status: "success",
        duration: 5000,
        isClosable: true,
      });

      console.log("Backup Response:", response.data);
    } catch (err: any) {
      const errorMsg = err.response?.data?.error || "Backup failed";
      toast({
        title: "Error",
        description: errorMsg,
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
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
    <>
    <Helmet>
      <title>concept technologies | database service</title>
    </Helmet>

      <Box
        mx="auto"
        p={6}
        bg="white"
      >
        <Heading size="lg" mb={4} textAlign="center">
          Database Details
        </Heading>
        <Button mt={{ base: "10p", lg: "50px" }} onClick={() => navigate("/create/database")}>
        Create Database
      </Button>
        <Table  borderWidth="1px" maxW={{base:'sm',lg:'lg'}} size={{base:'sm', lg:'lg'}} variant="outline">
          <Thead>
            <Th>Database Name</Th>
            <Th>User Name</Th>
            <Th>Password</Th>
            <Th>Action</Th>
          </Thead>
          <Tbody>
          {databaseDetail.map((db) => (
            <Tr
              key={db.id}
              p={5}
              borderWidth="1px"
              borderRadius="md"
              w="full"
              bg="gray.50"
              boxShadow="sm"
            >
              <Td>

              <Flex align="center" mb={3}>
                <Box as={FaDatabase} color="teal.500" boxSize="6" mr={3} />
                <Heading size="md">{db.db_name}</Heading>
              </Flex>
              </Td>
              <Td>
                <strong>{db.db_username}</strong> 
              </Td>

              <Td mb={3}>
              {! viewPassword && <FaRegEye  onClick={()=>setViewPassword(true)} size={40}/>}
              
                {viewPassword && 
                <>
                <FaRegEyeSlash  onClick={()=>setViewPassword(false)} size={40}/>
                <strong >{db.db_password}</strong>
                </>
                }
              </Td>
              <Flex align="center" justify="space-between">
                <Tooltip label="Copy URL to clipboard" aria-label="Copy URL">
                  <IconButton
                    aria-label="Copy URL"
                    icon={<FiCopy />}
                    onClick={() => copyToClipboard(db.db_url)}
                    size="sm"
                    variant="outline"
                    colorScheme="teal"
                  />
                </Tooltip>
                <Box>

                <Button
                  size="sm"
                  colorScheme="blue"
                  leftIcon={<FiSave />}
                  onClick={() => handleBackup(db.db_name)}
                  variant='link'
                  >
                  Backup
                </Button>
                <Button
                  size="sm"
                  colorScheme="blue"
                  leftIcon={<FiSave />}
                  variant='link'
                >
                  tables
                </Button>
                  </Box>
              </Flex>
            </Tr>
          ))}
          </Tbody>
        </Table>
      </Box>
    </>
  );
};

export default DatabaseDetailView;
