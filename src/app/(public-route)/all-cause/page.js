'use client'
import CustomCard from "@/components/Card";
import { ROLES } from "@/utils/validationSchemas";
import { CircularProgress, Grid, Typography } from "@mui/material";
import styles from './all-cause.module.scss';
import { useRouter } from "next/navigation";
import { ENUM_CATEGORY } from "@/utils/utilsFunctions";
import BasicTabs from "@/components/Tab";
import axios from "axios";
import { useEffect, useState, useContext } from "react";
import SnakeBarContext from "@/context/snakeBarContext";
import AuthContext from "@/context/authContext";
import ClaimModal from "@/components/ClaimModal";

const AllCause = () => {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    // const causeData = [
    //     {
    //         title: "ENVIRONMENT Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "ENVIRONMENT",
    //         impactLevel: "High",
    //         status: "PENDING",
    //         causeID: "8f34bfa0-2201-4822-91ba-85037c59f55b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     },
    //     {
    //         title: "HEALTH Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "HEALTH",
    //         impactLevel: "High",
    //         status: "APPROVED",
    //         causeID: "8f34bfa0-2201-4822-91ba-85037c555b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     },
    //     {
    //         title: "WOMEN_EMPOWERMENT Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "WOMEN_EMPOWERMENT",
    //         impactLevel: "High",
    //         status: "REJECTED",
    //         causeID: "8f34bfa0-221-422-91ba-85037c555b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     }, {
    //         title: "ENVIRONMENT Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "ENVIRONMENT",
    //         impactLevel: "High",
    //         status: "REJECTED",
    //         causeID: "8f3fa0-221-422-91ba-85037c555b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     },
    //     {
    //         title: "EDUCATION Clean Water Initiative",
    //         description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
    //         qty: 100,
    //         claimed: 0,
    //         totalAmount: 2500,
    //         currentPrice: 0,
    //         singleItemPrice: 25,
    //         category: "EDUCATION",
    //         impactLevel: "High",
    //         status: "REJECTED",
    //         causeID: "8f34bfa0-221-422-91a-85037c555b",
    //         createdAt: "2025-04-23T18:13:38.393Z",
    //     }
    // ]

    const [causeData, setCauseData] = useState([]);
    const [loading, setLoading] = useState(false);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const [claimModalOpen, setClaimModalOpen] = useState(false);


    const tabNames = [{ label: "All", value: "ALL" }, ...ENUM_CATEGORY]

    const handleViewCause = (causeData) => {
        router.push(`/all-cause/${causeData.causeID}`);
    }

    const handleClaimCause = (causeData) => {
        setClaimModalOpen(true);
    }

    const handleSponsorCause = (causeData) => {
        console.log(causeData);
        router.push(`/sponsor/${causeData.causeID}?createSponsor=true`);
    }

    const handleGetAllCause = async () => {
        try {
            const response = await axios.post(`/api/sponsor/get-approved-cause`, {
                token: userData.token
            });
            console.log(response);

            const causeData = response?.data?.data?.causes;
            if (!causeData) {
                handleOpenSnakeBar("No data found");
                return;
            }
            setCauseData(causeData);
            handleOpenSnakeBar("Data fetched successfully");
        } catch (error) {
            console.log(error);
            handleOpenSnakeBar("Error fetching data");
        } finally {
            setLoading(false);
        }
    }

    useEffect(() => {
        handleGetAllCause();
    }, []);


    if (loading) {
        return <CircularProgress />;
    }

    return (
        <div className={styles.allCauseContainer}>
            <ClaimModal open={claimModalOpen} onClose={() => setClaimModalOpen(false)} />
            <Typography variant="h6" className={styles.allCauseTitle}>All Cause</Typography>
            <Grid container spacing={4}>

                <BasicTabs
                    tabNames={tabNames}
                    causeData={causeData}
                    ROLE={ROLES.OPEN_TO_ALL}
                    handleViewCause={handleViewCause}
                    handleClaimCause={handleClaimCause}
                    handleSponsorCause={handleSponsorCause}
                    filterBy="category"
                />
            </Grid>
        </div >
    );
};

export default AllCause;