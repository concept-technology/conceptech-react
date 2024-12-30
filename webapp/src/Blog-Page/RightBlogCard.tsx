import {
  Card,
  CardBody,
  Heading,
  useColorModeValue,
  Text,
  Image,
  Grid,
  Box,
} from "@chakra-ui/react";
import { useNavigate } from "react-router-dom";
import { Blog } from "./api-client";

interface Props {
  BlogProps: Blog[];
}

const RightBlogCard = ({ BlogProps }: Props) => {
  const navigate = useNavigate();

  // Navigate to blog detail page
  const handleCardClick = (id: number, slug: string) => {
    navigate(`/blog/${id}/${slug}`);
  };

  return (
    <Grid
      templateColumns={{ base: "1fr", md: "1fr" }}
      gap={6}
      flex="1"
    >
      {BlogProps.map((post) => (
        <Card
          key={post.id}
          direction="row"
          bg={useColorModeValue("white", "gray.800")}
          boxShadow="md"
          _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
          transition="all 0.3s ease"
          rounded="lg"
          overflow="hidden"
          cursor="pointer"
          onClick={() => handleCardClick(post.id, post.slug)}
        >
          <Box
            w={{ base: "30%", md: "25%" }}
            h="auto"
          >
            <Image
              src={post.image}
              alt={post.title}
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>
          <CardBody p={4}>
            <Heading
              fontSize="md"
              mb={2}
              color={useColorModeValue("gray.700", "white")}
            >
              {post.title}
            </Heading>
            <Text
              fontSize="sm"
              color={useColorModeValue("gray.600", "gray.400")}
            >
              {post.content.slice(0,21)}...
            </Text>
          </CardBody>
        </Card>
      ))}
    </Grid>
  );
};

export default RightBlogCard;
