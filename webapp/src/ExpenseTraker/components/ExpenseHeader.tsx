import { Box, Heading, Text } from "@chakra-ui/react"

const ExpenseHeader = () => {
    return (
        <Box maxW={{ base: "95%", lg: "70%" }} m={"auto"} marginTop={"50px"}>

            <Heading> Expense Tracker - Your Daily Spending Companion</Heading>
            <Text m={5} p={5} fontSize={"lg"}>Are you tired of losing track of your expenses and struggling to manage your finances effectively? Look no further! We're thrilled to introduce our latest project - the Expense Tracker app. Designed to simplify your daily spending tracking, this app will revolutionize the way you manage your finances.</Text>
        </Box>
    )
}
export default ExpenseHeader