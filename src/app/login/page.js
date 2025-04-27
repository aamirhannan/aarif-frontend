"use client";

import { useEffect, useState } from 'react';
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
    CircularProgress
} from '@mui/material';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useContext } from 'react';
import AuthContext from '@/context/authContext';
import SnakeBarContext from '@/context/snakeBarContext';
import { loginSchema, validateForm } from '@/utils/validationSchemas';
import CustomTextField from '@/components/TextField';
import CustomButton from '@/components/Button';
import './login.scss';
import PageLoader from '@/components/PageLoader';
import ERROR_MESSAGE from '@/utils/errorMessages';
import { ROLES } from '@/utils/validationSchemas';
export default function LoginPage() {
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const { userData, setUserData } = useContext(AuthContext);
    const { handleOpenSnakeBar, handleCloseSnakeBar } = useContext(SnakeBarContext);
    const [apiInProgress, setApiInProgress] = useState(false);
    const [formData, setFormData] = useState({
        email: 'admin@gmail.com',
        password: 'Password123'
    });
    const [formErrors, setFormErrors] = useState({
        email: '',
        password: ''
    });

    const handleValidation = () => {
        const { isValid, errors } = validateForm(formData, loginSchema);
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
        handleOpenSnakeBar('Login started', 'success');
        try {
            const response = await axios.post('/api/auth/login', {
                email: formData.email,
                password: formData.password
            });

            if (response.data.status === 200) {
                const userData = response.data.data;
                setUserData(userData);
                handleLoginRedirect(userData);
            }
            handleOpenSnakeBar('Login successful', 'success');

        } catch (err) {
            const ENUM = err.response?.data?.data
            setError(ERROR_MESSAGE[ENUM] || ERROR_MESSAGE.LOGIN_FAILED);
            handleOpenSnakeBar(ERROR_MESSAGE[ENUM] || ERROR_MESSAGE.LOGIN_FAILED, 'error');
        } finally {
            setApiInProgress(false);
        }
    };


    useEffect(() => {
        setLoading(false);
        router.prefetch('/dashboard')
    }, [userData]);


    useEffect(() => {
        if (!loading && (userData && Object.keys(userData).length > 0)) {
            handleLoginRedirect(userData);
        }
    }, [userData, loading, router]);


    const handleLoginRedirect = (userData) => {
        const userRole = userData.role;
        switch (userRole) {
            case ROLES.ADMIN:
                router.push("/admin/dashboard");
                break;
            case ROLES.CAUSE_CREATOR:
                router.push("/cause-creator/dashboard");
                break;
            case ROLES.SPONSOR:
                router.push("/sponsor/dashboard");
                break;
            default:
                router.push("/all-cause");
                break;
        }
    }


    if (loading) {
        return <PageLoader />;
    }

    return (
        <Container component="main" maxWidth="sm" className='login-container'>
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
                    Sign In
                </Typography>

                {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}

                <Box component="form" onSubmit={handleSubmit} noValidate>
                    <CustomTextField
                        margin="normal"
                        required
                        fullWidth
                        id="email"
                        label="Email Address"
                        name="email"
                        autoComplete="email"
                        autoFocus
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
                        autoComplete="current-password"
                        value={formData.password}
                        onChange={handleChange}
                        error={!!formErrors.password}
                        helperText={formErrors.password}
                    />

                    <CustomButton
                        variant="primary"
                        btnText="Sign In"
                        btnClick={handleSubmit}
                        disabled={apiInProgress}
                        loading={apiInProgress}
                        type="submit"
                        fullWidth={true}
                        size="medium"
                    />

                    <Grid container justifyContent="space-between" mt={2}>
                        <Grid>
                            <Link href="#" variant="body2">
                                Forgot password?
                            </Link>
                        </Grid>
                        <Grid>
                            <Link href="/signup" variant="body2">
                                {"Don't have an account? Sign Up"}
                            </Link>
                        </Grid>
                    </Grid>
                </Box>
            </Paper>
        </Container>
    );
}
