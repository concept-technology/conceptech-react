import {
  Box,
  Button,
  VStack,
  Image,
  Text,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  HStack,
  List,
  ListItem,
  Icon,
} from "@chakra-ui/react";
import { ImCheckmark2 } from "react-icons/im";
import { useNavigate } from "react-router-dom";

interface Features {
  id: number;
  feature: string;
}

export interface Props {
  name: string;
  description: string;
  base_price: number;
  discount_price?: number;
  features: Features[];
  is_active: boolean;
  id: number;
  slug:string
  image:string
}

export interface ProductsProps {
  product: Props[];
}

const ProductsCard = ({ product }: ProductsProps) => {
  const navigate = useNavigate()
  return (
    <HStack wrap="wrap" justify="center" spacing={6}>
      {product.map((item) => (
        <Card
          key={item.id}
          maxW="sm"
          borderRadius="lg"
          overflow="hidden"
          boxShadow="lg"
          bg="white"
          _dark={{ bg: "gray.800" }}
        >
          <Image
            src="https://images.unsplash.com/photo-1555041469-a586c61ea9bc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
            alt={item.name}
            objectFit="cover"
            h="200px"
          />
          <CardBody p={6}>
            <CardHeader>
              <Text fontSize="lg" fontWeight="bold" mb={2}>
                {item.name}
              </Text>
              <Text fontSize="sm" color="gray.500">
                {item.description}
              </Text>
            </CardHeader>
            <HStack justify="space-between" mt={4}>
              <Text
                fontSize="xl"
                fontWeight="bold"
                color="gray.700"
                _dark={{ color: "gray.300" }}
                textDecoration={item.discount_price ? "line-through" : "none"}
              >
                ${item.base_price}
              </Text>
              {item.discount_price && (
                <Text fontSize="xl" fontWeight="bold" color="teal.500">
                  ${item.discount_price}
                </Text>
              )}
            </HStack>
          </CardBody>
          <CardFooter p={6}>
            <VStack align="start" spacing={4} w="full">
              <Box>
                <Text fontWeight="bold" mb={2}>
                  Features:
                </Text>

                {item.features &&
                <List spacing={2}>
                  {item.features.map((feature) => (
                    <ListItem
                      key={feature.id}
                      display="flex"
                      alignItems="center"
                    >
                      <Icon as={ImCheckmark2} color="teal.500" mr={2} />
                      {feature.feature}
                    </ListItem>
                  ))}
                </List>
}
              </Box>
              <Button
                variant="solid"
                colorScheme="teal"
                w="full"
                size="lg"
                mt={4}
                onClick={(e)=>{navigate(`/products/${item.id}/${item.slug}`)
                e.preventDefault()
                console.log(item.slug, item.id)
              }}


              >
                Get Started
              </Button>
            </VStack>
          </CardFooter>
        </Card>
      ))}
    </HStack>
  );
};

export default ProductsCard;
