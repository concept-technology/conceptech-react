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
  Spinner,
  useDisclosure,
} from "@chakra-ui/react";
import Logout from "../authentication/LogOut";
import { useNavigate } from "react-router-dom";
import apiClient, { token } from "../authentication/ApiClint";
import { useAuth, validateToken } from "../authentication/AuthContext";


interface User {
  id: number;
  username: string;
  email: string;
  profile_picture?: string;
}
// export const token = Cookies.get('access')

const UserAccount: React.FC = () => {
const {login} = useAuth()
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  // const { logout, isAuthenticated } = useAuth();

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const response = await apiClient.get<User>(`/api/users/me/`, {
          headers:{Authorization: `Bearer ${token}` }
        });
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
        if (error.response?.status === 401) {
          try{
            
          }catch{
            login()

            toast({
              title: "Session expired",
              description: "Please log in again.",
              status: "warning",
              duration: 3000,
              isClosable: true,
            });
          }
          
        } else {
          toast({
            title: "Error",
            description: "Unable to fetch user details.",
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
  }, [ validateToken, navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => (prev ? { ...prev, [name]: value } : null));
  };

  const handleSave = async () => {
    setLoading(true);
    try {
      const response = await apiClient.patch(`/api/users/me/`, updatedUser, {
        headers:{Authorization: `Bearer ${token}` }
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
      console.error("Failed to update user:", error);
      toast({
        title: "Error",
        description: "Unable to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  if (!user) return <p>User details were not found.</p>;

  const hasChanges =
    updatedUser?.username !== user?.username ||
    updatedUser?.email !== user?.email;

  return (
    <>
      {token && (
        <Box maxW="lg" mx="auto" py={10} px={6} bg='gray.100' borderRadius={14}>
          <Heading as="h1" mb={4} textAlign="center" color="purple.600">
            Welcome!
          </Heading>
          <Box display="flex" justifyContent="center" mb={6}>
            <Avatar
              size="2xl"
              name={user.username}
              src={user.profile_picture ?? "/placeholder.png"}
            />
          </Box>
          <Text fontSize="lg" textAlign="center" mb={6}>
             {user.email}
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
                  isDisabled={!hasChanges}
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
      )}
    </>
  );
};

export default UserAccount;
