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
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', height: '100vh', width: '100vw' }}>
            <h1>You are not authorized to access this page</h1>
            <CustomButton
                variant="outline"
                size="medium"
                btnText="Sign In with different account"
                btnClick={handleLogOutBtnClick}
                className="nav-button"
            />
        </div>
    );
};

export default Unauthorized;