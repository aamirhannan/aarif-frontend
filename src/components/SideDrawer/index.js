import { useState } from 'react';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import Divider from '@mui/material/Divider';
import ListItem from '@mui/material/ListItem';
import ListItemButton from '@mui/material/ListItemButton';
import ListItemIcon from '@mui/material/ListItemIcon';
import ListItemText from '@mui/material/ListItemText';
import InboxIcon from '@mui/icons-material/MoveToInbox';
import MailIcon from '@mui/icons-material/Mail';
import Typography from '@mui/material/Typography';
import Grid from '@mui/material/Grid';
import TextField from '@mui/material/TextField';


export default function SideDrawer({ open, setOpen, causeData }) {

    const toggleDrawer = (event) => {
        if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
            return;
        }

        setOpen(!open);
    };

    const list = () => (
        <Box
            sx={{ width: '600px' }}
            role="presentation"
            onClick={toggleDrawer}
            onKeyDown={toggleDrawer}
        >
            <Box sx={{ p: 3 }}>
                <Typography variant="h5" gutterBottom>
                    {causeData.title}
                </Typography>
                <Divider sx={{ my: 2 }} />

                <Box sx={{ mb: 3 }}>
                    <Typography variant="subtitle1" fontWeight="bold">Description</Typography>
                    <Typography variant="body2">{causeData.description}</Typography>
                </Box>

                <Grid container spacing={2}>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Category"
                            value={causeData.category}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Impact Level"
                            value={causeData.impactLevel}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Quantity"
                            value={causeData.qty}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Claimed"
                            value={causeData.claimed}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Total Amount"
                            value={`$${causeData.totalAmount}`}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Single Item Price"
                            value={`$${causeData.singleItemPrice}`}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Current Price"
                            value={`$${causeData.currentPrice}`}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Status"
                            value={causeData.status}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Cause ID"
                            value={causeData.causeID}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                    <Grid item xs={12}>
                        <TextField
                            fullWidth
                            label="Created At"
                            value={new Date(causeData.createdAt).toLocaleString()}
                            disabled
                            variant="outlined"
                            margin="normal"
                            size="small"
                            InputProps={{
                                sx: {
                                    '&.Mui-disabled': {
                                        color: 'text.primary',
                                        '& fieldset': { borderColor: 'primary.light' }
                                    }
                                }
                            }}
                            InputLabelProps={{
                                sx: { '&.Mui-disabled': { color: 'primary.main' } }
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>
        </Box>
    );

    return (
        <Drawer
            anchor="right"
            open={open}
            onClose={toggleDrawer}
        >
            {list()}
        </Drawer>
    );
}

