import { Button } from "@chakra-ui/react"
import { IoArrowBackOutline } from "react-icons/io5";
import { useNavigate } from "react-router-dom";
const BackButton = ()=>{
    const navigate = useNavigate()
return<Button onClick={()=>navigate(-1)}><IoArrowBackOutline /></Button>
}

export default BackButton