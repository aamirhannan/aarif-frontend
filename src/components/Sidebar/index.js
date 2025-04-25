"use client";
import AuthContext from "@/context/authContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import './side-bar.scss';
import { LayoutDashboard, Mail, Send, Upload, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import getCurrentPath from "@/utils/utilsFunctions";
import Link from "next/link";

const iconStyle = {
    width: '1.2rem',
    height: '1.2rem',
    color: '#595959'
}

const sideBarItems = [
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
    },
    {
        name: 'Applied Mails',
        icon: <Send style={iconStyle} />,
        path: '/applied-mails'
    },
    {
        name: 'Upload Mails',
        icon: <Upload style={iconStyle} />,
        path: '/upload-mails'
    },

]
const Sidebar = () => {

    const [activeItem, setActiveItem] = useState(null);
    const router = useRouter();

    const handleActiveItem = (item) => {
        setActiveItem(item.path);
        // router.push(item.path);
    }

    const handleDefaultActiveItem = (currentPath = '/dashboard') => {
        // router.push(currentPath);
        setActiveItem(currentPath);
    }

    useEffect(() => {
        // router.prefetch('/dashboard');
        // router.prefetch('/saved-mails');
        // router.prefetch('/sent-mails');
        // router.prefetch('/upload-mails');
        // router.prefetch('/send-mails');

        const currentPath = getCurrentPath();
        handleDefaultActiveItem(currentPath);
    }, []);

    return (
        <div className="sidebar-container">
            <div className="sidebar-logo">
                <Image
                    src={'/images/logo.png'}
                    alt="logo"
                    width={100}
                    height={100}
                    style={{ aspectRatio: '1/1' }}
                />
            </div>

            <div className="sidebar-items">
                {sideBarItems.map((item, index) => (
                    <Link href={item.path} key={index}>
                        <div className={`sidebar-item ${activeItem === item.path ? 'active' : ''}`} onClick={() => handleActiveItem(item)}>
                            {item.icon}
                            <p className={`sidebar-item-name`}>{item.name}</p>
                        </div>
                    </Link>
                ))}

            </div>

        </div>
    );
};

export default Sidebar;
