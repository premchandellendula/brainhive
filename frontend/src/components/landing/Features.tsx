import ConnectIcon from "../icons/ConnectIcon"
import DocIcon from "../icons/DocIcon"
import LinkIcon from "../icons/LinkIcon"
import Share from "../icons/Share"
import TweetIcon from "../icons/TweetIcon"
import VideoIcon from "../icons/VideoIcon"

const Features = () => {
    const features = [
        {
            icon: <LinkIcon />,
            title: "Save Web Links",
            description: "Save articles, blog posts, and any web page with a simple click and organize them with tags."
        },
        {
            icon: <VideoIcon  />,
            title: "Store Videos",
            description: "Capture YouTube videos, add notes, and create timestamps for important moments."
        },
        {
            icon: <TweetIcon />,
            title: "Archive Tweets",
            description: "Save tweets and threads forever, even if they're deleted from the original platform."
        },
        {
            icon: <DocIcon />,
            title: "Import Notion",
            description: "Seamlessly import your Notion documents and integrate them with other content."
        },
        {
            icon: <Share />,
            title: "Share Your Brain",
            description: "Share your knowledge collections with others so they can view and learn from your curated content."
        },
        {
            icon: <ConnectIcon />,
            title: "Connect Ideas",
            description: "Create bi-directional links between content to build a network of connected thoughts."
        }
    ]
    return (
        <div className="w-[90%] mx-auto py-16">
            <div className="mb-12 lg:mb-16">
                <h2 className="text-center text-4xl font-bold my-4">Save Everything That Matters</h2>
                <p className="text-gray-500 text-[1.125rem] text-muted-foreground max-w-2xl mx-auto text-center">BrainHive helps you capture and organize content from anywhere on the web, creating your personal knowledge database.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {features.map((feature, idx) => (
                    <div key={idx} className="rounded-lg p-6 border border-gray-300 shadow-lg hover:bg-blue-200/70">
                        <div className="rounded-full bg-blue-300/30 text-blue-600 p-3 w-12 h-12 flex items-center justify-center mb-4">{feature.icon}</div>
                        <h3 className="text-xl font-semibold mb-2">{feature.title}</h3>
                        <p className="text-gray-500">{feature.description}</p>
                    </div>
                ))}

            </div>
        </div>
    )
}

export default Features