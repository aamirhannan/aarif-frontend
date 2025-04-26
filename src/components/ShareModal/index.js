import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ShareModal({ open, setOpen, modalLoading }) {

    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    const shareableLink = {
        "shareLink": "http://localhost:5000/all-cause?causeId=2b72aff5-5873-423f-89cd-bfcb3dc36e45",
        "qrCode": "data:image/png;base64,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"
    }

    return (
        <div>
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}
