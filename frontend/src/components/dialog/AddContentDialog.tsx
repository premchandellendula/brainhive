import { toast } from "sonner"
import Cross from "../icons/Cross"
import InputBox from "../ui/InputBox"
import Select from "../ui/Select"
import { useState } from "react"
import axios from "axios"
import { BACKEND_URL } from "../../config"

interface IAddContentDialog {
    fetchContent: () => void,
    setIsDialogOpen: (val: boolean) => void
    isDialogOpen: boolean
}

const AddContentDialog = ({fetchContent, setIsDialogOpen, isDialogOpen}: IAddContentDialog) => {
    const [tags, setTags] = useState("")
    const [type, setType] = useState("")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    return (
        <div className="fixed inset-0 min-h-screen w-full flex justify-center items-center z-50 bg-black/80">
            <div className="bg-white w-96 flex flex-col rounded-md p-6">
                <div className="w-full ">
                    <div className="flex justify-between">
                        <h2 className="text-base font-semibold">Add a Thought</h2>
                        <Cross onClick={() => { 
                            setIsDialogOpen(!isDialogOpen)
                            document.body.style.overflow = 'unset'
                        }} />
                    </div>
                    <InputBox label="URL" placeholder="url..." onChange={(e) => setUrl(e.target.value)} />
                    <InputBox label="Title" placeholder="Title" onChange={(e) => setTitle(e.target.value)} />
                    <Select onChange={(e) => setType(e.target.value)} />
                    <InputBox label="Tags" placeholder="Cricket, Productivity" onChange={(e) => setTags(e.target.value)} />
                    <button onClick={async () => {
                        if(!type || !title || !url || !tags){
                            toast.warning("Please fill all the values")
                        }

                        try{
                            await axios.post(`${BACKEND_URL}/content`, {
                                title,
                                link: url,
                                type,
                                tags: tags.split(", ")
                            }, {
                                headers: {
                                    Authorization: `Bearer ${localStorage.getItem("token")}`
                                }
                            })
                            
                            setIsDialogOpen(false)
                            fetchContent()
                            toast.success("Content added successfully")
                        }catch(err){
                            console.log("Error adding the content: ", err)
                            toast.error("Error adding the content")
                        }
                    }} className="w-full p-2 bg-black text-white rounded-md mt-3 cursor-pointer">Add</button>
                </div>
            </div>
        </div>
    )
}

export default AddContentDialog