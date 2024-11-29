
import { Button, Input, InputGroup, InputLeftElement, InputRightElement } from "@chakra-ui/react"
import { useRef } from "react"
import { BsSearch } from "react-icons/bs"
import { FaSearchPlus } from "react-icons/fa"

interface props {
    onsearch: (searchRef: string) => void
}
const SearchBar = ({ onsearch }: props) => {
    const searchRef = useRef<HTMLInputElement>(null)
    return (
        <form onSubmit={(e) => {
            e.preventDefault()
            if (searchRef.current) onsearch(searchRef.current.value)
        }}>
            <InputGroup mt={20} >
                <InputLeftElement children={<BsSearch />} />
                <Input ref={searchRef} type="search" variant={'filled'} borderRadius={20} placeholder="search games...." />
                <InputRightElement >
                    <Button type="submit" children={<FaSearchPlus size={'lg'} />} />
                </InputRightElement>
            </InputGroup>
        </form>
    )
}
export default SearchBar