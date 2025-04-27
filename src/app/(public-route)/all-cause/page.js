'use client'
import CustomCard from "@/components/Card";
import { ROLES } from "@/utils/validationSchemas";
import { Grid, Typography } from "@mui/material";
import styles from './all-cause.module.scss';
import { useRouter } from "next/navigation";
import { ENUM_CATEGORY } from "@/utils/utilsFunctions";
import BasicTabs from "@/components/Tab";

const AllCause = () => {
    const router = useRouter();
    const causeData = [
        {
            title: "ENVIRONMENT Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "ENVIRONMENT",
            impactLevel: "High",
            status: "PENDING",
            causeID: "8f34bfa0-2201-4822-91ba-85037c59f55b",
            createdAt: "2025-04-23T18:13:38.393Z",
        },
        {
            title: "HEALTH Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "HEALTH",
            impactLevel: "High",
            status: "APPROVED",
            causeID: "8f34bfa0-2201-4822-91ba-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        },
        {
            title: "WOMEN_EMPOWERMENT Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "WOMEN_EMPOWERMENT",
            impactLevel: "High",
            status: "REJECTED",
            causeID: "8f34bfa0-221-422-91ba-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        }, {
            title: "ENVIRONMENT Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "ENVIRONMENT",
            impactLevel: "High",
            status: "REJECTED",
            causeID: "8f3fa0-221-422-91ba-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        },
        {
            title: "EDUCATION Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "EDUCATION",
            impactLevel: "High",
            status: "REJECTED",
            causeID: "8f34bfa0-221-422-91a-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        }
    ]


    const tabNames = [{ label: "All", value: "ALL" }, ...ENUM_CATEGORY]

    // const tabNames = [
    //     { label: "All", value: "ALL" },
    //     { label: "Approved", value: "APPROVED" },
    //     { label: "Rejected", value: "REJECTED" },
    //     { label: "Pending", value: "PENDING" }
    // ]

    const handleViewCause = (causeData) => {
        router.push(`/all-cause/${causeData.causeID}`);
    }

    const handleClaimCause = (causeData) => {
        console.log(causeData);
    }

    const handleSponsorCause = (causeData) => {
        console.log(causeData);
    }

    return (
        <div className={styles.allCauseContainer}>
            <Typography variant="h6" className={styles.allCauseTitle}>All Cause</Typography>
            <Grid container spacing={4}>

                <BasicTabs
                    tabNames={tabNames}
                    causeData={causeData}
                    // setOpenSideDrawer={setOpenSideDrawer}
                    // handleShareCause={handleShareCause}
                    // handleOpenSideDrawer={handleOpenSideDrawer}
                    ROLE={ROLES.OPEN_TO_ALL}
                    handleViewCause={handleViewCause}
                    handleClaimCause={handleClaimCause}
                    handleSponsorCause={handleSponsorCause}
                    filterBy="category"
                />
                {/* {causeData.map((cause, index) => (
                <CustomCard
                    causeData={cause}
                    ROLE={ROLES.OPEN_TO_ALL}
                    key={`cause-${index}`}
                    handleViewCause={handleViewCause}
                    handleClaimCause={handleClaimCause}
                    handleSponsorCause={handleSponsorCause}
                />
            ))} */}
            </Grid>
        </div >
    );
};

export default AllCause;