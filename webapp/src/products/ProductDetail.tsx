import {
  useColorModeValue,
  Badge,
  Box,
  Button,
  Divider,
  Heading,
  HStack,
  VStack,
  Image,
  Text,
  ListItem,
  List,
  Icon
} from "@chakra-ui/react";
import BackButton from "../utils/BackButton";
import useFetch from "../hooks/useFetch";
import { useNavigate, useParams } from "react-router-dom";
import { Props } from "./ProductsCard";
import { ImCheckmark2 } from "react-icons/im";
import { token } from "../api/apiClient";
import ProductDetailSkelenton from "./ProductDetailSkelenton";
import Footer from "../Home-page/components/Footer";


export const formatPrice = (price: number) => {
  return new Intl.NumberFormat("en-US").format(price);
};

const ProductDetail = () => {
  const { id, slug } = useParams<{ id: string; slug: string }>();
  const navigate = useNavigate();

  // Always call hooks in the same order
  const { data, loading } = useFetch<Props>(`/api/products/${id}/${slug}/`);
  const { data: statusData, loading: statusLoading } = useFetch('/api/address/check/', token);

  // Ensure `status` is always defined
  const status = statusData?.status ?? false;

  // Show skeleton while loading
  if (loading) return <ProductDetailSkelenton />;

  return (
    <>
    <Box
      maxW="7xl"
      mx="auto"
      p={6}
      bg={useColorModeValue("white", "gray.800")}
      borderRadius="lg"
      boxShadow="lg"
      >
      <BackButton />
      
      {Array.isArray(data) && data.length > 0 ? (
        data.map((product) => (
          <HStack
            key={product.id}
            flexDirection={{ base: "column", md: "row" }}
            spacing={10}
            alignItems="start"
          >
            {/* Product Image */}
            <Box flex="1" w="full">
              <Image
                src={product.image || "https://via.placeholder.com/600x400"}
                alt={product.name || "Product Image"}
                objectFit="cover"
                borderRadius="md"
                boxShadow="md"
              />
            </Box>

            {/* Product Details */}
            <VStack
              flex="2"
              w="full"
              align="start"
              spacing={6}
              p={6}
              borderRadius="md"
            >
              <Heading size="lg">{product.name || "Product Name"}</Heading>
              <Text fontSize="md" color={useColorModeValue("gray.600", "gray.300")}>
                {product.description || "No description available."}
              </Text>

              {/* Price Section */}
              <HStack spacing={4} align="center">
                {product.discount_price ? (
                  <>
                    <Text fontSize="2xl" fontWeight="bold" color="teal.500">
                      &#8358;{formatPrice(product.discount_price)}
                    </Text>
                    <Text
                      fontSize="lg"
                      color="gray.500"
                      textDecoration="line-through"
                      >
                      &#8358;{formatPrice(product.base_price)}
                    </Text>
                    <Badge colorScheme="green" fontSize="sm">
                      {/* Save &#8358;{formatPrice(product.base_price - product.discount_price)} */}
                    </Badge>
                  </>
                ) : (
                  <Text fontSize="2xl" fontWeight="bold">
                    &#8358;{formatPrice(product.base_price)}
                  </Text>
                )}
              </HStack>

              {/* Features */}
              {product.features?.length ? (
                <Box w="full">
                  <Text fontWeight="bold" mb={2}>
                    Features:
                  </Text>
                  <List spacing={3}>
                    {product.features.map((feature) => (
                      <ListItem key={feature.id} display="flex" alignItems="center">
                        <Icon color="teal.500" mr={2}><ImCheckmark2 /></Icon>
                        <Text>{feature.feature}</Text>
                      </ListItem>
                    ))}
                  </List>
                </Box>
              ) : (
                <Text>No features available for this product.</Text>
              )}

              <Divider />

              {/* CTA Button */}
              <Button
                size="lg"
                colorScheme="teal"
                w="full"
                mt={4}
                aria-label="Buy Now"
                onClick={() => status ? navigate('/order/payment') : navigate(`/product/${id}/${slug}/checkout`)}
              >
                Buy Now
              </Button>
            </VStack>
          </HStack>
        ))
      ) : (
        <Text>No product found</Text>
      )}
    </Box>
    <Footer/>
                      </>
  );
};

export default ProductDetail;
