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
                height="320px"
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
  );
};

export default BlogSlide;
