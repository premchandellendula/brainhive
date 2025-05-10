import { useEffect, useRef, useState } from "react"
import Cross from "../icons/Cross"
import { toast } from "sonner"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import CopyIcon from "../icons/CopyIcon"

interface IShareContent {
    isShareDialogOpen: boolean,
    setIsShareDialogOpen: (val: boolean) => void
}

const ShareContentDialog = ({isShareDialogOpen, setIsShareDialogOpen}: IShareContent) => {
    const [link, setLink] = useState("")
    const [isShared, setIsShared] = useState(false)
    const paragraphRef = useRef<HTMLParagraphElement>(null)
    
    useEffect(() => {
        const storedLink = localStorage.getItem("link")
        if(storedLink){
            setLink(storedLink)
            setIsShared(true)
        }
    }, [])

    const handleCopy = async () => {
        if(paragraphRef.current){
            try{
                await navigator.clipboard.writeText(paragraphRef.current.textContent as string)
                toast.success("Copied to clipboard")
            }catch (err) {
                console.error('Failed to copy text: ', err);
            }
        }
    }
    return (
        <div className="fixed inset-0 min-h-screen md:w-full flex justify-center items-center z-50 bg-black/80">
            <div className="bg-white w-[80%] md:w-xl flex flex-col rounded-md p-6">
                <div className="md:w-full ">
                    <div className="flex justify-between">
                        <h2 className="text-base font-semibold">Share Content</h2>
                        <Cross onClick={() => { 
                            setIsShareDialogOpen(!isShareDialogOpen)
                            document.body.style.overflow = 'unset'
                        }} />
                    </div>
                    <div className="my-4 text-base font-semibold flex items-center relative">
                        <span>Link: </span> 
                        <p ref={paragraphRef} className="text-blue-600 p-2 bg-blue-200 w-[80%] md:w-full rounded-md overflow-hidden">{link ? `http://localhost:5173/brain/${link}` : "Not shared yet"}</p>
                        <span onClick={handleCopy} className="absolute right-2 top-2.5 fill-blue-400 z-50 active:fill-blue-500"><CopyIcon /></span>
                    </div>
                    <div p-2 bg-blue-200 className="flex justify-end">
                        <button onClick={async () => {
                            try{
                                const response = await axios.post(`${BACKEND_URL}/link/share`, {
                                    share: !isShared
                                }, {
                                    headers: {
                                        Authorization: `Bearer ${localStorage.getItem("token")}`
                                    }
                                })

                                if(!isShared){
                                    setLink(response.data.hash)
                                    localStorage.setItem("link", response.data.hash)
                                }else{
                                    setLink("")
                                    localStorage.removeItem("link")
                                }
                                setIsShared(!isShared)
                            }catch(err){
                                console.log("Error sharing the brain: ", err)
                                toast.error("Error sharing the brain")
                            }
                        }} className="w-auto px-4 py-2 bg-black text-white rounded-md mt-3 cursor-pointer">{isShared ? "Withhold" : "Share"}</button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default ShareContentDialog