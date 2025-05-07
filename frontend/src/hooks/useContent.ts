import axios from "axios"
import { useEffect, useState } from "react"
import { ICard } from "../components/utils"

export const useContent = (type? : string) => {
    const [content, setContent] = useState<ICard[]>([])

    const fetchContent = async () => {

        try{
            const url = type === "All"
                        ? `http://localhost:3000/api/v1/content`
                        : `http://localhost:3000/api/v1/content?type=${type}`
            const response = await axios.get(url)
            // console.log(response.data.content)
            setContent(response.data.content)
        }catch (error) {
            console.error("Failed to fetch content", error)
        }
    }

    useEffect(() => {
        fetchContent()
    }, [type])

    return {content, fetchContent}
}