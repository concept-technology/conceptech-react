import axios from "axios"
import { ReactNode, useEffect, useState } from "react"

export interface newsProps {
    newsDate: number
    time?: number
    newsImage: string
    newsHeading: string
    newsSubHeading: string
    newsContent: string
}

interface props {
    news: newsProps[]
}
const useNews = () => {
    const [data, setData] = useState<props[]>([])
    useEffect(
        () => {
            axios.get('http://127.0.0.1:5000/').then(res => setData(res.data["news"]))
        }
        , [])
    return { data }
}
export default useNews