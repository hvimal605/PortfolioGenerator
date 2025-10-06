const axios = require("axios");
const https = require("https");
const fs = require("fs");
const path = require("path");
const { v4: uuidv4 } = require("uuid");
const { customAlphabet } = require("nanoid");
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 4);
const Portfolio = require("../models/Portfolio");

const Template = require("../models/Template");
const mailSender = require("../utils/mailSender");
const User = require("../models/User");
const portfolioDeployedTemplate = require("../mail/templates/portfolioDeployedTemplate");

const checkNetlifySiteAvailability = async (slug) => {
    try {
        await axios.get(`https://${slug}.netlify.app`);
        return false; // Site exists
    } catch (error) {
        return true; // Site is available
    }
};




// exports.deployPortfolio = async (req, res) => {
//     try {
//         const { templateId, PortfolioId } = req.body;
//         const userId = req.user.id;

//         if (!templateId || !PortfolioId) {
//             return res.status(400).json({ message: "templateId and PortfolioId are required." });
//         }

//         // Fetch template details
//         const template = await Template.findById(templateId);
//         if (!template || !template.TemplateLink) {
//             return res.status(404).json({ message: "Template not found or missing TemplateLink." });
//         }

//         const TemplateLink = template.TemplateLink;

//         // Check if Portfolio exists
//         let portfolio = await Portfolio.findById(PortfolioId);
//         if (!portfolio) {
//             return res.status(404).json({ message: "Portfolio not found." });
//         }

//         let { slug } = portfolio;

//         // Step 1: Check if original slug is available
//         if (!(await checkNetlifySiteAvailability(slug))) {
//             const baseSlug = slug.replace(/-\w{4}$/, "").replace(/-+$/, ""); // Clean suffix & trailing dashes
//             let uniqueSlug = `${baseSlug}-${nanoid(4)}`;

//             while (!(await checkNetlifySiteAvailability(uniqueSlug))) {
//                 uniqueSlug = `${baseSlug}-${nanoid(4)}`;
//             }
//             slug = uniqueSlug;
//         }

//         // Step 2: Create a new Netlify site with the available slug
//         const createSiteResponse = await axios.post(
//             "https://api.netlify.com/api/v1/sites",
//             { name: slug },
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
//                 },
//             }
//         );

//         const siteId = createSiteResponse.data.id;
//         let netlifySiteUrl = createSiteResponse.data.url;

//         // Force HTTPS if the URL is HTTP
//         if (netlifySiteUrl && netlifySiteUrl.startsWith("http://")) {
//             netlifySiteUrl = netlifySiteUrl.replace("http://", "https://");
//         }

//         // Step 3: Stream download from Cloudinary and directly upload to Netlify
//         const cloudinaryStream = await axios({
//             method: 'get',
//             url: TemplateLink,
//             responseType: 'stream',
//         });

//         await axios.post(
//             `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
//             cloudinaryStream.data,
//             {
//                 headers: {
//                     Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
//                     "Content-Type": "application/zip",
//                 },
//             }
//         );

//         // Step 4: Update portfolio with new Netlify URL & unique slug
//         portfolio = await Portfolio.findByIdAndUpdate(
//             PortfolioId,
//             { deployLink: netlifySiteUrl, slug },
//             { new: true }
//         );

//         const user = await User.findById(userId);
//         const userName = user.firstName + " " + user.lastName;
//         const userEmail = user.email;

//         await mailSender(
//             userEmail,
//             `Successfully Deployed the Portfolio`,
//             portfolioDeployedTemplate(userName, netlifySiteUrl)
//         );

//         await Template.findByIdAndUpdate(
//             templateId,
//             { $addToSet: { usage: userId } }
//         );

//         return res.status(200).json({
//             success: true,
//             message: "Portfolio deployed successfully!",
//             deployLink: netlifySiteUrl,
//             newSlug: slug,
//         });

//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({ message: "Deployment failed", error });
//     }
// };

 
const waitForSiteReady = async (deployId, siteUrl) => {
    const maxAttempts = 12;
    let attempts = 0;

    console.log(` Waiting for deployment to be ready...`);

    // Step 1: Check deployment state
    while (attempts < maxAttempts) {
        const deployStatus = await axios.get(
            `https://api.netlify.com/api/v1/deploys/${deployId}`,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
                },
            }
        );

        const state = deployStatus.data.state;
        console.log(` Attempt ${attempts + 1}: Deployment state is "${state}"`);

        if (state === "ready") {
            console.log(` Deployment is ready!`);
            break;
        }

        await new Promise(resolve => setTimeout(resolve, 5000)); // Wait 5 sec
        attempts++;
    }

    // Step 2: Check actual URL availability
    console.log(` Verifying if site is live: ${siteUrl}`);
    let urlAttempts = 0;
    while (urlAttempts < maxAttempts) {
        try {
            const response = await axios.get(siteUrl);
            if (response.status === 200) {
                console.log(` Site is live and accessible!`);
                return true;
            }
        } catch (error) {
            console.log(` Attempt ${urlAttempts + 1}: Site not live yet...`);
        }

        await new Promise(resolve => setTimeout(resolve, 3000)); // Wait 3 sec
        urlAttempts++;
    }

    console.log(` Site not accessible after deployment.`);
    throw new Error("Site is not live even after deployment ready.");
};


