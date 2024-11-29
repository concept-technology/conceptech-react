import { Select } from "@chakra-ui/react"

interface props {
    onFilter: (para: string) => void
    onItemFilter: Array<string>
}
const ExpenseFilter = ({ onFilter, onItemFilter }: props) => {
    return (
        <Select placeholder={"choose category"} onChange={(e) => onFilter(e.target.value)} maxW={"70%"} m={"auto"} marginTop={"100px"} marginBottom={"30px"}>
            <option value={""}>All Categories</option>
            {onItemFilter.map(items => <option key={items} value={items}>{items}</option>)}
        </Select>
    )
}
export default ExpenseFilter
