const Portfolio = require("../models/Portfolio");
const softwareApplication = require("../models/softwareApplication");
const { uploadImageToCloudinary } = require("../utils/imageUploadToCloudinary");
const cloudinary = require("cloudinary")




exports.addNewApplication = async (req, res) => {
    try {
        if (!req.files || !req.files.applicationSvg) {
            return res.status(400).json({
                success: false,
                message: "SVG is required!"
            });
        }

        const { applicationSvg } = req.files;
        const { name, portfolioId } = req.body;

        if (!name) {
            return res.status(400).json({
                success: false,
                message: "Name is required!"
            });
        }

        const image = await uploadImageToCloudinary(
            applicationSvg,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const softwareApplicationRes = await softwareApplication.create({
            name,
            svg: {
                public_id: image.public_id,
                url: image.secure_url,
            },
        });

        const portfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $push: { softwareApplications: softwareApplicationRes._id } },
            { new: true }
        );


        res.status(201).json({
            success: true,
            message: "New Software Application Added!",
            softwareApplicationRes,
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding a new application'
        });
    }
};

exports.deleteApplication = async (req, res) => {
    try {
        const { applicationId , portfolioId } = req.body;
        let softwareApplicationRes = await softwareApplication.findById(applicationId);
        if (!softwareApplicationRes) {
            return res.status(400).json({
                success: false,
                message: "aleredy delete or not exist"
            });
        }
        const softwareApplicationSvgId = softwareApplicationRes.svg.public_id;
        await cloudinary.uploader.destroy(softwareApplicationSvgId);
        await softwareApplicationRes.deleteOne();

        const portfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $pull: { softwareApplications: applicationId } },
            { new: true }
        );


        res.status(200).json({
            success: true,
            message: "Software Application Deleted!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while delteing application'
        });

    }
}

exports.updateSoftwareApp = async (req, res) => {
    try {
        const { softwareId, name } = req.body;

        // Find the software app by ID
        let softwareAppDetail = await softwareApplication.findById(softwareId);
        if (!softwareAppDetail) {
            return res.status(400).json({
                success: false,
                message: "Software application not found",
            });
        }

        const updateData = { name };

        // Handle image update if provided
        if (req.files && req.files.svg) {
            const svgFile = req.files.svg;

            // Delete old image from Cloudinary if exists
            if (softwareAppDetail.svg && softwareAppDetail.svg.public_id) {
                await cloudinary.uploader.destroy(softwareAppDetail.svg.public_id);
            }

            // Upload new image to Cloudinary
            const uploadedImage = await uploadImageToCloudinary(
                svgFile,
                process.env.FOLDER_NAME,
                1000,
                1000
            );

            updateData.svg = {
                public_id: uploadedImage.public_id,
                url: uploadedImage.secure_url,
            };
        }

        // Update the software application
        softwareAppDetail = await softwareApplication.findByIdAndUpdate(softwareId, updateData, {
            new: true,
        });

        return res.status(200).json({
            success: true,
            message: "Software application updated successfully!",
            softwareAppDetail,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating the software application",
        });
    }
};

exports.getAllSoftwareApplication = async (req, res) => {
    try {
        const softwareApplicationsRes = await softwareApplication.find();
        res.status(200).json({
            success: true,
            softwareApplicationsRes,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getall application'
        });

    }
}