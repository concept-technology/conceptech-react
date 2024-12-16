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

interface projectProps {
  projectItems: cardItems[];
}
const ProjectHome = ({ projectItems }: projectProps) => {
  return (
    <Box p={5} id="project" position={'absolute'} top={10}>


      <Box m={["auto"]} w={"90%"}>
        <Center>

        <Heading p={2} m={3}>
            apps
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
                    view
                  </Button>
                </Link>
              </CardFooter>
            </Flex>
          </Card>
        ))}
      </SimpleGrid>
    </Box>
  );
};

export default ProjectHome;
