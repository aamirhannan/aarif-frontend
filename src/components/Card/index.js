'use client'
import { useState } from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Chip } from '@mui/material';
import Show from '../Show';
import SideDrawer from '../SideDrawer';
import axios from 'axios';
import { useContext } from 'react';
import AuthContext from "@/context/authContext";
import SnakeBarContext from "@/context/snakeBarContext";
import { ROLES } from '@/utils/validationSchemas';
import CustomButton from '../Button';

const CustomCard = ({
    causeData,
    handleShareCause = () => { },
    handleOpenSideDrawer = () => { },
    ROLE = ROLES.OPEN_TO_ALL,
    handleViewCause = () => { },
    handleClaimCause = () => { },
    handleSponsorCause = () => { },
}) => {

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image={causeData?.imageURL || "/images/card.png"}
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {causeData.title}
                    </Typography>
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
                        {causeData.description}
                    </Typography>
                </CardContent>
                <Show when={ROLE === ROLES.CAUSE_CREATOR}>
                    <CardActions>
                        <Show when={causeData?.status === "APPROVED"}>
                            <Button size="small" onClick={() => { handleShareCause(causeData) }}>Share</Button>
                        </Show>
                        <Button size="small" onClick={() => { handleOpenSideDrawer(causeData) }}>Learn More</Button>
                        <Chip color={causeData?.status === "APPROVED" ? "success" : causeData?.status === "REJECTED" ? "error" : "warning"} label={causeData?.status} size="small" />
                    </CardActions>
                </Show>
                <Show when={ROLE === ROLES.OPEN_TO_ALL}>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CustomButton
                            variant=""
                            size="small"
                            btnText="View Details"
                            btnClick={() => { handleViewCause(causeData) }}
                            className="nav-button"
                        />
                        <CustomButton
                            variant="outline"
                            size="small"
                            btnText="Claim"
                            btnClick={() => { handleClaimCause(causeData) }}
                            className="nav-button"
                        />

                        <CustomButton
                            variant="primary"
                            size="small"
                            btnText="Sponsor"
                            btnClick={() => { handleSponsorCause(causeData) }}
                            className="nav-button"
                        />
                    </CardActions>
                </Show>
                <Show when={ROLE === ROLES.SPONSOR}>
                    <CardActions sx={{ display: 'flex', justifyContent: 'space-between' }}>
                        <CustomButton
                            variant=""
                            size="small"
                            btnText="View Details"
                            btnClick={() => { handleViewCause(causeData) }}
                            className="nav-button"
                        />

                        <CustomButton
                            variant="primary"
                            size="small"
                            btnText="Sponsor"
                            btnClick={() => { handleSponsorCause(causeData) }}
                            className="nav-button"
                        />
                    </CardActions>
                </Show>
            </Card>
        </>
    );
}

export default CustomCard;
