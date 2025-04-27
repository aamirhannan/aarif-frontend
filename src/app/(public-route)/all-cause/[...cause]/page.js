'use client'

import { useEffect, useState } from 'react';
import styles from './cause-detail.module.scss';
import {
    Typography,
    Container,
    Paper,
    Button,
    Chip,
    Box,
    LinearProgress,
    Divider,
    CircularProgress
} from '@mui/material';
import Image from 'next/image';
import {
    AccessTime,
    Category,
    AttachMoney,
    BarChart,
    People,
    Info
} from '@mui/icons-material';
import { formatDistanceToNow } from 'date-fns';
import { useParams } from 'next/navigation';

const Cause = () => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);

    // In a real app, you would fetch data based on the causeId from params
    // useEffect(() => {
    //   const fetchCauseData = async () => {
    //     try {
    //       const causeId = params.cause[0];
    //       const response = await fetch(`/api/causes/${causeId}`);
    //       const data = await response.json();
    //       setCauseData(data);
    //     } catch (error) {
    //       console.error('Error fetching cause data:', error);
    //     } finally {
    //       setIsLoading(false);
    //     }
    //   };
    //
    //   fetchCauseData();
    // }, [params]);

    // This would come from API in a real app
    const causeData = {
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
        causeID: "8f34bfa0-2201-4822-91ba-85037c59f55b",
        createdAt: "2025-04-23T18:13:38.393Z",
    };

    // Calculate progress percentage
    const progressPercentage = (causeData.claimed / causeData.qty) * 100;
    const formattedDate = formatDistanceToNow(new Date(causeData.createdAt), { addSuffix: true });

    // For actual implementation, you would use the causeId from params
    useEffect(() => {
        // Simulating API call
        const timer = setTimeout(() => {
            setIsLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, []);

    // Show loading state
    if (isLoading) {
        return (
            <Container maxWidth="lg" className={styles.causeDetailContainer}>
                <Box sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '50vh' }}>
                    <CircularProgress />
                </Box>
            </Container>
        );
    }

    return (
        <Container maxWidth="lg" className={styles.causeDetailContainer} sx={{ boxShadow: '0px 4px 12px rgba(0, 0, 0, 0.1)', borderRadius: '8px' }}>
            <div className={styles.causeHeader}>
                <Typography variant="h2" component="h1" className={styles.causeTitle}>
                    {causeData.title}
                </Typography>

                <div className={styles.causeMeta}>
                    <Chip
                        icon={<Category className={styles.metaIcon} />}
                        label={causeData.category}
                        variant="outlined"
                        color="primary"
                        className={styles.metaItem}
                    />
                    <Chip
                        icon={<BarChart className={styles.metaIcon} />}
                        label={`Impact: ${causeData.impactLevel}`}
                        variant="outlined"
                        color="primary"
                        className={styles.metaItem}
                    />
                    <Chip
                        icon={<AccessTime className={styles.metaIcon} />}
                        label={`Created ${formattedDate}`}
                        variant="outlined"
                        color="primary"
                        className={styles.metaItem}
                    />
                    <Chip
                        label={causeData.status}
                        variant="filled"
                        color={causeData.status === "APPROVED" ? "success" : causeData.status === "REJECTED" ? "error" : "warning"}
                    // className={styles.metaItem}
                    />
                </div>
            </div>

            <div className={styles.mainContent}>
                <div className={styles.imageSection}>
                    <Image
                        src="/images/card.png"
                        alt={causeData.title}
                        width={600}
                        height={400}
                        className={styles.causeImage}
                    />
                </div>

                <div className={styles.detailsSection}>
                    <Typography variant="h6" className={styles.sectionTitle}>
                        About This Cause
                    </Typography>

                    <Typography variant="body1" className={styles.description}>
                        {causeData.description}
                    </Typography>

                    <div className={styles.statsGrid}>
                        <Paper elevation={0} className={styles.statCard}>
                            <Typography variant="h4" className={styles.statValue}>
                                {causeData.qty}
                            </Typography>
                            <Typography variant="body2" className={styles.statLabel}>
                                Total Items
                            </Typography>
                        </Paper>

                        <Paper elevation={0} className={styles.statCard}>
                            <Typography variant="h4" className={styles.statValue}>
                                ${causeData.totalAmount}
                            </Typography>
                            <Typography variant="body2" className={styles.statLabel}>
                                Total Amount
                            </Typography>
                        </Paper>

                        <Paper elevation={0} className={styles.statCard}>
                            <Typography variant="h4" className={styles.statValue}>
                                ${causeData.singleItemPrice}
                            </Typography>
                            <Typography variant="body2" className={styles.statLabel}>
                                Per Item
                            </Typography>
                        </Paper>

                        <Paper elevation={0} className={styles.statCard}>
                            <Typography variant="h4" className={styles.statValue}>
                                {causeData.claimed}
                            </Typography>
                            <Typography variant="body2" className={styles.statLabel}>
                                Items Claimed
                            </Typography>
                        </Paper>
                    </div>

                    <div className={styles.progressSection}>
                        <Typography variant="subtitle1" gutterBottom>
                            Progress ({progressPercentage.toFixed(0)}%)
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progressPercentage}
                            className={styles.progressBar}
                            color="primary"
                        />
                        <div className={styles.progressStats}>
                            <Typography variant="body2" className={styles.progressText}>
                                {causeData.claimed} of {causeData.qty} items claimed
                            </Typography>
                            <Typography variant="body2" className={styles.progressText}>
                                ${causeData.currentPrice} of ${causeData.totalAmount} funded
                            </Typography>
                        </div>
                    </div>

                    <div className={styles.actionSection}>
                        <Typography variant="h6" className={styles.sectionTitle}>
                            Support This Cause
                        </Typography>

                        <div className={styles.actionButtons}>
                            <Button
                                variant="contained"
                                color="primary"
                                size="large"
                                className={styles.actionButton}
                                startIcon={<AttachMoney />}
                            >
                                Sponsor
                            </Button>

                            <Button
                                variant="outlined"
                                color="primary"
                                size="large"
                                className={styles.actionButton}
                                startIcon={<People />}
                            >
                                Claim
                            </Button>

                            <Button
                                variant="text"
                                color="primary"
                                size="large"
                                className={styles.actionButton}
                                startIcon={<Info />}
                            >
                                Learn More
                            </Button>
                        </div>
                    </div>
                </div>
            </div>

            <Divider sx={{ my: 4 }} />

            <Box mt={4}>
                <Typography variant="subtitle1" color="textSecondary" gutterBottom>
                    Cause ID: {causeData.causeID}
                </Typography>
            </Box>
        </Container>
    );
};

export default Cause;
