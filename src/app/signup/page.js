"use client";

import { useEffect, useState, useContext } from 'react';
import {
    Box,
    Button,
    TextField,
    Typography,
    Container,
    Paper,
    Grid,
    Link,
    Alert,
    CircularProgress,
    FormControl,
    InputLabel,
    Select,
    MenuItem
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { signupSchema, validateForm, ROLES } from '@/utils/validationSchemas';
import AuthContext from '@/context/authContext';
import CustomTextField from '@/components/TextField';
import CustomButton from '@/components/Button';
import './signup.scss';
import PageLoader from '@/components/PageLoader';
import ERROR_MESSAGE from '@/utils/errorMessages';
import SnakeBarContext from '@/context/snakeBarContext';
export default function SignupPage() {
    const router = useRouter();
    const { userData } = useContext(AuthContext);
    const { handleOpenSnakeBar, handleCloseSnakeBar } = useContext(SnakeBarContext);
    const [loading, setLoading] = useState(true);
    const [apiInProgress, setApiInProgress] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [formData, setFormData] = useState({
        name: 'Test User',
        mobNumber: '9876543210',
        email: 'testuser8@example.com',
        password: 'Password123',
        confirmPassword: 'Password123',
        role: 'SPONSOR'
    });
    const [formErrors, setFormErrors] = useState({
        name: '',
        mobNumber: '',
        email: '',
        password: '',
        confirmPassword: '',
        role: ''
    });

    const roleMap = {
        'CAUSE_CREATOR': ROLES.CAUSE_CREATOR,
        'SPONSOR': ROLES.SPONSOR,
        'PUBLIC': ROLES.PUBLIC
    };

    const handleValidation = () => {
        const { isValid, errors } = validateForm(formData, signupSchema);
        setFormErrors(errors);
        return isValid;
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
        // Clear error on field change
        if (formErrors[name]) {
            setFormErrors({ ...formErrors, [name]: '' });
        }
        setError('');
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!handleValidation()) return;

        setApiInProgress(true);
        setError('');

        try {
            const response = await axios.post(`/api/auth/signup`, {
                name: formData.name,
                mobNumber: formData.mobNumber,
                email: formData.email,
                password: formData.password,
                role: formData.role
            });

            setSuccess('Registration successful! Redirecting to login...');

            // Redirect to login page after successful signup
            setTimeout(() => {
                router.push('/login');
            }, 2000);

        } catch (err) {
            const ENUM = err.response?.data?.data
            setError(ERROR_MESSAGE[ENUM] || ERROR_MESSAGE.SIGNUP_FAILED);
            handleOpenSnakeBar(ERROR_MESSAGE[ENUM] || ERROR_MESSAGE.SIGNUP_FAILED, 'error');
        } finally {
            setApiInProgress(false);
        }
    };

    useEffect(() => {
        setLoading(false);
    }, [userData]);

    useEffect(() => {
        if (!loading && (userData && Object.keys(userData).length > 0)) {
            router.push("/dashboard");
        }
    }, [userData, loading, router]);

    if (loading) {
        return <PageLoader />;
    }

    return (
        <Container component="main" maxWidth="sm" className='signup-container'>
            <Paper
                elevation={3}
                sx={{
                    p: { xs: 2, sm: 4 },
                    mt: 8,
                    display: 'flex',
                    flexDirection: 'column',
                    borderRadius: 2
                }}
            >
                <Typography component="h1" variant="h4" align="center" fontWeight="bold" mb={3}>
                    Create Account
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
                {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate>

                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="name"
                        label="Full Name"
                        name="name"
                        autoComplete="name"
                        autoFocus
                        value={formData.name}
                        onChange={handleChange}
                        error={!!formErrors.name}
                        helperText={formErrors.name}
                    />

                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="mobNumber"
                        label="Mobile Number"
                        name="mobNumber"
                        autoComplete="tel"
                        value={formData.mobNumber}
                        onChange={handleChange}
                        error={!!formErrors.mobNumber}
                        helperText={formErrors.mobNumber}
                    />

                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        value={formData.email}
                        onChange={handleChange}
                        error={!!formErrors.email}
                        helperText={formErrors.email}
                    />

                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="password"
                        label="Password"
                        name="password"
                        type="password"
                        autoComplete="new-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />

                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="confirmPassword"
                        label="Confirm Password"
                        name="confirmPassword"
                        type="password"
                        value={formData.confirmPassword}
                        onChange={handleChange}
                        error={!!formErrors.confirmPassword}
                        helperText={formErrors.confirmPassword}
                    />

                    <FormControl
                        fullWidth
                        margin="normal"
                        error={!!formErrors.role}
                    >
                        <InputLabel id="role-label">Select Role</InputLabel>
                        <Select
                            labelId="role-label"
                            id="role"
                            name="role"
                            value={formData.role}
                            label="Select Role"
                            onChange={handleChange}
                        >
                            <MenuItem value={ROLES.CAUSE_POSTER}>Cause Poster</MenuItem>
                            <MenuItem value={ROLES.SPONSOR}>Sponsor</MenuItem>
                            <MenuItem value={ROLES.PUBLIC}>Public</MenuItem>
                        </Select>
                        {formErrors.role && (
                            <Typography variant="caption" color="error">
                                {formErrors.role}
                            </Typography>
                        )}
                    </FormControl>

                    <CustomButton
                        variant="primary"
                        btnText="Sign Up"
                        btnClick={handleSubmit}
                        disabled={apiInProgress}
                        loading={apiInProgress}
                        type="submit"
                        fullWidth={true}
                        size="medium"
                    />

                    <Grid container justifyContent="center">
                        <Grid item>
                            <Link href="/login" variant="body2">
                                Already have an account? Sign in
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container >
    );
}
