"use client"
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import PageLoader from "@/components/PageLoader";
import Header from "@/components/Header";

export default function PublicLayout({ children }) {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        setIsLoading(false);
    }, []);


    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <>
            <Header />
            {children}
        </>
    );
}
