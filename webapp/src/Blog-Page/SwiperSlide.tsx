import { Swiper, SwiperSlide } from "swiper/react";
import { Pagination, Autoplay } from "swiper/modules";
import {
  Box,
  Heading,
  Text,
  Grid,
  Card,
  CardBody,
  Image,
  useColorModeValue,
} from "@chakra-ui/react";
import "swiper/css";
import "swiper/css/pagination";
import "./BlogSlide.css";
import { useNavigate } from "react-router-dom"; // Import useNavigate for navigation
import logo from "../assets/Images/logo.jpg";

const BlogSlide = () => {
  const blogPosts = [
    {
      id: 1,
      title: "Post 1",
      description: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
      slug: "post-1",
      image: logo,
    },
    {
      id: 2,
      title: "Post 2",
      description: "Sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      slug: "post-2",
      image: "https://via.placeholder.com/800x400",
    },
    {
      id: 3,
      title: "Post 3",
      description: "Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris.",
      slug: "post-3",
      image: "https://via.placeholder.com/800x400",
    },
  ];

  const navigate = useNavigate(); // Hook to navigate to another route

  const handleCardClick = (id: number, slug: string) => {
    navigate(`/blog/${id}/${slug}`);
  };

  return (
    <Box
      display="flex"
      flexDirection={{ base: "column", md: "row" }}
      gap={8}
      p={6}
      maxW="1200px"
      mx="auto"
    >
      {/* Left Swiper Section */}
      <Box
        flex={{ base: "1", md: "2" }}
        bg={useColorModeValue("white", "gray.800")}
        boxShadow="lg"
        rounded="lg"
        overflow="hidden"
        p={4}
      >
        <Swiper
          slidesPerView={1}
          spaceBetween={0}
          pagination={{ clickable: true }}
          autoplay={{ delay: 3000 }}
          loop={true}
          modules={[Pagination, Autoplay]}
        >
          {blogPosts.map((post, index) => (
            <SwiperSlide key={index}>
              <Box
                height="400px"
                backgroundImage={`url(${post.image})`}
                backgroundPosition="center"
                backgroundSize="cover"
                display="flex"
                justifyContent="center"
                alignItems="flex-end"
                color="white"
                textAlign="center"
                position="relative"
                cursor="pointer"
                onClick={() => handleCardClick(post.id, post.slug)} // Navigate on click with both ID and slug
                _before={{
                  content: '""',
                  position: "absolute",
                  top: 0,
                  left: 0,
                  width: "100%",
                  height: "100%",
                  bg: "rgba(0, 0, 0, 0.4)",
                  zIndex: 1,
                  backdropFilter: "blur(5px)",
                }}
              >
                <Box zIndex={2} p={4}>
                  <Heading fontSize="3xl">{post.title}</Heading>
                  <Text fontSize="lg" mt={2}>
                    {post.description}
                  </Text>
                </Box>
              </Box>
            </SwiperSlide>
          ))}
        </Swiper>
      </Box>

      {/* Right Cards Section */}
      <Grid templateColumns={{ base: "1fr", md: "1fr" }} gap={6} flex="1">
        {blogPosts.map((post, index) => (
          <Card
            key={index}
            direction="row"
            alignItems="center"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="md"
            _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
            transition="all 0.3s ease"
            rounded="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => handleCardClick(post.id, post.slug)} // Navigate on click with both ID and slug
          >
            <Image
              src={post.image}
              alt={post.title}
              boxSize="150px"
              objectFit="cover"
            />
            <CardBody p={4}>
              <Heading fontSize="lg" mb={2}>
                {post.title}
              </Heading>
              <Text fontSize="sm" color={useColorModeValue("gray.600", "gray.400")}>
                {post.description.slice(0, 50)}...
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogSlide;
