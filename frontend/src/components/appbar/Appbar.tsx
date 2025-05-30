import { Link } from "react-router-dom"
import BrainIcon from "../icons/BrainIcon"
import Button from "../ui/Button"

const Appbar = () => {
    return (
        <div className="py-4 px-6 md:px-10 lg:px-18 w-full bg-white/80 backdrop-blur-sm fixed top-0 z-50 border-b border-gray-200">
            <div className="container mx-auto flex justify-between items-center">
                <Link to={'/'}>
                    <div className="flex items-center gap-1">
                        <BrainIcon />
                        <h2 className="md:text-[1.6rem] text-[1.2rem] font-semibold">BrainHive</h2>
                    </div>
                </Link>
                <div className="flex gap-2">
                    <Link to={'/signin'} className="hidden md:block">
                        <Button text="Signin" variant="secondary" size="lg" width="auto" />
                    </Link>
                    <Link to={'/signup'}>
                        <Button text="Signup" variant="primary" size="lg" width="auto" />
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Appbar