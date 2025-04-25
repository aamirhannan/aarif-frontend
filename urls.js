export const BACKEND_URL = process.env.NODE_ENV === 'PROD'
    ? process.env.BACKEND_URL
    : "http://localhost:5000";
export const FRONTEND_URL = process.env.NODE_ENV === 'PROD'
    ? process.env.FRONTEND_URL
    : "http://localhost:3000";
