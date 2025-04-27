'use client'
import CauseDetails from "@/components/CauseDeatils";
import { ROLES } from "@/utils/validationSchemas";
import { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';
import Show from "@/components/Show";
import { Box, Modal } from "@mui/material";
import axios from "axios";

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
                        <h1>Create Sponsor</h1>
                    </Box>
                </Modal>
            </Show>
            <CauseDetails ROLE={ROLES.SPONSOR} handleOpenSponsorCreateModal={handleOpenSponsorCreateModal} />
        </>
    )
}

export default Sponsor;
