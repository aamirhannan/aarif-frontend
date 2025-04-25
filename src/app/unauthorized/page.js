"use client"

import { useRouter } from "next/navigation";
import CustomButton from "@/components/Button";
const Unauthorized = () => {
    const router = useRouter();
    const handleLogout = () => {
        localStorage.removeItem("userData");
        router.push("/login");
    }
    return (
        <div>
            <h1>You are not authorized to access this page</h1>
            <CustomButton
                variant="outline"
                size="medium"
                btnText="Logout"
                btnClick={handleLogout}
                className="nav-button"
            />
        </div>
    );
};

export default Unauthorized;