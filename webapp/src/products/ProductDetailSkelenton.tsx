import { Box,Divider,HStack,List,ListItem,Skeleton,SkeletonText,useColorModeValue, VStack, } from "@chakra-ui/react";
import BackButton from "../utils/BackButton";

const ProductDetailSkelenton = ()=>{
  
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
<HStack flexDirection={{ base: "column", md: "row" }} spacing={10} alignItems="start">
  {/* Skeleton for Product Image */}
  <Box flex="1" w="full">
    <Skeleton height="400px" borderRadius="md" />
  </Box>

  {/* Skeleton for Product Details */}
  <VStack flex="2" w="full" align="start" spacing={6} p={6} borderRadius="md">
    <Skeleton height="30px" width="50%" />
    <SkeletonText noOfLines={4} spacing={4} skeletonHeight="4" width="100%" />

    {/* Skeleton for Price Section */}
    <HStack spacing={4} align="center">
      <Skeleton height="30px" width="80px" />
      <Skeleton height="20px" width="50px" />
      <Skeleton height="20px" width="50px" />
    </HStack>

    {/* Skeleton for Features */}
    <Box w="full">
      <Skeleton height="20px" width="30%" mb={2} />
      <List spacing={3}>
        {[...Array(3)].map((_, index) => (
          <ListItem key={index} display="flex" alignItems="center">
            <Skeleton height="20px" width="80%" />
          </ListItem>
        ))}
      </List>
    </Box>

    <Divider />

    {/* Skeleton for CTA Button */}
    <Skeleton height="50px" width="100%" borderRadius="md" />
  </VStack>
</HStack>
</Box>
 )   

}
export default ProductDetailSkelenton