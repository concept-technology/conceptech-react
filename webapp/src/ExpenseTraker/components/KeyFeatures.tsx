import { Box, Center, Heading, Text } from "@chakra-ui/react"

const KeyFeatures = () => {
    return (
        <Box maxW={{ base: "95%", lg: "70%" }} m={"auto"}>
            <Center>

                <Heading> Key Features:</Heading>
            </Center>
            <Box m={2}>
                <Heading fontSize={"lg"} m={0}>  Streamlined Daily Tracking:</Heading>
                <Text p={5}>
                    With the Expense Tracker app, recording your daily expenses is a breeze. Log your expenditures on-the-go, ensuring that you never miss a single transaction.
                </Text>
            </Box>
            <Box m={3}>
                <Heading fontSize={"lg"} >
                    Real-time Insights:
                </Heading>
                <Text>
                    Gain instant insights into your spending patterns. The app categorizes your expenses, providing you with a clear overview of where your money is going. This knowledge empowers you to make informed decisions about your finances.
                </Text>
            </Box>
            <Box m={3}>
                <Heading fontSize={"lg"} m={0}>

                    Customizable Categories:
                </Heading>
                <Text>
                    The app offers a range of customizable expense categories, allowing you to tailor your tracking experience to your lifestyle. Whether it's groceries, entertainment, or transportation, you can easily categorize each expense for better organization.
                </Text>
            </Box>
            <Box m={3}>
                <Heading fontSize={"lg"} m={0}>

                    Budget Setting and Tracking:
                </Heading>
                <Text>

                    Take control of your finances by setting monthly budgets for different categories. The Expense Tracker app keeps you informed about your budget progress, helping you stay within your financial goals.
                </Text>
            </Box>
            <Box m={3}>
                <Heading fontSize={"lg"} m={0}>

                    Visual Reports:
                </Heading>
                <Text>

                    Visualize your spending habits through intuitive graphs and charts. These visual reports give you a clear picture of your financial behavior over time, making it easier to identify areas where you can cut back or save more.
                </Text>
            </Box>
            <Box m={3}>
                <Heading fontSize={"lg"} m={0}>

                    Secure and Private:
                </Heading>
                <Text>

                    We prioritize your data security. The Expense Tracker app uses industry-standard encryption to keep your financial information safe and private.
                </Text>
            </Box>
            <Box m={3}>
                <Heading fontSize={"lg"} m={2} >

                    Sync Across Devices:
                </Heading>

                <Text>
                    Seamlessly access your expense data on multiple devices. Whether you're on your smartphone, tablet, or computer, your information stays in sync for your convenience.
                </Text>
            </Box>



        </Box>
    )
}
export default KeyFeatures