import { useState } from "react"
import Content from "../../components/content/Content"
import SideBar from "../../components/sidebar/SideBar"
import TopBar from "../../components/topbar/TopBar"
import { useContent } from "../../hooks/useContent"

const Brain = () => {
    const [selectedType, setSelectedType] = useState<string>("All")
    const {content, fetchContent} = useContent(selectedType)
    
    return (
        <div className="flex min-h-screen">
            <SideBar selectedType={selectedType} setSelectedType={setSelectedType} />
            <div className="flex-1 p-6 ml-64">
                <TopBar fetchContent={fetchContent} />
                <Content content={content} fetchContent={fetchContent} />
            </div>
        </div>
    )
}

export default Brain