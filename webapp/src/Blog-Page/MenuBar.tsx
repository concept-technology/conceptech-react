import { Box, Flex, HStack, Link, Text, Image } from "@chakra-ui/react";
import { FaArrowLeft } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const MenuBar = () => {
  const navigate = useNavigate();

  return (
    <Box mt={{ base: 2, lg: "55px" }} w="100%">
      {/* Navbar */}
      <Box
        position="fixed"
        top={{ lg: "60px", base: "54px" }}
        left="0"
        width="100%"
        zIndex="100"
        bg="blue.600" // Background color
        color="white"
        py={3}
        boxShadow="md"
      >
        <Flex
          justifyContent="space-between"
          alignItems="center"
          px={{ base: 4, md: 6, lg: 10 }}
          wrap="wrap" // Ensures items wrap on smaller screens
        >
          {/* Back Button and Menu Items */}
          <HStack
            spacing={4}
            mb={{ base: 2, md: 0 }}
            wrap="wrap"
            justifyContent="flex-start"
          >
            <Link
              onClick={() => navigate(-1)}
              color="white"
              display="flex"
              alignItems="center"
            >
              <FaArrowLeft /> <Text ml={2}>Back</Text>
            </Link>
            <Link href="#" color="white">
              Category
            </Link>
            <Link href="#" color="white">
              Single News
            </Link>
            <Link href="#" color="white">
              Dropdown
            </Link>
          </HStack>
        </Flex>
      </Box>

      {/* Branding and Ads */}
      <Flex
        className="row align-items-center bg-white py-3 px-lg-5"
        justifyContent="space-between"
        px={{ base: 4, lg: 10 }}
        py={4}
        boxShadow="sm" // Added shadow for separation
        bg="white"
      >
        <Link href="#" className="navbar-brand p-3">
          <div className="row align-items-center bg-white py-3 px-lg-5">
            <div className="col-lg-4">
              <a href="" className="navbar-brand p-0  d-lg-block">
                <h1 className="m-4 display-4 text-uppercase text-primary">
                  CTS2
                  <span className="text-secondary font-weight-normal">
                    Blog
                  </span>
                </h1>
              </a>
            </div>
            <div className="col-lg-8 text-center text-lg-right">
              <a href="">
                <img
                  className="img-fluid"
                  src="../../src/assets/blog/img/ads-728x90.png"
                  alt=""
                />
              </a>
            </div>
          </div>
        </Link>
      </Flex>
    </Box>
  );
};

export default MenuBar;
