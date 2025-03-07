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
    Button,
  } from '@chakra-ui/react';
  import { ProductsProps } from '../products/ProductsCard';
  import useFetch from '../hooks/useFetch';
import { token } from './UserAccount';
  
  interface order {
    ref_number: Date;
    total_price: number;
    is_ordered:boolean
  }
  
  interface props {
    order: order;
    product: ProductsProps;
  }
  

  
  const OrderDetails: React.FC<props> = () => {
    const { data } = useFetch<props>(`/api/orders/get/`, token);
    const bgColor = useColorModeValue('white', 'gray.700');
    const cardBg = useColorModeValue('gray.50', 'gray.800');
    const textColor = useColorModeValue('gray.700', 'gray.200');
  
    return (
      <Stack spacing={8} mx="auto" maxW="800px" p={4}>
        if (!data) {
          <Text>you have no active orders</Text>
        }
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
            {!order.is_ordered && 
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
                <strong>Total Amount:</strong> ${order.total_price}
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
              <Button colorScheme='teal'>complete order</Button>
            </Stack>
      </>
  }
          </Box>


        ))}
      </Stack>
    );
  };
  
  export default OrderDetails;
  