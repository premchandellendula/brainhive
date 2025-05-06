import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const AuthContext = createContext({
    login: () => {},
    logout: () => {},
    isAuthenticated: false
})

interface MyComponentProps {
    children: React.ReactNode;
}

const AuthProvider: React.FC<MyComponentProps> = ({children}) => {
    const [isAuthenticated, setIsAuthenticated] = useState(false)
    const navigate = useNavigate()

    useEffect(() => {
        const auth = localStorage.getItem("auth")

        if(auth === "true"){
            setIsAuthenticated(true)
        }else{
            setIsAuthenticated(false)
        }
    }, [])

    const login = () => {
        localStorage.setItem("auth", "true")
        setIsAuthenticated(true)
    }

    const logout = () => {
        localStorage.removeItem("auth")
        localStorage.removeItem("auth")
        setIsAuthenticated(false)
        navigate('/')
    }

    return <AuthContext.Provider value={{login, logout, isAuthenticated}}>
        {children}
    </AuthContext.Provider>
}

export default AuthProvider

export const useAuth = () => useContext(AuthContext)