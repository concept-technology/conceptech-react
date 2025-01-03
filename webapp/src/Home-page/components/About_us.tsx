import { useState, useEffect } from 'react';
import {
  Box,
  VStack,
  HStack,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Text,
  Image,
  Progress,
  Button,
  Flex,
} from '@chakra-ui/react';
import logo from '../../assets/Images/logo.jpg';
import img4 from '../../assets/img/4.jpg';
import img3 from '../../assets/img/3.jpg';

const AboutUs = () => {
  const [progressWidths, setProgressWidths] = useState({
    design: 0,
    branding: 0,
    development: 0,
  });

  useEffect(() => {
    setTimeout(() => {
      setProgressWidths({
        design: 90,
        branding: 75,
        development: 95,
      });
    }, 200); // Animation delay for progress bars
  }, []);
const color= 'black'
  return (
    <Box py={12} id="about">
      <Box maxW="1200px" mx="auto" px={6}>
        <Tabs variant="soft-rounded" colorScheme="teal" isFitted>
          <TabList mb={6}>
            <Tab fontSize="lg" _selected={{ color: 'white', bg: 'teal.500' }}>
              About Us
            </Tab>
            <Tab fontSize="lg" _selected={{ color: 'white', bg: 'teal.500' }}>
              Our Mission
            </Tab>
            <Tab fontSize="lg" _selected={{ color: 'white', bg: 'teal.500' }}>
              Why Us?
            </Tab>
          </TabList>

          <TabPanels>
            {/* About Us Section */}
            <TabPanel>
              <Flex direction={['column', 'row']} gap={6}>
                <VStack align="start" flex={1} spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                    About Us
                  </Text>
                  <Text fontSize="lg">
                    Concept Technology and Software Solutions is a full-service
                    technology firm specializing in custom software development,
                    web design, IT consulting, and digital solutions. 
                    {/* Shortened for brevity */}
                  </Text>
                  <VStack align="start" w="full" spacing={4}>
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold" >Website Design</Text>
                      <Text >{`${progressWidths.design}%`}</Text>
                    </HStack>
                    <Progress
                      value={progressWidths.design}
                      size="sm"
                      colorScheme="teal"
                      w="full"
                      
                    />
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold" >Branding</Text>
                      <Text>{`${progressWidths.branding}%`}</Text>
                    </HStack>
                    <Progress
                      value={progressWidths.branding}
                      size="sm"
                      colorScheme="blue"
                      w="full"
                      
                    />
                    <HStack justify="space-between" w="full">
                      <Text fontWeight="bold" >Software Development</Text>
                      <Text >{`${progressWidths.development}%`}</Text>
                    </HStack>
                    <Progress
                      value={progressWidths.development}
                      size="sm"
                      colorScheme="green"
                      w="full"
                      
                    />
                  </VStack>
                  <Button colorScheme="teal" size="lg" mt={4}>
                    Get Started
                  </Button>
                </VStack>
                <Box flex={1}>
                  <Image src={logo} borderRadius="md" shadow="lg" />
                </Box>
              </Flex>
            </TabPanel>

            {/* Our Mission Section */}
            <TabPanel>
              <Flex direction={['column', 'row']} gap={6}>
                <VStack align="start" flex={1} spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                    Our Mission
                  </Text>
                  <Text fontSize="lg"  >
                    Our mission is to deliver cutting-edge, tailor-made
                    technology solutions that align with our clients' visions
                    {/* Shortened for brevity */}
                  </Text>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                    Our Vision
                  </Text>
                  <Text fontSize="lg" >
                    To be a global leader in providing innovative technology
                    solutions that empower businesses.
                  </Text>
                </VStack>
                <Box flex={1}>
                  <Image src={img3} borderRadius="md" shadow="lg" />
                </Box>
              </Flex>
            </TabPanel>

            {/* Why Us Section */}
            <TabPanel>
              <Flex direction={['column', 'row']} gap={6}>
                <VStack align="start" flex={1} spacing={4}>
                  <Text fontSize="2xl" fontWeight="bold" color="teal.600">
                    Why Us?
                  </Text>
                  <VStack align="start" spacing={3}>
                    <Text fontSize="lg" >
                      <strong>Tailored Solutions:</strong> We work closely with
                      you to understand your needs and provide personalized
                      solutions.
                    </Text>
                    <Text fontSize="lg" >
                      <strong>Expert Team:</strong> Our team consists of
                      experienced developers and designers.
                    </Text>
                    <Text fontSize="lg" >
                      <strong>Client-Centric Approach:</strong> Your success is
                      our priority.
                    </Text>
                    <Text fontSize="lg" >
                      <strong>Commitment to Excellence:</strong> We ensure
                      quality and scalability in every project.
                    </Text>
                  </VStack>
                  <Button colorScheme="teal" size="lg" mt={4}>
                    Get Started
                  </Button>
                </VStack>
                <Box flex={1}>
                  <Image src={img4} borderRadius="md" shadow="lg" />
                </Box>
              </Flex>
            </TabPanel>
          </TabPanels>
        </Tabs>
      </Box>
    </Box>
  );
};

export default AboutUs;
