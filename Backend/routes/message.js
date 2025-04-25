const express = require("express")
const { sendMessage, getMessagesByPortfolioId, deleteMessageByIdForPortfolio, toggleEmailNotifications } = require("../controller/message")
const { auth, isUser } = require("../middlewares/auth")




const router = express.Router()
router.post('/sendMessage' , sendMessage)
router.post('/getAllMessages',auth, isUser ,getMessagesByPortfolioId)
router.delete('/deleteMessage',auth ,isUser, deleteMessageByIdForPortfolio)
router.post("/toggleEmailNotification",auth ,isUser, toggleEmailNotifications)

module.exports = router