import { Box, Text, Button, Center, FormControl, FormLabel, HStack, Heading, Icon, Input, InputGroup, InputLeftElement, Link, Stack } from "@chakra-ui/react";
import { useForm } from "react-hook-form";
import { FiPhone } from 'react-icons/fi';
import { AiOutlineMail } from 'react-icons/ai';
import { FcGoogle } from "react-icons/fc";
import { IoLogoWhatsapp } from 'react-icons/io';

interface props {
    contactText: string
}

export const ContactsPage = ({ contactText }: props) => {
    const { register, } = useForm();

    return (
        <Stack mt={20} id="contact" m={'auto'} maxWidth={{ base: '80%', lg: "50%" }}>

            <Center p={5}>
                <Heading color={'whiteAlpha.800'}>contact</Heading>
            </Center>
            <Text>{contactText}</Text>
            <HStack>
                <Link href="https://mailto:samuelandrew145@gmail.com" target="blank">
                    <Icon as={FcGoogle} boxSize={50} />
                </Link>
                <Link href=" https://wa.me/2348143006319" target="blank">
                    <Icon as={IoLogoWhatsapp} boxSize={50} color={'whatsapp.400'} />
                </Link>
            </HStack>
            <form name="contact" method="POST" data-netlify="true">
                <Box>
                    <FormControl isRequired>
                        <FormLabel color={'whiteAlpha.800'}>First Name</FormLabel>
                        <Input type="text" bg={'white'} {...register('firtst name')} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={'whiteAlpha.800'}>Last Name</FormLabel>
                        <Input type="text" bg={'white'} {...register('last name')} />
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={'whiteAlpha.800'}>Email</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <AiOutlineMail />
                            </InputLeftElement>
                            <Input type="email" bg={'white'} {...register('E-mail')} />
                        </InputGroup>
                    </FormControl>

                    <FormControl isRequired>
                        <FormLabel color={'whiteAlpha.800'}>phone number</FormLabel>
                        <InputGroup>
                            <InputLeftElement>
                                <FiPhone />
                            </InputLeftElement>
                            <Input type="number" bg={'white'} {...register('phone number')} />
                        </InputGroup>
                    </FormControl>
                    <FormControl isRequired>
                        <FormLabel color={'whiteAlpha.800'}>messsage</FormLabel>
                        <textarea {...register('message', { required: true })} />
                    </FormControl>
                    <Button m={4} type="submit">submit</Button>
                </Box>
            </form>
        </Stack>
    );
};
