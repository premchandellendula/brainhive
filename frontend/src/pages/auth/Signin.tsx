import { useState } from "react"
import Appbar from "../../components/appbar/Appbar"
import BottomWarning from "../../components/ui/BottomWarning"
import Heading from "../../components/ui/Heading"
import InputBox from "../../components/ui/InputBox"
import LoginButton from "../../components/ui/LoginButton"
import PasswordInputBox from "../../components/ui/PasswordInputBox"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useAuth } from "../other/AuthProvider"

const Signin = () => {
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [loading, setLoading] = useState(false)
    const navigate = useNavigate()
    const { login } = useAuth()
    return (
        <div>
            <Appbar />
            
            <div className="flex justify-center items-center h-screen">
                <div className="p-6 w-96 rounded-md border border-gray-200 shadow-lg">
                    <Heading label={"Sign in to your account"} />
                    <InputBox label={"Email"} placeholder={"johndoe@gmail.com"} onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInputBox label={"Password"} placeholder={"1234abcd"} onChange={(e) => setPassword(e.target.value)} />
                    <LoginButton 
                    onClick={async () => {
                        setLoading(true)

                        try{
                            const response = await axios.post(`${BACKEND_URL}/auth/signin`, {
                                email,
                                password
                            })
                            login()
                            localStorage.setItem("token", response.data.token)

                            if(email && password){
                                navigate("/brain")
                            }
                        }catch(err){
                            console.log("Error signing in: ", err)
                            setLoading(false)
                        }finally{
                            setLoading(false)
                        }
                    }}
                    loading={loading} variant={"primary"} size={"xl"} text={"Signin"} width="full" />
                    <BottomWarning label={"Don't have an account?"} buttonText={"Signup"} to={"/signup"} />
                </div>
            </div>
        </div>
    )
}

export default Signin