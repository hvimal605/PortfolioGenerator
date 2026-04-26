const Portfolio = require("../models/Portfolio");
const logger = require("../utils/logger");

/**
 * @desc    Generate dynamic sitemap.xml
 * @route   GET /api/v1/seo/sitemap.xml
 */
exports.getSitemap = async (req, res) => {
    try {
        const portfolios = await Portfolio.find().select("slug updatedAt");
        
        const baseUrl = process.env.FRONTEND_URL || "https://portfolioshub.in";

        let xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
  <url>
    <loc>${baseUrl}</loc>
    <lastmod>${new Date().toISOString()}</lastmod>
    <changefreq>daily</changefreq>
    <priority>1.0</priority>
  </url>
  <url>
    <loc>${baseUrl}/templates</loc>
    <changefreq>weekly</changefreq>
    <priority>0.8</priority>
  </url>
  <url>
    <loc>${baseUrl}/portfolioCreate</loc>
    <changefreq>monthly</changefreq>
    <priority>0.7</priority>
  </url>`;

        // Add dynamic portfolios
        portfolios.forEach((p) => {
            if (p.slug) {
                xml += `
  <url>
    <loc>${baseUrl}/p/${p.slug}</loc>
    <lastmod>${new Date(p.updatedAt || Date.now()).toISOString()}</lastmod>
    <changefreq>weekly</changefreq>
    <priority>0.6</priority>
  </url>`;
            }
        });

        xml += `\n</urlset>`;

        res.header("Content-Type", "application/xml");
        res.status(200).send(xml);
    } catch (error) {
        logger.error("Sitemap Generation Error:", error);
        res.status(500).send("Error generating sitemap");
    }
};

/**
 * @desc    Generate dynamic robots.txt
 * @route   GET /api/v1/seo/robots.txt
 */
exports.getRobots = (req, res) => {
    const baseUrl = process.env.FRONTEND_URL || "https://portfolioshub.in";
    
    const robots = `User-agent: *
Allow: /
Allow: /p/
Disallow: /login
Disallow: /signup
Disallow: /admin
Disallow: /dashboard

Sitemap: ${baseUrl}/api/v1/seo/sitemap.xml`;

    res.header("Content-Type", "text/plain");
    res.status(200).send(robots);
};
