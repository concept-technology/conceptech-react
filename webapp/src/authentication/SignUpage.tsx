import React, { useState } from 'react';
import { useForm, Controller, SubmitHandler } from 'react-hook-form';
import { Box, Button, FormControl, FormLabel, Input, InputGroup, InputLeftElement, InputRightElement, Stack, Heading, Text, useToast, Icon } from '@chakra-ui/react';
import { FaGoogle, FaFacebook, FaEnvelope, FaLock, FaPhone } from 'react-icons/fa';
import { ViewIcon, ViewOffIcon } from '@chakra-ui/icons';
import PhoneInput from 'react-phone-input-2';
import 'react-phone-input-2/lib/style.css';

interface SignupFormData {
  phoneNumber: string;
  email: string;
  password: string;
  confirmPassword: string;
}

const SignupPage: React.FC = () => {
  const { handleSubmit, control, register, formState: { errors }, getValues } = useForm<SignupFormData>();
  const toast = useToast();

  // State for password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const onSubmit: SubmitHandler<SignupFormData> = (data) => {
    toast({
      title: 'Account created.',
      description: `Phone: ${data.phoneNumber}, Email: ${data.email}`,
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
  };

  return (
    <Box
      minHeight="100vh"
      display="flex"
      justifyContent="center"
      alignItems="center"
      bgGradient="linear(to-r, orange.400, pink.500)"
      py={8}
    >
      <Box
        maxWidth="sm"
        width="full"
        p={6}
        borderRadius="lg"
        bg="white"
        boxShadow="xl"
      >
        <Heading mb={6} textAlign="center" color="pink.600">Sign Up</Heading>

        <form onSubmit={handleSubmit(onSubmit)}>
          <Stack spacing={4}>
            {/* Phone Number Input */}
            <FormControl isInvalid={!!errors.phoneNumber}>
              <FormLabel htmlFor="phoneNumber">Phone Number</FormLabel>
              <Controller
                name="phoneNumber"
                control={control}
                rules={{ required: 'Phone number is required' }}
                render={({ field: { onChange, value } }) => (
                  <PhoneInput
                    country="us"
                    value={value}
                    onChange={(phone) => onChange(`+${phone}`)} // Ensures "+" is included
                    inputStyle={{
                      width: '100%',
                      height: '40px',
                      fontSize: '16px',
                    }}
                    buttonStyle={{
                      background: 'none',
                      border: 'none',
                    }}
                  />
                )}
              />
              {errors.phoneNumber && <Text color="red.500">{errors.phoneNumber.message}</Text>}
            </FormControl>

            {/* Email Input */}
            <FormControl isInvalid={!!errors.email}>
              <FormLabel htmlFor="email">Email</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaEnvelope} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="email"
                  type="email"
                  placeholder="Enter your email"
                  {...register('email', { 
                    required: 'Email is required', 
                    pattern: {
                      value: /^[A-Za-z0-9._%+-]+@[A-Za-z0-9.-]+\.[A-Za-z]{2,}$/,
                      message: 'Invalid email address',
                    }
                  })}
                />
              </InputGroup>
              {errors.email && <Text color="red.500">{errors.email.message}</Text>}
            </FormControl>

            {/* Password Input */}
            <FormControl isInvalid={!!errors.password}>
              <FormLabel htmlFor="password">Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="password"
                  type={showPassword ? 'text' : 'password'}
                  placeholder="Enter your password"
                  {...register('password', { required: 'Password is required' })}
                />
                <InputRightElement>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowPassword(!showPassword)}
                  >
                    {showPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.password && <Text color="red.500">{errors.password.message}</Text>}
            </FormControl>

            {/* Confirm Password Input */}
            <FormControl isInvalid={!!errors.confirmPassword}>
              <FormLabel htmlFor="confirmPassword">Confirm Password</FormLabel>
              <InputGroup>
                <InputLeftElement pointerEvents="none">
                  <Icon as={FaLock} color="gray.400" />
                </InputLeftElement>
                <Input
                  id="confirmPassword"
                  type={showConfirmPassword ? 'text' : 'password'}
                  placeholder="Confirm your password"
                  {...register('confirmPassword', { 
                    required: 'Confirm password is required',
                    validate: (value) => value === getValues('password') || 'Passwords do not match'
                  })}
                />
                <InputRightElement>
                  <Button
                    variant="ghost"
                    size="sm"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                  >
                    {showConfirmPassword ? <ViewOffIcon /> : <ViewIcon />}
                  </Button>
                </InputRightElement>
              </InputGroup>
              {errors.confirmPassword && <Text color="red.500">{errors.confirmPassword.message}</Text>}
            </FormControl>

            {/* Submit Button */}
            <Button colorScheme="pink" type="submit" width="full">
              Sign Up
            </Button>

            <Text textAlign="center" mt={4}>OR</Text>

            {/* Google Login Button */}
            <Button
              leftIcon={<Icon as={FaGoogle} />}
              colorScheme="red"
              variant="outline"
              width="full"
              onClick={() => (window.location.href = '/auth/google/')}
            >
              Sign Up with Google
            </Button>

            {/* Facebook Login Button */}
            <Button
              leftIcon={<Icon as={FaFacebook} />}
              colorScheme="facebook"
              variant="outline"
              width="full"
              onClick={() => (window.location.href = '/auth/facebook/')}
            >
              Sign Up with Facebook
            </Button>

            <Text textAlign="center" mt={2}>
              Already have an account? <a href="/login">Log in</a>
            </Text>
          </Stack>
        </form>
      </Box>
    </Box>
  );
};

export default SignupPage;
