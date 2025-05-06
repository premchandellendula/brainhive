import { useState } from "react"
import Plus from "../icons/Plus"
import Share from "../icons/Share"
import Button from "../ui/Button"
import Cross from "../icons/Cross"
import InputBox from "../ui/InputBox"
import Select from "../ui/Select"
import { toast } from "sonner"
import Profile from "./Profile"

const TopBar = () => {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const [tags, setTags] = useState("")
    const [type, setType] = useState("")
    const [url, setUrl] = useState("")
    const [title, setTitle] = useState("")
    const addContent = async () => {

    }
    return (
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold">All Notes</h2>
            <div className="flex gap-2">
                <Button width="auto" variant={"secondary"} text="Share Brain" size="md" startIcon={<Share />} onClick={() => {}} />
                <Button width="auto" variant={"primary"} text="Add Content" size="md" startIcon={<Plus />} onClick={() => {setIsDialogOpen(!isDialogOpen)
                document.body.style.overflow = 'hidden'} } />
                <Profile />
            </div>

            {isDialogOpen && (
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
                            <button onClick={() => {
                                if(!type || !title || !url || !tags){
                                    toast.warning("Please fill all the values")
                                }
                            }} className="w-full p-2 bg-black text-white rounded-md mt-3 cursor-pointer">Add</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    )
}

export default TopBar