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
import { FaDatabase, FaRegEye, FaRegEyeSlash } from "react-icons/fa";
import { FiCopy, FiSave } from "react-icons/fi";
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
  const [selectedDatabase, setSelectedDatabase] = useState<string | null>(null);
  const [tables, setTables] = useState<string[]>([]);
  const toast = useToast();
  const navigate = useNavigate();
  const [viewPassword, setViewPassword] = useState(false);
  const [viewTable, setViewTable] = useState(false)




  useEffect(() => {
    const fetchDatabaseDetail = async () => {
      const token = Cookies.get('accessToken');
      try {
        setLoading(true);
        const response = await apiClient.get(`/api/database/view/`, {
          headers: { Authorization: `Bearer ${token}` }
        });
        const details = Array.isArray(response.data) ? response.data : response.data.databases || [];
        setDatabaseDetail(details);
      } catch (err: any) {
        setError(err.response?.data?.error || "Failed to load data");
      } finally {
        setLoading(false);
      }
    };
    fetchDatabaseDetail();
  }, []);



  const fetchTables = async (db_name: string) => {
    setSelectedDatabase(db_name);
    setViewTable(true)
    setTables([]);
    try {
      const token = Cookies.get('accessToken');
      const response = await apiClient.post(`/api/list/database/tables/${db_name}/`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      setTables(response.data.tables);
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to fetch tables",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
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

  const handleDeleteTables = async (db_name: string) => {
    const token = Cookies.get("accessToken");
    console.log(db_name);
  
    try {
      const response = await apiClient.post(
        `/api/database/delete/${db_name}/`,
        {},
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );
  
      // ✅ Correct response check
      if ([200, 201, 204].includes(response.status)) {
        toast({
          title: "Success",
          description: "Database deleted successfully",
          status: "success",
          duration: 5000,
          isClosable: true,
        });
      } else {
        throw new Error("Unexpected response");
      }
    } catch (err: any) {
      toast({
        title: "Error",
        description: "Failed to delete database",
        status: "error",
        duration: 5000,
        isClosable: true,
      });
    }
  };
  


  return (
    <>
      <Helmet>
        <title>Concept Technologies | Database Service</title>
      </Helmet>
      <Flex direction={{ base: "column", lg: "row" }}>
        {/* Database List */}
        <Box flex={1} p={6} bg="white">
          <Heading size="lg" mb={4} textAlign="center">Database Details</Heading>
          <Button mb={4} onClick={() => navigate("/create/database")}>
            Create Database
          </Button>
          <Table borderWidth="1px" size="sm" variant="outline">
            <Thead>
              <Tr>
                <Th>Database Name</Th>
                <Th>User Name</Th>
                <Th>Password</Th>
                <Th>Action</Th>
              </Tr>
            </Thead>
            <Tbody>
              {databaseDetail.map((db) => (
                <Tr key={db.db_name}>
                  <Td>{db.db_name}</Td>
                  <Td>{db.db_username}</Td>
                  <Td>
                    {viewPassword ? (
                      <>
                        <FaRegEyeSlash onClick={() => setViewPassword(false)} /> {db.db_password}
                                          <Tooltip label="copy password" aria-label="Copy URL">
                                            <IconButton
                                              aria-label="Copy URL"
                                              icon={<FiCopy />}
                                              onClick={() => copyToClipboard(db.db_password)}
                                              size="sm"
                                              variant="outline"
                                              colorScheme="teal"
                                            />
                                          </Tooltip>
                      </>
                    ) : (
                      <FaRegEye onClick={() => setViewPassword(true)} />
                    )}
                  </Td>
                  <Td>
                    {! viewTable? 

                                    <Flex>

                                      <Button size="sm" m={2} colorScheme="blue" onClick={() => fetchTables(db.db_name)}>
                                      Tables
                                    </Button>
                                    <Button size="sm" m={2} colorScheme="red" onClick={() => handleDeleteTables(db.db_name)}>
                                      delete 
                                    </Button>
                                    </Flex>
                                    
                                    :
                                      <Button size="sm" colorScheme="blue" onClick={() => setViewTable(false)}>
                                        close table
                                    </Button>  
                  }
                  </Td>
                </Tr>
              ))}
            </Tbody>
          </Table>
        </Box>

        {/* Tables List */}
        {selectedDatabase &&  viewTable &&(
          <Box flex={1} p={6} bg="gray.50" borderLeft="1px solid #ccc">
            <Heading size="md" mb={4}>Tables in {selectedDatabase}</Heading>
            {tables.length > 0 ? (
              <VStack spacing={3} align="start">
                {tables.map((table, index) => (
                  <Text key={index}>{table}</Text>
                ))}

                <Button>Backup</Button>
              </VStack>
            ) : (
              <Text>No tables found.</Text>
            )}
          </Box>
        )}
      </Flex>
    </>
  );
};

export default DatabaseDetailView;
