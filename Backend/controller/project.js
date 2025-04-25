
const cloudinary = require('cloudinary');
const { uploadImageToCloudinary } = require('../utils/imageUploadToCloudinary');
const project = require('../models/Project');
const Portfolio = require('../models/Portfolio');

exports.addNewProject = async (req, res) => {
    try {

        if (!req.files || !req.files.projectBanner) {
            return res.status(400).json({
                success: false,
                message: "Project Banner Image Required!"
            });
        }

        const { projectBanner } = req.files;
        const {
            title,
            description,
            gitRepoLink,
            projectLink,

            technologies,
            deployed,
            portfolioId

        } = req.body;

        console.log("dekhe ky NHI ARAH H ", title,
            description,
            gitRepoLink,
            projectLink,

            technologies,
            portfolioId)

        if (
            !title ||
            !description ||
            !gitRepoLink ||
            !projectLink ||

            !technologies
        ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details!"
            });
        }

        const image = await uploadImageToCloudinary(
            projectBanner,
            process.env.FOLDER_NAME,
            1000,
            100
        );

        // Create a new project with the provided details
        const projectRes = await project.create({
            title,
            description,
            gitRepoLink,
            projectLink,

            technologies,
            deployed,
            projectBanner: {
                public_id: image.public_id,
                url: image.secure_url,
            },
        });

        const portfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $push: { projects: projectRes._id } },
            { new: true }
        );


        res.status(201).json({
            success: true,
            message: "New Project Added!",
            projectRes,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding a Project'
        });
    }
};



exports.deleteProject = async (req, res) => {
    try {
        const { ProjectId, portfolioId } = req.body;

        // Validate inputs
        if (!ProjectId || !portfolioId) {
            return res.status(400).json({
                success: false,
                message: "ProjectId and portfolioId are required",
            });
        }

        const projectRes = await project.findById(ProjectId);
        if (!projectRes) {
            return res.status(404).json({
                success: false,
                message: "Project not found or already deleted",
            });
        }

        // Delete the project banner from Cloudinary (only if exists)
        const projectImageId = projectRes.projectBanner?.public_id;
        if (projectImageId) {
            await cloudinary.uploader.destroy(projectImageId);
        }

        // Delete the project document
        await projectRes.deleteOne();

        // Update the portfolio document
        await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $pull: { projects: ProjectId } },
            { new: true }
        );

        return res.status(200).json({
            success: true,
            message: "Project deleted successfully!",
        });
    } catch (error) {
        console.error("Error deleting project:", error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while deleting the project",
        });
    }
};



exports.upadteProject = async (req, res) => {
    try {
        const newProjectData = {
            title: req.body.title,
            description: req.body.description,

            technologies: req.body.technologies,

            projectLink: req.body.projectLink,
            gitRepoLink: req.body.gitRepoLink,
        };
        const { projectId } = req.body
        if (!projectId) {
            return res.status(400).json({
                success: true,
                message: "Please give project id.",

            });
        }
        if (req.files && req.files.projectBanner) {
            const projectBanner = req.files.projectBanner;
            const projectRes = await project.findById(projectId);
            const projectImageId = projectRes.projectBanner.public_id;
            await cloudinary.uploader.destroy(projectImageId);
            const newProjectImage = await uploadImageToCloudinary(
                projectBanner,
                process.env.FOLDER_NAME,
                1000,
                1000
            );
            newProjectData.projectBanner = {
                public_id: newProjectImage.public_id,
                url: newProjectImage.secure_url,
            };
        }
        const projectRes = await project.findByIdAndUpdate(
            projectId,
            newProjectData,
            {
                new: true,
                runValidators: true,
                useFindAndModify: false,
            }
        );
        res.status(200).json({
            success: true,
            message: "Project Updated!",
            projectRes,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while update a Project'
        });
    }
};


exports.getAllProject = async (req, res) => {
    try {
        const projects = await project.find();
        res.status(200).json({
            success: true,
            projects,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getAll  Project'
        });
    }
};


exports.getSingleProject = async (req, res) => {
    try {
        const { projectId } = req.body;
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Please provide project Id."
            })
        }
        const projectRes = await project.findById(projectId);
        if (!projectRes) {
            return res.status(400).json({
                success: false,
                message: "Proejct not found."
            })
        }
        res.status(200).json({
            success: true,
            projectRes,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while get single Project'
        });
    }
};