"use client"
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import PageLoader from "@/components/PageLoader";
export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        if (!userData) {
            router.push("/login");
        }
        setIsLoading(false);
    }, [userData, router]);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div>
            {children}
        </div>
    );
}
