import jspic from '../../assets/Images/js.webp'
import csslogo from '../../assets/Images/csslogo.png'
import { Box, Center, Heading, Image, SimpleGrid, Text } from '@chakra-ui/react'
import reactlogo from '../../assets/Images/reactLogo.webp'
import agileLogo from '../../assets/Images/agilelogo.png'
import ScrolText from './Scroll-Text'

export interface getProps {
    pgLanguage: string
    bgImage: string
    text: string
    id: number
    containerId?: number
    imageDescription: string
    serviceDescription?: string
}

const MySkills
    = () => {
        const Object: getProps[] = [
            {
                imageDescription: "react logO",
                pgLanguage: "React.js",
                bgImage: reactlogo,
                text: "react",
                id: 1,
                containerId: 1,
                serviceDescription: `  Expertise in building dynamic, single-page applications using React. 
                 Proficient in managing
                 application state with Redux, Mobx, or the React context API for complex applications,
                 Implementing client-side routing with React Router for SPAs and maintaining clean and SEO-friendly URLs.
                Developed and maintained various React applications, including a customer portal that improved user satisfaction.
                Implemented user authentication and authorization using JWT tokens and role-based access control (RBAC).
                Worked closely with the back-end team to design API endpoints and ensure seamless integration between front-end and back-end systems.
                `
            },
            {
                imageDescription: "css logo",
                pgLanguage: "HTML/CSS",
                bgImage: csslogo,
                text: "html",
                id: 2,
                containerId: 2,
                serviceDescription: `Creating responsive Designs and Ensuring seamless user experiences across various devices and screen sizes through responsive design techniques and CSS frameworks like Bootstrap.`
            },
            {
                imageDescription: "javascript logo",
                pgLanguage: "JavaScript/ES6",
                bgImage: jspic,
                text: "javaSript",
                id: 3,
                containerId: 3,
                serviceDescription: ` Strong proficiency in JavaScript with a deep understanding of ES6 features and modern coding standards.`
            },
            {
                imageDescription: 'agile logo',
                pgLanguage: 'Agile/Scrum',
                bgImage: agileLogo,
                text: 'Agile/Scrum',
                id: 4,
                serviceDescription: ` Proficient in Agile development methodologies and Scrum practices for effective project management and collaboration.`
            }
        ]

        return (

            <Box bgGradient='linear(to-l, #55597c, #e3d8d8)' borderRadius={20} mt={100}>
                <ScrolText heading={' SKILLED LANGUAGES'} />
                <SimpleGrid
                    spacing={10}
                    padding={"10px"}>

                    {Object.map(items =>

                        <Box key={items.text}
                            rounded='md'
                            maxW={{ lg: "50%" }}
                            border={"4px solid brown"}
                            bg={'whiteAlpha.600'}
                            boxShadow='outline'
                            justifyItems={"center"}
                            m="auto"
                            p={5}>

                            <Center>
                                <Image key={items.id}
                                    src={items.bgImage}
                                    maxW={"300px"}
                                    borderRadius={30}
                                    objectFit={"cover"} m={5}
                                    alt={items.imageDescription}
                                />
                            </Center>
                            <Center>
                                <Heading key={items.text}
                                    fontSize={22}
                                >
                                    {items.pgLanguage}
                                </Heading>
                            </Center>
                            <Text p={5} fontSize={{ base: 'lg,', lg: '2xl' }}>{items.serviceDescription}</Text>
                        </Box>
                    )}

                </SimpleGrid>
            </Box>
        )
    }
export default MySkills
