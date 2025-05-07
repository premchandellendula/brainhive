import BrainCard from "../card/BrainCard"
import { ICard } from "../utils"

interface IContent {
    content: ICard[],
    fetchContent: () => void
}

const Content = ({content, fetchContent}: IContent) => {

    return (
        <div className="grid lg:grid-cols-3 md:grid-cols-2 grid-cols-1 gap-4 my-6">

            {content.length > 0 ? (
                content.map((cont: ICard, idx: number) =>  {
                    return <BrainCard fetchContent={fetchContent} key={idx} _id={cont._id} type={cont.type} tags={cont.tags} title={cont.title} link={cont.link} createdAt={cont.createdAt} />
                }) 
            ) : (
                <div className="font-bold text-2xl">No data found</div>
            )}

        </div>
    )
}

export default Content