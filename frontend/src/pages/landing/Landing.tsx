import Appbar from "../../components/appbar/Appbar"
import Footer from "../../components/footer/Footer"
import Features from "../../components/landing/Features"
import Hero from "../../components/landing/Hero"

const Landing = () => {
    return (
        <div className="min-h-screen font-inter px-4 sm:px-6 md:px-8">
            <Appbar />
            <Hero />
            <Features />
            <Footer />
        </div>
    )
}

export default Landing