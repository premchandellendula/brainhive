import { BrowserRouter, Route, Routes } from "react-router-dom"
import Landing from "./pages/landing/Landing"
import Brain from "./pages/brain/Brain"
import Signin from "./pages/auth/Signin"
import Signup from "./pages/auth/Signup"
import AuthProvider from "./pages/other/AuthProvider"
import UserBrain from "./pages/brain/UserBrain"

function App() {

    return (
        <>
            <BrowserRouter>
                <AuthProvider>
                    <Routes>
                        <Route path="/" element={<Landing />} />
                        <Route path="/brain" element={<Brain />} />
                        <Route path="/brain/:shareLink" element={<UserBrain/>} />
                        <Route path="/signup" element={<Signup />} />
                        <Route path="/signin" element={<Signin />} />
                    </Routes>
                </AuthProvider>
            </BrowserRouter>
        </>
    )
}

export default App
