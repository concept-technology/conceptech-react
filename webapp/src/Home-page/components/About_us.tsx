import { Box, Heading, Icon, SimpleGrid, VStack , Text} from "@chakra-ui/react"
import TabsSection from "./About"
import { FaCloud, FaCode, FaMobileAlt, FaUsers } from "react-icons/fa"

const About_us = ()=>{
    return(
        <div>
            {/* about our us session */}
    <section className="hero" data-scroll-index="1">
            <div className="section-padding pos-re">
                <div className="container">
            
                  {/* Services Section */}
                  <Box textAlign="center" py={8}>
                    <Heading as="h2" size="xl" mb={4}>
                      Our Services
                    </Heading>
                    <Text fontSize="lg" color="gray.600" mb={8}>
                      We specialize in a wide range of services to empower your business.
                    </Text>
                    <SimpleGrid columns={{ base: 1, md: 2, lg: 4 }} spacing={6}>
                      {[
                        {
                          icon: FaCode,
                          title: "Custom Software Development",
                          description:
                            "Tailored software solutions that meet your unique business needs.",
                        },
                        {
                          icon: FaMobileAlt,
                          title: "Mobile App Development",
                          description:
                            "Robust and user-friendly mobile applications for all platforms.",
                        },
                        {
                          icon: FaCloud,
                          title: "Cloud Solutions",
                          description:
                            "Scalable and secure cloud solutions to transform your business.",
                        },
                        {
                          icon: FaUsers,
                          title: "Consulting Services",
                          description:
                            "Expert guidance to accelerate your digital transformation journey.",
                        },
                      ].map((service, index) => (
                        <VStack
                          key={index}
                          p={6}
                          bg="white"
                          shadow="md"
                          borderRadius="lg"
                          align="center"
                        >
                          <Icon as={service.icon} boxSize={12} color="teal.500" mb={4} />
                          <Heading as="h3" size="md">
                            {service.title}
                          </Heading>
                          <Text fontSize="sm" color="gray.600" textAlign="center">
                            {service.description}
                          </Text>
                        </VStack>
                      ))}
                    </SimpleGrid>
                  </Box>
            
                </div>

                <div className="curve curve-gray-b curve-bottom"></div>
            </div>

            <div className="tabs-section section-padding bg-gray" id='about'>
                <div className="container">
                    <div className="row">
                        <ul className="col-md-12 nav nav-pills tabs">
                 
                        </ul>
                        
                      <TabsSection/>
                    </div>
                </div>
            </div>
        </section>


        </div>
    )
}

export default About_us