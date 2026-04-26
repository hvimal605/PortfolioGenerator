require("express-async-errors");
const express = require("express")
const app = express();
const userRoutes = require("./routes/user")
const templateRoutes = require("./routes/template")
const timelineRoutes = require("./routes/timeline")
const portfolioRoutes = require("./routes/portfolio")
const deployRoutes = require("./routes/deploy")
const skillRoutes = require("./routes/skills")
const projectRoutes = require("./routes/Project")
const messageRoutes = require("./routes/message")
const paymentRoutes = require("./routes/Payment")
const softwareApplicationRoutes = require("./routes/softwareApplication")
const seoRoutes = require("./routes/seo")
const platformContactRoutes = require("./routes/platformContact")
const aiRoutes = require("./routes/resumeConvert")
const database = require("./config/database")
const cookieParser = require("cookie-parser");
const cors = require('cors')
const { cloudinaryConnect } = require('./config/cloudinary')
const fileUpload = require("express-fileupload")
const dotenv = require("dotenv")  
const helmet = require("helmet")  
const mongoSanitize = require("express-mongo-sanitize")
const hpp = require("hpp")
const morgan = require("morgan")
const compression = require("compression")
const rateLimit = require("express-rate-limit")
const xss = require("xss-clean")
const logger = require("./utils/logger")
const validateEnv = require("./utils/validateEnv")

dotenv.config()
validateEnv() // 🛡️ Fail-fast if .env is incomplete

const Port = process.env.PORT || 4000


database.connect()

// 🛡️ Global Security Hardening
app.use(helmet()) // Secure HTTP Headers
app.use(mongoSanitize()) // Prevent NoSQL Injection
app.use(xss()) // Prevent XSS Attacks
app.use(hpp()) // Prevent HTTP Parameter Pollution

// 🚀 Performance & Logging
app.use(compression()) // Gzip Compression
app.use(morgan(process.env.NODE_ENV === "production" ? "combined" : "dev")) // Professional logging

// 🛑 Global Rate Limiting (DDoS Protection)
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 200, // Limit each IP to 100 requests per window
    message: "Too many requests from this IP, please try again after 15 minutes",
    standardHeaders: true,
    legacyHeaders: false,
})
app.use("/api/", limiter)

// 🛡️ Stricter Rate Limiting for Auth
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 60, // Lower limit for auth endpoints
    message: "Too many login attempts, please try again after 15 minutes",
}) 
app.use("/api/v1/auth", authLimiter)

app.use(express.json({ limit: "10kb" })) // Body limit to prevent large JSON attacks
app.use(cookieParser())

const allowedOrigins = process.env.ALLOWED_ORIGINS?.split(",") || ["http://localhost:5173", "http://localhost:3000"]
app.use(
    cors({
        origin: (origin, callback) => {
            // Allow requests with no origin (like mobile apps or curl requests)
            if (!origin) return callback(null, true);
            
            // Check if origin is in the explicitly allowed list or ends with .netlify.app
            const isAllowed = allowedOrigins.indexOf(origin) !== -1 || origin.endsWith(".netlify.app");
            
            if (isAllowed) {
                return callback(null, true);
            } else {
                return callback(new Error("The CORS policy for this site does not allow access from the specified Origin."), false);
            }
        },
        credentials: true,
    })
)


  


app.use(express.urlencoded({ extended: true }));

app.use(
    fileUpload({
        useTempFiles: true,
        tempFileDir: "/tmp/",
        limits: { fileSize: 5 * 1024 * 1024 }, 
        abortOnLimit: true,
    })
)

cloudinaryConnect()

app.use("/api/v1/auth", userRoutes)
app.use("/api/v1/template", templateRoutes)
app.use("/api/v1/timeline", timelineRoutes)
app.use("/api/v1/portfolio", portfolioRoutes)
app.use("/api/v1/skill", skillRoutes)
app.use("/api/v1/softwareApplication",softwareApplicationRoutes)
app.use("/api/v1/project",projectRoutes)
app.use("/api/v1/deploy",deployRoutes)
app.use("/api/v1/message",messageRoutes)
app.use("/api/v1/payment",paymentRoutes)
app.use("/api/v1/seo", seoRoutes)
app.use("/api/v1/contact", platformContactRoutes)
app.use("/api/v1/ai", aiRoutes)


const { globalErrorHandler } = require("./middlewares/errorMiddleware")
app.use(globalErrorHandler)

app.get("/health", (req, res) => {
    res.status(200).json({
        status: "success",
        message: "Server is healthy",
        timestamp: new Date().toISOString(),
        uptime: process.uptime(),
    });
});

app.get("/", (req, res) => {
    return res.json({ 
        success: true,
        message: 'Your server is up and running....'
    });
})

const server = app.listen(Port, () => {
    logger.info(`🚀 Server is running on port ${Port}`);
})

// 🛑 Graceful Shutdown Handler
process.on("SIGTERM", () => {
    logger.info("SIGTERM received. Starting graceful shutdown...");
    server.close(() => {
        logger.info("Process terminated. Closing database connection...");
        database.disconnect();
        process.exit(0);
    });
});

process.on("SIGINT", () => {
    logger.info("SIGINT received. Starting graceful shutdown...");
    server.close(() => {
        logger.info("Process terminated. Closing database connection...");
        database.disconnect();
        process.exit(0);
    });
});

