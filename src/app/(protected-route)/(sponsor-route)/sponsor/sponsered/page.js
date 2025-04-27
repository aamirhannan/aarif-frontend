'use client'
import { useContext } from "react";
import AuthContext from "@/context/authContext";
import axios from "axios";
import { useEffect, useState } from "react";
import SnakeBarContext from "@/context/snakeBarContext";
import { CircularProgress } from "@mui/material";
import CustomCard from "@/components/Card";
import { ROLES } from "@/utils/validationSchemas";
import styles from "./sponsered.module.scss";

import { Card, CardMedia, CardContent, Typography, CardActions, Button, Chip, Stack } from '@mui/material';
import ShareModal from "@/components/ShareModal";


const Sponsered = () => {
    const { userData } = useContext(AuthContext);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const [sponsorshipData, setSponsorshipData] = useState([]);
    const [loading, setLoading] = useState(true);
    const [modalLoading, setModalLoading] = useState(true);

    const [open, setOpen] = useState(false);
    const [shareableLink, setShareableLink] = useState(null);

    const handleGetAllSponsorship = async () => {
        try {

            const response = await axios.post(`/api/sponsor/track-sponsorship`, {
                userID: userData.userID,
                token: userData.token
            });

            const sponsorshipData = response?.data?.data;

            if (!sponsorshipData || Array.isArray(sponsorshipData) && sponsorshipData.length === 0) {
                handleOpenSnakeBar("No data found");
                return;
            }
            setSponsorshipData(sponsorshipData);
            handleOpenSnakeBar("Data fetched successfully");
        } catch (error) {
            console.log(error);
            handleOpenSnakeBar("Error fetching data");
        } finally {
            setLoading(false);
        }
    }

    const handleShareCause = async (causeData) => {
        try {
            setOpen(true);
            setModalLoading(true);

            const response = await axios.post('/api/cause/share-cause', {
                causeID: causeData?.causeID,
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

    useEffect(() => {
        handleGetAllSponsorship();
    }, []);


    if (loading) {
        return <CircularProgress />;
    }

    return (
        <>
            <ShareModal open={open} setOpen={setOpen} isLoading={modalLoading} shareableLink={shareableLink} />
            <div className={styles.sponsoredCauseList}>
                {
                    sponsorshipData.length > 0 ?
                        sponsorshipData.map((sponsorship) => (
                            <SponsoredCauseCard
                                causeData={sponsorship}
                                handleShareCause={handleShareCause}
                                handleOpenSideDrawer={() => { }}
                                key={sponsorship.sponsorshipID}
                            />
                        )) :
                        <div className={styles.noData}>
                            <Typography variant="h6">No Sponsored Cause Found</Typography>
                        </div>
                }
            </div>
        </>
    )
}


export default Sponsered


const SponsoredCauseCard = ({ causeData, handleShareCause, handleOpenSideDrawer }) => {
    return (
        <Card sx={{ maxWidth: 345, borderRadius: 3, boxShadow: 3 }}>
            {/* Image at the top */}
            <CardMedia
                component="img"
                alt={causeData.cause}
                height="140"
                image="/images/card.png"
            />

            <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                    {causeData.cause}
                </Typography>

                <Stack direction="row" spacing={1} mb={1}>
                    <Chip label={causeData.causeCategory} size="small" color="primary" />
                    <Chip label={`Impact: ${causeData.causeImpact}`} size="small" color="secondary" />
                </Stack>

                <Typography
                    variant="body2"
                    sx={{
                        color: 'text.secondary',
                        display: '-webkit-box',
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: 'vertical',
                        overflow: 'hidden',
                        textOverflow: 'ellipsis'
                    }}
                >
                    {causeData.causeDescription}
                </Typography>

                <Typography variant="body2" sx={{ color: 'text.secondary', mt: 1 }}>
                    Bags Sponsored: <b>{causeData.bagsSponsored}</b>
                </Typography>
                <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                    Bags Claimed: <b>{causeData.bagsClaimed}</b> ({causeData.claimPercentage}%)
                </Typography>
            </CardContent>

            <CardActions sx={{ justifyContent: 'space-between' }}>
                <Stack direction="row" spacing={1}>
                    <Button size="small" onClick={() => handleShareCause(causeData)}>Share</Button>
                    {/* <Button size="small" onClick={() => handleOpenSideDrawer(causeData)}>Learn More</Button> */}
                    {/* <Button size="small" onClick={() => handleOpenSideDrawer(causeData)}>Learn More</Button> */}
                </Stack>

                {/* Status Chip */}
                <Chip
                    label={causeData.status}
                    size="small"
                    color={
                        causeData.status === "ACTIVE"
                            ? "success"
                            : causeData.status === "REJECTED"
                                ? "error"
                                : "warning"
                    }
                />
            </CardActions>
        </Card>
    )
};


