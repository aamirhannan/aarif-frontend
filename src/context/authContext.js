"use client";
import { createContext, useState, useEffect } from "react";
const AuthContext = createContext();

const AuthProvider = ({ children }) => {
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

    return (
        <AuthContext.Provider value={{ userData, setUserData }}>
            {children}
        </AuthContext.Provider>
    );
};

export { AuthProvider };

export default AuthContext;
