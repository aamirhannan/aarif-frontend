"use client";
import { createContext, useState } from "react";
import * as React from 'react';
import Button from '@mui/material/Button';
import Snackbar from '@mui/material/Snackbar';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';

const SnakeBarContext = createContext();

const SnakeBarProvider = ({ children }) => {
    const [open, setOpen] = useState(false);
    const [message, setMessage] = useState("");
    const [type, setType] = useState("success");

    const handleOpenSnakeBar = (message, type) => {
        setOpen(true);
        setMessage(message);
        setType(type);
    };

    const handleCloseSnakeBar = (event, reason) => {
        if (reason === 'clickaway') {
            return;
        }
        setOpen(false);
    };

    const action = (
        <React.Fragment>
            <IconButton
                size="small"
                aria-label="close"
                color="inherit"
                onClick={handleCloseSnakeBar}
            >
                <CloseIcon fontSize="small" />
            </IconButton>
        </React.Fragment>
    );

    return (
        <SnakeBarContext.Provider value={{ handleOpenSnakeBar, handleCloseSnakeBar }}>
            {children}
            <Snackbar
                open={open}
                autoHideDuration={6000}
                onClose={handleCloseSnakeBar}
                message={message}
                action={action}
            />
        </SnakeBarContext.Provider>
    );
}

export { SnakeBarProvider };

export default SnakeBarContext;
