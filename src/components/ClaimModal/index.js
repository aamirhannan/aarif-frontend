"use client"; // If you are using Next.js

import React, { useState } from "react";
import { Modal, Box, Typography, TextField, Button, CircularProgress } from "@mui/material";
import styles from "./claim.module.scss"; // importing SCSS styles
import axios from "axios";
import SnakeBarContext from "@/context/snakeBarContext";
import { useContext } from "react";

const ClaimModal = ({ open, onClose, causeData }) => {

    const { handleOpenSnakeBar } = useContext(SnakeBarContext);

    // State to manage the mobile number entered by user
    const [mobileNumber, setMobileNumber] = useState("");

    // State to manage the OTP entered by user
    const [otp, setOtp] = useState("");

    // To track current step (1: Generate OTP, 2: Verify OTP, 3: Success)
    const [step, setStep] = useState(1);

    // Loading state when calling API
    const [loading, setLoading] = useState(false);

    // To store any error messages
    const [error, setError] = useState("");

    // Simulated API call for generating OTP
    const generateOtpAPI = async (mobile) => {

        try {
            const response = await axios.post(`/api/verify/generate-otp`, {
                phone: mobile
            });
            handleOpenSnakeBar("OTP sent successfully");
        } catch (error) {
            handleOpenSnakeBar("Error sending OTP");
        }
    };

    // Simulated API call for verifying OTP
    const verifyOtpAPI = async (enteredOtp) => {
        try {
            const response = await axios.post(`/api/verify/verify-otp`, {
                mobileNumber: mobileNumber,
                otp: enteredOtp,
                causeId: causeData.causeID
            });
            handleOpenSnakeBar("OTP verified successfully");
        } catch (error) {
            handleOpenSnakeBar("Error verifying OTP");
        }
    };

    // Function called when "Generate OTP" button is clicked
    const handleGenerateOtp = async () => {
        setError("");
        if (mobileNumber.length !== 10) {
            setError("Please enter a valid 10-digit mobile number.");
            return;
        }
        try {
            setLoading(true);
            await generateOtpAPI(mobileNumber);
            setStep(2); // Move to OTP Verification step
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Function called when "Verify OTP" button is clicked
    const handleVerifyOtp = async () => {
        setError("");
        if (otp.length !== 4) {
            setError("Please enter a 4-digit OTP.");
            return;
        }
        try {
            setLoading(true);
            await verifyOtpAPI(otp);
            setStep(3); // Move to Success screen
        } catch (err) {
            setError(err);
        } finally {
            setLoading(false);
        }
    };

    // Function to reset modal when closed
    const handleClose = () => {
        setMobileNumber("");
        setOtp("");
        setStep(1);
        setError("");
        setLoading(false);
        onClose(); // calling parent onClose
    };

    return (
        <Modal open={open} onClose={handleClose}>
            <Box className={styles.modalContainer}>
                {step === 1 && (
                    <>
                        <Typography variant="h6" className={styles.heading}>Enter Mobile Number</Typography>
                        <TextField
                            label="Mobile Number"
                            variant="outlined"
                            fullWidth
                            value={mobileNumber}
                            onChange={(e) => setMobileNumber(e.target.value)}
                            className={styles.inputField}
                        />
                        {error && <Typography className={styles.errorText}>{error}</Typography>}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleGenerateOtp}
                            disabled={loading}
                            className={styles.actionButton}
                        >
                            {loading ? <CircularProgress size={24} /> : "Generate OTP"}
                        </Button>
                    </>
                )}

                {step === 2 && (
                    <>
                        <Typography variant="h6" className={styles.heading}>Enter OTP</Typography>
                        <TextField
                            label="OTP"
                            variant="outlined"
                            fullWidth
                            value={otp}
                            onChange={(e) => setOtp(e.target.value)}
                            className={styles.inputField}
                        />
                        {error && <Typography className={styles.errorText}>{error}</Typography>}
                        <Button
                            variant="contained"
                            color="primary"
                            fullWidth
                            onClick={handleVerifyOtp}
                            disabled={loading}
                            className={styles.actionButton}
                        >
                            {loading ? <CircularProgress size={24} /> : "Verify OTP"}
                        </Button>
                    </>
                )}

                {step === 3 && (
                    <>
                        <Typography variant="h5" className={styles.successMessage}>🎉 Claimed Successfully!</Typography>
                        <Button
                            variant="outlined"
                            color="success"
                            fullWidth
                            onClick={handleClose}
                            className={styles.actionButton}
                        >
                            Close
                        </Button>
                    </>
                )}
            </Box>
        </Modal>
    );
};

export default ClaimModal;
