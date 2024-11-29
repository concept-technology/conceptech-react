import { Box } from "@chakra-ui/react"
import bg from '../assets/backG.jpg'
import ContactsPage from "./Contact-Page"
const ContactApp = () => {
    const text = 'Thank you for considering [Your Company Name] for your website development needs. We are committed to delivering high-quality work that meets your unique needs and exceeds your expectations. Contact us today to learn more about our services and how we can help you succeed online.'
    return (
        <Box bgImage={bg} backgroundPosition={'center'} bgSize={'cover'} bgRepeat={'no-repeat'}>
            <ContactsPage contactText={text} />
        </Box>

    )
}
export default ContactApp