const { v4: uuidv4 } = require("uuid");
const axios = require("axios");
const fs = require("fs");
const path = require("path");
const https = require("https"); 

const Portfolio = require("../models/Portfolio");

exports.createSite = async (req, res) => {
    try {
        // Generate a unique name for the site using the current timestamp
        const uniqueName = `my-new-site-${Date.now()}`;

        const response = await axios.post(
            "https://api.netlify.com/api/v1/sites",
            {
                name: uniqueName,  // Use the unique site name
                // custom_domain: "www.example.com", // Optional: Set a custom domain (if needed)
                // password: "yourpassword", // Optional: Password protect the site (if needed)
                // force_ssl: true, // Optional: Force SSL (set to true if you want SSL enabled)
                processing_settings: {
                    html: { pretty_urls: true }, // Optional: Enable pretty URLs
                },
            },
            {
                headers: {
                    Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`, // Replace with your Netlify access token
                },
            }
        );

        console.log("Site created successfully:", response.data);

        // Send the site data as a response to the client
        res.status(200).json({
            success: true,
            message: "Site created successfully",
            data: response.data, // Site information returned by Netlify API
        });
    } catch (error) {
        console.error("Error creating site:", error.response ? error.response.data : error.message);

        // Send an error response if the creation fails
        res.status(500).json({
            success: false,
            message: "Error creating site",
            error: error.response ? error.response.data : error.message,
            stack: error.stack, // Optionally include the error stack for more detailed debugging
        });
    }
};

exports.deployPortfolio = async (req, res) => {
    try {
        const { TemplateLink , PortfolioId } = req.body;
        
        if (!TemplateLink) {
            return res.status(400).json({ message: "Cloudinary ZIP file URL is required." });
        }

        // Validate the URL protocol
        if (!TemplateLink.startsWith('https://')) {
            return res.status(400).json({ message: "Invalid URL protocol. Please use https://" });
        }

        if (!PortfolioId) {
            return res.status(400).json({ message: "Portfolio ID is required." });
        }

        const portfolio = await Portfolio.findById(PortfolioId);
        if (!portfolio) {
            return res.status(404).json({ message: "Portfolio not found." });
        }

        const { slug } = portfolio;


        // Download the ZIP file from Cloudinary
        const zipFileName = `${Date.now()}-${uuidv4()}.zip`;
        const zipPath = path.join(__dirname, zipFileName);

        const fileStream = fs.createWriteStream(zipPath);
        https.get(TemplateLink, (response) => {
            response.pipe(fileStream);

            fileStream.on('finish', async () => {
                console.log("ZIP file downloaded successfully.");

                // Upload the ZIP file to Netlify
                try {
                    const deployResponse = await axios.post(
                        `https://api.netlify.com/api/v1/sites/${process.env.NETLIFY_SITE_ID}/deploys`,
                        fs.createReadStream(zipPath),
                        {
                            headers: {
                                Authorization: `Bearer ${process.env.NETLIFY_ACCESS_TOKEN}`,
                                "Content-Type": "application/zip",
                            },
                        }
                    );

                    // console.log("ye hai deployResponse",deployResponse.data.links.alias)

                    // Clean up local ZIP file after deployment
                    fs.unlinkSync(zipPath);

                    const PortfolioIdUpdate = await Portfolio.findByIdAndUpdate(PortfolioId,

                        {deployLink:`${deployResponse.data.links.alias}/${slug}`},
                        {new:true}
                    )

                    return res.status(200).json({
                        message: "Portfolio deployed successfully!",
                        deployLink: `${deployResponse.data.links.alias}/${slug}`,
                    });
                } catch (uploadError) {
                    console.error("Error uploading to Netlify:", uploadError);
                    return res.status(500).json({ message: "Error uploading to Netlify", error: uploadError });
                }
            });

            fileStream.on('error', (error) => {
                console.error("Error downloading ZIP file:", error);
                res.status(500).json({ message: "Error downloading ZIP file", error });
            });
        });

    } catch (error) {
        console.error("Error deploying to Netlify:", error);
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