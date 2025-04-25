const express = require("express")
const { addNewApplication, deleteApplication, getAllSoftwareApplication, updateSoftwareApp } = require("../controller/softwareApplication")
const { auth, isUser } = require("../middlewares/auth")



const router = express.Router()

router.post('/addsoftwareApplication',auth,isUser,addNewApplication)
router.delete('/deletesoftwareApplication',auth,isUser,deleteApplication)
router.get('/getAllSoftwareApplication',getAllSoftwareApplication)
router.put('/updateSoftwareApplication',auth ,isUser, updateSoftwareApp)
module.exports = router