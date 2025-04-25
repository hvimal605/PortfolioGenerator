const express = require("express")
const { auth, isUser } = require("../middlewares/auth")
const { addNewProject, deleteProject, upadteProject, getAllProject, getSingleProject } = require("../controller/project")





const router = express.Router()

router.post('/addProject',auth,isUser,addNewProject)
router.delete('/deleteProject',auth,isUser,deleteProject )
router.put('/updateProject',auth,isUser,upadteProject)
router.get('/getAllProject',getAllProject)
router.post('/getSingleProject',getSingleProject)

module.exports = router