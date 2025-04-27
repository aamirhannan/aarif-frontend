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
import axios from 'axios';
import AuthContext from '@/context/authContext';
import { useContext } from 'react';
import SnakeBarContext from '@/context/snakeBarContext';
import { ROLES } from '@/utils/validationSchemas';
import Show from '../Show';

const CauseDetails = ({ ROLE = ROLES.OPEN_TO_ALL, handleOpenSponsorCreateModal = () => { }, handleSponsorCause = () => { } }) => {
    const params = useParams();
    const [isLoading, setIsLoading] = useState(true);
    const { userData } = useContext(AuthContext);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const [causeData, setCauseData] = useState([]);

    let progressPercentage;
    let formattedDate;


    // For actual implementation, you would use the causeId from params
    // In a real app, you would fetch data based on the causeId from params
    useEffect(() => {
        const fetchCauseData = async () => {
            try {
                const routeType = Object.keys(params)[0];
                const causeId = params[routeType]?.[0];
                const response = await axios.post(`/api/cause/get-single-cause`, {
                    causeID: causeId
                });
                const data = response?.data?.data;
                if (!data) {
                    handleOpenSnakeBar("No data found");
                    return;
                }
                progressPercentage = (data?.claimed / data?.qty) * 100;
                formattedDate = formatDistanceToNow(new Date(data?.createdAt), { addSuffix: true });
                setCauseData(data);
                handleOpenSnakeBar("Cause data fetched successfully");
            } catch (error) {
                console.error('Error fetching cause data:', error);
            } finally {
                setIsLoading(false);
            }
        };

        fetchCauseData();
    }, [params]);

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
                        src={causeData?.imageURL || "/images/card.png"}
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
                            Progress ({progressPercentage ? progressPercentage.toFixed(0) : 0}%)
                        </Typography>
                        <LinearProgress
                            variant="determinate"
                            value={progressPercentage ? progressPercentage : 0}
                            className={styles.progressBar}
                            color="primary"
                        />
                        <div className={styles.progressStats}>
                            <Typography variant="body2" className={styles.progressText}>
                                {causeData?.claimed} of {causeData?.qty} items claimed
                            </Typography>
                            <Typography variant="body2" className={styles.progressText}>
                                ${causeData?.currentPrice} of ${causeData?.totalAmount} funded
                            </Typography>
                        </div>
                    </div>

                    <div className={styles.actionSection}>
                        <Typography variant="h6" className={styles.sectionTitle}>
                            Support This Cause
                        </Typography>

                        <Show when={ROLE === ROLES.SPONSOR}>
                            <div className={styles.actionButtons}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={styles.actionButton}
                                    startIcon={<AttachMoney />}
                                    onClick={handleOpenSponsorCreateModal}
                                >
                                    Sponsor
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
                        </Show>
                        <Show when={ROLE === ROLES.OPEN_TO_ALL}>
                            <div className={styles.actionButtons}>
                                <Button
                                    variant="contained"
                                    color="primary"
                                    size="large"
                                    className={styles.actionButton}
                                    startIcon={<AttachMoney />}
                                    onClick={() => handleSponsorCause(causeData)}
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
                        </Show>
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

export default CauseDetails;
