import { Box, Text, Button, VStack, useBreakpointValue } from "@chakra-ui/react";
import { useState } from "react";
import UserAccount from "./UserAccount";
import PaidOrderDetails from "./OderPaid";
import { useGetUserDetailsQuery } from "../app/services/auth/authService";
import ProjectHome from "../Home-page/Project-Page/Project-Home";
import projecObject from "../Home-page/Project-Page/Project-Object";
import LoginPage from "../authentication/LoginPage";
import PrivateRoute from "../routes/PrivateRoute";
import ContactForm from "../Home-page/components/ContactForm";


const Profile = () => {
  const { data:user,} = useGetUserDetailsQuery('userDetails', {});
  type PageKey = "Account" | "Orders" | "Services" | "Contact" | "logout";
  const [currentPage, setCurrentPage] = useState<PageKey>("Account");

  const pages: Record<PageKey, JSX.Element> = {
    Account: <UserAccount />,
    Contact: <PrivateRoute><ContactForm /></PrivateRoute>,
    Orders: <PaidOrderDetails />,
    Services: <ProjectHome projectItems={projecObject}/>,
    // logout: isAuthenticated ? <Logout /> : <LoginPage />,
  };

  const leftColumnWidth = useBreakpointValue({ base: "100%", md: "10%" });
  const rightColumnWidth = useBreakpointValue({ base: "100%", md: "90%" });

  return (
    <>
    {user?     <Box display="flex" flexDirection={{ base: "column", md: "row" }} height="100vh">
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
    </Box> : <LoginPage/>}
    </>
  );
};

export default Profile;
