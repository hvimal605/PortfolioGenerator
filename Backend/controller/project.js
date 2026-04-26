
const cloudinary = require('cloudinary');
const { uploadImageToCloudinary } = require('../utils/imageUploadToCloudinary');
const project = require('../models/Project');
const Portfolio = require('../models/Portfolio');

exports.addNewProject = async (req, res) => {
    try {

        if (!req.files || (!req.files.projectBanner && !req.files.projectBanners)) {
            return res.status(400).json({
                success: false,
                message: "At least one Project Image is required!"
            });
        }

        // Handle both legacy "projectBanner" and new "projectBanners" array
        let bannersInput = [];
        if (req.files.projectBanners) {
            bannersInput = Array.isArray(req.files.projectBanners)
                ? req.files.projectBanners
                : [req.files.projectBanners];
        } else if (req.files.projectBanner) {
            bannersInput = [req.files.projectBanner];
        }

        const {
            title,
            description,
            gitRepoLink,
            projectLink,
            technologies,
            deployed,
            portfolioId
        } = req.body;

        if (!title || !description || !gitRepoLink || !technologies) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details!"
            });
        }

        // Upload all banners
        const uploadedImages = await Promise.all(
            bannersInput.map(async (banner) => {
                const image = await uploadImageToCloudinary(
                    banner,
                    process.env.FOLDER_NAME,
                    1000,
                    1000
                );
                return {
                    public_id: image.public_id,
                    url: image.secure_url,
                };
            })
        );

        // Create a new project with the provided details
        const projectRes = await project.create({
            title,
            description,
            gitRepoLink,
            projectLink,
            technologies,
            deployed,
            projectBanner: uploadedImages[0], // Legacy support fallback
            projectBanners: uploadedImages,
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

        // Delete the project banner(s) from Cloudinary
        const imagesToDelete = [];
        if (projectRes.projectBanners && projectRes.projectBanners.length > 0) {
            projectRes.projectBanners.forEach(img => {
                if (img.public_id) imagesToDelete.push(img.public_id);
            });
        } else if (projectRes.projectBanner && projectRes.projectBanner.public_id) {
            imagesToDelete.push(projectRes.projectBanner.public_id);
        }

        // Deduplicate and destroy safely
        const uniqueImageIds = [...new Set(imagesToDelete)];
        if (uniqueImageIds.length > 0) {
            await Promise.all(uniqueImageIds.map(id => cloudinary.uploader.destroy(id)));
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
        const { projectId, retainedBanners } = req.body
        if (!projectId) {
            return res.status(400).json({
                success: false,
                message: "Please provide project id.",
            });
        }

        const projectRes = await project.findById(projectId);
        if (!projectRes) {
            return res.status(404).json({
                success: false,
                message: "Project not found",
            });
        }

        // Process existing banners: Identify which ones to keep vs delete
        let keptBanners = [];
        if (retainedBanners) {
            try {
                keptBanners = JSON.parse(retainedBanners);
            } catch (e) {
                console.error("Failed to parse retainedBanners:", e);
                keptBanners = projectRes.projectBanners || [];
            }
        } else {
            // Fallback for old clients: keep all if no new files, otherwise follow old logic (replace all)
            if (req.files && (req.files.projectBanner || req.files.projectBanners)) {
                keptBanners = []; // Old behavior: replace all if new ones provided
            } else {
                keptBanners = projectRes.projectBanners || [];
            }
        }

        // Identify images to delete from Cloudinary
        const existingIds = (projectRes.projectBanners || []).map(b => b.public_id);
        const keptIds = keptBanners.map(b => b.public_id);
        const idsToDelete = existingIds.filter(id => id && !keptIds.includes(id));

        if (idsToDelete.length > 0) {
            await Promise.all(idsToDelete.map(id => cloudinary.uploader.destroy(id)));
        }

        // Prepare new images
        let newUploadedBanners = [];
        if (req.files && (req.files.projectBanner || req.files.projectBanners)) {
            let bannersInput = [];
            if (req.files.projectBanners) {
                bannersInput = Array.isArray(req.files.projectBanners) 
                    ? req.files.projectBanners 
                    : [req.files.projectBanners];
            } else if (req.files.projectBanner) {
                bannersInput = [req.files.projectBanner];
            }

            newUploadedBanners = await Promise.all(
                bannersInput.map(async (banner) => {
                    const image = await uploadImageToCloudinary(
                        banner,
                        process.env.FOLDER_NAME,
                        1000,
                        1000
                    );
                    return {
                        public_id: image.public_id,
                        url: image.secure_url,
                    };
                })
            );
        }

        const finalBanners = [...keptBanners, ...newUploadedBanners];
        
        if (finalBanners.length === 0) {
            return res.status(400).json({
                success: false,
                message: "Maintenance Violation: At least one visual asset is mandatory for deployment."
            });
        }

        newProjectData.projectBanner = finalBanners[0];
        newProjectData.projectBanners = finalBanners;

        const updatedProject = await project.findByIdAndUpdate(
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
            message: "Intelligence Hub Updated Successfully!",
            projectRes: updatedProject,
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
            message: 'Internal Server Error. Failed to fetch project details'
        });
    }
};