import React from 'react';
import { Box, Flex, Text, Heading, VStack, Button, Icon, useColorModeValue } from '@chakra-ui/react';
import { FaLightbulb, FaPencilRuler, FaServer, FaRocket, FaCogs, FaComments, FaHandshake } from 'react-icons/fa';

const steps = [
  {
    icon: FaLightbulb,
    number: '01',
    title: 'Requirement Gathering',
    description: 'We work closely with your team to understand your business needs and objectives, and translate them into a clear project scope.',
  },
  {
    icon: FaPencilRuler,
    number: '02',
    title: 'Planning & Design',
    description: 'Once the requirements are gathered, we design a solution tailored to your needs, defining the system architecture, UI/UX, and tech stack.',
  },
  {
    icon: FaRocket,
    number: '03',
    title: 'Development',
    description: 'Our team of expert developers brings the design to life, following agile methodologies to ensure flexibility and timely delivery.',
  },
  {
    icon: FaServer,
    number: '04',
    title: 'Testing',
    description: 'We rigorously test the software for functionality, performance, and security to ensure everything works smoothly.',
  },
  {
    icon: FaCogs,
    number: '05',
    title: 'Deployment',
    description: 'After successful testing, we deploy the solution in your environment and ensure a seamless transition.',
  },
  {
    icon: FaComments,
    number: '06',
    title: 'Feedback & Continuous Improvement',
    description: 'Your Feedback Matters: After deployment, we actively seek your feedback through our customer feedback form, email, and social media.',
  },
  {
    icon: FaHandshake,
    number: '07',
    title: 'Maintenance & Support',
    description: 'We provide continuous support and maintenance to keep your system updated, secure, and performing at its best.',
  },
];

const ProcessSection = () => {
  const bgColor = useColorModeValue('gray.50', 'gray.900');
  const iconColor = useColorModeValue('teal.400', 'teal.200');

  return (
    <Box bgImage="url('img/bg6.jpg')" bgSize="cover" bgPosition="center" py={16} textAlign="center" bgColor={bgColor}>
      <Box maxW="container.md" mx="auto" mb={10}>
        <Heading as="h4" size="lg" mb={4}>
          <Text as="span" color="teal.400">Our</Text> Process
        </Heading>
        <Text color="gray.600">
          We are a passionate digital design agency that specializes in beautiful and easy-to-use digital design & web development services.
        </Text>
      </Box>

      <Flex wrap="wrap" justify="center" gap={8}>
        {steps.map((step, index) => (
          <VStack
            key={index}
            bg="white"
            p={6}
            rounded="md"
            shadow="lg"
            textAlign="center"
            maxW="sm"
            spacing={4}
          >
            <Icon as={step.icon} boxSize={12} color={iconColor} />
            <Heading size="md" color="teal.400">{step.number}</Heading>
            <Heading as="h6" size="sm">{step.title}</Heading>
            <Text fontSize="sm" color="gray.500">{step.description}</Text>
          </VStack>
        ))}
      </Flex>

      <Box mt={16} bg="gray.700" py={12} color="white">
        <Heading mb={4}>Want to work with us?</Heading>
        <Text mb={6}>Tell us about your project</Text>
        <Button colorScheme="teal" size="lg" onClick={() => alert('Get Started')}>
          Get Started
        </Button>
      </Box>
    </Box>
  );
};

export default ProcessSection;
