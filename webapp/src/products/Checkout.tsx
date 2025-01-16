import { useForm, Controller } from "react-hook-form";
import PhoneInput from "react-phone-input-2";
import "react-phone-input-2/lib/style.css";
import {
  Box,
  Button,
  Flex,
  FormControl,
  FormLabel,
  Heading,
  Input,
  Select,
  VStack,
  Text,
  Stack,
  HStack,
  Divider,
  useToast,
} from "@chakra-ui/react";
import BackButton from "../utils/BackButton";
import useFetch from "../Blog-Page/hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { SITE_DOMAIN, token } from "../authentication/ApiClint";
import axios from "axios";
import { useAuth } from "../authentication/AuthContext";

interface Props {
  name: string;
  base_price: number;
  discount_price: number;
}

interface FormValues {
  streetAddress: string;
  town: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  telephone: string;
  paymentOption: string;
}

const CheckoutPage = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const { data } = useFetch<Props[]>(`/api/products/${id}/${slug}/`, token);
  const { login } = useAuth();
  const toast = useToast();
  const navigate = useNavigate()

  const {
    handleSubmit,
    register,
    control,
    formState: { errors },
    setValue,
  } = useForm<FormValues>({
    defaultValues: {
      streetAddress: "",
      town: "",
      city: "",
      state: "",
      zipCode: "",
      country: "",
      telephone: "",
      paymentOption: "",
    },
  });

  const onSubmit = async (formData: FormValues) => {
    console.log(formData)
    try {
      const response = await axios.post(
        `${SITE_DOMAIN}/api/order/create/${id}/${slug}/`,
        formData,
        {
          headers: { Authorization: `Bearer ${token}` },
        }
      );

      toast({
        title: "Order Submitted",
        description: "Your order has been placed successfully.",
        status: "success",
        duration: 3000,
        isClosable: true,
      });
      navigate('/order/payment')
      console.log("Order Response:", response.data);
    } catch (error: any) {
      if (error.response && error.response.status === 401) {
        location.reload()
        login();
      }

      toast({
        title: "Error",
        description: error.response?.data?.detail || "There was an error.",
        status: "error",
        duration: 3000,
        isClosable: true,
      });

      console.error("Error Response:", error.response || error.message);
    }
  };

  return (
    <Box p={6} bg="gray.50" minH="100vh">
      <BackButton />
      <Flex justify="center" align="start" wrap="wrap" gap={10}>
        {/* Checkout Form */}
        <Box
          w={{ base: "100%", md: "60%" }}
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="lg" mb={6}>
            Checkout
          </Heading>
          <form onSubmit={handleSubmit(onSubmit)}>
            <VStack spacing={4} align="start">
              <FormControl isInvalid={!!errors.streetAddress} isRequired>
                <FormLabel>Street Address</FormLabel>
                <Input
                  {...register("streetAddress", { required: "Street Address is required" })}
                  placeholder="123 Main St"
                />
                {errors.streetAddress && (
                  <Text color="red.500" fontSize="sm">
                    {errors.streetAddress.message}
                  </Text>
                )}
              </FormControl>
              <HStack spacing={4}>
                <FormControl>
                  <FormLabel>Town</FormLabel>
                  <Input
                    {...register("town")}
                    placeholder="Town"
                  />
                </FormControl>
                <FormControl isInvalid={!!errors.city} isRequired>
                  <FormLabel>City</FormLabel>
                  <Input
                    {...register("city", { required: "City is required" })}
                    placeholder="City"
                  />
                  {errors.city && (
                    <Text color="red.500" fontSize="sm">
                      {errors.city.message}
                    </Text>
                  )}
                </FormControl>
              </HStack>
              <HStack spacing={4}>
                <FormControl isInvalid={!!errors.state} isRequired>
                  <FormLabel>State</FormLabel>
                  <Select
                    {...register("state", { required: "State is required" })}
                    placeholder="Select State"
                  >
                    <option value="Lagos">Lagos</option>
                    <option value="Abuja">Abuja</option>
                    <option value="Kaduna">Kaduna</option>
                  </Select>
                  {errors.state && (
                    <Text color="red.500" fontSize="sm">
                      {errors.state.message}
                    </Text>
                  )}
                </FormControl>
                <FormControl>
                  <FormLabel>Zip Code</FormLabel>
                  <Input
                    {...register("zipCode")}
                    placeholder="Zip Code"
                  />
                </FormControl>
              </HStack>
              <FormControl isInvalid={!!errors.telephone} isRequired>
                <FormLabel>Telephone</FormLabel>
                <Controller
                  name="telephone"
                  control={control}
                  render={({ field }) => (
                    <PhoneInput
                      country="us"
                      value={field.value}
                      onChange={(value, data) => {
                        field.onChange(value);
                        setValue("country", data.name || "");
                      }}
                      inputStyle={{ width: "100%" }}
                      containerStyle={{ width: "100%" }}
                    />
                  )}
                />
                {errors.telephone && (
                  <Text color="red.500" fontSize="sm">
                    {errors.telephone.message}
                  </Text>
                )}
              </FormControl>
              <FormControl isRequired>
                <FormLabel>Country</FormLabel>
                <Input
                  {...register("country")}
                  placeholder="Country"
                  isReadOnly
                />
              </FormControl>
              <FormControl isInvalid={!!errors.paymentOption} isRequired>
                <FormLabel>Payment Option</FormLabel>
                <Select
                  {...register("paymentOption", { required: "Payment Option is required" })}
                  placeholder="Select Payment Option"
                >
                  <option value="paystack">Credit Card</option>
                  <option value="paypal">PayPal</option>
                  <option value="bank_transfer">Bank Transfer</option>
                </Select>
                {errors.paymentOption && (
                  <Text color="red.500" fontSize="sm">
                    {errors.paymentOption.message}
                  </Text>
                )}
              </FormControl>
              <Button colorScheme="blue" w="full" type="submit">
                Place Order
              </Button>
            </VStack>
          </form>
        </Box>

        {/* Order Summary */}
        <Box
          w={{ base: "100%", md: "35%" }}
          bg="white"
          p={6}
          rounded="lg"
          shadow="md"
        >
          <Heading size="md" mb={6}>
            Order Summary
          </Heading>
          {data?.map((product) => (
            <Stack spacing={4} key={product.name}>
              <Flex justify="space-between">
                <Text>{product.name}</Text>
              </Flex>
              <Divider />
              <Flex justify="space-between" fontWeight="bold">
                <Text>Total</Text>
                <Text>${product.discount_price}</Text>
              </Flex>
            </Stack>
          ))}
        </Box>
      </Flex>
    </Box>
  );
};

export default CheckoutPage;
