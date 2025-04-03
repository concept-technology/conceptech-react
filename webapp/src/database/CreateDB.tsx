import React, { useEffect } from "react";
import {
  Box,
  Button,
  FormControl,
  FormLabel,
  Input,
  VStack,
  Heading,
  Alert,
  AlertIcon,
  useToast,
  FormHelperText,
} from "@chakra-ui/react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import Footer from "../Home-page/components/Footer";
import apiClient from "../api/authApi";
import { refreshToken } from "../app/services/auth/refreshToken";
import Cookies from 'js-cookie'
import { Field } from "../components/ui/field";
// Define the form input types
type FormInputs = {
  name: string;
  user_name: string;
  password: string;
};

const CreateDatabaseForm: React.FC = () => {
    const navigate = useNavigate()
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<FormInputs>();

  const toast = useToast();

  // Submit handler
  const onSubmit: SubmitHandler<FormInputs> = async (data) => {
   console.log(data)
    try {
        refreshToken()

      const token = Cookies.get('accessToken')
      const response = await apiClient.post(`/api/database/`, data,{
        headers:{Authorization:`Bearer ${token}`}
      });
      toast({
        title: "Success",
        description: response.data.message,
        status: "success",
        duration: 5000,
        isClosable: true,
      });
      navigate('/database/view');


    } catch (err: any) {
        toast({
            title: "Error",
            description: JSON.stringify(err.response?.data) || "Something went wrong.",
            status: "error",
          });
          
    }
  };

  return (
    <>
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

    <Button onClick={()=>navigate(-1)}>back</Button>
      <Heading size="lg" mb={4} textAlign="center">
        Create Database
      </Heading>
      <form onSubmit={handleSubmit(onSubmit)}>
        <VStack spacing={4}>
          <FormControl id="name" isInvalid={!!errors.name}>
            <FormLabel>Database Name</FormLabel>
            <Input
              placeholder="Enter database name"
              {...register("name", { required: "Database name is required" })}
              />
            {errors.name && (
                <Alert status="error" mt={2}>
                <AlertIcon />
                {errors.name.message}
              </Alert>
            )}
            <FormHelperText>when created, the server will automatically generate usename and password</FormHelperText>
          </FormControl>


          <Button
            type="submit"
            colorScheme="blue"
            
            isLoading={isSubmitting}
            >
            Create Database
          </Button>
        </VStack>
      </form>

    </Box>
    <Footer/>
    </>
  );
};

export default CreateDatabaseForm;
