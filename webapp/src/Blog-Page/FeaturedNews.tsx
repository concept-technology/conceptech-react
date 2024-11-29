import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper-bundle.css"; // Import Swiper styles
import { Navigation, Pagination } from "swiper/modules";
import {
  Box,
  Image,
  Badge,
  Heading,
  Text,
  Card,
  CardBody,
  CardFooter,
  useColorModeValue,
} from "@chakra-ui/react";
import { ChevronLeftIcon, ChevronRightIcon } from "@chakra-ui/icons";
import img from "../assets/blog/img/news-700x435-4.jpg";

const FeaturedNews = () => {
  const cardBg = useColorModeValue("white", "gray.800");
  const cardShadow = useColorModeValue("xl", "2xl");
  const headingColor = useColorModeValue("gray.700", "whiteAlpha.900");
  const descriptionColor = useColorModeValue("gray.600", "gray.400");
  const badgeBg = useColorModeValue("blue.600", "blue.400");
  const navIconColor = useColorModeValue("blue.600", "blue.300");

  return (
    <Box className="container-fluid pt-5 mb-5" w="100%" py={8}>
      <Box className="container" maxW="1200px" mx="auto">
        {/* Section Title */}
        <Box textAlign="center" mb={8}>
          <Heading
            as="h4"
            size="lg"
            fontWeight="bold"
            textTransform="uppercase"
            color={headingColor}
            mb={2}
          >
            Featured News
          </Heading>
          <Text fontSize="md" color={descriptionColor}>
            Stay updated with the latest news and happenings
          </Text>
        </Box>

        <Swiper
          modules={[Navigation, Pagination]}
          navigation={{
            nextEl: ".swiper-button-next",
            prevEl: ".swiper-button-prev",
          }}
          pagination={{ clickable: true }}
          slidesPerView={3}
          spaceBetween={30}
          loop={true}
          autoplay={{ delay: 5000 }}
          breakpoints={{
            320: { slidesPerView: 1 },
            768: { slidesPerView: 2 },
            1024: { slidesPerView: 3 },
            1440: { slidesPerView: 4 },
          }}
        >
          {/* Slide 1 */}
          <SwiperSlide>
            <Card
              bg={cardBg}
              boxShadow={cardShadow}
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "2xl",
              }}
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src="./src/assets/blog/img/news-700x435-3.jpg"
                alt="News 1"
                objectFit="cover"
                height="250px"
                width="100%"
              />
              <CardBody p="6">
                <Box display="flex" alignItems="baseline" mb="3">
                  <Badge
                    borderRadius="full"
                    px="3"
                    py="1"
                    fontSize="0.9em"
                    colorScheme="blue"
                    bg={badgeBg}
                  >
                    Business
                  </Badge>
                  <Text ml={2} color={descriptionColor} fontSize="sm">
                    Jan 01, 2045
                  </Text>
                </Box>
                <Heading as="h5" size="md" mb={2} color={headingColor}>
                  Lorem ipsum dolor sit amet elit...
                </Heading>
                <Text fontSize="sm" color={descriptionColor}>
                  Stay ahead in business with key insights and trends...
                </Text>
              </CardBody>
              <CardFooter />
            </Card>
          </SwiperSlide>

          {/* Slide 2 */}
          <SwiperSlide>
            <Card
              bg={cardBg}
              boxShadow={cardShadow}
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "2xl",
              }}
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src={img}
                alt="News 2"
                objectFit="cover"
                height="250px"
                width="100%"
              />
              <CardBody p="6">
                <Box display="flex" alignItems="baseline" mb="3">
                  <Badge
                    borderRadius="full"
                    px="3"
                    py="1"
                    fontSize="0.9em"
                    colorScheme="green"
                    bg={badgeBg}
                  >
                    Technology
                  </Badge>
                  <Text ml={2} color={descriptionColor} fontSize="sm">
                    Feb 15, 2045
                  </Text>
                </Box>
                <Heading as="h5" size="md" mb={2} color={headingColor}>
                  New Tech Revolution
                </Heading>
                <Text fontSize="sm" color={descriptionColor}>
                  Discover the future of tech with groundbreaking innovations...
                </Text>
              </CardBody>
              <CardFooter />
            </Card>
          </SwiperSlide>

          {/* Slide 3 */}
          <SwiperSlide>
            <Card
              bg={cardBg}
              boxShadow={cardShadow}
              transition="transform 0.3s ease, box-shadow 0.3s ease"
              _hover={{
                transform: "scale(1.05)",
                boxShadow: "2xl",
              }}
              borderRadius="lg"
              overflow="hidden"
            >
              <Image
                src="./src/assets/blog/img/news-700x435-5.jpg"
                alt="News 3"
                objectFit="cover"
                height="250px"
                width="100%"
              />
              <CardBody p="6">
                <Box display="flex" alignItems="baseline" mb="3">
                  <Badge
                    borderRadius="full"
                    px="3"
                    py="1"
                    fontSize="0.9em"
                    colorScheme="red"
                    bg={badgeBg}
                  >
                    Health
                  </Badge>
                  <Text ml={2} color={descriptionColor} fontSize="sm">
                    Mar 10, 2045
                  </Text>
                </Box>
                <Heading as="h5" size="md" mb={2} color={headingColor}>
                  Health & Wellness
                </Heading>
                <Text fontSize="sm" color={descriptionColor}>
                  Explore how to live healthier with top wellness tips...
                </Text>
              </CardBody>
              <CardFooter />
            </Card>
          </SwiperSlide>
        </Swiper>

        {/* Custom Navigation Arrows */}
        <Box
          className="swiper-button-prev"
          position="absolute"
          top="50%"
          left="20px"
          zIndex="10"
          transform="translateY(-50%)"
        >
          <ChevronLeftIcon w={10} h={10} color={navIconColor} />
        </Box>
        <Box
          className="swiper-button-next"
          position="absolute"
          top="50%"
          right="20px"
          zIndex="10"
          transform="translateY(-50%)"
        >
          <ChevronRightIcon w={10} h={10} color={navIconColor} />
        </Box>
      </Box>
    </Box>
  );
};

export default FeaturedNews;
