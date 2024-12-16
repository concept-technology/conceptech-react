import {
  HStack,
  Button,
  Icon,
  Drawer,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  DrawerHeader,
  DrawerBody,
  List,
  ListItem,
  Spacer,
  useDisclosure,
  useBreakpointValue,
  Input,
  InputGroup,
  InputLeftElement,
  IconButton,
  Box,
} from "@chakra-ui/react";
import { FcAbout, FcCellPhone, FcHome, FcNews, FcSearch } from "react-icons/fc";
import { HiOutlineMenu, HiOutlineSearch } from "react-icons/hi";
import { useState, useEffect, useRef } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import { FaAppStoreIos, FaRegUser } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";

interface NavItem {
  id: number;
  text: string;
  link: string;
  icon: JSX.Element;
}

// interface NavBarProps {
//   navbar: NavItem[];
// }

const NavBar = () => {
  const [active, setActive] = useState(-1);
  const { isOpen, onOpen, onClose } = useDisclosure();
  const [isSearchActive, setSearchActive] = useState(false);
  const isMobile = useBreakpointValue({ base: true, md: false });
  const navigate = useNavigate();
  const location = useLocation();
  const [searchQuery, setSearchQuery] = useState("");

  const searchRef = useRef<HTMLDivElement>(null);
  const [user, setUser] = useState<{ username?: string } | null>(null);

  // Function to decode the token and set the user
  const loadUserFromToken = () => {
    const token = localStorage.getItem("authToken");
    if (token) {
      try {
        const decoded = jwtDecode<{ username: string }>(token);
        setUser(decoded);
      } catch (error) {
        console.error("Invalid token:", error);
        setUser(null);
      }
    } else {
      setUser(null);
    }
  };

  // Load user on component mount or token change
  useEffect(() => {
    loadUserFromToken();
  }, []);

  // Navigation items
  const token = localStorage.getItem("authToken");

  const navItems: NavItem[] = [
    { id: 0, text: "About", icon: <FcAbout />, link: "#about" },
    { id: 1, text: "Blog", icon: <FcNews />, link: "blog" },
    { id: 2, text: "Contact", icon: <FcCellPhone />, link: "#contact" },
    { id: 3, text: "Apps", icon: <FaAppStoreIos />, link: "/project" },
    {
      id: 4,
      text: token ? "Profile" : "login",
      icon: <FaRegUser />,
      link: token ? "/account/profile" : "/login",
    },
  ];

  useEffect(() => {
    if (location.hash) {
      const element = document.getElementById(location.hash.substring(1));
      if (element) {
        element.scrollIntoView({ behavior: "smooth" });
      }
    }
  }, [location]);

  // Custom outside click handler
  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setSearchActive(false);
      }
    }

    if (isSearchActive) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isSearchActive]);

  const handleNavigation = (index: number, link: string) => {
    setActive(index);
    if (link.startsWith("#")) {
      if (location.pathname !== "/") {
        navigate("/" + link);
      } else {
        const element = document.getElementById(link.substring(1));
        if (element) {
          element.scrollIntoView({ behavior: "smooth" });
        }
      }
    } else {
      navigate(link);
    }
    onClose(); // Ensure that drawer closes on mobile after navigation
  };

  const handleSearch = () => {
    console.log("Searching for:", searchQuery);
    setSearchActive(false); // Close the search after submission
    setSearchQuery(""); // Clear search input
  };

  const handleCloseSearch = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setSearchActive(false);
    }
  };

  useEffect(() => {
    if (isSearchActive) {
      document.addEventListener("keydown", handleCloseSearch);
    }
    return () => {
      document.removeEventListener("keydown", handleCloseSearch);
    };
  }, [isSearchActive]);

  return (
    <>
      <HStack p={"10px"} w="100%" bg="#2f304c" boxShadow="sm">
        <Link to="/" onClick={() => (window.location.href = "/")}>
          <Button
            leftIcon={<FcHome />}
            fontSize={"2xl"}
            variant="link"
            color={"white"}
            fontWeight="bold"
            _hover={{ textDecoration: "none", color: "#f2a365" }}
            marginLeft={"20px"}
          >
            Concept Technologies
          </Button>
        </Link>
        <Spacer />

        {isMobile ? (
          <>
            {/* Mobile Search + Menu */}
            <Icon
              as={HiOutlineMenu}
              onClick={onOpen}
              color="white"
              boxSize={"40px"}
              cursor="pointer"
              _hover={{ color: "#f2a365" }}
              mr="20px"
              transition="color 0.3s ease"
            />
            <Drawer placement="right" onClose={onClose} isOpen={isOpen} size="xs">
              <DrawerOverlay />
              <DrawerContent bg="#2f304c" color="white">
                <DrawerCloseButton color="white" />
                <DrawerHeader borderBottomWidth="1px" borderColor="#f2a365">
                  <Button
                    leftIcon={<FcHome />}
                    fontSize={"xl"}
                    variant="link"
                    color={"white"}
                    fontWeight="bold"
                    _hover={{ textDecoration: "none", color: "#f2a365" }}
                  >
                    Concept Technologies
                  </Button>
                </DrawerHeader>
                <DrawerBody>
                  {/* Search bar for mobile */}
                  <InputGroup mb={6}>
                    <InputLeftElement pointerEvents="none" children={<FcSearch />} />
                    <Input
                      placeholder="Search..."
                      value={searchQuery}
                      onChange={(e) => setSearchQuery(e.target.value)}
                      _placeholder={{ color: "gray.400" }}
                      color="white"
                      bg="#3b3e59"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}

                    />
                    <IconButton
                      aria-label="Submit Search"
                      icon={<HiOutlineSearch />}
                      onClick={handleSearch}
                      bg="transparent"
                      color="white"
                      fontSize="24px"
                      _hover={{ color: "#f2a365" }}
                    />
                  </InputGroup>
                  <List spacing={4}>
                    {navItems.map((nav, index) => (
                      <ListItem
                        key={nav.id}
                        p={"10px"}
                        onClick={() => {
                          handleNavigation(index, nav.link);
                        }}
                        bg={active === index ? "#3b5998" : "transparent"}
                        borderRadius={"10px"}
                        cursor={"pointer"}
                        transition="background 0.3s ease"
                        _hover={{
                          bg: "#f2a365",
                        }}
                      >
                        <HStack>
                          <Button
                            leftIcon={nav.icon}
                            py={2}
                            colorScheme={active === index ? "messenger" : "whiteAlpha"}
                            variant="ghost"
                            color="white"
                            fontWeight="medium"
                            _hover={{ color: "white" }}
                          >
                            {nav.text}
                          </Button>
                        </HStack>
                      </ListItem>
                    ))}
                  </List>
                </DrawerBody>
              </DrawerContent>
            </Drawer>
          </>
        ) : (
          <HStack spacing={8} mr="20px">
            {/* Search icon for desktop */}
            <IconButton
              aria-label="Search"
              icon={<FcSearch />}
              onClick={() => setSearchActive(true)}
              bg="transparent"
              color="white"
              fontSize="24px"
              _hover={{ color: "#f2a365" }}
            />
            {navItems.map((nav, index) => (
              <Button
                key={nav.id}
                leftIcon={nav.icon}
                py={4}
                colorScheme={active === index ? "messenger" : "whiteAlpha"}
                variant="ghost"
                onClick={() => handleNavigation(index, nav.link)}
                color="white"
                fontWeight="medium"
                _hover={{
                  color: "#f2a365",
                }}
                transition="color 0.3s ease"
              >
                {nav.text}
              </Button>
            ))}
          </HStack>
        )}
      </HStack>

      {/* Full-screen Search Overlay */}
      {isSearchActive && (
        <Box
          position="fixed"
          top="0"
          left="0"
          width="100vw"
          height="100vh"
          bg="rgba(0, 0, 0, 0.8)"
          backdropFilter="blur(8px)" // Adds the blur effect
          zIndex="1000"
          display="flex"
          justifyContent="center"
          alignItems="center"
          onClick={() => setSearchActive(false)}
        >
          <Box width={["90%", "80%", "60%"]} ref={searchRef}>
            <InputGroup>
              <InputLeftElement pointerEvents="none" children={<FcSearch />} />
              <Input
                placeholder="Type your query..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                _placeholder={{ color: "gray.400" }}
                color="white"
                bg="gray.700"
                size="lg"
                onKeyDown={(e) => e.key === "Enter" && handleSearch()}
                autoFocus
              />
              <IconButton
                aria-label="Submit Search"
                icon={<HiOutlineSearch />}
                onClick={handleSearch}
                bg="transparent"
                color="white"
                fontSize="24px"
                _hover={{ color: "#f2a365" }}
              />
            </InputGroup>
          </Box>
        </Box>
      )}
    </>
  );
};

export default NavBar;
