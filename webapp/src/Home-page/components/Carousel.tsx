import { Box, Flex, Text, VStack, Button } from "@chakra-ui/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/effect-fade";
import bgImage1 from "../../assets/img/bg1.jpg";
import bgImage2 from "../../assets/img/bg2.jpg";
import bgImage3 from "../../assets/img/bg4.jpg";
import { Pagination, EffectFade, Autoplay } from "swiper/modules";
import { Link, Navigate, useNavigate } from "react-router-dom";

const slides = [
  {
    image: bgImage1,
    title: "Empower Businesses",
    subtitle: "Through Cutting-Edge Technologies",
    description: "Harnessing the latest in technology to elevate business performance.",
  },
  {
    image: bgImage2,
    title: "Transforming Ideas",
    subtitle: "into Digital Solutions with Advanced Technologies",
    description:
      "From concept to execution, delivering tailored software solutions for modern challenges.",
  },
  {
    image: bgImage3,
    title: "We Drive Innovation",
    subtitle: "",
    description: "Building seamless digital ecosystems to drive efficiency and growth.",
  },
];

const CarouselComponent = () => {
  return (
    <Box as="header" w="100%" h="100vh" overflow="hidden">
      <Swiper
        modules={[Autoplay, Pagination, EffectFade]}
        slidesPerView={1}
        loop={true}
        autoplay={{ delay: 4000 }}
        effect="fade"
        pagination={{ clickable: true }}
        speed={1000}
        style={{ height: "100%", width: "100%" }}
      >
        {slides.map((slide, index) => (
          <SwiperSlide key={index}>
            <Box
              h="100%"
              w="100%"
              bgImage={`url(${slide.image})`}
              bgSize="cover"
              bgPosition="center"
              position="relative"
              borderRadius={10}
            >
              {/* Dark overlay */}
              <Box
                position="absolute"
                top={0}
                left={0}
                w="100%"
                h="100%"
                bg="rgba(0, 0, 0, 0.5)"
                zIndex={0}
              />
              <Flex
                h="100%"
                align="center"
                justify="center"
                position="relative"
                zIndex={1}
              >
                <VStack spacing={5} textAlign="center" color="white" px={4}>
                  <Text
                    fontSize="2xl"
                    fontWeight="medium"
                    fontFamily="Poppins, sans-serif"
                    textTransform="uppercase"
                    letterSpacing="wider"
                  >
                    {slide.title}
                  </Text>
                  <Text
                    fontSize="5xl"
                    fontWeight="bold"
                    fontFamily="Poppins, sans-serif"
                    lineHeight="1.2"
                  >
                    {slide.subtitle}
                  </Text>
                  <Text
                    fontSize="lg"
                    fontFamily="Roboto, sans-serif"
                    maxW="600px"
                    lineHeight="1.6"
                  >
                    {slide.description}
                  </Text>
                  <Link to='/products/services'>
                  <Button
                    colorScheme="teal"
                    size="lg"
                    px={8}
                    py={6}
                    fontSize="lg"
                    fontWeight="semibold"
                    fontFamily="Poppins, sans-serif"
                    _hover={{ bg: "teal.400" }}
                    
                    >
                    Explore Our Services
                  </Button>
                    </Link>
                </VStack>
              </Flex>
            </Box>
          </SwiperSlide>
        ))}
      </Swiper>
    </Box>
  );
};

export default CarouselComponent;
