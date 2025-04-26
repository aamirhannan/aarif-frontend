import './ShareModal.module.scss';
import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useContext } from 'react';
import SnakeBarContext from '@/context/snakeBarContext';
import CloseIcon from '@mui/icons-material/Close';
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import DownloadIcon from '@mui/icons-material/Download';
import { IconButton, CircularProgress, Divider, TextField, InputAdornment } from '@mui/material';

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

export default function ShareModal({ open, setOpen, isLoading, shareableLink }) {
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    // const [isLoading, setIsLoading] = React.useState(modalLoading);

    const handleClose = () => setOpen(false);

    const handleCopyLink = () => {
        navigator.clipboard.writeText(shareableLink.shareLink)
            .then(() => {
                handleOpenSnakeBar('Link copied to clipboard');
            })
            .catch(err => {
                handleOpenSnakeBar('Failed to copy link');
                console.error('Failed to copy link: ', err);
            });
    };

    const handleDownloadQR = () => {
        try {
            // Create a link element
            const link = document.createElement('a');
            link.href = shareableLink.qrCode;
            link.download = 'cause-qr-code.png';
            document.body.appendChild(link);
            link.click();
            document.body.removeChild(link);

            handleOpenSnakeBar('QR code downloaded successfully');
        } catch (error) {
            handleOpenSnakeBar('Failed to download QR code');
            console.error('Download error: ', error);
        }
    };

    return (
        <div className="share-modal-container">
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="share-modal-title"
                aria-describedby="share-modal-description"
            >
                <Box sx={style}>
                    <div className="share-modal-header">
                        <Typography id="share-modal-title" variant="h5" component="h2">
                            Share This Cause
                        </Typography>
                        <IconButton
                            aria-label="close"
                            onClick={handleClose}
                            sx={{ position: 'absolute', right: 8, top: 8 }}
                        >
                            <CloseIcon />
                        </IconButton>
                    </div>

                    <Divider sx={{ my: 2 }} />

                    {isLoading ? (
                        <div className="loading-container">
                            <CircularProgress />
                        </div>
                    ) : (
                        <div className="share-modal-content">
                            <div className="qr-code-container">
                                <Typography variant="body1" sx={{ mb: 1 }}>
                                    Scan this QR code to access the cause:
                                </Typography>
                                <img
                                    src={shareableLink.qrCode}
                                    alt="QR Code"
                                    className="qr-code-image"
                                />
                                <Button
                                    variant="outlined"
                                    startIcon={<DownloadIcon />}
                                    onClick={handleDownloadQR}
                                    sx={{ mt: 1 }}
                                >
                                    Download QR Code
                                </Button>
                            </div>

                            <div className="share-link-container">
                                <Typography variant="body1" sx={{ mb: 1, mt: 2 }}>
                                    Or share this link directly:
                                </Typography>
                                <TextField
                                    fullWidth
                                    variant="outlined"
                                    value={shareableLink.shareLink}
                                    InputProps={{
                                        readOnly: true,
                                        endAdornment: (
                                            <InputAdornment position="end">
                                                <IconButton
                                                    aria-label="copy link"
                                                    onClick={handleCopyLink}
                                                    edge="end"
                                                >
                                                    <ContentCopyIcon />
                                                </IconButton>
                                            </InputAdornment>
                                        ),
                                    }}
                                />
                            </div>

                            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
                                Share this cause with others to help spread awareness and support.
                            </Typography>
                        </div>
                    )}

                    <div className="share-modal-footer">
                        <Button
                            variant="contained"
                            color="primary"
                            onClick={handleClose}
                            fullWidth
                            sx={{ mt: 2 }}
                        >
                            Close
                        </Button>
                    </div>
                </Box>
            </Modal>
        </div>
    );
}
