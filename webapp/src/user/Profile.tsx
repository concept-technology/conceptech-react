import React, { useEffect, useState } from 'react';
import { Box, Button, Heading, Text, Stack, Avatar, Link, useToast, FormControl, FormLabel, Input, IconButton, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalBody, ModalFooter } from '@chakra-ui/react';
import { FaUser, FaKey } from 'react-icons/fa';
import apiClient from '../authentication/ApiClint';
import Logout from '../authentication/LogOut';
import { useNavigate } from 'react-router-dom'; // Import useNavigate

const Profile: React.FC = () => {
  const [user, setUser] = useState<any>(null);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isEditing, setIsEditing] = useState(false);
  const [updatedUser, setUpdatedUser] = useState<any>(null);
  const toast = useToast();
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('authToken');
      try {
        const response = await apiClient.get('/auth/users/me/', {
          headers: { Authorization: `Token ${token}` },
        });
        setUser(response.data);
        setUpdatedUser(response.data); // Initialize the state with user data for editing
      } catch (error) {
        console.error("Failed to fetch user:", error);
      }
    };

    fetchUser();
  }, []);

  const handleSave = async () => {
    const token = localStorage.getItem('authToken');
    try {
      const response = await apiClient.put('/auth/users/me/', updatedUser, {
        headers: { Authorization: `Token ${token}` },
      });
      setUser(response.data);
      setUpdatedUser(response.data); // Reset updated user state to the saved data
      setIsEditing(false);
      toast({
        title: "Profile updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
    } catch (error) {
      console.error("Failed to update user:", error);
      toast({
        title: "Update failed.",
        description: "There was an error updating your profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser({ ...updatedUser, [name]: value });
  };

  if (!user) return <p>Loading...</p>;

  return (
    <Box maxW="lg" mx="auto" py={10} px={6}>
      <Heading as="h1" mb={4} textAlign="center" color="purple.600">Welcome, {user.username}!</Heading>

      <Box display="flex" justifyContent="center" mb={6}>
        <Avatar size="2xl" name={user.username} src={user.profile_picture} />
      </Box>

      <Box textAlign="center" mb={6}>
        <Text fontSize="lg" fontWeight="medium">Email: {user.email}</Text>
        <Text fontSize="md" mt={2}>Username: {user.username}</Text>
      </Box>

      <Stack direction="row" spacing={4} justify="center" mb={6}>
        <Button colorScheme="blue" onClick={onOpen} leftIcon={<FaUser />} size="lg">Edit Profile</Button>
        <Button colorScheme="red" leftIcon={<FaKey />} size="lg" onClick={() => navigate("/reset-password")}>Reset Password</Button>
      </Stack>

      <Box textAlign="center">
        <Logout />
      </Box>

      {/* Edit Profile Modal */}
      <Modal isOpen={isOpen} onClose={onClose}>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Edit Profile</ModalHeader>
          <ModalBody>
            <FormControl mb={4}>
              <FormLabel>Username</FormLabel>
              <Input
                value={updatedUser.username}
                onChange={handleChange}
                name="username"
                placeholder="Enter your new username"
              />
            </FormControl>
            <FormControl mb={4}>
              <FormLabel>Email</FormLabel>
              <Input
                value={updatedUser.email}
                onChange={handleChange}
                name="email"
                placeholder="Enter your new email"
              />
            </FormControl>
            {/* Add other fields like name, profile picture URL if available */}
          </ModalBody>
          <ModalFooter>
            <Button colorScheme="blue" mr={3} onClick={handleSave}>
              Save Changes
            </Button>
            <Button variant="ghost" onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
    </Box>
  );
};

export default Profile;
