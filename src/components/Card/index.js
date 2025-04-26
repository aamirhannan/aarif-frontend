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

const CustomCard = ({ causeData, handleShareCause, handleOpenSideDrawer }) => {

    const { userData } = useContext(AuthContext);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);

    return (
        <>
            <Card sx={{ maxWidth: 345 }}>
                <CardMedia
                    component="img"
                    alt="green iguana"
                    height="140"
                    image="/images/card.png"
                />
                <CardContent>
                    <Typography gutterBottom variant="h5" component="div">
                        {causeData.title}
                    </Typography>
                    <Typography variant="body2" sx={{ color: 'text.secondary' }}>
                        {causeData.description}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Show when={causeData?.status === "APPROVED"}>
                        <Button size="small" onClick={() => { handleShareCause(causeData) }}>Share</Button>
                    </Show>
                    <Button size="small" onClick={() => { handleOpenSideDrawer(causeData) }}>Learn More</Button>
                    <Chip color={causeData?.status === "APPROVED" ? "success" : causeData?.status === "REJECTED" ? "error" : "warning"} label={causeData?.status} size="small" />
                </CardActions>
            </Card>
        </>
    );
}

export default CustomCard;
