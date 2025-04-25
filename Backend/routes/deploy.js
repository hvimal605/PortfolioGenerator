const express = require("express");
const router = express.Router();

const { auth, isUser } = require("../middlewares/auth");
const {   updatelink,  deployPortfolio,} = require("../controller/deploy");










router.post("/deployPortfolio", auth , isUser, deployPortfolio );
router.patch("/updatelink", auth , updatelink);
// router.post("/createSite",auth , createSite)


module.exports = router;
