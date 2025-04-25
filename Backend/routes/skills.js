const express = require("express")
const { addSkill, deleteSkill, updateSkill, getAllSkill } = require("../controller/skills")
const { auth, isUser } = require("../middlewares/auth")




const router = express.Router()

router.post('/addSkill',auth,isUser,addSkill)
router.delete('/deleteSkill',auth,isUser,deleteSkill)
router.put('/updateSkill',auth,isUser,updateSkill)
router.get('/getAllSkills',getAllSkill)
module.exports = router