'use client'
import { useContext, useEffect, useState } from 'react';
import {
    TextField,
    Select,
    MenuItem,
    RadioGroup,
    FormControlLabel,
    Radio,
    Button,
    Grid,
    FormControl,
    InputLabel,
    Typography,
    FormHelperText,
    Paper,
    CircularProgress
} from '@mui/material';
import { ENUM_CATEGORY } from '@/utils/utilsFunctions';
import styles from './CauseForm.module.scss';
import SnakeBarContext from '@/context/snakeBarContext';
import axios from 'axios';
import AuthContext from '@/context/authContext';
import { useRouter } from 'next/navigation';

const CreateCause = () => {

    const [isLoading, setIsLoading] = useState(true);
    const { handleOpenSnakeBar } = useContext(SnakeBarContext);
    const { userData } = useContext(AuthContext);
    const router = useRouter();
    // Form state
    const [formData, setFormData] = useState({
        title: '',
        description: '',
        quantity: '',
        singleItemPrice: '',
        category: '',
        impactLevel: 'Medium'
    });

    // Error state for validation
    const [errors, setErrors] = useState({});

    // Loading state for form submission
    const [isSubmitting, setIsSubmitting] = useState(false);

    // Handle input changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });

        // Clear error when user types
        if (errors[name]) {
            setErrors({
                ...errors,
                [name]: ''
            });
        }
    };

    // Validate the form
    const validateForm = () => {
        const newErrors = {};

        if (!formData.title.trim()) {
            newErrors.title = 'Title is required';
        }

        if (!formData.description.trim()) {
            newErrors.description = 'Description is required';
        }

        if (!formData.quantity) {
            newErrors.quantity = 'Quantity is required';
        } else if (isNaN(formData.quantity) || Number(formData.quantity) <= 0) {
            newErrors.quantity = 'Quantity must be a positive number';
        }

        if (!formData.singleItemPrice) {
            newErrors.singleItemPrice = 'Price is required';
        } else if (isNaN(formData.singleItemPrice) || Number(formData.singleItemPrice) <= 0) {
            newErrors.singleItemPrice = 'Price must be a positive number';
        }

        if (!formData.category) {
            newErrors.category = 'Category is required';
        }

        setErrors(newErrors);
        return Object.keys(newErrors).length === 0;
    };

    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        if (validateForm()) {

            try {
                setIsSubmitting(true);

                const response = await axios.post('/api/cause/create-cause', {
                    causeData: formData,
                    token: userData?.token
                });

                const createdCause = response.data.data;

                if (!createdCause) {
                    handleOpenSnakeBar("failed to create cause", "error");
                    return;
                }

                handleOpenSnakeBar('Cause created successfully', 'success');
                router.push(`/cause-creator/dashboard?causeId=${createdCause.id}`);

            } catch (error) {
                handleOpenSnakeBar(error.response.data.message, 'error');
            } finally {
                setIsSubmitting(false);
            }
        }
    };

    useEffect(() => {
        setIsLoading(false);
    }, []);

    if (isLoading) {
        return <div className={styles.loadingContainer}>
            <CircularProgress />
        </div>
    }

    return (
        <div className={styles.formContainer}>
            <Paper elevation={3} className={styles.formPaper}>
                <Typography variant="h4" component="h1" gutterBottom className={styles.formTitle}>
                    Create Cause
                </Typography>

                <form onSubmit={handleSubmit}>
                    <Grid container spacing={3}>
                        {/* Title Field */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <TextField
                                fullWidth
                                label="Title"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                error={!!errors.title}
                                helperText={errors.title}
                                variant="outlined"
                            />
                        </Grid>

                        {/* Description Field */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <TextField
                                fullWidth
                                label="Description"
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                error={!!errors.description}
                                helperText={errors.description}
                                variant="outlined"
                                multiline
                                rows={4}
                            />
                        </Grid>

                        {/* Quantity Field */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <TextField
                                fullWidth
                                label="Quantity"
                                name="quantity"
                                type="number"
                                value={formData.quantity}
                                onChange={handleChange}
                                error={!!errors.quantity}
                                helperText={errors.quantity}
                                variant="outlined"
                                inputProps={{ min: 1 }}
                            />
                        </Grid>

                        {/* Single Item Price Field */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <TextField
                                fullWidth
                                label="Single Item Price"
                                name="singleItemPrice"
                                type="number"
                                value={formData.singleItemPrice}
                                onChange={handleChange}
                                error={!!errors.singleItemPrice}
                                helperText={errors.singleItemPrice}
                                variant="outlined"
                                inputProps={{ min: 0, step: "0.01" }}
                            />
                        </Grid>

                        {/* Category Dropdown */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <FormControl fullWidth error={!!errors.category} variant="outlined">
                                <InputLabel id="category-label">Category</InputLabel>
                                <Select
                                    labelId="category-label"
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    label="Category"
                                >
                                    {ENUM_CATEGORY.map((category) => (
                                        <MenuItem key={category.value} value={category.value}>
                                            {category.label}
                                        </MenuItem>
                                    ))}
                                </Select>
                                {errors.category && <FormHelperText>{errors.category}</FormHelperText>}
                            </FormControl>
                        </Grid>

                        {/* Impact Level Radio Buttons */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Typography variant="subtitle1" gutterBottom>
                                Impact Level
                            </Typography>
                            <RadioGroup
                                row
                                name="impactLevel"
                                value={formData.impactLevel}
                                onChange={handleChange}
                            >
                                <FormControlLabel value="Low" control={<Radio />} label="Low" />
                                <FormControlLabel value="Medium" control={<Radio />} label="Medium" />
                                <FormControlLabel value="High" control={<Radio />} label="High" />
                            </RadioGroup>
                        </Grid>

                        {/* Submit Button */}
                        <Grid item xs={12} sx={{ width: '100%' }}>
                            <Button
                                type="submit"
                                variant="contained"
                                color="primary"
                                fullWidth
                                disabled={isSubmitting}
                                className={styles.submitButton}
                            >
                                {isSubmitting ? (
                                    <CircularProgress size={24} color="inherit" />
                                ) : (
                                    'CREATE CAUSE'
                                )}
                            </Button>
                        </Grid>
                    </Grid>
                </form>
            </Paper>
        </div>
    );
}

export default CreateCause;
