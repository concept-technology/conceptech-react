import { Box, Flex, Image, Text, VStack, Icon, Heading } from '@chakra-ui/react';
import { FaDesktop, FaBolt, FaHeadset } from 'react-icons/fa';
import pic from '../../assets/Images/pic.jpg';

const ImageSection = () => {
  return (
    <Box bg="gray.100" position="relative" py={16}>
      <Box maxW="7xl" mx="auto" px={4}>
        <Flex align="center" justify="space-between" direction={{ base: 'column', lg: 'row' }}>
          <Box mb={{ base: 8, lg: 0 }} flex="1">
            <Image src={pic} alt="Samuel Andrew" borderRadius="md" boxSize="full" objectFit="cover" />
            <Box mt={5} p={6} bg="white" boxShadow="lg" borderRadius="md">
              <Heading as="h5" size="sm" color="gray.700" mb={2}>Samuel Andrew</Heading>
              <Text color="gray.500" fontSize="sm">Founder of Concept Technologies</Text>
            </Box>
          </Box>
          
          <VStack spacing={8} align="flex-start" flex="1" pt={{ base: 10, lg: 0 }}>
            <Box display="flex" alignItems="center">
              <Icon as={FaDesktop} boxSize={6} color="teal.500" mr={4} />
              <VStack align="flex-start" spacing={1}>
                <Heading size="sm">Fully Responsive</Heading>
                <Text color="gray.600" fontSize="md">
                  Our designs are fully responsive, ensuring they look and function beautifully on any device, whether it's a desktop, tablet, or smartphone.
                </Text>
              </VStack>
            </Box>

            <Box display="flex" alignItems="center">
              <Icon as={FaBolt} boxSize={6} color="teal.500" mr={4} />
              <VStack align="flex-start" spacing={1}>
                <Heading size="sm">Clean & Modern Design</Heading>
                <Text color="gray.600" fontSize="md">
                  We prioritize clean and modern design principles, creating visually appealing and user-friendly interfaces that enhance user experience.
                </Text>
              </VStack>
            </Box>

            <Box display="flex" alignItems="center">
              <Icon as={FaHeadset} boxSize={6} color="teal.500" mr={4} />
              <VStack align="flex-start" spacing={1}>
                <Heading size="sm">Proven Track Record</Heading>
                <Text color="gray.600" fontSize="md">
                  With a portfolio of successful projects, we have a proven track record of delivering high-quality work that meets client expectations and drives results.
                </Text>
              </VStack>
            </Box>
          </VStack>
        </Flex>
      </Box>
      
      <Box position="absolute" top={0} left={0} right={0} height="20px" bg="white" zIndex={-1} />
      <Box position="absolute" bottom={0} left={0} right={0} height="20px" bg="white" zIndex={-1} />
    </Box>
  );
};

export default ImageSection;
