import { Heading } from "@chakra-ui/react"
import { GameQuery } from "../GameApp"

interface props {
    gameQuery: GameQuery

}
const GameHeading = ({ gameQuery }: props) => {
    const GameTittle = `${gameQuery?.genres?.name || ''} ${gameQuery?.platform?.name || ''} games`
    return (
        <Heading p={3}>{GameTittle}</Heading>
    )
}
export default GameHeading