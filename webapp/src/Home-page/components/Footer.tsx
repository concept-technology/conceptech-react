import { Box, Flex, Image, Link, Text, HStack, Icon } from "@chakra-ui/react";
import { FaFacebookF, FaTwitter, FaLinkedinIn, FaBehance, FaPinterestP } from "react-icons/fa";
import logo from "../../assets/Images/logo.jpg";

const Footer = () => {
  return (
    <Box as="footer" bg="gray.800" color="white" py={10} textAlign="center" w={"100%"}>
      {/* Logo Section */}
      <Box mb={6}>
        <Link href="#">
          <Image src={logo} alt="logo" mx="auto" boxSize="80px" objectFit="contain" />
        </Link>
      </Box>

      {/* Social Links */}
      <HStack justify="center" spacing={6} mb={6}>
        <Link href="#0" isExternal>
          <Icon as={FaFacebookF} boxSize={6} _hover={{ color: "teal.400" }} />
        </Link>
        <Link href="#0" isExternal>
          <Icon as={FaTwitter} boxSize={6} _hover={{ color: "teal.400" }} />
        </Link>
        <Link href="#0" isExternal>
          <Icon as={FaLinkedinIn} boxSize={6} _hover={{ color: "teal.400" }} />
        </Link>
        <Link href="#0" isExternal>
          <Icon as={FaBehance} boxSize={6} _hover={{ color: "teal.400" }} />
        </Link>
        <Link href="#0" isExternal>
          <Icon as={FaPinterestP} boxSize={6} _hover={{ color: "teal.400" }} />
        </Link>
      </HStack>

      {/* Company Info */}
      <Text mb={6}>
        <Link href="" isExternal color="teal.400">
          Concept Technologies
        </Link>
      </Text>

      {/* Footer Navigation */}
      <Flex justify="center" wrap="wrap" gap={4}>
        <Link href="/support" fontWeight="bold" _hover={{ color: "teal.400" }}>
          Support
        </Link>
        <Link href="/privacy" fontWeight="bold" _hover={{ color: "teal.400" }}>
          Privacy
        </Link>
        <Link href="https://api.conceptsoftwares.com/admin" fontWeight="bold" _hover={{ color: "teal.400" }}>
          admin
        </Link>
      </Flex>

      {/* Footer Curve (Optional) */}
      <Box
        mt={10}
        bgGradient="linear(to-r, gray.700, gray.800)"
        h="6px"
        borderRadius="full"
        mx="auto"
        w="40%"
      />
    </Box>
  );
};

export default Footer;
