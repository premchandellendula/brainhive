import { useEffect, useRef, useState } from "react"
import ExitIcon from "../icons/ExitIcon"
import { useAuth } from "../../pages/other/AuthProvider";
import axios from "axios";
import { BACKEND_URL } from "../../config";
import { toast } from "sonner";

interface IFlyout {
    setIsFlyoutOpen: (value: boolean) => void
}

const Flyout = (props: IFlyout) => {
    const [username, setUsername] = useState("")
    const ref = useRef<HTMLDivElement>(null);
    const [loading, setLoading] = useState(true)
    const { logout } = useAuth()

    const fetchUser = async () => {
        setLoading(true)
        try{
            const res = await axios.get(`${BACKEND_URL}/auth/me`, {
                headers: {
                    Authorization: `Bearer ${localStorage.getItem("token")}`
                }
            })

            setUsername(res.data.user.username)
        }catch(err){
            console.log("Error fetching the user")
            setLoading(false)
        }finally{
            setLoading(false)
        }
    }
    
    const handleClickOutside = (event: MouseEvent) => {
        if(ref.current && !ref.current.contains(event.target as Node)){
            props.setIsFlyoutOpen(false)
        }
    }
    useEffect(() => {
        fetchUser()
        document.addEventListener("mousedown", handleClickOutside)

        return () => {
            document.removeEventListener("mousedown", handleClickOutside)
        }
    }, [])
    return (
        <div ref={ref} className="absolute right-0 top-12 bg-white border border-blue-300 shadow-md text-blue-700 rounded-md w-40 py-2 px-3 z-50">
            <p className="text-center mb-2 font-semibold">
                {loading ? (
                    <div className="h-3 bg-gray-300 rounded animate-pulse mx-auto w-20" />
                ) : (
                    username ? username : "username"
                )}
            </p>
            <hr className="border-blue-300 mb-2" />
            <div onClick={() => {
                logout()
                toast.success("Logout successful")
                }} 
                
                className="flex justify-between items-center mt-1 hover:bg-blue-200 px-2 py-1 rounded-md cursor-pointer transition-colors">
                <ExitIcon />
                <span className="text-sm font-medium">Logout</span>
            </div>
        </div>
    )
}

export default Flyout