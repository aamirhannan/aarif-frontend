"use client"
import { useEffect, useContext, useState } from "react";
import { useRouter } from "next/navigation";
import AuthContext from "@/context/authContext";
import PageLoader from "@/components/PageLoader";
import Sidebar from "@/components/Sidebar";
import Header from "@/components/Header";
import "@/app/container.scss";
import { LayoutDashboard, Mail, Send, Upload, Save } from "lucide-react";
export default function ProtectedLayout({ children }) {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    const [isLoading, setIsLoading] = useState(true);
    const [sideBarItems, setSideBarItems] = useState([]);
    const [currentRole, setCurrentRole] = useState('');

    const iconStyle = {
        width: '1.2rem',
        height: '1.2rem',
        color: '#595959'
    }

    const SIDEBAR_ITEMS = {
        ADMIN: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard style={iconStyle} />,
                path: '/dashboard'
            },
            {
                name: 'Send Mails',
                icon: <Mail style={iconStyle} />,
                path: '/send-mails'
            },
            {
                name: 'Upload Mails',
                icon: <Upload style={iconStyle} />,
                path: '/upload-mails'
            }
        ],
        CAUSE_CREATOR: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard style={iconStyle} />,
                path: '/dashboard'
            },
            {
                name: 'Saved Mails',
                icon: <Save style={iconStyle} />,
                path: '/saved-mails'
            },
            {
                name: 'Applied Mails',
                icon: <Send style={iconStyle} />,
                path: '/applied-mails'
            }
        ],
        SPONSOR: [
            {
                name: 'Dashboard',
                icon: <LayoutDashboard style={iconStyle} />,
                path: '/dashboard'
            },
            {
                name: 'Send Mails',
                icon: <Mail style={iconStyle} />,
                path: '/send-mails'
            },
            {
                name: 'Saved Mails',
                icon: <Save style={iconStyle} />,
                path: '/saved-mails'
            }
        ]
    }


    useEffect(() => {
        if (!userData) {
            router.push("/login");
        }
        setSideBarItems(SIDEBAR_ITEMS[userData.role]);
        setCurrentRole(userData.role);
        setTimeout(() => {
            setIsLoading(false);
        }, 1000);
    }, [userData, router]);

    if (isLoading) {
        return <PageLoader />;
    }

    return (
        <div className="container">
            <div className="sidebar">
                <Sidebar sideBarItems={sideBarItems} />
            </div>
            <div className="header">
                <Header currentRole={currentRole} />
            </div>
            <div className="content">
                {children}
            </div>
        </div>
    );
}
