import { useState } from "react"
import UserProfile from "../icons/UserProfile"
import Flyout from "../ui/Flyout"

const Profile = () => {
    const [isFlyoutOpen, setIsFlyoutOpen] = useState(false)
    return (
        <div className="flex justify-center items-center relative cursor-pointer">
            <UserProfile onClick={() => setIsFlyoutOpen(!isFlyoutOpen)} />

            {isFlyoutOpen && <Flyout setIsFlyoutOpen={setIsFlyoutOpen} />}
        </div>
    )
}

export default Profile