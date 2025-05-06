import Appbar from "../../components/appbar/Appbar"
import Footer from "../../components/footer/Footer"
import Features from "../../components/landing/Features"
import Hero from "../../components/landing/Hero"

const Landing = () => {
    return (
        <div className="min-h-screen font-inter">
            <Appbar />
            <Hero />
            <Features />
            <Footer />
        </div>
    )
}

export default Landing