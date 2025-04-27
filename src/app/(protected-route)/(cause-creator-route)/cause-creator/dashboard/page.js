'use client'

import CustomCard from "@/components/Card";
import Show from "@/components/Show";
import BasicTabs from "@/components/Tab";
import { CircularProgress } from "@mui/material";
import { useEffect, useState } from "react";
import "./cause-dashboard.scss";
import CardLoading from "@/components/CardLoading";
import { useContext } from "react";
import SnakeBarContext from "@/context/snakeBarContext";
import axios from "axios";
import AuthContext from "@/context/authContext";
import ShareModal from "@/components/ShareModal";
import SideDrawer from "@/components/SideDrawer";
import { ROLES } from "@/utils/validationSchemas";

const CauseCreatorDashboard = () => {

    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const { userData } = useContext(AuthContext);

    const tabNames = [
        { label: "All", value: "ALL" },
        { label: "APPROVED", value: "APPROVED" },
        { label: "Rejected", value: "REJECTED" },
        { label: "Pending", value: "PENDING" }
    ]

    // const causeData = [
    //     {
    //         title: "Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "Environment",
    //         impactLevel: "High",
    //         status: "PENDING",
    //         causeID: "8f34bfa0-2201-4822-91ba-85037c59f55b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     },
    //     {
    //         title: "Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "Environment",
    //         impactLevel: "High",
    //         status: "APPROVED",
    //         causeID: "8f34bfa0-2201-4822-91ba-85037c555b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     },
    //     {
    //         title: "Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "Environment",
    //         impactLevel: "High",
    //         status: "REJECTED",
    //         causeID: "8f34bfa0-221-422-91ba-85037c555b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     }
    // ]

    const [causeData, setCauseData] = useState([]);

    const [isAPIInProgress, setIsAPIInProgress] = useState(true);

    const [openSideDrawer, setOpenSideDrawer] = useState(false);
    const [shareModalOpen, setShareModalOpen] = useState(false);
    const [shareableLink, setShareableLink] = useState(null);
    const [sideDrawerData, setSideDrawerData] = useState({})
    const [modalLoading, setModalLoading] = useState(true);




    const handleGetAllCauseData = async () => {
        try {
            if (!userData?.userID) {
                handleOpenSnakeBar("User ID is required");
                return;
            }

            const response = await axios.post('/api/cause/get-all-cause', {
                userID: userData?.userID,
                token: userData?.token
            });

            const causeList = response?.data?.data;

            if (Array.isArray(causeList)) {
                setCauseData(causeList);

                // if user is redirected to this page after creating a cause, then the causeId will be in the url and we need to open the side drawer for that newly created cause
                const urlParams = new URLSearchParams(window.location.search);
                const causeId = urlParams.get('causeId');
                if (causeId) {
                    const cause = causeList.find(cause => cause.id === causeId);
                    if (cause) {
                        setSideDrawerData(cause);
                        setOpenSideDrawer(true);
                    }
                }
            } else {
                setCauseData([]);
                handleOpenSnakeBar("No data found");
            }
        } catch (error) {
            console.log(error);
            setCauseData([]);
            handleOpenSnakeBar("No data found");
        } finally {
            setIsAPIInProgress(false);
        }
    }

    const handleShareCause = async (causeData) => {
        try {
            if (!userData?.userID) {
                handleOpenSnakeBar("User ID is required");
                return;
            }

            setShareModalOpen(true);

            const response = await axios.post('/api/cause/share-cause', {
                causeID: causeData?.causeID,
                token: userData?.token
            });

            const shareabaleLink = response?.data?.data
            console.log("shareabaleLink", shareabaleLink);

            if (shareabaleLink) {
                setShareableLink(shareabaleLink);
            }
        } catch (error) {
            console.log(error);
            handleOpenSnakeBar("No data found");
        } finally {
            setModalLoading(false);
        }
    }

    const handleOpenSideDrawer = (data) => {
        setOpenSideDrawer(true);
        setSideDrawerData(data)
    }

    useEffect(() => {
        handleGetAllCauseData();
    }, []);

    return (
        <div className="dashboard-container">

            <ShareModal
                open={shareModalOpen}
                setOpen={setShareModalOpen}
                isLoading={modalLoading}
                shareableLink={shareableLink}
            />

            <SideDrawer
                open={openSideDrawer}
                setOpen={setOpenSideDrawer}
                causeData={sideDrawerData}
            />

            <Show when={isAPIInProgress}>
                <div className="card-loading-container">
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                    <CardLoading />
                </div>
            </Show>
            <Show when={!isAPIInProgress}>
                <BasicTabs
                    tabNames={tabNames}
                    causeData={causeData}
                    setOpenSideDrawer={setOpenSideDrawer}
                    handleShareCause={handleShareCause}
                    handleOpenSideDrawer={handleOpenSideDrawer}
                    ROLE={ROLES.CAUSE_CREATOR}
                />
            </Show>

            {/* <Show when={!isAPIInProgress && causeData?.length === 0}>
                <div className="no-data-container">
                    <p>No data found</p>
                </div>
            </Show> */}
        </div>
    );
};

export default CauseCreatorDashboard;