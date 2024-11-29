import thumsup from '../../../assets/Images/thumbs-up.webp'
import bullsEye from '../../../assets/Images/bulls-eye.webp'
import meh from '../../../assets/Images/meh.webp'
import { Image, ImageProps } from '@chakra-ui/react'


interface props {
    rating: number
}
const Rating: { [key: number]: ImageProps } = ({ rating }: props) => {
    const emojiMap = {
        3: { src: meh, alt: 'meh', boxSize: "25px" },
        4: { src: thumsup, alt: ' recomended', boxSize: "25px", m: 2 },
        5: { src: bullsEye, alt: 'exceptional', boxSize: "35px" }
    }
    return (
        <Image {...emojiMap[rating]} />
    )
}
export default Rating