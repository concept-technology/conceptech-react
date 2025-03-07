
import {
    Box,
    Flex,
    Heading,
    Text,
    Divider,
    Stack,
    HStack,
    VStack,
    Image,
    Badge,
    
  } from "@chakra-ui/react";
  import useFetch from "../hooks/useFetch";
  import { token } from "./UserAccount";
  
  interface Product {
    id: string;
    name: string;
    description: string;
    price: number;
    quantity: number;
    imageUrl: string;
  }
  
  interface Order {
    id: string;
    date: string;
    total_amount: number;
    product: Product[];
  }
  
  const OrderDetails = () => {
    const {data:order} = useFetch(`/api/orders/get/`, token)
  
    return (

    );
  };
  
  export default OrderDetails;
  