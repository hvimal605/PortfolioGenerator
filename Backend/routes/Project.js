const express = require("express")
const { auth, isUser } = require("../middlewares/auth")
const { addNewProject, deleteProject, upadteProject, getAllProject, getSingleProject } = require("../controller/project")





const validateSchema = require("../middlewares/validationMiddleware")
const { addProjectSchema, updateProjectSchema } = require("../validators/projectValidator")

const router = express.Router()

router.post('/addProject', auth, isUser, validateSchema(addProjectSchema), addNewProject)
router.delete('/deleteProject', auth, isUser, deleteProject)
router.put('/updateProject', auth, isUser, validateSchema(updateProjectSchema), upadteProject)
router.get('/getAllProject', getAllProject)
router.post('/getSingleProject',getSingleProject)

module.exports = router