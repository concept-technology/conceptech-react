import React, { useRef, useState } from "react";
import ReCAPTCHA from "react-google-recaptcha";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  FormControl,
  FormErrorMessage,
  FormLabel,
  Input,
  Text,
  Textarea,
  VStack,
  Heading,
  HStack,
  Icon,
  Stack,
} from "@chakra-ui/react";
import { PhoneIcon, EmailIcon } from "@chakra-ui/icons";
import { FaMapMarkerAlt } from "react-icons/fa";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import Cookies from "js-cookie";
import apiClient from "../../api/authApi";
import { useNavigate } from "react-router-dom";
interface FormData {
  name: string;
  email: string;
  subject: string;
  message: string;
}

const ContactForm: React.FC = () => {
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [phone, setPhone] = useState("");
  const navigate = useNavigate()
  const [loading, setLoading] = useState(false)
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>();
  const [captchaValidated, setCaptchaValidated] = useState(false);

  const onSubmit = async (data: FormData) => {
    setLoading(true)
    if (!captchaValidated) {
      alert("Please complete the CAPTCHA");
      return;
    }
  
    if (!phone) {
      alert("Please enter your phone number");
      return;
    }
  
    const token = Cookies.get("access");
    try {
      const payload = {
        ...data,
        phone_number: phone, // Manually include phone number
        captcha: recaptchaRef.current?.getValue(),
      };
      console.log(payload)
  
      const response = await apiClient.post("/api/contact/submit/", payload, {
        headers: { Authorization: `Bearer ${token}` },
      });
      reset();
      setPhone(""); // Clear phone input
      recaptchaRef.current?.reset();
      setCaptchaValidated(false);
      navigate('/sucessful')
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleCaptchaChange = (value: string | null) => {
    setCaptchaValidated(!!value);
  };

  return (
    <Box py={10} px={5} bg="gray.50" id="contact">
      <Container maxW={["container.sm", "container.md", "container.lg"]}>
        <VStack spacing={10} align="stretch">
          <Box textAlign="center">
            <Heading>Contact Us</Heading>
            <Text mt={3} color="gray.600">
              We’re always open to discussing new projects, creative ideas, or opportunities to be part of your vision.
              Feel free to reach out!
            </Text>
          </Box>

          <Stack
            spacing={10}
            direction={["column", "column", "row"]}
            align="stretch"
          >
            {/* Contact Info */}
            <VStack align="stretch" flex="1" spacing={6}>
              <Box>
                <Heading as="h5" size="sm" mb={2}>
                  Contact Me:
                </Heading>
                <Text color="gray.600">
                  Please fill out the form below, and I'll get back to you as soon as possible.
                </Text>
              </Box>
              <HStack>
                <a href="tel:+2348143006319">
                <Box>
                <Icon as={PhoneIcon} w={[4, 6]} h={[4, 6]} color="blue.500" />
                  <Text fontWeight="bold"> +234 814 300 6319</Text>
                </Box>
                    </a>
              </HStack>
              <HStack>
                <a href="mailto:info@concept-techsolutions.dev">
                <Icon as={EmailIcon} w={[4, 6]} h={[4, 6]} color="blue.500" />
                <Box>
                  <Text fontWeight="bold">Email:</Text>
                  <Text color="gray.600">info@concept-techsolutions.dev</Text>
                </Box>
                </a>
              </HStack>
              <HStack>
                <Icon as={FaMapMarkerAlt} w={[4, 6]} h={[4, 6]} color="blue.500" />
                <Box>
                  <Text fontWeight="bold">Address:</Text>
                  <Text color="gray.600">
                    No. 160, Samuel Ladoke Akintola Boulevard, Garki 2, Abuja
                  </Text>
                </Box>
              </HStack>
            </VStack>

            {/* Contact Form */}
            <Box flex="2" bg="white" boxShadow="md" p={6} rounded="md">
              <form onSubmit={handleSubmit(onSubmit)}>
                <VStack spacing={4} align="stretch">
                  <FormControl isInvalid={!!errors.name}>
                    <FormLabel htmlFor="form_name">Name</FormLabel>
                    <Input
                      id="form_name"
                      placeholder="Name"
                      {...register("name", { required: "Name is required" })}
                    />
                    <FormErrorMessage>{errors.name && errors.name.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.email}>
                    <FormLabel htmlFor="form_email">Email</FormLabel>
                    <Input
                      id="form_email"
                      type="email"
                      placeholder="Email"
                      {...register("email", { required: "Email is required" })}
                    />
                    <FormErrorMessage>{errors.email && errors.email.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl>
                    <FormLabel>Phone Number</FormLabel>
                    <PhoneInput
                      country={"us"}
                      value={phone}
                      onChange={(phone) => setPhone(phone)}
                      inputProps={{
                        name: "phone_number",
                        required: true,
                        autoFocus: false,
                      }}
                    />
                  </FormControl>

                  <FormControl isInvalid={!!errors.subject}>
                    <FormLabel htmlFor="form_subject">Subject</FormLabel>
                    <Input
                      id="form_subject"
                      placeholder="Subject"
                      {...register("subject", { required: "Subject is required" })}
                    />
                    <FormErrorMessage>{errors.subject && errors.subject.message}</FormErrorMessage>
                  </FormControl>

                  <FormControl isInvalid={!!errors.message}>
                    <FormLabel htmlFor="form_message">Message</FormLabel>
                    <Textarea
                      id="form_message"
                      placeholder="Message"
                      {...register("message", { required: "Message is required" })}
                    />
                    <FormErrorMessage>{errors.message && errors.message.message}</FormErrorMessage>
                  </FormControl>

                  <Box>
                    <ReCAPTCHA
                      ref={recaptchaRef} 
                      sitekey={import.meta.env.VITE_GOOOGLE_ReCAPTCHA_key}
                      onChange={handleCaptchaChange}
                    />
                  </Box> 
                  { !loading ? <Button
                    type="submit"
                    colorScheme="blue"
                    disabled={!captchaValidated}
                  >
                    Send Message
                  </Button>:
                                    <Button
                                    type="submit"
                                    colorScheme="blue"
                                    isLoading={loading} loadingText="contacting admin"
                                  >
                                    loading
                                  </Button>}
                </VStack>
              </form>
            </Box>
          </Stack>
        </VStack>
      </Container>
    </Box>
  );
};

export default ContactForm;
