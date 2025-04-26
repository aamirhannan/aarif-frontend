import CustomButton from "../Button";
import "./header.scss";
import { useRouter } from "next/navigation";
import { useContext, useState, useEffect } from "react";
import AuthContext from "@/context/authContext";
import getCurrentPath, { ENUM_ROLE } from "@/utils/utilsFunctions";
import AccountMenu from "./ProfileSection";
const urlMapping = {
    '/dashboard': 'Dashboard',
    '/send-mails': 'Send Mails',
    '/applied-mails': 'Applied Mails',
    '/saved-mails': 'Saved Mails',
    '/upload-mails': 'Upload Mails',
}
const Header = ({ currentRole }) => {
    const router = useRouter();
    const { setUserData } = useContext(AuthContext);
    const [pageTitle, setPageTitle] = useState(null);

    const handleLogout = () => {
        setUserData(null);
        localStorage.removeItem("userData");
        router.push("/login");
    }


    useEffect(() => {
        setPageTitle(urlMapping[getCurrentPath()] || 'Linkedin Mailer');
    }, [getCurrentPath()]);

    return (
        <div className="header-container">
            <div className="header-left">
                <div className="header-left-logo">
                    <h1>{currentRole ? `Logged in as:  ${ENUM_ROLE[currentRole]}` : ''}</h1>
                </div>
            </div>

            <div className="header-right">
                {/* <CustomButton
                    variant="danger"
                    btnText="Logout"
                    btnClick={handleLogout}
                    disabled={false}
                    loading={false}
                    type="submit"
                    fullWidth={true}
                    size="medium"
                /> */}

                <AccountMenu />
            </div>
        </div>
    );
};

export default Header;
