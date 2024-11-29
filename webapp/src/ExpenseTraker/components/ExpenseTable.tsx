import { Box, Button, ButtonGroup, Popover, PopoverArrow, PopoverBody, PopoverCloseButton, PopoverContent, PopoverFooter, PopoverHeader, PopoverTrigger, Table, TableCaption, TableContainer, Tbody, Td, Tfoot, Th, Thead, Tr, } from "@chakra-ui/react"
import { tableProps } from "./TableObject"
import { RiDeleteBin6Fill } from 'react-icons/ri'
import { FaUnlockAlt, FaLock } from 'react-icons/fa'
import { useState } from "react"

interface itemProps {
    tableDatas: tableProps[]
    onDelete: (id: number) => void
    lock: boolean,
}
const tableHeader = [
    'S/No.', 'Date', 'amount', 'category', 'Description', 'Action'
]

const ExpenseTable = ({ tableDatas, onDelete, }: itemProps) => {
    const [lock, setLock] = useState(true)
    const handleLock = () => {
        setLock(!lock)
    }

    return (
        <>
            <Box>

            </Box>
            <TableContainer
                m={["auto",]}
                p={5}
                w={{ base: "95%", lg: "80%" }}
                bg={"black"}>
                <Table variant={"striped"} colorScheme='black'>
                <TableCaption>Expense Tracker</TableCaption>
                <Thead>
                    <Tr>
                            {tableHeader.map(thead =>
                                <Th scope="col"
                                    key={thead} color={"white"}
                                >
                                    {thead}
                                </Th>
                            )}
                    </Tr>
                </Thead>
                    <Tbody>
                        {tableDatas.map((items, index) => 
                            <Tr key={items.date}>
                                <Td scope="row" color={"whiteAlpha.800"} >{index + 1}</Td>
                                <Td scope="row" color={"whiteAlpha.800"} >{(items.date)}</Td>
                                <Td scope="row" color={"whiteAlpha.800"}>N {new Intl.NumberFormat().format(items.amount)}</Td>
                                <Td scope="row" color={"whiteAlpha.800"}>{items.category}</Td>
                                <Td scope="row" color={"whiteAlpha.800"}>{items.Description}</Td>
                                {items.date && <Td>
                                    {lock &&
                                        <Popover>
                                            <PopoverTrigger>
                                                <Button colorScheme='red' leftIcon={<RiDeleteBin6Fill />}>delete</Button>
                                            </PopoverTrigger>
                                            <PopoverContent>
                                                <PopoverArrow />
                                                <PopoverCloseButton />
                                                <PopoverHeader>Confirmation!</PopoverHeader>
                                                <PopoverBody>Are you sure you want to delete?</PopoverBody>
                                                <PopoverFooter display='flex' justifyContent='flex-end'>
                                                    <ButtonGroup size='sm'>
                                                        <Button variant='outline'>Cancel</Button>
                                                        <Button colorScheme='red' onClick={() => onDelete(items.id)}>Apply</Button>
                                                    </ButtonGroup>
                                                </PopoverFooter>
                                            </PopoverContent>
                                        </Popover>}

                                    {!lock && <Button colorScheme='blue' boxSize={"27px"} leftIcon={<FaLock />}
                                    />

                                    }

                                </Td>}
                            </Tr>)}
                    </Tbody>
                    <Tfoot>
                        <Tr>
                            <Td color={"whiteAlpha.800"}>Total</Td>
                            <Td color={"whiteAlpha.800"}></Td>
                            <Td color={"whiteAlpha.800"}> N {new Intl.NumberFormat().format(tableDatas.reduce((acc, price) => acc + price.amount, 0))}</Td>
                            <Td color={"whiteAlpha.800"}></Td>
                            <Td>

                                {lock && <Button colorScheme='blue' leftIcon={<FaUnlockAlt />} onClick={handleLock} />}
                                {!lock && <Button colorScheme='blue' leftIcon={<FaLock />} onClick={handleLock} />}


                            </Td>
                        </Tr>
                    </Tfoot>
            </Table>
        </TableContainer>

        </>
    )
}
export default ExpenseTable