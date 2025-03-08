
import  { useState } from 'react';
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
  Button,
  useToast,
  useDisclosure,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalCloseButton,
  ModalBody,
  ModalFooter
} from '@chakra-ui/react';
import { PaystackButton } from 'react-paystack';
import useFetch from '../hooks/useFetch';
import { useNavigate } from 'react-router-dom';
import { token } from '../api/apiClient';
import apiClient from '../api/authApi';

// Order Interface
interface Order {
  ref_number: string;
  total_price: number;
  is_ordered: boolean;
  id: string;
  date: string;
  denomination?: string;
  product: ProductProps[];
  user: UserProps |null;
}

// Product Interface
interface ProductProps {
  id: string;
  img: string;
  name: string;
  description: string;
  quantity: number;
}

// User Interface
interface UserProps {
  email: string;
  username: string;
  phonenumber: string;
}

// Paystack Response Interface
interface PaystackResponse {
  reference: string;
  status: string;
  message: string;
}


const paystackPublicKey = import.meta.env.VITE_PAYSTACK_PUBLIC_KEY;

const PaymentGate = () => {
  const { data: orders} = useFetch<Order>(`/api/orders/get/`, token);
  const toast = useToast();
  const { isOpen, onOpen, onClose } = useDisclosure();
  const bgColor = useColorModeValue('white', 'gray.700');
  const cardBg = useColorModeValue('gray.50', 'gray.800');
  const textColor = useColorModeValue('gray.700', 'gray.200');
  const [loading, setLoading] = useState(false);
  const [selectedOrder, setSelectedOrder] = useState<Order>();
  const [success, setSuccess] = useState(false)
  const navigate = useNavigate();


    if(!orders){
    navigate('/account/profile')
    }

  const handlePaymentSuccess = async (response:PaystackResponse) => {
    setLoading(true);
    setSuccess(true)
    try {
      await apiClient.post(
        `/api/payment/${response.reference}/verify/`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      toast({ title: 'Payment Successful!', status: 'success', duration: 3000, isClosable: true });
      navigate('/order/payment/success');
    } catch (error) {
      toast({ title: 'Payment Verification Failed', description: error.message, status: 'error', duration: 3000, isClosable: true });
    } finally {
      setLoading(false);
    }
  };

  const handlePaymentClose = () => {
    toast({ title: 'Payment Window Closed', status: 'info', duration: 2000, isClosable: true });
  };

  const openPaymentModal = (order) => {
    setSelectedOrder(order);
    onOpen();
  };

  return (
    <Stack spacing={8} mx='auto' maxW='800px' p={4}>
      <Heading size='lg' textAlign='center' color={textColor}>My Orders</Heading>
      {orders.map((order) => (
        <Box key={order.ref_number} bg={cardBg} p={6} borderRadius='lg' shadow='md' _hover={{ shadow: 'lg' }}>
          {loading ? (
            <VStack spacing={4} align='center'>
              <Spinner size='lg' color='teal.500' />
              <Text color='teal.500' fontWeight='bold'>Processing payment, please wait...</Text>
            </VStack>
          ) : (
            <>
              <VStack align='start' spacing={4}>
                <Heading size='md' color={textColor}>Order Details</Heading>
                <Text><strong>Order Ref:</strong> {order.ref_number}</Text>
                <Text><strong>Order Date:</strong> {order.date}</Text>
                <Text fontSize='lg' fontWeight='bold' color='teal.500'>Total Amount: ₦{order.total_price}</Text>
              </VStack>
              <Divider my={6} />
              <Heading size='sm' mb={4} color={textColor}>Products</Heading>
              <Stack spacing={4}>
                {order.product.map((product) => (
                  <Flex key={product.id} bg={bgColor} p={4} borderRadius='md' shadow='sm' _hover={{ shadow: 'lg' }}>
                    <Box boxSize='100px' flexShrink={0} mr={4}>
                      <Image src={product.img} alt={product.name} boxSize='100%' objectFit='cover' borderRadius='md' />
                    </Box>
                    <VStack align='start' spacing={1} flex='1'>
                      <Text fontWeight='bold' fontSize='lg' color={textColor}>{product.name}</Text>
                      <Text fontSize='sm' color='gray.500'>{product.description}</Text>
                      <HStack>
                        <Badge colorScheme='blue'>Quantity: {product.quantity}</Badge>
                      </HStack>
                    </VStack>
                  </Flex>
                ))}
              </Stack>
              <Button mt={4} colorScheme='teal' onClick={() => openPaymentModal(order)}>
                Proceed to Pay
              </Button>
            </>
          )}
        </Box>
      ))}

{!success &&      <Modal isOpen={isOpen} onClose={onClose} isCentered>
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Confirm Payment</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Text>Are you sure you want to proceed with the payment for order <strong>{selectedOrder?.ref_number}</strong>?</Text>
          </ModalBody>
          <ModalFooter>
            <Button colorScheme='red' mr={3} onClick={onClose}>Cancel</Button>
            <PaystackButton
              amount={selectedOrder?.total_price *100}
              email={selectedOrder?.user?.email}
              publicKey={paystackPublicKey}
              text={`Pay ₦${selectedOrder?.total_price}`}
              reference={selectedOrder?.ref_number}
              onSuccess={(response)=>handlePaymentSuccess(response)}
              onClose={handlePaymentClose}
              className='chakra-button'
              disabled={loading}
            />
          </ModalFooter>
        </ModalContent>
      </Modal>}
    </Stack>
  );
};

export default PaymentGate;
