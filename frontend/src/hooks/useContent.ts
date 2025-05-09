import axios from "axios"
import { useEffect, useState } from "react"
import { ICard } from "../components/utils"
import { BACKEND_URL } from "../config"

export const useContent = (type? : string) => {
    const [content, setContent] = useState<ICard[]>([])

    const fetchContent = async () => {

        try{
            const url = type === "All"
                        ? `${BACKEND_URL}/content`
                        : `${BACKEND_URL}/content?type=${type}`
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

export function useShareContent(shareId?: string){

    const [content, setContent] = useState<ICard[]>([])

    const fetchContent = async () => {

        try{
            const response = await axios.get(`${BACKEND_URL}/link/brain/${shareId}`)
            // console.log(response.data.content)
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