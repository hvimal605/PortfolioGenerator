
const express = require("express")
const { auth, isAdmin, isUser } = require("../middlewares/auth")
const { createPortfolio, addPortfolioDetails, getPortfolioDetailsById, getPortfolioBySlug, getPortfoliosForUser, trackVisitofPortfolio, getVisitorStats, getallstats, getMonthlyUserDeveloperPortfolioStats, updatePortfolioDetails } = require("../controller/Portfolio")

const router = express.Router()





router.post("/createPortfolio",auth,isUser, createPortfolio)
router.put("/updatePorfolioDetails",auth,isUser, updatePortfolioDetails)
// router.post("/addPortfolioDetails",auth, addPortfolioDetails)
router.post("/getPortfolioFullDetails", getPortfolioDetailsById)
router.post("/portfoliodetailsBySlug", getPortfolioBySlug); 
router.get("/portfoliosForUser",auth , getPortfoliosForUser); 
router.post('/trackvisitofPortfolio', trackVisitofPortfolio);
router.post('/getPortfolioVisitorStats',auth ,isUser, getVisitorStats);
router.get("/getallstats",auth , isAdmin , getallstats)
router.get("/getMonthlyStats" , auth ,isAdmin , getMonthlyUserDeveloperPortfolioStats)

module.exports = router