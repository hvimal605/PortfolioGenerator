
const express = require("express")
const { isAdmin, auth, isDeveloper } = require("../middlewares/auth")
const { createNewTemplate, getAllTemplates, getTemplateById, deleteTemplate, toggleTemplateStatus, updateTemplate, createDeveloperTemplateRequest, reviewDeveloperTemplate, getDeveloperRequestedTemplates, getDeveloperTemplateStats, getDeveloperTemplateUsageStats, getMonthlyRequestedTemplates, getTopUsedTemplates, getAllRequestedTemplates } = require("../controller/Template")
const router = express.Router()



router.post("/createTemplate", auth ,isAdmin, createNewTemplate)
router.get("/getAllTemplate", getAllTemplates)
router.post("/getTemplateById",getTemplateById)
router.delete("/deleteTemplate",auth , isAdmin, deleteTemplate)
router.post("/toggleTemplateStatus",auth , isAdmin , toggleTemplateStatus)
router.put("/updateTemplate",auth , isAdmin , updateTemplate)
router.post("/createDeveloperTemplateRequest",auth,isDeveloper, createDeveloperTemplateRequest)
router.post("/reviewDevTemplate",auth,isAdmin,reviewDeveloperTemplate)

router.get("/getDevReqTemplates",auth,isDeveloper,getDeveloperRequestedTemplates)
router.get("/getDevTemplateStats",auth,isDeveloper,getDeveloperTemplateStats)
router.get("/getDevTemplateUsage",auth,isDeveloper,getDeveloperTemplateUsageStats)
router.get("/getMonthlyReqTemplates",auth,isDeveloper,getMonthlyRequestedTemplates)
router.get("/getTopUsedTemplates",auth,isAdmin,getTopUsedTemplates)
router.get("/getAllReqTemplates",auth,isAdmin,getAllRequestedTemplates)
module.exports = router