const express = require("express");
const router = express.Router();
const { auth, isUser } = require("../middlewares/auth");
const { convertResumeToPortfolio, getAIUsageStats } = require("../controller/ResumeAIController");

// Route to convert PDF resume to structured portfolio JSON
router.post("/convert-resume", auth, isUser, convertResumeToPortfolio);

// Route to get AI usage stats
router.get("/usage-stats", auth, isUser, getAIUsageStats);

module.exports = router;
