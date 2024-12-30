import {
  Box,
  Flex,
  Text,
  IconButton,
  Button,
  useColorMode,
  useColorModeValue,
  Stack,
  Avatar,
  InputGroup,
  Input,
  InputRightElement,
  Spacer,
} from '@chakra-ui/react';
import { FaMoon, FaSun, FaSearch } from 'react-icons/fa';

const BlogHeader = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  const bgColor = useColorModeValue('white', 'gray.800');
  const textColor = useColorModeValue('gray.800', 'white');

  return (
    <Box bg={bgColor} px={4} shadow="md">
      <Flex h={16} alignItems="center" justifyContent="space-between">
        {/* Logo */}
        <Text fontSize="2xl" fontWeight="bold" color={textColor}>
          CTS2Blog
        </Text>

      
        {/* <Flex as="nav" display={{ base: 'none', md: 'flex' }} ml={10}>
          <Stack direction="row" spacing={4}>
            <Button variant="link" color={textColor}>
              Home
            </Button>
            <Button variant="link" color={textColor}>
              About
            </Button>
            <Button variant="link" color={textColor}>
              Blog
            </Button>
            <Button variant="link" color={textColor}>
              Contact
            </Button>
          </Stack> */}
        {/* </Flex> */}
        <Spacer/>

        {/* Search Bar */}
        <InputGroup maxW="300px" display='flex'>
          <Input placeholder="Search..." />
          <InputRightElement>
            <IconButton
              aria-label="Search"
              icon={<FaSearch />}
              size="sm"
              variant="ghost"
            />
          </InputRightElement>
        </InputGroup>
<Spacer/>
        {/* User Section */}
        <Stack direction="row" spacing={4} alignItems="center">
          <IconButton
            aria-label="Toggle Color Mode"
            icon={colorMode === 'light' ? <FaMoon /> : <FaSun />}
            onClick={toggleColorMode}
          />
          <Avatar size="sm" src="https://bit.ly/broken-link" />
        </Stack>
      </Flex>
    </Box>
  );
};

export default BlogHeader;
