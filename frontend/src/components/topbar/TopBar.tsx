import { useState } from "react"
import Plus from "../icons/Plus"
import Share from "../icons/Share"
import Button from "../ui/Button"
import Profile from "./Profile"
import AddContentDialog from "../dialog/AddContentDialog"
import ShareContentDialog from "../dialog/ShareContentDialog"

const TopBar = ({fetchContent}: {fetchContent: () => void}) => {
    const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
    const [isShareDialogOpen, setIsShareDialogOpen] = useState(false);
    
    return (
        <div className="flex justify-between">
            <h2 className="text-2xl font-bold">All Notes</h2>
            <div className="flex gap-2">
                <Button width="auto" variant={"secondary"} text="Share Brain" size="md" startIcon={<Share />} onClick={() => {
                    setIsShareDialogOpen(!isShareDialogOpen)
                    document.body.style.overflow = 'hidden'
                    }} />
                <Button width="auto" variant={"primary"} text="Add Content" size="md" startIcon={<Plus />} onClick={() => {setIsAddDialogOpen(!isAddDialogOpen)
                document.body.style.overflow = 'hidden'} } />
                <Profile />
            </div>

            {isAddDialogOpen && <AddContentDialog fetchContent={fetchContent} isDialogOpen={isAddDialogOpen} setIsDialogOpen={setIsAddDialogOpen} />}

            {isShareDialogOpen && <ShareContentDialog isShareDialogOpen={isShareDialogOpen} setIsShareDialogOpen={setIsShareDialogOpen} />}
        </div>
    )
}

export default TopBar