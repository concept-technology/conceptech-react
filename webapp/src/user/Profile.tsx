import React, { useEffect, useState } from 'react';
import {
  Box, Button, Heading, Text, Stack, Avatar, useToast,
  FormControl, FormLabel, Input, Modal, ModalOverlay,
  ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from '@chakra-ui/react';
import Logout from '../authentication/LogOut';
import { useNavigate } from 'react-router-dom';
import api from '../authentication/ApiClint';
import { useAuth } from '../authentication/AuthContext';
import Cookies from 'js-cookie';

interface User {
  name?: string;
  email: string;
  username: string;
  profile_picture?: string; // Optional if the user doesn't have this field
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [updatedUser, setUpdatedUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const toast = useToast();
  const navigate = useNavigate();
  const { logout } = useAuth(); // Logout function from AuthContext

  useEffect(() => {
    const fetchUser = async () => {
      const token = Cookies.get('accessToken');

      if (!token) {
        navigate('/login');
        return;
      }

      setLoading(true);
      try {
        const response = await api.get('/api/users/me/', {
          withCredentials: true, // Ensure cookies are sent with the request
        });
        setUser(response.data);
        setUpdatedUser(response.data);
      } catch (error: any) {
        console.error("Failed to fetch user:", error);
        if (error.response?.status === 401) {
          Cookies.remove('accessToken');
          Cookies.remove('refreshToken');
          navigate('/login');
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
  }, [navigate, toast]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

  const handleSave = async () => {
    const token = Cookies.get('accessToken');
    if (!token || !updatedUser) return;
    setLoading(true);
    try {
      const response = await api.put('/auth/users/me/', updatedUser, {
        withCredentials: true,
      });
      setUser(response.data);
      setUpdatedUser(response.data);
      toast({
        title: "Profile updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose(); // Close modal after successful update
    } catch (error: any) {
      console.error("Failed to update user:", error);
      toast({
        title: "Update failed.",
        description: error.response?.data || "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p>Loading...</p>;
  if (!user) return <p>User details were not found.</p>;

  return (
    <Box maxW="lg" mx="auto" py={10} px={6}>
      <Heading as="h1" mb={4} textAlign="center" color="purple.600">
        Welcome, {user.username}!
      </Heading>
      <Box display="flex" justifyContent="center" mb={6}>
        <Avatar size="2xl" name={user.username} src={user.profile_picture || ''} />
      </Box>
      <Text fontSize="lg" textAlign="center" mb={6}>
        Email: {user.email}
      </Text>
      <Stack direction="row" spacing={4} justify="center" mb={6}>
        <Button onClick={onOpen} colorScheme="blue">Edit Profile</Button>
        <Button onClick={() => navigate('/reset-password')} colorScheme="red">Reset Password</Button>
      </Stack>
      <Logout />
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={updatedUser?.username || ''}
                name="username"
                onChange={handleChange}
                placeholder="Enter your new username"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={updatedUser?.email || ''}
                name="email"
                onChange={handleChange}
                placeholder="Enter your new email"
              />
            </FormControl>
          </ModalBody>
          <ModalFooter>
            <Button onClick={handleSave} colorScheme="blue" isLoading={loading}>
              Save
            </Button>
            <Button onClick={onClose} variant="ghost">Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
