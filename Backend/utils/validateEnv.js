const logger = require('./logger');

const requiredEnvVars = [
    'PORT',
    'MONGODB_URL',
    'JWT_SECRET',
    'FOLDER_NAME',
    'CLOUD_NAME',
    'API_KEY',
    'API_SECRET',
    'MAIL_HOST',
    'MAIL_USER',
    'MAIL_PASS',
    'RAZORPAY_KEY',
    'RAZORPAY_SECRET',
    'ALLOWED_ORIGINS',
    'NODE_ENV',
    'FRONTEND_URL'
];

const validateEnv = () => {
    const missingVars = [];
    requiredEnvVars.forEach((envVar) => {
        if (!process.env[envVar]) {
            missingVars.push(envVar);
        }
    });

    if (missingVars.length > 0) {
        logger.error(`❌ CRITICAL: Missing required environment variables: ${missingVars.join(', ')}`);
        logger.error(`Please ensure these are set in your .env file before starting the server.`);
        process.exit(1);
    }

    // 🔍 Extra Validation for Critical Vars
    if (process.env.MONGODB_URL && !process.env.MONGODB_URL.startsWith('mongodb')) {
        logger.error('❌ CRITICAL: MONGODB_URL must start with "mongodb://" or "mongodb+srv://"');
        process.exit(1);
    }

    if (process.env.NODE_ENV === 'production' && process.env.ALLOWED_ORIGINS === '*') {
        logger.warn('⚠️ SECURITY: ALLOWED_ORIGINS is set to "*" in production. This is highly discouraged.');
    }

    logger.info('✅ Environment variables validated successfully.');
};

module.exports = validateEnv;
