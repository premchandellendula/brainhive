import { Link } from "react-router-dom"
import Button from "../ui/Button"

const Hero = () => {
    return (
        <div className="pt-34 flex flex-col justify-center items-center">
            <div className="max-w-3xl mx-auto text-center">

                <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mb-6">Your <span className="text-blue-600">Digital Brain</span> for Modern Knowledge</h1>
                
                <p className="text-gray-500 text-lg md:text-xl text-muted-foreground max-w-2xl mx-auto text-center">Save links, tweets, videos, and notes in one place. Connect ideas, find insights, and build your personal knowledge garden.</p>
            </div>

            <Link to={'/signup'} className="mt-10">
                <Button text="Get Started For Free" variant="primary" size="xl" onClick={() => {}} />
            </Link>

            <div className="relative mx-auto max-w-5xl my-14">
                <div className="aspect-[16/9] overflow-hidden rounded-xl border border-border shadow-2xl animate-float">
                    <img src="../../../public/photo-1531297484001-80022131f5a1.avif" alt="BrainHive Dashboard" 
                        className="object-cover w-full h-full" />
                </div>
            </div>
        </div>
    )
}

export default Hero