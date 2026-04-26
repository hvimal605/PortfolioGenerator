const mongoose = require("mongoose")
require("dotenv").config()

const logger = require("../utils/logger");

exports.connect = () => {
    mongoose.connect(process.env.MONGODB_URL, {
        maxPoolSize: 10,
        serverSelectionTimeoutMS: 5000,
        socketTimeoutMS: 45000,
    })
    .then(() => {
        logger.info('🐘 MongoDB connected successfully');
    }).catch((error) => {
        logger.error('❌ MongoDB connection failed', { error: error.message });
        process.exit(1);
    });
}

exports.disconnect = () => {
    mongoose.disconnect()
    .then(() => {
        logger.info('🐘 MongoDB disconnected successfully');
    })
    .catch((error) => {
        logger.error('❌ MongoDB disconnection failed', { error: error.message });
    });
}