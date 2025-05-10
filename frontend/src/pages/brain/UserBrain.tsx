import { useShareContent } from "../../hooks/useContent"
import Button from "../../components/ui/Button"
import { Link, useParams } from "react-router-dom"
import Content from "../../components/content/Content"
import BrainIcon from "../../components/icons/BrainIcon"

const UserBrain = () => {
    const {shareLink} = useParams<string>()
    const {content, fetchContent} = useShareContent(shareLink)
    console.log(content)
    
    return (
        <div className="min-h-screen p-6">
            <div className="flex justify-between">
                <div className="mt-2 flex items-center">
                    <BrainIcon />
                    <span className={`md:text-2xl text-xl font-bold`}>Second Brain</span>
                </div>
                <Link to={'/signup'}>
                    <Button variant="primary" text="Signup" size="md" width="auto" />
                </Link>
            </div>
            <div className="text-black font-semibold my-5">{content.length > 0 ? content[0].userId.username + "'s Brain" : ""}</div>
            <Content content={content} fetchContent={fetchContent} />
        </div>
    )
}

export default UserBrain