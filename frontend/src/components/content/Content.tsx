import { useEffect, useState } from "react"
import BrainCard from "../card/BrainCard"
import axios from "axios"

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

const Content = () => {
    const [content, setContent] = useState<ICard[]>([])

    const fetchContent = async () => {
        const response = await axios.get(`http://localhost:3000/api/v1/content/`)
        console.log(response.data)
        setContent(response.data.content)
    }
    useEffect(() => {
        fetchContent()
    }, [])

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-6">

            {content.map((cont: ICard, idx: number) =>  {
                return <BrainCard key={idx} _id={cont._id} type={cont.type} tags={cont.tags} title={cont.title} link={cont.link} />
            })}

            {content.map((cont: ICard, idx: number) =>  {
                return <BrainCard key={idx} _id={cont._id} type={cont.type} tags={cont.tags} title={cont.title} link={cont.link} />
            })}

            {content.map((cont: ICard, idx: number) =>  {
                return <BrainCard key={idx} _id={cont._id} type={cont.type} tags={cont.tags} title={cont.title} link={cont.link} />
            })}

            <BrainCard type="Video" tags={[]} title="nothing" link="https://www.youtube.com/watch?v=56nQjJZIqoU" _id="13u8sihfiu" />

        </div>
    )
}

export default Content