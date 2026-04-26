// Import the required modules
const express = require("express");
const { capturePayment, verifyPayment } = require("../controller/Payment");
const { auth, isUser } = require("../middlewares/auth");
const router = express.Router()


router.post("/capturePayment", auth, isUser, capturePayment)
router.post("/verifyPayment",auth, isUser, verifyPayment)


module.exports = router