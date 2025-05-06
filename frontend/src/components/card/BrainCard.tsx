import Share from "../icons/Share"
import Trash from "../icons/Trash"
import TweetIcon from "../icons/TweetIcon";
import VideoIcon from "../icons/VideoIcon";
import DocIcon from "../icons/DocIcon";
import LinkIcon from "../icons/LinkIcon";
import axios from "axios";
import { toast } from "sonner";
import TweetCard from "./TweetCard";
import VideoCard from "./VideoCard";
import DocCard from "./DocCard";
import LinkCard from "./LinkCard";

interface ITags {
    title: string
}

interface ICard {
    _id: string,
    type: "Tweet" | "Document" | "Video" | "Link";
    tags: ITags[],
    link: string,
    title: string,
    fetchContent: () => void
}

const BrainCard = (props: ICard) => {

    const renderContent = {
        Tweet: <TweetCard link={props.link }  />,
        Document: <DocCard link={props.link}  />,
        Video: <VideoCard link={props.link}  />,
        Link: <LinkCard link={props.link} title={props.title}  />,
    }[props.type]

    const icon = {
        Tweet: <TweetIcon />,
        Document: <DocIcon />,
        Video: <VideoIcon />,
        Link: <LinkIcon />,
    }[props.type]

    const deleteContent = async (id: string) => {
        try{

            await axios.delete(`http://localhost:3000/api/v1/content/${id}`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })
            props.fetchContent()
            toast.success("Deleted the content successfully")
        }catch(err){
            console.log("Error deleting the content: ", err)
            toast.error("Error deleting the content")
        }
    }
    return (
        <div className="rounded-lg shadow-lg w-full p-4 border border-gray-200">
            <div className="flex justify-between gap-2.5 mb-2.5">
                <div className="flex justify-center items-center gap-1">
                    <span className="mt-0.5">
                        {icon}
                    </span>
                    <span className="text-[1.2rem] font-semibold line-clamp-1">{props.title}</span>
                </div>
                <div className="flex items-center gap-3 text-gray-500">
                    <Share />
                    <Trash onClick={() => deleteContent(props._id)} />
                </div>
            </div>
            
            <div className="max-h-[250px] overflow-hidden">
                {renderContent}
            </div>

            <div className="flex flex-wrap gap-2 my-2.5">
                {
                    props.tags.map((tag, idx) => {
                        const tagText = typeof tag === 'string' ? tag : tag.title || JSON.stringify(tag);
                        return <span key={idx} className="bg-blue-200 text-blue-400 px-2.5 py-0.5 rounded-full">#{tagText}</span>
                    })
                }
            </div>
            <div className="text-gray-400 font-normal text-base">
                Added on 30/04/2025
            </div>
        </div>
    )
}

export default BrainCard