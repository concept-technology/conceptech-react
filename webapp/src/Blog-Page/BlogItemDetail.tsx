import {
  Box,
  Heading,
  Text,
  Image,
  Grid,
  VStack,
  HStack,
  Button,
  Divider,
  IconButton,
  Textarea,
  SimpleGrid,
  useColorModeValue,
  Container,
} from "@chakra-ui/react";
import { FaFacebook, FaTwitter, FaLinkedin, FaInstagram, FaShareAlt } from "react-icons/fa";
import { useParams } from "react-router-dom";
import { Link as ScrollLink } from "react-scroll";
import MenuBar from "./MenuBar";
import logo from '../../src/assets/Images/logo.jpg'
const BlogDetail = () => {
  const { id, slug } = useParams();

  const relatedStories = [
    { title: "Related Story 1", slug: "related-story-1", image: "https://via.placeholder.com/150" },
    { title: "Related Story 2", slug: "related-story-2", image: "https://via.placeholder.com/150" },
    { title: "Related Story 3", slug: "related-story-3", image: "https://via.placeholder.com/150" },
  ];

  const trendingNews = [
    { title: "Trending News 1", slug: "trending-news-1", image: "https://via.placeholder.com/400x250" },
    { title: "Trending News 2", slug: "trending-news-2", image: "https://via.placeholder.com/400x250" },
    { title: "Trending News 3", slug: "trending-news-3", image: "https://via.placeholder.com/400x250" },
  ];

  const tags = ["Technology", "Web Development", "React", "Chakra UI"];

  const comments = [
    { id: 1, name: "John Doe", text: "Great post! Really insightful." },
    { id: 2, name: "Jane Smith", text: "I learned a lot from this, thanks for sharing!" },
    { id: 3, name: "Samuel Green", text: "Very well-written, looking forward to more content like this." },
  ];

  return (
    <Container maxW="1200px" mx="auto">
      <MenuBar />

      {/* Main Content and Sidebar Layout */}
      <Grid templateColumns={{ base: "1fr", md: "2fr 1fr" }} gap={8}>
        {/* Blog Post Section */}
        <VStack spacing={8} align="start" p={5} bg={useColorModeValue("white", "gray.800")} borderRadius="lg" boxShadow="lg">
          <Heading fontSize="4xl" color="blue.600">Blog Post Title {slug}</Heading>
          <Text fontSize="sm" color="gray.500">Posted on September 25, 2024 | 5 min read</Text>

          {/* Main Blog Image */}
          <Image
            src={logo}
            alt={`Blog Post ${slug}`}
            w="100%"
            h="auto"
            borderRadius="lg"
            boxShadow="md"
          />

          <Text fontSize="lg" color="gray.800">
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Praesent auctor neque eu lectus auctor, et suscipit nisi vehicula. 
            Pellentesque sit amet lorem in risus pharetra facilisis. Nulla lacinia leo eu sapien ultrices, ut pulvinar magna volutpat.
          </Text>

          {/* Second Blog Image */}
          <Box>
            <Image
              src={logo}
              alt="Secondary Blog Image"
              w="100%"
              h="auto"
              borderRadius="lg"
              mb={4}
              boxShadow="sm"
            />
            <Text fontSize="lg" color="gray.600">This is the second blog image with a short description about it.</Text>
          </Box>

          <Text fontSize="lg" color="gray.800">
            Curabitur ac orci in urna tristique fringilla. Aliquam consequat libero ut arcu luctus dapibus. Cras a metus ac justo viverra laoreet. 
            Nunc id viverra arcu. Sed fermentum diam vel augue ultricies, sit amet tincidunt est auctor.
          </Text>

          {/* Third Blog Image */}
          <Box>
            <Image
              src="https://via.placeholder.com/800x400?text=Blog+Post+Tertiary+Image"
              alt="Tertiary Blog Image"
              w="100%"
              h="auto"
              borderRadius="lg"
              mb={4}
              boxShadow="lg"
            />
            <Text fontSize="lg" fontStyle="italic" color="gray.600">
              A visually appealing third blog image with italicized caption text to create a distinction.
            </Text>
          </Box>

          {/* Ads Section */}
          <Box w="100%" h="200px" bg="gray.200" display="flex" alignItems="center" justifyContent="center" borderRadius="md">
            <Text fontSize="xl" color="gray.600">Ad Space - Your Ad Here</Text>
          </Box>

          {/* Social Media Sharing */}
          <HStack spacing={4} align="center">
            <Text>Share this post:</Text>
            <IconButton aria-label="Share on Facebook" icon={<FaFacebook />} variant="outline" as="a" href="https://facebook.com" />
            <IconButton aria-label="Share on Twitter" icon={<FaTwitter />} variant="outline" as="a" href="https://twitter.com" />
            <IconButton aria-label="Share on LinkedIn" icon={<FaLinkedin />} variant="outline" as="a" href="https://linkedin.com" />
            <IconButton aria-label="Share on Instagram" icon={<FaInstagram />} variant="outline" as="a" href="https://instagram.com" />
            <IconButton aria-label="Share" icon={<FaShareAlt />} variant="outline" onClick={() => alert("Shared!")} />
          </HStack>

          {/* Scroll to Comments Button */}
          <ScrollLink to="comments" smooth={true} offset={-50} duration={500}>
            <Button colorScheme="blue">Go to Comments</Button>
          </ScrollLink>

          {/* Comment Section */}
          <Box w="100%" p={6} bg="white" boxShadow="md" borderRadius="lg" id="comments">
            <Heading fontSize="2xl" mb={4}>Comments</Heading>
            <VStack spacing={4} align="start">
              {comments.map((comment) => (
                <Box key={comment.id} p={4} bg={useColorModeValue("gray.100", "gray.700")} borderRadius="md">
                  <Text fontWeight="bold">{comment.name}</Text>
                  <Text mt={2}>{comment.text}</Text>
                </Box>
              ))}
            </VStack>

            {/* Add Comment */}
            <Divider my={4} />
            <Heading fontSize="xl" mb={4}>Leave a Comment</Heading>
            <VStack spacing={4} align="start">
              <Textarea placeholder="Write your comment here..." size="lg" />
              <Button colorScheme="blue" size="lg">Post Comment</Button>
            </VStack>
          </Box>
        </VStack>

        {/* Sidebar Section */}
        <VStack spacing={8} align="start" p={5} bg={useColorModeValue("white", "gray.800")} borderRadius="lg" boxShadow="lg">
          {/* Related Stories */}
          <Box w="100%">
            <Heading fontSize="2xl" mb={4}>Related Stories</Heading>
            <SimpleGrid columns={{ base: 1, md: 1 }} spacing={4}>
              {relatedStories.map((story) => (
                <Box
                  key={story.slug}
                  as="a"
                  href={`/blog/${story.slug}`}
                  p={4}
                  bg="white"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                  display="flex"
                  flexDirection="row"
                  alignItems="center"
                >
                  <Image src={story.image} alt={story.title} boxSize="100px" borderRadius="md" mr={4} />
                  <VStack align="start">
                    <Text fontWeight="bold">{story.title}</Text>
                  </VStack>
                </Box>
              ))}
            </SimpleGrid>
          </Box>

          {/* Trending News with Large Cards */}
          <Box w="100%">
            <Heading fontSize="2xl" mb={4}>Trending News</Heading>
            <VStack spacing={6}>
              {trendingNews.map((news) => (
                <Box
                  key={news.slug}
                  as="a"
                  href={`/news/${news.slug}`}
                  p={4}
                  bg="white"
                  borderWidth="1px"
                  borderRadius="lg"
                  boxShadow="md"
                  w="100%"
                  display="block"
                >
                  <Image src={news.image} alt={news.title} w="100%" h="auto" borderRadius="md" />
                  <Text fontWeight="bold" mt={2}>{news.title}</Text>
                </Box>
              ))}
            </VStack>
          </Box>

          {/* Tags Section */}
          <Box w="100%">
            <Heading fontSize="2xl" mb={4}>Tags</Heading>
            <HStack wrap="wrap" spacing={4}>
              {tags.map((tag) => (
                <Button key={tag} variant="solid" colorScheme="blue" size="sm">
                  {tag}
                </Button>
              ))}
            </HStack>
          </Box>
        </VStack>
      </Grid>
    </Container>
  );
};

export default BlogDetail;
