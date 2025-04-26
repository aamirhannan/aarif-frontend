"use client"
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import PageLoader from "@/components/PageLoader";
import { ROLES } from "@/utils/validationSchemas";

export default function AdminLayout({ children }) {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {

        if (!userData) {
            router.push("/login");
            return;
        }

        if (userData?.role !== ROLES.ADMIN) {
            router.push("/unauthorized");
            return;
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
