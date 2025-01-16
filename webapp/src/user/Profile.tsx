import { Box, Text, Button, VStack, useBreakpointValue } from "@chakra-ui/react";

import { useState } from "react";
import UserAccount from "./UserAccount";
import PaidOrderDetails from "./OderPaid";


const Profile = () => {
  // Define the valid keys for the pages object
  type PageKey = "Profile" | "Orders" | "Services" | "Contact";
  const [currentPage, setCurrentPage] = useState<PageKey>("Profile");
  
  const pages: Record<PageKey, JSX.Element> = {
    Profile: <UserAccount />,
    Orders: <PaidOrderDetails />,
    Services: <Text fontSize="xl">These are our Services.</Text>,
    Contact: <Text fontSize="xl">Get in touch with us on the Contact Page.</Text>,
  };

  // Use Chakra's responsive `flexDirection` for layout
  const flexDirection = useBreakpointValue({ base: "column", md: "row" });
  const leftColumnWidth = useBreakpointValue({ base: "100%", md: "10%" });
  const rightColumnWidth = useBreakpointValue({ base: "100%", md: "90%" });

  return (
    <Box display="flex" flexDirection={flexDirection} height="100vh" >
      {/* Left Column */}
      <Box width={leftColumnWidth} bg="gray.100" p={4}>
        <VStack spacing={4} align="stretch">
          {Object.keys(pages).map((page) => (
            <Button
              key={page}
              onClick={() => setCurrentPage(page as PageKey)}
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
    </Box>
  );
};

export default Profile;

