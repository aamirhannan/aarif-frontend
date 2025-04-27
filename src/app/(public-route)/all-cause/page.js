'use client'
import CustomCard from "@/components/Card";
import { ROLES } from "@/utils/validationSchemas";
import { Grid, Typography } from "@mui/material";
import styles from './all-cause.module.scss';

const AllCause = () => {

    const causeData = [
        {
            title: "Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "Environment",
            impactLevel: "High",
            status: "PENDING",
            causeID: "8f34bfa0-2201-4822-91ba-85037c59f55b",
            createdAt: "2025-04-23T18:13:38.393Z",
        },
        {
            title: "Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "Environment",
            impactLevel: "High",
            status: "APPROVED",
            causeID: "8f34bfa0-2201-4822-91ba-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        },
        {
            title: "Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "Environment",
            impactLevel: "High",
            status: "REJECTED",
            causeID: "8f34bfa0-221-422-91ba-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        }, {
            title: "Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "Environment",
            impactLevel: "High",
            status: "REJECTED",
            causeID: "8f3fa0-221-422-91ba-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        },
        {
            title: "Clean Water Initiative",
            description: "Providing clean water Providing clean waterProviding clean water Providing clean water",
            qty: 100,
            claimed: 0,
            totalAmount: 2500,
            currentPrice: 0,
            singleItemPrice: 25,
            category: "Environment",
            impactLevel: "High",
            status: "REJECTED",
            causeID: "8f34bfa0-221-422-91a-85037c555b",
            createdAt: "2025-04-23T18:13:38.393Z",
        }
    ]

    return (
        <div className={styles.allCauseContainer}>
            <Typography variant="h6" className={styles.allCauseTitle}>All Cause</Typography>
            <Grid container spacing={4}>
                {causeData.map((cause, index) => (
                    <CustomCard
                        causeData={cause}
                        ROLE={ROLES.OPEN_TO_ALL}
                        key={`cause-${index}`}
                    />
                ))}
            </Grid>
        </div>
    );
};

export default AllCause;