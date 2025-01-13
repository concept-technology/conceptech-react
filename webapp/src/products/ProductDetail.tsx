import {useColorModeValue, Badge, Box, Button, Divider, Heading, HStack, VStack, Image, Text, ListItem, List, Icon } from "@chakra-ui/react"
import BackButton from "../utils/BackButton"
import useFetch from "../Blog-Page/hooks/useFetch"
import { useNavigate, useParams } from "react-router-dom"
import { Props } from "./ProductsCard"
import { ImCheckmark2 } from "react-icons/im"
import { token } from "../user/UserAccount"

const ProductDetail = () => {
    const {id, slug} = useParams<{id:string, slug:string}>()
    const { data} = useFetch<Props>(`/api/products/${id}/${slug}/`, token);
    const {status} = useFetch('/api/address/check/', token)

    const navigate = useNavigate()
    // const data =[
    //     {id: 1, image:'', name:'saome produts', description:'some descriptions', basse_price:200, discount_price:300, }
    // ]
    return(
        <Box
        maxW="7xl"
        mx="auto"
        p={6}
        bg={useColorModeValue("white", "gray.800")}
        borderRadius="lg"
        boxShadow="lg"
      >
        <BackButton />
        { data && data.map((product) => (
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
            //   bg={useColorModeValue("gray.50", "gray.700")}
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
                      ${product.discount_price}
                    </Text>
                    <Text
                      fontSize="lg"
                      color="gray.500"
                      textDecoration="line-through"
                    >
                      ${product.base_price}
                    </Text>
                    <Badge colorScheme="green" fontSize="sm">
                      Save ${(product.base_price - product.discount_price).toFixed(2)}
                    </Badge>
                  </>
                ) : (
                  <Text fontSize="2xl" fontWeight="bold">
                    ${product.base_price}
                  </Text>
                )}
              </HStack>
  
              {/* Features */}
              {product.features ? (
                <Box w="full">
                  <Text fontWeight="bold" mb={2}>
                    Features:
                  </Text>
                  <List spacing={3}>
                    {product.features.map((feature) => (
                      <ListItem key={feature.id} display="flex" alignItems="center">
                        <Icon color="teal.500" mr={2} ><ImCheckmark2/></Icon>
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
                onClick={()=> status ? navigate('/order/payment'): navigate(`/product/${id}/${slug}/checkout`)}
              >
                Buy Now
              </Button>
            </VStack>
          </HStack>
        ))}
      </Box>
    )
}

export default ProductDetail