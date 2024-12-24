import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Heading,
  Text,
  Stack,
  Avatar,
  useToast,
  FormControl,
  FormLabel,
  Input,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalBody,
  ModalFooter,
  useDisclosure,
} from "@chakra-ui/react";
import Logout from "../authentication/LogOut";
import { useNavigate } from "react-router-dom";

import { useAuth } from "../authentication/AuthContext";
import apiClient from "../authentication/ApiClint";
import Cookies from "js-cookie";
interface User {
  id: number;
  username: string;
  email: string;
  profile_picture?: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true); // Start with true
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('access_token')

      try {
        const response = await apiClient.get("/api/users/me/", { 
         headers:{Authorization: `Bearer ${token}`}
        });
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
        if (error.response?.status === 401) {           
          logout()
        } else {
          toast({
            title: "Error fetching user.",
            description: "Something went wrong. Please try again later.",
            status: "error",
            duration: 3000,
            isClosable: true,
          });

        }
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [logout, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    setLoading(true); // Start loading
    const token = Cookies.get('access_token')
    try {
      const response = await apiClient.patch("/api/users/me/", updatedUser, {
        headers:{Authorization:`Beraer ${token}`}
      });
      setUser(response.data);
      toast({
        title: "Profile updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error: any) {
      // refreshToken()
      console.error("Failed to update user:", error);
      toast({
        title: "Update failed.",
        description:
          error.response?.data?.message || "Could not update your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false); // Stop loading
    }
  };

  if (loading) return <p>Loading......</p>;
  if (!user) return <p>User details were not found.</p>;

  return (
    <Box maxW="lg" mx="auto" py={10} px={6}>
      <Heading as="h1" mb={4} textAlign="center" color="purple.600">
        Welcome, {user.username}!
      </Heading>
      <Box display="flex" justifyContent="center" mb={6}>
        <Avatar
          size="2xl"
          name={user.username}
          src={user.profile_picture || "/placeholder.png"}
        />
      </Box>
      <Text fontSize="lg" textAlign="center" mb={6}>
        Email: {user.email}
      </Text>
      <Stack direction="row" spacing={4} justify="center" mb={6}>
        <Button onClick={onOpen} colorScheme="blue">
          Edit Profile
        </Button>
        <Button onClick={() => navigate("/reset-password")} colorScheme="red">
          Reset Password
        </Button>
      </Stack>
      <Logout />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <FormControl mb={4} isRequired>
              <FormLabel>Username</FormLabel>
              <Input
                value={updatedUser?.username || ""}
                name="username"
                onChange={handleChange}
                placeholder="Enter your new username"
              />
            </FormControl>
            <FormControl mb={4} isRequired>
              <FormLabel>Email</FormLabel>
              <Input
                type="email"
                value={updatedUser?.email || ""}
                name="email"
                onChange={handleChange}
                placeholder="Enter your new email"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button
              onClick={handleSave}
              colorScheme="blue"
              isLoading={loading}
            >
              Save
            </Button>
            <Button onClick={onClose} variant="ghost">
              Cancel
            </Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};


export default Profile;
