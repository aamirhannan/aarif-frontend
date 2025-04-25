import Joi from 'joi';

// Define roles constants
export const ROLES = {
    CAUSE_POSTER: 'CAUSE_POSTER',
    SPONSOR: 'SPONSOR',
    PUBLIC: 'PUBLIC'
};

// Signup form validation schema
export const signupSchema = Joi.object({
    name: Joi.string().trim().required().messages({
        'string.empty': 'Name is required',
        'any.required': 'Name is required'
    }),
    mobNumber: Joi.string().pattern(/^[0-9]{10}$/).required().messages({
        'string.empty': 'Mobile number is required',
        'string.pattern.base': 'Mobile number should be 10 digits',
        'any.required': 'Mobile number is required'
    }),
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid',
        'any.required': 'Email is required'
    }),
    password: Joi.string().min(6).required().messages({
        'string.empty': 'Password is required',
        'string.min': 'Password must be at least 6 characters',
        'any.required': 'Password is required'
    }),
    confirmPassword: Joi.string().valid(Joi.ref('password')).required().messages({
        'string.empty': 'Please confirm your password',
        'any.only': 'Passwords do not match',
        'any.required': 'Please confirm your password'
    }),
    role: Joi.string().valid(...Object.values(ROLES)).required().messages({
        'string.empty': 'Role is required',
        'any.only': 'Please select a valid role',
        'any.required': 'Role is required'
    })
});

// Login form validation schema
export const loginSchema = Joi.object({
    email: Joi.string().email({ tlds: { allow: false } }).required().messages({
        'string.empty': 'Email is required',
        'string.email': 'Email is invalid',
        'any.required': 'Email is required'
    }),
    password: Joi.string().required().messages({
        'string.empty': 'Password is required',
        'any.required': 'Password is required'
    })
});

// Validation function that returns errors in the format expected by the form
export const validateForm = (data, schema) => {
    const { error } = schema.validate(data, { abortEarly: false });

    // Initialize empty errors object
    const errors = {};

    if (error) {
        // Process each validation error and add to the errors object
        error.details.forEach((detail) => {
            const key = detail.path[0];
            errors[key] = detail.message;
        });
        return { isValid: false, errors };
    }

    return { isValid: true, errors };
}; 