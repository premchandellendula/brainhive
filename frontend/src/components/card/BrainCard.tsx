import { Tweet } from "react-tweet";
import Share from "../icons/Share"
import Trash from "../icons/Trash"
import TweetIcon from "../icons/TweetIcon";
import VideoIcon from "../icons/VideoIcon";
import DocIcon from "../icons/DocIcon";
import LinkIcon from "../icons/LinkIcon";
import axios from "axios";

interface ITags {
    title: string
}

interface ICard {
    _id: string,
    type: "Tweet" | "Document" | "Video" | "Link";
    tags: ITags[],
    link: string,
    title: string
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
        const response = await axios.delete(`http://localhost:3000/api/v1/content/${id}`)
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

interface ITweetProps {
    link: string
}

function TweetCard(props: ITweetProps){
    const id = props.link.split("/status/")[1]
    return (
        <Tweet id={id} />
    )
}

interface IVideoProps {
    link: string
}

function VideoCard(props: IVideoProps){
    const id = props.link.split("?v=")[1]
    console.log(id)
    return (
        <iframe className="w-full" src={`https://www.youtube.com/embed/${id}`} title="YouTube video player" frameBorder="0" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen></iframe>
    )
}

interface IDocProps {
    link: string
}

function DocCard(props: IDocProps){
    return (
        <iframe src={props.link} width="100%" height="400" frameBorder="0" allowFullScreen />
    )
}

interface ILinkProps {
    link: string,
    title: string
}

function LinkCard(props: ILinkProps){
    return (
        <a
            href={props.link}
            target="_blank"
            rel="noopener noreferrer"
            className="block max-w-[300px] max-h-[250px] overflow-hidden border rounded-lg p-3 bg-gray-50 hover:bg-gray-100 transition"
        >
            <div className="font-semibold text-blue-700 truncate">
            {props.title}
            </div>
        </a>
    )
}