exports.deployPortfolio = async (req, res) => {
    try {
        const { templateId, PortfolioId } = req.body;
        const userId = req.user.id;

        if (!templateId || !PortfolioId) {
            return res.status(400).json({ message: "templateId and PortfolioId are required." });
        }

        // Fetch template details
        const template = await Template.findById(templateId);
        if (!template || !template.TemplateLink) {
            return res.status(404).json({ message: "Template not found or missing TemplateLink." });
        }

        const TemplateLink = template.TemplateLink;

        // Fetch portfolio
        let portfolio = await Portfolio.findById(PortfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found." });
        }

        let { slug } = portfolio;

        // Step 1: Check if slug is available
        if (!(await checkNetlifySiteAvailability(slug))) {
            const baseSlug = slug.replace(/-\w{4}$/, "").replace(/-+$/, "");
            let uniqueSlug = `${baseSlug}-${nanoid(4)}`;

            while (!(await checkNetlifySiteAvailability(uniqueSlug))) {
                uniqueSlug = `${baseSlug}-${nanoid(4)}`;
            }
            slug = uniqueSlug;
        }

        // Step 2: Create new Netlify site
        const createSiteResponse = await axios.post(
            "https://api.netlify.com/api/v1/sites",
            { name: slug },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
                },
            }
        );

        const siteId = createSiteResponse.data.id;
        let netlifySiteUrl = createSiteResponse.data.url;

        if (netlifySiteUrl && netlifySiteUrl.startsWith("http://")) {
            netlifySiteUrl = netlifySiteUrl.replace("http://", "https://");
        }

        // Step 3: Stream download from Cloudinary and deploy to Netlify
        const cloudinaryStream = await axios({
            method: 'get',
            url: TemplateLink,
            responseType: 'stream',
        });

        const deployResponse = await axios.post(
            `https://api.netlify.com/api/v1/sites/${siteId}/deploys`,
            cloudinaryStream.data,
            {
                headers: {
                    Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
                    "Content-Type": "application/zip",
                },
            }
        );

        const deployId = deployResponse.data.id;

        // Step 4: Wait for deployment to be ready
        await waitForSiteReady(deployId ,netlifySiteUrl);

        // Step 5: Update Portfolio with deployLink and slug
        portfolio = await Portfolio.findByIdAndUpdate(
            PortfolioId,
            { deployLink: netlifySiteUrl, slug },
            { new: true }
        );

        // Step 6: Send deployment email
        const user = await User.findById(userId);
        const userName = user.firstName + " " + user.lastName;
        const userEmail = user.email;

        // await mailSender(
        //     userEmail,
        //     `Successfully Deployed the Portfolio`,
        //     portfolioDeployedTemplate(userName, netlifySiteUrl)
        // );

        // Step 7: Update Template usage
        await Template.findByIdAndUpdate(
            templateId,
            { $addToSet: { usage: userId } }
        );

        return res.status(200).json({
            success: true,
            message: "Portfolio deployed successfully!",
            deployLink: netlifySiteUrl,
            newSlug: slug,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Deployment failed", error });
    }
};




const NETLIFY_API_BASE = "https://api.netlify.com/api/v1/sites";
const NETLIFY_ACCESS_TOKEN = process.env.NETLIFY_ACCESS_TOKEN;
const NETLIFY_SITE_ID = process.env.NETLIFY_SITE_ID;

exports.updatelink = async (req, res) => {
    const { newSubdomain } = req.body;

    if (!newSubdomain) {
        return res.status(400).json({ error: "New subdomain is required" });
    }

    try {
        const response = await axios.patch(
            `${NETLIFY_API_BASE}/${NETLIFY_SITE_ID}`,
            { name: newSubdomain }, // Update the site name (subdomain)
            {
                headers: {
                    Authorization: `Bearer ${NETLIFY_ACCESS_TOKEN}`,
                    "Content-Type": "application/json",
                },
            }
        );

        res.json({
            message: "Subdomain updated successfully",
            newURL: `https://${newSubdomain}.netlify.app`,
            data: response.data,
        });
    } catch (error) {
        res.status(500).json({
            error: "Failed to update subdomain",
            details: error.response?.data || error.message,
        });
    }
};