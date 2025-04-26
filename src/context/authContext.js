"use client";
import { createContext, useState, useEffect } from "react";
import { useRouter } from "next/navigation";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
    const router = useRouter();
    const [userData, setUserData] = useState(() => {
        if (typeof window !== 'undefined') {
            const savedUserData = localStorage.getItem('userData');
            return savedUserData ? JSON.parse(savedUserData) : {};
        }
        return {};
    });

    useEffect(() => {
        if (typeof window !== 'undefined' && userData && Object.keys(userData).length > 0) {
            localStorage.setItem('userData', JSON.stringify(userData));
        }
    }, [userData]);


    const handleLogout = () => {
        localStorage.removeItem('userData');
        setUserData(null);
        router.push("/");
    }

    return (
        <AuthContext.Provider value={{ userData, setUserData, handleLogout }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
