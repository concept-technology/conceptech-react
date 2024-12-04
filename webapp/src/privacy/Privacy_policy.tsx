import {
  Box,
  Heading,
  Text,
  UnorderedList,
  ListItem,
  Link,
  Divider,
} from "@chakra-ui/react";
import Footer from "../Home-page/components/Footer";

const PrivacyPolicy = () => {
  return (
    <>
      <Box
        maxW="800px"
        mx="auto"
        p={8}
        bg="gray.50"
        borderRadius="md"
        boxShadow="sm"
      >
        <Heading as="h1" size="xl" mb={4} color="teal.600">
          Privacy Policy
        </Heading>
        <Text fontSize="sm" mb={6} color="gray.600">
          <strong>Effective Date: 29-september-2024</strong>
        </Text>

        <Text mb={4}>
          <strong>Concept Technologies and Software Solutions</strong> values
          your privacy and is committed to protecting the personal information
          you share with us. This Privacy Policy explains how we collect, use,
          and safeguard your data when you use our website or services.
        </Text>

        <Divider my={4} />

        <Heading as="h6" size="sm" mt={6} mb={3} color="teal.500">
          1. Information We Collect
        </Heading>
        <Text mb={2}>We may collect the following types of information:</Text>
        <UnorderedList pl={6} mb={4}>
          <ListItem>
            <strong>Personal Information:</strong> Name, email address, phone
            number, company name, and address.
          </ListItem>
          <ListItem>
            <strong>Technical Information:</strong> IP address, browser type,
            operating system, and usage data.
          </ListItem>
          <ListItem>
            <strong>Cookies and Tracking Data:</strong> We use cookies to
            enhance user experience and analyze website traffic.
          </ListItem>
        </UnorderedList>

        <Heading as="h6" size="sm" mt={6} mb={3} color="teal.500">
          2. How We Use Your Information
        </Heading>
        <UnorderedList pl={6} mb={4}>
          <ListItem>To provide, maintain, and improve our services.</ListItem>
          <ListItem>
            To communicate with you, including sending updates and promotional
            content.
          </ListItem>
          <ListItem>To process transactions and respond to inquiries.</ListItem>
          <ListItem>To personalize your experience on our website.</ListItem>
          <ListItem>To comply with legal obligations.</ListItem>
        </UnorderedList>

        {/* Repeat similar pattern for other sections */}

        <Heading as="h6" size="sm" mt={6} mb={3} color="teal.500">
          3. Contact Us
        </Heading>
        <Text mb={2}>
          If you have any questions or concerns about this Privacy Policy,
          please contact us:
        </Text>
        <Box bg="white" p={4} borderRadius="md" boxShadow="sm">
          <Text>
            <strong>Concept Technologies and Software Solutions</strong>
          </Text>
          <Text>
            <address>No. 5 obasi street, samuel</address>
          </Text>
          <Text>
            Email:
            <Link color="teal.400" href="mailto:[Insert Email]">
              support@concept-techsolutions.dev
            </Link>
          </Text>
          <Text>
            Phone: <a href="tel:+2348143006319">+2348143006319</a>
          </Text>
        </Box>
      </Box>
      <Footer />
    </>
  );
};

export default PrivacyPolicy;
