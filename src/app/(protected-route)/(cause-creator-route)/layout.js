"use client"
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import PageLoader from "@/components/PageLoader";
import { ROLES } from "@/utils/validationSchemas";

export default function CauseCreatorLayout({ children }) {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);


    useEffect(() => {
        if (userData?.role !== ROLES.CAUSE_CREATOR) {
            router.push("/unauthorized");
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
