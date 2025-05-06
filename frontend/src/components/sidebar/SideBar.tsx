// import { useState } from "react"
import Brain from "../icons/BrainIcon"
import DocIcon from "../icons/DocIcon"
import HashIcon from "../icons/HashIcon"
import LinkIcon from "../icons/LinkIcon"
import TweetIcon from "../icons/TweetIcon"
import VideoIcon from "../icons/VideoIcon"
import ListItem from "./ListItem"
// import SidebarButton from "../ui/SidebarButton"

const SideBar = () => {
    // const [isOpen, setIsOpen] = useState(false)
    const listItems = [
        {title: "Tweets", icon: <TweetIcon />},
        {title: "Vides", icon: <VideoIcon />},
        {title: "Documents", icon: <DocIcon />},
        {title: "Links", icon: <LinkIcon />},
        {title: "Tags", icon: <HashIcon />},
    ]
    return (
        <div className={`lg:w-64 fixed top-0 left-0 p-4 border border-gray-200 z-20 transition-all duration-500 bg-white lg:translate-x-0 h-screen`}>
            {/* <SidebarButton isOpen={isOpen} setIsOpen={setIsOpen} /> */}
            <div className="mt-2 flex justify-between items-center">
                <Brain />
                <span className={`text-2xl font-bold`}>Second Brain</span>
            </div>

            <div className="mt-4">
                {listItems.map((item, idx) => <ListItem key={idx} icon={item.icon} title={item.title} />)}
            </div>
        </div>
    )
}

export default SideBar