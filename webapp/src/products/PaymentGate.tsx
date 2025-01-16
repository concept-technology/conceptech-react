import React, { useState } from 'react';
import {
  Box,
  Stack,
  Heading,
  VStack,
  Text,
  HStack,
  Badge,
  Flex,
  Image,
  useColorModeValue,
  Divider,
  Spinner,
} from '@chakra-ui/react';
import { PaystackButton } from 'react-paystack';
import useFetch from '../Blog-Page/hooks/useFetch';
import apiClient, { token } from '../authentication/ApiClint';
import { useNavigate } from 'react-router-dom';

interface Order {
  ref_number: string;
  total_price: number;
  is_ordered: boolean;
  id: string;
  date: string;
  product: ProductProps[];
}

interface ProductProps {
  id: string;
  img: string;
  name: string;
  description: string;
  quantity: number;
}

const PaymentGate: React.FC = () => {
  const { data } = useFetch<Order[]>(`/api/orders/get/`, token);
  const bgColor = useColorModeValue('white', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const [loading, setLoading] = useState(false);
  const publicKey = 'pk_test_ea75ece062f2a82f8f18506dbeff5f085a1ca58a'; // Replace with your Paystack public key
const navigate = useNavigate()
  const handlePaymentSuccess = async (response: any, orderRef: string) => {
    setLoading(true);
    try {
      const apiResponse = await apiClient.post(
        `/api/payment/${response.reference}/verify/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      console.log('Payment verified:', apiResponse.data);
      navigate('/order/payment/success')
    } catch (error) {
        setLoading(false)
      console.error('Payment verification failed:', error);
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClose = () => {
    console.log('Payment closed');
  };

  return (
    <Stack spacing={8} mx="auto" maxW="800px" p={4}>
      <Heading size="lg" textAlign="center" color={textColor}>
        My Orders
      </Heading>

      {data.map((order) => (
        <Box
          key={order.ref_number}
          bg={cardBg}
          p={6}
          borderRadius="lg"
          shadow="md"
          transition="all 0.3s"
          _hover={{ shadow: 'lg' }}
        >
          {loading ? (
            <VStack spacing={4} align="center">
              <Spinner size="lg" color="teal.500" />
              <Text color="teal.500" fontWeight="bold">
                Processing payment, please wait...
              </Text>
            </VStack>
          ) : (
            <>
              <VStack align="start" spacing={4}>
                <Heading size="md" color={textColor}>
                  Order Details
                </Heading>
                <Text>
                  <strong>Order Ref:</strong> {order.ref_number}
                </Text>
                <Text>
                  <strong>Order ID:</strong> {order.id}
                </Text>
                <Text>
                  <strong>Order Date:</strong> {order.date}
                </Text>
                <Text fontSize="lg" fontWeight="bold" color="teal.500">
                  <strong>Total Amount:</strong> ₦{order.total_price}
                </Text>
              </VStack>

              <Divider my={6} />

              <Heading size="sm" mb={4} color={textColor}>
                Products
              </Heading>
              <Stack spacing={4}>
                {order.product.map((product) => (
                  <Flex
                    key={product.id}
                    bg={bgColor}
                    p={4}
                    borderRadius="md"
                    shadow="sm"
                    transition="all 0.3s"
                    _hover={{ shadow: 'lg' }}
                  >
                    <Box boxSize="100px" flexShrink={0} mr={4}>
                      <Image
                        src={product.img}
                        alt={product.name}
                        boxSize="100%"
                        objectFit="cover"
                        borderRadius="md"
                      />
                    </Box>
                    <VStack align="start" spacing={1} flex="1">
                      <Text fontWeight="bold" fontSize="lg" color={textColor}>
                        {product.name}
                      </Text>
                      <Text fontSize="sm" color="gray.500">
                        {product.description}
                      </Text>
                      <HStack>
                        <Badge colorScheme="blue">Quantity: {product.quantity}</Badge>
                      </HStack>
                    </VStack>
                  </Flex>
                ))}
              </Stack>

              <PaystackButton
                amount={order.total_price * 100} // Convert to kobo
                email="user@example.com" // Replace with user's email
                publicKey={publicKey}
                text={`Pay ₦${order.total_price}`}
                reference={order.ref_number}
                onSuccess={(response) => handlePaymentSuccess(response, order.ref_number)}
                onClose={handlePaymentClose}
                className="chakra-button"
              />
            </>
          )}
        </Box>
      ))}
    </Stack>
  );
};

export default PaymentGate;
