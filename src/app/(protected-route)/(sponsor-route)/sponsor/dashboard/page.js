'use client'

import CustomCard from "@/components/Card";
import { ROLES } from "@/utils/validationSchemas";
import { CircularProgress, Grid, Typography } from "@mui/material";
import styles from './sponsor-dashboard.module.scss';
import { useRouter } from "next/navigation";
import { ENUM_CATEGORY } from "@/utils/utilsFunctions";
import BasicTabs from "@/components/Tab";
import axios from "axios";
import AuthContext from "@/context/authContext";
import { useContext, useEffect, useState } from "react";
import SnakeBarContext from "@/context/snakeBarContext";
const SponsorDashboard = () => {

    const { userData } = useContext(AuthContext);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const router = useRouter();


    const [causeData, setCauseData] = useState([]);
    const [loading, setLoading] = useState(true);


    const tabNames = [{ label: "All", value: "ALL" }, ...ENUM_CATEGORY]

    const handleViewCause = (causeData) => {
        router.push(`/sponsor/${causeData.causeID}`);
    }

    const handleClaimCause = (causeData) => {
        console.log(causeData);
    }

    const handleSponsorCause = (causeData) => {
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
            <Grid container spacing={4}>

                <BasicTabs
                    tabNames={tabNames}
                    causeData={causeData}
                    ROLE={ROLES.SPONSOR}
                    handleViewCause={handleViewCause}
                    handleClaimCause={handleClaimCause}
                    handleSponsorCause={handleSponsorCause}
                    filterBy="category"
                />

            </Grid>
        </div >
    );
};

export default SponsorDashboard;
