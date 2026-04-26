const express = require("express");
const router = express.Router();
const { getSitemap, getRobots } = require("../controller/seo");

router.get("/sitemap.xml", getSitemap);
router.get("/robots.txt", getRobots);

module.exports = router;
