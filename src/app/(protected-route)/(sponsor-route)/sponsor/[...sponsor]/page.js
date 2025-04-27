'use client'
import CauseDetails from "@/components/CauseDeatils";
import { ROLES } from "@/utils/validationSchemas";
import { useContext, useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Show from "@/components/Show";
import { Box, Modal, Typography, Stack, TextField, Button } from "@mui/material";
import axios from "axios";
import AuthContext from "@/context/authContext";
import SnakeBarContext from "@/context/snakeBarContext";
import { useRouter } from "next/navigation";


// Initial state
const initialSponsorState = {
    bagCount: "",
    branding: "",
    message: "",
    causeID: "",
};

const Sponsor = () => {
    const { userData } = useContext(AuthContext);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const router = useRouter();
    const params = useParams();
    const [open, setOpen] = useState(false);
    const [createSponsor, setCreateSponsor] = useState({
        bagCount: "",
        branding: "",
        message: "",
        causeID: "",
    });

    const handleOpenSponsorCreateModal = () => {
        console.log("create modal");
        setOpen(true);
    }


    // Validate function
    const isFormValid = () => {
        return (
            Number(createSponsor?.bagCount) > 0 &&
            createSponsor?.branding?.trim() !== '' &&
            createSponsor?.message?.trim() !== ''
        );
    };

    // Handle input change
    const handleChange = (e) => {
        setCreateSponsor(prev => ({
            ...prev,
            [e.target.name]: e.target.value
        }));
    };

    // Handle form submit
    const handleSubmit = (e) => {
        e.preventDefault();
        if (isFormValid()) {
            console.log("Form submitted:", createSponsor);
            handleCreateSponsorship();
        }
    };

    const handleCreateSponsorship = async () => {

        try {
            const { bagCount, branding, message, causeID } = createSponsor;
            const payload = {
                bagCount: parseInt(bagCount),
                branding,
                message,
                causeID,
                token: userData?.token
            };

            const response = await axios.post(`/api/sponsor/sponser-cause`, payload);
            const isCreated = response?.data?.data;
            if (!isCreated) {
                handleOpenSnakeBar("Sponsorship creation failed", "error");
            } else {
                router.push(`/sponsor/sponsered`);
                handleOpenSnakeBar("Sponsorship created successfully", "success");
            }
        } catch (error) {
            console.log(error);
            handleOpenSnakeBar("Sponsorship creation failed", "error");
        } finally {
        }

    }


    useEffect(() => {
        const currentPath = params.sponsor[0];
        const searchParams = new URLSearchParams(window.location.search);
        const createSponsor = searchParams.get('createSponsor');
        if (createSponsor) {
            setOpen(true);
            setCreateSponsor({
                causeID: currentPath,
            });
        }

    }, []);

    const style = {
        position: 'absolute',
        top: '50%',
        left: '50%',
        transform: 'translate(-50%, -50%)',
        width: 400,
        bgcolor: 'background.paper',
        borderRadius: '8px',
        boxShadow: 24,
        p: 3,
    };


    return (
        <>
            <Show when={createSponsor}>
                <Modal
                    open={open}
                    onClose={() => setOpen(false)}
                    aria-labelledby="share-modal-title"
                    aria-describedby="share-modal-description"
                >
                    <Box sx={style}>
                        <Typography variant="h5" component="h2" gutterBottom>
                            Create Sponsorship
                        </Typography>

                        <form onSubmit={handleSubmit}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Bag Count"
                                    type="number"
                                    value={createSponsor.bagCount}
                                    name="bagCount"
                                    onChange={handleChange}
                                    error={typeof createSponsor.bagCount === 'number' && createSponsor.bagCount <= 0}
                                    helperText={typeof createSponsor.bagCount === 'number' && createSponsor.bagCount <= 0 ? "Bag count must be greater than 0" : ""}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Branding"
                                    value={createSponsor.branding}
                                    name="branding"
                                    onChange={handleChange}
                                    error={typeof createSponsor.branding === 'string' && !createSponsor.branding.trim()}
                                    helperText={typeof createSponsor.branding === 'string' && !createSponsor.branding.trim() ? "Branding is required" : ""}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Message"
                                    multiline
                                    rows={4}
                                    value={createSponsor.message}
                                    onChange={handleChange}
                                    name="message"
                                    error={typeof createSponsor.message === 'string' && !createSponsor.message.trim()}
                                    helperText={typeof createSponsor.message === 'string' && !createSponsor.message.trim() ? "Message is required" : ""}
                                    required
                                />

                                <Box sx={{ display: 'flex', justifyContent: 'flex-end', gap: 2, mt: 2 }}>
                                    <Button
                                        variant="outlined"
                                        onClick={() => setOpen(false)}
                                    >
                                        Cancel
                                    </Button>
                                    <Button
                                        variant="contained"
                                        type="submit"
                                        disabled={!isFormValid()}
                                    >
                                        Create Sponsorship
                                    </Button>
                                </Box>
                            </Stack>
                        </form>
                    </Box>
                </Modal>
            </Show>
            <CauseDetails ROLE={ROLES.SPONSOR} handleOpenSponsorCreateModal={handleOpenSponsorCreateModal} />
        </>
    )
}

export default Sponsor;
