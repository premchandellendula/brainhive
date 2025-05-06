import { useState } from "react"
import Appbar from "../../components/appbar/Appbar"
import BottomWarning from "../../components/ui/BottomWarning"
import Heading from "../../components/ui/Heading"
import InputBox from "../../components/ui/InputBox"
import PasswordInputBox from "../../components/ui/PasswordInputBox"
import axios from "axios"
import { BACKEND_URL } from "../../config"
import { useNavigate } from "react-router-dom"
import LoginButton from "../../components/ui/LoginButton"
import { useAuth } from "../other/AuthProvider"

const Signup = () => {
    const [username, setUsername] = useState("")
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
                    <Heading label="Create your Account" />
                    <InputBox label="Username" placeholder="johndoe" onChange={(e) => setUsername(e.target.value)} />
                    <InputBox label="Email" placeholder="johndoe@gmail.com" onChange={(e) => setEmail(e.target.value)} />
                    <PasswordInputBox label="Password" placeholder="1234abcd" onChange={(e) => setPassword(e.target.value)} />
                    <LoginButton loading={loading} 
                    onClick={async () => {
                        setLoading(true)

                        try{
                            const response = await axios.post(`${BACKEND_URL}/auth/signup`, {
                                username,
                                email,
                                password
                            })
                            // console.log(response.data.token)
                            localStorage.setItem("token", response.data.token)
                            login()
                            if(email && password){
                                navigate('/brain')
                            }
                        }catch(err){
                            console.log("Error signing up: ", err)
                            setLoading(false)
                        }finally{
                            setLoading(false)
                        }
                    }}
                    variant="primary" size="xl" text="Signup" width="full" />
                    <BottomWarning label="Already have an account?" buttonText="Signin" to={'/signin'} />
                </div>
            </div>
        </div>
    )
}

export default Signup