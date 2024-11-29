import { Box, Center, Heading, Text } from "@chakra-ui/react"

interface props {
  heading?: string
  content?: string
}
const ScrolText = ({ heading, content }: props) => {
  return (
    <Box mt={50}>
      <Center>

        <Heading mt={5} fontSize={ 25}>{heading}</Heading>
      </Center>
      <Text fontSize={20} p={5}>{content}</Text>
    </Box>
  )
}
export default ScrolText

