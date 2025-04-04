import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Heading,
  Text,
  SimpleGrid,
  Flex,
  Divider,
  Box,
  Center,
} from "@chakra-ui/react";
import { Link } from "react-router-dom";
import { cardItems } from "./Project-Object";
import { useGetProductsQuery } from "../../app/services/auth/authService";
import ProductsCard from "../../products/ProductsCard";

interface projectProps {
  projectItems: cardItems[];
}
const ProjectHome = ({ projectItems }: projectProps) => {

      const { data: products,  } = useGetProductsQuery('products');
  return (
    <Box p={5} id="project" position={'absolute'}  overflow='hidden'>


      <Box m={["auto"]} w={"90%"}>
        <Center>

        <Heading p={2} m={3}>
            services
        </Heading>
        </Center>
      </Box>
      <SimpleGrid columns={{ base: 1, sm: 2, lg: 3 }} spacing={10}>
        {projectItems.map((project) => (
          <Card
            key={project.Name}
            // size={"sm"}
            p={"10px"}
            variant="outline"
        
            boxShadow="md"
            _hover={{
              boxShadow: "dark-lg",
              p: "6",
              rounded: "md",
              cursor: "pointer",
            }}
            bgColor={"gray.500"}
          >
            <Flex direction={"column"} alignItems={"center"}>
              <CardHeader>
                <Heading color={"whiteAlpha.700"}>{project.Name}</Heading>
              </CardHeader>
              <Divider />
              <CardBody>
                <Text color={"whiteAlpha.800"}>{project.Description}</Text>
              </CardBody>
              <CardFooter>
                <Link to={project.link}>
                  <Button color={"white"} colorScheme="blue" fontSize={"xl"}>
                    explore
                  </Button>
                </Link>
              </CardFooter>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
      <Center>
      <Heading p={2} m={3}>
            Web apps
        </Heading>
      </Center>
        
      <ProductsCard product={products}/>
    </Box>
  );
};

export default ProjectHome;
