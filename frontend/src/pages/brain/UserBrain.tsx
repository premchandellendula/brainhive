import { useShareContent } from "../../hooks/useContent"
import Button from "../../components/ui/Button"
import { Link, useParams } from "react-router-dom"
import Content from "../../components/content/Content"
import BrainIcon from "../../components/icons/BrainIcon"

const UserBrain = () => {
    const {shareLink} = useParams<string>()
    const {content, fetchContent} = useShareContent(shareLink)
    
    return (
        <div className="min-h-screen p-6">
            <div className="flex justify-between">
                <div className="mt-2 flex items-center">
                    <BrainIcon />
                    <span className={`text-2xl font-bold`}>Second Brain</span>
                </div>
                <Link to={'/signup'}>
                    <Button variant="primary" text="Signup" size="md" width="auto" />
                </Link>
            </div>
            <Content content={content} fetchContent={fetchContent} />
        </div>
    )
}

export default UserBrain