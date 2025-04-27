"use client"

import { useRouter } from "next/navigation";
import CustomButton from "@/components/Button";
import { useContext } from "react";
import AuthContext from "@/context/authContext";
const Unauthorized = () => {
    const router = useRouter();
    const { handleLogout } = useContext(AuthContext);
    const handleLogOutBtnClick = () => {
        handleLogout();
        router.push("/login");
    }
    return (
        <div>
            <h1>You are not authorized to access this page</h1>
            <CustomButton
                variant="outline"
                size="medium"
                btnText="Logout"
                btnClick={handleLogOutBtnClick}
                className="nav-button"
            />
        </div>
    );
};

export default Unauthorized;