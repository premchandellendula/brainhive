import axios from "axios"
import { useEffect, useState } from "react"
import { ICard } from "../components/utils"

export const useContent = () => {
    const [content, setContent] = useState<ICard[]>([])

    const fetchContent = async () => {

        try{
            const response = await axios.get(`http://localhost:3000/api/v1/content/`)
            // console.log(response.data)
            setContent(response.data.content)
        }catch (error) {
            console.error("Failed to fetch content", error)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [])

    return {content, fetchContent}
}