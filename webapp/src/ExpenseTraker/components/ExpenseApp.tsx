import { SetStateAction, useState } from "react"
import ExpenseTable from "./ExpenseTable"
import ExpenseForm from "./ExpenseForm"
import categories from "./Categories"
import tableObject, { tableProps } from "./TableObject"
import ExpenseFilter from "./ExpenseFilter"
import ExpenseHeader from "./ExpenseHeader"
import KeyFeatures from "./KeyFeatures"
import { Button } from "@chakra-ui/react"
import { Link } from "react-router-dom"


const ExpenseApp = () => {
    const [table, setTable] = useState(tableObject)
    const [selectCategory, setSelectCategory] = useState('')


    // delete data in the table
    const lock = true
    const handleDelete = (id: number) => {
        setTable(table.filter((e) => e.id !== id))
    }
    // submit form data to the table
    const handleSubmit = (newExpense: tableProps) => {
        setTable([...table, { ...newExpense, id: table.length + 1 }])
    }

    // this function handles filter change
    const handleFilter = (e: SetStateAction<string>) => {
        setSelectCategory(e)
    }
    const handleSelectedCategory = (category: SetStateAction<string>) => {
        setSelectCategory(category)
    }

    const filteredExpenses = selectCategory ? table.filter(e => e.category === selectCategory) : table

    return (
        <>
            <Link to='/' onClick={() => window.location.href ='/'}>
            <Button >back</Button>
            </Link>
            <ExpenseHeader />
            <ExpenseFilter onItemFilter={categories} onFilter={handleFilter} />
        <ExpenseTable lock={lock}
                tableDatas={filteredExpenses}
                onDelete={handleDelete}
            />
            <ExpenseForm onsubmit={handleSubmit}
                category={categories}
                onSelect={handleSelectedCategory}
            />
            <KeyFeatures />
        </>
    )
}
export default ExpenseApp