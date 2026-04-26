const { logger } = require('../utils/logger');

class ErrorHandler extends Error {
    constructor(message, statusCode) {
        super(message);
        this.statusCode = statusCode;
        this.status = `${statusCode}`.startsWith('4') ? 'fail' : 'error';
        this.isOperational = true;

        Error.captureStackTrace(this, this.constructor);
    }
}

const globalErrorHandler = (err, req, res, next) => {
    err.statusCode = err.statusCode || 500;
    err.status = err.status || 'error';

    // 🛡️ Pre-process specialized errors for Production to make them "Operational"
    if (process.env.NODE_ENV === 'production') {
        // 1. Mongoose Duplicate Key Error (e.g., Email already exists)
        if (err.code === 11000) {
            const value = err.errmsg.match(/(["'])(\\?.)*?\1/)[0];
            err = new ErrorHandler(`Duplicate field value: ${value}. Please use another value!`, 400);
        }
        // 2. Mongoose Validation Error
        if (err.name === 'ValidationError') {
            const errors = Object.values(err.errors).map(el => el.message);
            err = new ErrorHandler(`Invalid input data. ${errors.join('. ')}`, 400);
        }
        // 3. Invalid JWT Token
        if (err.name === 'JsonWebTokenError') {
            err = new ErrorHandler('Invalid token. Please log in again!', 401);
        }
        // 4. Expired JWT Token
        if (err.name === 'TokenExpiredError') {
            err = new ErrorHandler('Your token has expired! Please log in again.', 401);
        }
    }

    // 📓 Log every error to the professional Black Box
    logger.error(`ERROR 💥: ${err.message}`, {
        url: req.originalUrl,
        method: req.method,
        status: err.status,
        stack: err.stack,
    });

    if (process.env.NODE_ENV === 'development') {
        res.status(err.statusCode).json({
            status: err.status,
            error: err,
            message: err.message,
            stack: err.stack,
        });
    } else if (process.env.NODE_ENV === 'production') {
        // Operational, trusted error: send message to client
        if (err.isOperational) {
            res.status(err.statusCode).json({
                status: err.status,
                message: err.message,
            });
        } 
        // Programming or other unknown error: don't leak error details
        else {
            res.status(500).json({
                status: 'error',
                message: 'Internal Server Error. Please contact support.',
            });
        }
    }
};

module.exports = { ErrorHandler, globalErrorHandler };
