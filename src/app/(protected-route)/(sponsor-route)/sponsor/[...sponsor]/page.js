'use client'
import CauseDetails from "@/components/CauseDeatils";
import { ROLES } from "@/utils/validationSchemas";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Show from "@/components/Show";
import { Box, Modal, Typography, Stack, TextField, Button } from "@mui/material";

const Sponsor = () => {

    const params = useParams();
    const [open, setOpen] = useState(false);
    const [createSponsor, setCreateSponsor] = useState({
        bagCount: 0,
        branding: "",
        message: "",
        causeID: "",
    });




    const handleOpenSponsorCreateModal = () => {
        console.log("create modal");
        setOpen(true);
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
                        <form onSubmit={(e) => {
                            e.preventDefault();
                            // Handle form submission here
                            console.log("Form submitted:", createSponsor);
                            // Add API call to create sponsorship
                        }}>
                            <Stack spacing={3}>
                                <TextField
                                    fullWidth
                                    label="Bag Count"
                                    type="number"
                                    value={createSponsor.bagCount}
                                    onChange={(e) => setCreateSponsor({
                                        ...createSponsor,
                                        bagCount: parseInt(e.target.value) || 0
                                    })}
                                    error={createSponsor.bagCount <= 0}
                                    helperText={createSponsor.bagCount <= 0 ? "Bag count must be greater than 0" : ""}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Branding"
                                    value={createSponsor.branding}
                                    onChange={(e) => setCreateSponsor({
                                        ...createSponsor,
                                        branding: e.target.value
                                    })}
                                    error={!createSponsor?.branding?.trim()}
                                    helperText={!createSponsor?.branding?.trim() ? "Branding is required" : ""}
                                    required
                                />

                                <TextField
                                    fullWidth
                                    label="Message"
                                    multiline
                                    rows={4}
                                    value={createSponsor.message}
                                    onChange={(e) => setCreateSponsor({
                                        ...createSponsor,
                                        message: e.target.value
                                    })}
                                    error={!createSponsor?.message?.trim()}
                                    helperText={!createSponsor?.message?.trim() ? "Message is required" : ""}
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
                                        disabled={
                                            createSponsor?.bagCount <= 0 ||
                                            !createSponsor?.branding?.trim() ||
                                            !createSponsor?.message?.trim()
                                        }
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
