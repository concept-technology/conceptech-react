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
  } from '@chakra-ui/react';
  import useFetch from '../hooks/useFetch';
import { token } from '../api/apiClient';
  
  interface Product {
    id: number;
    name: string;
    description: string;
    img: string;
    quantity: number;
  }
  
  interface Order {
    id: number;
    date: string;
    ref_number: string;
    total_price: string;
    is_producted: boolean;
    product: Product[];
  }
  
  const PaidOrderDetails: React.FC = () => {
    const { data } = useFetch<Order[]>(`/api/orders/payment/`, token);
    const bgColor = useColorModeValue('white', 'gray.700');
    const cardBg = useColorModeValue('gray.50', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
  
    if (!data || data.length === 0) {
      return (
        <Text align="center" fontSize="lg" color={textColor}>
          You have no active products.
        </Text>
      );
    }
  
    return (
      <Stack spacing={8} mx="auto" maxW="800px" p={4} bg='gray.100' borderRadius={15}>
          <Heading size={'lg'} alignSelf={'center'} m={0}p={0}>orders</Heading>
        {data.map((product) => (
          <Box
            key={product.ref}
            bg={cardBg}
            p={6}
            borderRadius="lg"
            shadow="md"
            transition="all 0.3s"
            _hover={{ shadow: 'xl' }}
          >
                <VStack align="start" spacing={4}>
                  <Heading size="md" color={textColor}>
                    Order Details
                  </Heading>
                  <Text>
                    <strong>Order Ref:</strong> {product.ref}
                  </Text>
                  <Text>
                    <strong>Payment ID:</strong> {product.id}
                  </Text>
                  <Text>
                    <strong>Order Date:</strong> {new Date(product.purchase_date).toLocaleString()}
                  </Text>
                  <Text fontSize="lg" fontWeight="bold" color="teal.500">
                    {/* <strong>Total Amount:</strong> ${parseFloat(product.total_price).toFixed(2)} */}
                  </Text>
                </VStack>
  
                <Divider my={6} />
  
                <Heading size="sm" mb={4} color={textColor}>
                  {/* Products */}
                </Heading>
                <Stack spacing={4}>
                  {product.order.product.map((product) => (
                    <Flex
                      key={product.id}
                      bg={bgColor}
                      p={4}
                      borderRadius="md"
                      shadow="sm"
                      transition="all 0.3s"
                      _hover={{ shadow: 'lg' }}
                    >
                      {/* Product Image */}
                      <Box boxSize="100px" flexShrink={0} mr={4}>
                        <Image
                          src={product.img}
                          alt={product.name}
                          boxSize="100%"
                          objectFit="cover"
                          borderRadius="md"
                        />
                      </Box>
  
                      {/* Product Details */}
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
          </Box>
        ))}
      </Stack>
    );
  };
  
  export default PaidOrderDetails;
  