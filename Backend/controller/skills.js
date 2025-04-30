const Portfolio = require("../models/Portfolio");
const skill = require("../models/skill");
const { uploadImageToCloudinary } = require("../utils/imageUploadToCloudinary");
const cloudinary = require("cloudinary")


exports.addSkill = async (req, res) => {
    try {
        if (!req.files || !req.files.skillSvg) {
            return res.status(400).json({
                success: false,
                message: "SVG is required!"
            });
        }

        const { skillSvg } = req.files;
        const { title, portfolioId } = req.body;

        if (!title ) {
            return res.status(400).json({
                success: false,
                message: "Please fill all the details !"
            });
        }

        const image = await uploadImageToCloudinary(
            skillSvg,
            process.env.FOLDER_NAME,
            1000,
            1000
        );

        const SkillRes = await skill.create({
            title,
           
            svg: {
                public_id: image.public_id,
                url: image.secure_url,
            },
        });

        const portfolio = await Portfolio.findByIdAndUpdate(
            portfolioId,
            { $push: { skills: SkillRes._id } },
            { new: true }
        );

        res.status(201).json({
            success: true,
            message: "New Skill Added!",
            SkillRes,
            portfolio
        });

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while adding a Skill'
        });
    }
};

exports.deleteSkill = async (req, res) => {
    try {
        const { Skillid ,portfolioId } = req.body;
        let skillRes = await skill.findById(Skillid);
        if (!skillRes) {
            return res.status(400).json({
                success: false,
                message: "aleredy delete or not exist"
            });
        }
        const skillSvgId = skillRes.svg.public_id;
        await cloudinary.uploader.destroy(skillSvgId);
        await skillRes.deleteOne();

        const portfolio = await Portfolio.findByIdAndUpdate(
                    portfolioId,
                    { $pull: { skills: Skillid } },
                    { new: true }
                );


        res.status(200).json({
            success: true,
            message: "Skill Deleted!",
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while delteing skill'
        });

    }
}

exports.updateSkill = async (req, res) => {
    try {
        const { skillId } = req.body;

        let skillDetail = await skill.findById(skillId);
        if (!skillDetail) {
            return res.status(400).json({
                success: false,
                message: "Skill not found"
            });
        }

        const updateData = {  };

        // Handle image update if provided
        if (req.files && req.files.svg) {
            const svgFile = req.files.svg;

            // Delete old image from Cloudinary
            if (skillDetail.svg && skillDetail.svg.public_id) {
                await cloudinary.uploader.destroy(skillDetail.svg.public_id);
            }

            // Upload new image
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

        // Update skill
        skillDetail = await skill.findByIdAndUpdate(skillId, updateData, {
            new: true,
        });

        return res.status(200).json({
            success: true,
            message: "Skill updated!",
            skillDetail,
        });

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Something went wrong while updating skill",
        });
    }
};


exports.getAllSkill = async (req, res) => {
    try {
        const skills = await skill.find();
        res.status(200).json({
            success: true,
            skills,
        });
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something went wrong while getting all skill'
        });

    }
}