import { useForm, } from "react-hook-form";
import { Box, Button, FormControl, FormErrorMessage, FormHelperText, FormLabel, Input, NumberDecrementStepper, NumberIncrementStepper, NumberInput, NumberInputField, NumberInputStepper, Select, } from '@chakra-ui/react'
import { z } from 'zod'
import { useState } from "react";


interface formDataProps {
    onsubmit: (para: ExpenseFormData) => void
    onSelect: (param: string) => void
    category: Array<string>


}

const schema = z.object({
    date: z.string(),
    id: z.number(), 
    amount: z.number().min(0.01).max(100_000_000),
    category: z.string().min(3),
    Description: z.string().min(5, { message: "please enter at least 5 characters" })
})
type ExpenseFormData = z.infer<typeof schema>

const ExpenseForm = ({ onsubmit, onSelect, category }: formDataProps) => {
    const { register, handleSubmit, reset } = useForm<ExpenseFormData>()
    const [dateError, setDateError] = useState('')
    const [amountError, setAmountError] = useState('')


    const isAmountError = amountError === ''
    const isdateError = dateError === ''
    return (
        <Box m={"auto"} w={"60%"} marginTop={"50px"}>

            {/*eslint-disable-next-line @typescript-eslint/no-misused-promises */}
            <form onSubmit={handleSubmit((data) => {
                onsubmit(data)
                reset()
            })}
            >


                <FormControl isInvalid={isdateError} id="date" >
                    <FormLabel htmlFor="date" >date</FormLabel>
                    <FormHelperText>the date the cash was spent</FormHelperText>
                    <Input type='date' id="date" {...register('date')} onChange={(e) => setDateError(e.target.value)} />
                    <FormErrorMessage>please enter date</FormErrorMessage>
                </FormControl>
                {/* amount input field */}
                <FormControl id="amount" isRequired isInvalid={isAmountError} >
                    <FormLabel htmlFor="number">amount</FormLabel>
                    <NumberInput min={0.01}>
                        <NumberInputField {...register('amount', { valueAsNumber: true })} onChange={(e) => setAmountError(e.target.value)} />
                        <NumberInputStepper>
                            <NumberIncrementStepper />
                            <NumberDecrementStepper />
                        </NumberInputStepper>
                    </NumberInput>
                    {isAmountError && <FormHelperText>how much was the price?</FormHelperText>}
                    <FormErrorMessage>you forgot to input amount</FormErrorMessage>
                </FormControl >
                {/* for the category input field */}
                <FormControl id="category" isRequired>
                    <FormLabel htmlFor="category">category</FormLabel>
                    <FormHelperText>what category does this item belongs to</FormHelperText>
                    <Select placeholder='Select category'  {...register("category")} onChange={(e) => onSelect(e.target.value)}>
                        {category.map(items => <option key={items}
                            value={items}>{items}</option>)}
                    </Select>
                    <FormErrorMessage>please select a category</FormErrorMessage>
                </FormControl>
                <FormControl isRequired id="description">
                    <FormLabel htmlFor=" item Description">item Description</FormLabel>
                    <FormHelperText>describe item in details</FormHelperText>
                    <Input {...register("Description")} />
                    <FormErrorMessage>you have described the item</FormErrorMessage>
                </FormControl>
                <Button type='submit' m={5} >submit</Button>
            </form>

        </Box>
    )

}


export default ExpenseForm;
