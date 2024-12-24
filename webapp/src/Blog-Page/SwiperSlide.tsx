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
import { useNavigate } from "react-router-dom";

// Blog Interface
interface Blog {
  id: number;
  title: string;
  slug: string;
  content: string;
  description: string;
  image: string;
  created_at: Date;
  updated_at: Date;
}

// Props for BlogSlide Component
interface BlogSlideProps {
  BlogProps: Blog[];
}

const BlogSlide = ({ BlogProps }: BlogSlideProps) => {
  const navigate = useNavigate();
  
  // Navigate to blog detail page
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
          {BlogProps.map((post) => (
            <SwiperSlide key={post.id}>
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
                onClick={() => handleCardClick(post.id, post.slug)} // Navigate on click
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
        {BlogProps.map((post) => (
          <Card
            key={post.id}
            direction="row"
            alignItems="center"
            bg={useColorModeValue("white", "gray.800")}
            boxShadow="md"
            _hover={{ boxShadow: "xl", transform: "scale(1.02)" }}
            transition="all 0.3s ease"
            rounded="lg"
            overflow="hidden"
            cursor="pointer"
            onClick={() => handleCardClick(post.id, post.slug)} // Navigate on click
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
                {post.content.slice(0, 50)}...
              </Text>
            </CardBody>
          </Card>
        ))}
      </Grid>
    </Box>
  );
};

export default BlogSlide;
