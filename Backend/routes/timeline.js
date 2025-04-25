const express = require("express")
const { auth, isUser } = require("../middlewares/auth")
const { createTimeline, deleteTimeline, getAllTimeline } = require("../controller/timeline")



const router = express.Router()

router.post('/createTimeline',auth,isUser, createTimeline)
router.delete('/deleteTimeline',auth,isUser,deleteTimeline) 
router.get('/getAllTimeline',getAllTimeline) 

module.exports = router