import React, { useEffect, useState, useRef } from "react";
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
import { useDispatch, useSelector } from "react-redux";
import { RootState, AppDispatch } from "../app/store";
import { fetchUser, updateUser } from "../features/user/userThunks";
import Logout from "../authentication/LogOut";
import { useNavigate } from "react-router-dom";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import { setCredentials } from "../features/auth/authSlice";

const UserAccount: React.FC = () => {
  const dispatch = useDispatch<AppDispatch>();
  const navigate = useNavigate();
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  
  const { data:user, isFetching, error} = useGetUserDetailsQuery('userDetails', {
    // Perform a refetch every 4 minutes
    pollingInterval: 240000, 
  });
  
  const { isAuthenticated } = useSelector((state: RootState) => state.auth) || { isAuthenticated: false };

  const [updatedUser, setUpdatedUser] = useState({ username: "", email: "" });
  const [saving, setSaving] = useState(false);
  
  // Prevent unnecessary re-fetching
  useEffect(() => {
    if (user) dispatch(setCredentials(user))
  }, [user, dispatch])
  const fetchedRef = useRef(false);
  console.log('fetched user', user)

  // Update local state when user data is available
  useEffect(() => {
    if (user?.username?.trim()) {
      setUpdatedUser({ username: user.username, email: user.email });
    }
  }, [user]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setUpdatedUser((prev) => ({ ...prev, [name]: value }));
  };

  const handleSave = async () => {
    try {
      setSaving(true);
      await dispatch(updateUser(updatedUser)).unwrap();
      toast({
        title: "Profile updated.",
        description: "Your profile has been successfully updated.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      onClose();
    } catch (error) {
      toast({
        title: "Error",
        description: error || "Unable to update profile.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });
    } finally {
      setSaving(false);
    }
  };

  if (isFetching) {
    return (
      <Box display="flex" justifyContent="center" py={10}>
        <Spinner size="xl" color="purple.500" />
      </Box>
    );
  }

  if (error) {
    return (
      <Box textAlign="center" py={10}>
        <Text color="red.500">Error: </Text>
      </Box>
    );
  }

  if (!user?.username?.trim()) return <p>User details were not found.</p>;

  const hasChanges =
    updatedUser.username !== user.username || updatedUser.email !== user.email;

  return (
    <>
      {isAuthenticated && (
        <Box maxW="lg" mx="auto" py={10} px={6} bg="gray.100" borderRadius={14}>
          <Heading as="h1" mb={4} textAlign="center" color="purple.600">
            Welcome, {user.username}!
          </Heading>
          <Box display="flex" justifyContent="center" mb={6}>
            <Avatar
              size="2xl"
              name={user.username}
              src={user.profile_picture ? user.profile_picture : "/placeholder.png"}
            />
          </Box>
          <Text fontSize="lg" textAlign="center" mb={6}>
            {user.email}
          </Text>
          <Stack direction="row" spacing={4} justify="center" mb={6}>
            <Button onClick={onOpen} colorScheme="blue">
              Edit Profile
            </Button>
            <Button onClick={() => navigate("/change-password")} colorScheme="red">
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
                    value={updatedUser.username}
                    name="username"
                    onChange={handleChange}
                    placeholder="Enter your new username"
                  />
                </FormControl>
                <FormControl mb={4} isRequired>
                  <FormLabel>Email</FormLabel>
                  <Input
                    type="email"
                    value={updatedUser.email}
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
                  isLoading={saving}
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
