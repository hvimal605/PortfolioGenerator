
const express = require("express")
const { sendOTP, signup, login, changePassword, updateProfile, deleteAccount, updateDisplayPicture, getUserDetails } = require("../controller/Auth")
const { auth } = require("../middlewares/auth")
const { googleSignup, googleLogin } = require("../controller/googleAuth")
const { resetPasswordToken, resetPassword } = require("../controller/ResetPassword")
const router = express.Router()





const validateSchema = require("../middlewares/validationMiddleware")
const { signupSchema, loginSchema } = require("../validators/authValidator")

router.post("/sendotp", sendOTP)
router.post("/signup", validateSchema(signupSchema), signup)
router.post("/login", validateSchema(loginSchema), login)
router.post("/changePassword", auth , changePassword)
router.post("/google-signup",googleSignup)
router.post("/google-login",googleLogin)
router.get("/getUserDetails", auth, getUserDetails)
router.put("/updateProfile",auth,updateProfile)
router.delete("/deleteProfile", auth, deleteAccount)
router.put("/updateDisplayPicture", auth, updateDisplayPicture)
router.post("/reset-password-token", resetPasswordToken)
router.post("/reset-password", resetPassword)

module.exports = router