// Helper function for consistent error responses
export const errorResponse = (res, statusCode, message) => {
    return res.status(statusCode).json({ error: message });
};

// Helper function for consistent success responses
export const successResponse = (res, statusCode, data, message = '') => {
    return res.status(statusCode).json({ message, data });
};