"use client";
import AuthContext from "@/context/authContext";
import { useContext, useState, useEffect } from "react";
import Image from "next/image";
import './side-bar.scss';
import { LayoutDashboard, Mail, Send, Upload, Save } from "lucide-react";
import { useRouter } from "next/navigation";
import getCurrentPath from "@/utils/utilsFunctions";
import Link from "next/link";

const Sidebar = ({ sideBarItems }) => {

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
                    src={'/images/toto-logo.png'}
                    alt="logo"
                    width={180}
                    height={100}
                    style={{ aspectRatio: '16/9' }}
                />
            </div>

            <div className="sidebar-items">
                {sideBarItems?.map((item, index) => (
                    <Link href={item?.path} key={index}>
                        <div className={`sidebar-item ${activeItem === item?.path ? 'active' : ''}`} onClick={() => handleActiveItem(item)}>
                            {item?.icon}
                            <p className={`sidebar-item-name`}>{item?.name}</p>
                        </div>
                    </Link>
                ))}
            </div>

        </div>
    );
};

export default Sidebar;
