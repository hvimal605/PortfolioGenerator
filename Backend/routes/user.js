
const express = require("express")
const { sendOTP, signup, login, changePassword, updateProfile, deleteAccount, updateDisplayPicture } = require("../controller/Auth")
const { auth } = require("../middlewares/auth")
const { googleSignup, googleLogin } = require("../controller/googleAuth")
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword")
const router = express.Router()





router.post("/sendotp", sendOTP)
router.post("/signup", signup)
router.post("/login", login)
router.post("/changePassword", auth , changePassword)
router.post("/google-signup",googleSignup)
router.post("/google-login",googleLogin)
router.put("/updateProfile",auth,updateProfile)
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

module.exports = router