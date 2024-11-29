import { Button, Menu, MenuButton, MenuItem, MenuList } from "@chakra-ui/react"
import { MdOutlineArrowDropDownCircle } from "react-icons/md"

interface props {
    onSortSelected: (sortOrder: string) => void
    sortName: string | null
}

const SortSelector = ({ onSortSelected, sortName }: props) => {
    const sortOrder = [
        { value: '', label: "Relevance" },
        { value: '-added', label: "Date Added" },
        { value: 'name', label: "Name" },
        { value: '-released', label: "Released date" },
        { value: '-metacritic', label: "Popularity" },
        { value: '-rating', label: "Average rating" }
    ]
    const sortOrderName = sortOrder.find(order => order.value === sortName)
    return (
        <Menu>
            <MenuButton as={Button} rightIcon={<MdOutlineArrowDropDownCircle />}>
                sort by:   {sortOrderName?.label || "relevance"}
            </MenuButton>
            <MenuList >
                {sortOrder.map(order =>
                    <MenuItem key={order.value}
                        value={order.value}
                        onClick={() => onSortSelected(order.value)}>
                        {order.label}
                    </MenuItem>)}

            </MenuList>
        </Menu>
    )
}
export default SortSelector