import { Box, Text, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import { useSelector } from "react-redux";
import UserAccount from "./UserAccount";
import Logout from "../authentication/LogOut";
import PaidOrderDetails from "./OderPaid";
import LoginPage from "../authentication/LoginPage";
import { RootState } from "@reduxjs/toolkit/query";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import SessionExpired from "./SessionExpired";

const Profile = () => {
  const { data:user, isFetching, error} = useGetUserDetailsQuery('userDetails', {
    // Perform a refetch every 4 minutes
    pollingInterval: 240000, 
    
  });
  type PageKey = "Profile" | "Orders" | "Services" | "Contact" | "logout";
  const [currentPage, setCurrentPage] = useState<PageKey>("Profile");

  const pages: Record<PageKey, JSX.Element> = {
    Profile: <UserAccount />,
    Orders: <PaidOrderDetails />,
    Services: <Text fontSize="xl">These are our Services.</Text>,
    Contact: <Text fontSize="xl">Get in touch with us on the Contact Page.</Text>,
    // logout: isAuthenticated ? <Logout /> : <LoginPage />,
  };

  const leftColumnWidth = useBreakpointValue({ base: "100%", md: "10%" });
  const rightColumnWidth = useBreakpointValue({ base: "100%", md: "90%" });

  return (
    <>
    {user ?     <Box display="flex" flexDirection={{ base: "column", md: "row" }} height="100vh">
      {/* Left Column */}
      <Box width={leftColumnWidth} bg="gray.100" p={4}>
        <VStack spacing={4} align="stretch">
          {(Object.keys(pages) as PageKey[]).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page)}
              colorScheme="teal"
              variant={currentPage === page ? "solid" : "outline"}
            >
              {page}
            </Button>
          ))}
        </VStack>
      </Box>

      {/* Right Column */}
      <Box width={rightColumnWidth} bg="gray.50" p={8}>
        {pages[currentPage]}
      </Box>
    </Box> : <SessionExpired/>}

    </>
  );
};

export default Profile;
