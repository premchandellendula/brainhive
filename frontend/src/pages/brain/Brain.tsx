import Content from "../../components/content/Content"
import SideBar from "../../components/sidebar/SideBar"
import TopBar from "../../components/topbar/TopBar"

const Brain = () => {
    return (
        <div className="flex min-h-screen">
            <SideBar />
            <div className="flex-1 p-6 ml-64">
                <TopBar />
                <Content />
            </div>
        </div>
    )
}

export default Brain