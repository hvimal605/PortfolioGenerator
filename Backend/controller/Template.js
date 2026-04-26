const Template = require("../models/Template");
const DeveloperTemplateRequest = require("../models/TemplateReqByDev");
const Portfolio = require("../models/Portfolio");

// exports.createNewTemplate = async (req, res) => {
//     try {
//         const {
//             name,
//             description,
//             previewUrl,
//             supportedColors = [],
//             layoutType = "Single Page",
//             fields
//         } = req.body;

//         // Validate required fields
//         if (!name || !description || !previewUrl) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Name, description, and preview URL are required.",
//             });
//         }

//         if (!fields || !Array.isArray(fields) || fields.length === 0) {
//             return res.status(400).json({
//                 success: false,
//                 message: "Fields array is required and must contain at least one field.",
//             });
//         }

//         // Validate layoutType
//         const validLayoutTypes = ["Single Page", "Multi Page", "Dark Theme", "Light Theme", "Minimal"];
//         if (!validLayoutTypes.includes(layoutType)) {
//             return res.status(400).json({
//                 success: false,
//                 message: `Invalid layout type. Supported values are: ${validLayoutTypes.join(", ")}.`,
//             });
//         }

//         // Create new template
//         const newTemplate = new Template({
//             name,
//             description,
//             previewUrl,
//             supportedColors,
//             layoutType,
//             fields,
//         });

//         const savedTemplate = await newTemplate.save();

//         // Success response
//         return res.status(201).json({
//             success: true,
//             message: "Template created successfully.",
//             template: savedTemplate,
//         });
//     } catch (error) {
//         console.error(error);
//         return res.status(500).json({
//             success: false,
//             message: "Failed to create template. Please try again later.",
//         });
//     }
// };

const unzipper = require("unzipper");
const cloudinary = require("cloudinary").v2;
const fs = require("fs");
const path = require("path");
const { uploadImageToCloudinary } = require("../utils/imageUploadToCloudinary");
const User = require("../models/User");
const mailSender = require("../utils/mailSender");
const templateApprovedMail = require("../mail/templates/TemplateApprovalEmail");
const templateRejectedMail = require("../mail/templates/TemplateRejection");
const templateReceivedMail = require("../mail/templates/TemplateRecieveMail");




//  Upload extracted files to Cloudinary
async function uploadExtractedFiles(tempDir, cloudinaryFolder) {
  const uploadedUrls = [];
  const files = fs.readdirSync(tempDir);

  for (const file of files) {
    const filePath = path.join(tempDir, file);
    if (fs.lstatSync(filePath).isFile()) {
      const result = await cloudinary.uploader.upload(filePath, {
        resource_type: "auto",
        folder: cloudinaryFolder,
      });
      uploadedUrls.push(result.secure_url);
    }
  }

  return uploadedUrls;
}

// Create a new template with uploaded ZIP file logic
exports.createNewTemplate = async (req, res) => {
  try {
    const {
      name,
      description,
      previewUrl,
      CreatedBy,
      
    } = req.body;

    if (!req.files || !req.files.previewImg) {
      return res.status(400).json({
          success: false,
          message: "Template Preview  Image Required!"
      });
  }
    const { previewImg } = req.files;
    // Validate required fields
    if (!name || !description || !previewUrl) {
      return res.status(400).json({
        success: false,
        message: "Name, description, and preview URL are required.",
      });
    }

    

   

    // Check if a file is uploaded
    if (!req.files || !req.files.file) {
      return res.status(400).json({
        success: false,
        message: "No ZIP file uploaded.",
      });
    }

    // Create temporary directory to extract ZIP contents
    const tempDir = path.join(__dirname, "temp");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    // Get the uploaded file
    const uploadedFile = req.files.file;
    const zipFilePath = path.join(tempDir, "uploaded.zip");

    // Save the uploaded ZIP file to disk
    uploadedFile.mv(zipFilePath, async (err) => {
      if (err) {
        console.error("Error saving file:", err);
        return res.status(500).json({
          success: false,
          message: "Error saving ZIP file.",
        });
      }

      // Extract the ZIP contents
      fs.createReadStream(zipFilePath)
        .pipe(unzipper.Extract({ path: tempDir }))
        .promise()
        .then(async () => {
          const cloudinaryFolder = process.env.FOLDER_NAME_ZIP_FILE; 

          // Upload extracted files to Cloudinary
          const uploadedUrls = await uploadExtractedFiles(
            tempDir,
            cloudinaryFolder
          );

          // Clean up temporary files
          fs.rmSync(tempDir, { recursive: true, force: true });

          // Use the first uploaded URL as the template link
          const templateLink = uploadedUrls[0];
        
          const image = await uploadImageToCloudinary(
                      previewImg,
                      process.env.FOLDER_NAME,
                      1000,
                      10001
                  ); 
          // Create new template
          const newTemplate = new Template({
            name,
            description,
            previewUrl,
           
            TemplateLink: templateLink,
            previewImage:image.secure_url,
            CreatedBy
          });

          const savedTemplate = await newTemplate.save();

          // Success response
          return res.status(201).json({
            success: true,
            message: "Template created successfully.",
            template: savedTemplate,
          });
        })
        .catch((error) => {
          console.error("Error extracting ZIP file:", error);
          res.status(500).json({
            success: false,
            message: "Error extracting ZIP file.",
          });
        });
    });
  } catch (error) {
    console.error("Error creating template:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create template. Please try again later.",
    });
  }
};


exports.getAllTemplates = async (req, res) => {
  try {
      const templates = await Template.find()
          .populate("CreatedBy", "firstName lastName email image accountType"); // Include only required fields

      return res.status(200).json({
          success: true,
          message: "Templates fetched successfully.",
          templates,
      });
  } catch (error) {
      console.error(error);
      return res.status(500).json({
          success: false,
          message: "Failed to fetch templates.",
      });
  }
};



exports.getTemplateById = async (req, res) => {
    try {
        const { templateid } = req.body;
        const template = await Template.findById(templateid);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Template fetched successfully.",
            template,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to fetch template.",
        });
    }
};

exports.deleteTemplate = async (req, res) => {
    try {
        const { templateid } = req.body;
        if (!templateid) {
            return res.status(404).json({
                success: false,
                message: "Template id required.",
            });
        }

        const deletedTemplate = await Template.findByIdAndDelete(templateid);

        if (!deletedTemplate) {
            return res.status(404).json({
                success: false,
                message: "Template not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Template deleted successfully.",
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to delete template.",
        });
    }
};

exports.toggleTemplateStatus = async (req, res) => {
    try {
        const { templateId } = req.body;

        const template = await Template.findById(templateId);

        if (!template) {
            return res.status(404).json({
                success: false,
                message: "Template not found.",
            });
        }

        template.isActive = !template.isActive;
        await template.save();

        return res.status(200).json({
            success: true,
            message: `Template is now ${template.isActive ? "active" : "inactive"}.`,
            template,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to toggle template status.",
        });
    }
};

exports.updateTemplate = async (req, res) => {
    try {
        const { templateId, name, description, previewUrl, isActive } = req.body;

        if (!templateId) {
            return res.status(400).json({ success: false, message: "Template id required." });
        }

        // ✅ SECURITY: Exclude sensitive billing fields from mass update
        // These should only be updated via dedicated administrative routes if needed.
        const updateData = {};
        if (name !== undefined) updateData.name = name;
        if (description !== undefined) updateData.description = description;
        if (previewUrl !== undefined) updateData.previewUrl = previewUrl;
        if (isActive !== undefined) updateData.isActive = isActive;

        const updatedTemplate = await Template.findByIdAndUpdate(
            templateId, 
            updateData, 
            { new: true }
        );

        if (!updatedTemplate) {
            return res.status(404).json({
                success: false,
                message: "Template not found.",
            });
        }

        return res.status(200).json({
            success: true,
            message: "Template updated successfully.",
            template: updatedTemplate,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Failed to update template.",
        });
    }
};




exports.createDeveloperTemplateRequest = async (req, res) => {
  try {
    const { name, description } = req.body;
    const { zipFile } = req.files;
    const createdBy = req.user.id;

    if (!zipFile || !name || !description ) {
      return res.status(400).json({
        success: false,
        message: "All fields (ZIP file, name, description, previewUrl) are required.",
      });
    }

    // Temp dir
    const tempDir = path.join(__dirname, "../temp-upload");
    if (!fs.existsSync(tempDir)) fs.mkdirSync(tempDir);

    const zipPath = path.join(tempDir, "uploaded.zip");

    zipFile.mv(zipPath, async (err) => {
      if (err) {
        console.error("ZIP save error:", err);
        return res.status(500).json({ success: false, message: "Error saving ZIP file." });
      }

      // Extract and upload
      fs.createReadStream(zipPath)
        .pipe(unzipper.Extract({ path: tempDir }))
        .promise()
        .then(async () => {
          const uploadedUrls = await uploadExtractedFiles(
            tempDir,
            process.env.FOLDER_NAME_ZIP_FILE_dev
          );

          fs.rmSync(tempDir, { recursive: true, force: true });

          const request = await DeveloperTemplateRequest.create({
            name,
            description,
            
            uploadedUrl: uploadedUrls[0], // Use the first file as entry point
            createdBy,
          });
          
          await User.findByIdAndUpdate(
            createdBy,
            { $push: { requestedTemplate: request._id } },
            { new: true }
          );
          
          const user =await User.findById(createdBy);
          const devEmail = user.email;
          const devName = user.firstName + " " +  user.lastName;
           await mailSender(devEmail ,  "🎨 Template Submission Received!",templateReceivedMail(devName ,name))

          res.status(201).json({
            success: true,
            message: "Template request submitted successfully!",
            request,
          });
        })
        .catch((error) => {
          console.error("Extraction error:", error);
          return res.status(500).json({ success: false, message: "ZIP extraction failed." });
        });
    });
  } catch (error) {
    console.error("Template Request Error:", error);
    res.status(500).json({ success: false, message: "Server error." });
  }
};


exports.reviewDeveloperTemplate = async (req, res) => {
  try {
    const { templateId } = req.body;
    const { action } = req.body; 

    if (!["Approved", "Rejected"].includes(action)) {
      return res.status(400).json({
        success: false,
        message: "Action must be either 'Approved' or 'Rejected'.",
      });
    }

    // Find the request
    const request = await DeveloperTemplateRequest.findById(templateId);
    if (!request) {
      return res.status(404).json({ success: false, message: "Request not found." });
    }

    // Update the request
    request.status = action;
    request.reviewedAt = new Date();
    await request.save();

    if (action == "Approved") {
      const devId = request.createdBy;
      
     const developer = await User.findById(devId);  // 👈 Add await
     const DevEmail = developer.email;
     const devName = developer.firstName + " " + developer.lastName;
      const templateName = request.name;

      await mailSender(DevEmail, "🎉 Your Template is Approved!", templateApprovedMail(devName,templateName));
    
    }

    if (action == "Rejected") {
      const devId = request.createdBy;
      
     const developer = await User.findById(devId);  // 👈 Add await
     const DevEmail = developer.email;
     const devName = developer.firstName + " " + developer.lastName;
      const templateName = request.name;

      await mailSender(DevEmail, "😔 Your Template is  Rejected !", templateRejectedMail(devName,templateName));
    
    }
    

   

    return res.status(200).json({
      success: true,
      message: `Template request ${action.toLowerCase()} successfully.`,
  
    });

  } catch (error) {
    console.error("Review template error:", error);
    return res.status(500).json({ success: false, message: "Server error." });
  }
};

exports.getDeveloperRequestedTemplates = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "requestedTemplate",
        model: "DeveloperTemplateRequest",
      })
      .select("requestedTemplate");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      templates: user.requestedTemplate,
    });
  } catch (error) {
    console.error("Error fetching developer templates:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching templates.",
    });
  }
};


exports.getDeveloperTemplateStats = async (req, res) => {
  try {
    const userId = req.user.id;

    const user = await User.findById(userId)
      .populate({
        path: "requestedTemplate",
        model: "DeveloperTemplateRequest",
        select: "status createdAt name", 
      })
      .select("requestedTemplate");

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const templates = user.requestedTemplate;

    // Count templates by status
    const total = templates.length;
    const approved = templates.filter(t => t.status === "Approved").length;
    const pending = templates.filter(t => t.status === "Pending").length;
    const rejected = templates.filter(t => t.status === "Rejected").length;

    // Calculate Month-over-Month Growth for total sumbissions
    const now = new Date();
    const currentMonth = now.getMonth();
    const currentYear = now.getFullYear();
    const previousMonth = currentMonth === 0 ? 11 : currentMonth - 1;
    const previousYear = currentMonth === 0 ? currentYear - 1 : currentYear;

    let currentMonthCount = 0;
    let previousMonthCount = 0;

    templates.forEach(template => {
        const tempDate = new Date(template.createdAt);
        const tempMonth = tempDate.getMonth();
        const tempYear = tempDate.getFullYear();

        if (tempYear === currentYear && tempMonth === currentMonth) {
            currentMonthCount++;
        } else if (tempYear === previousYear && tempMonth === previousMonth && tempDate.getDate() <= now.getDate()) {
            previousMonthCount++;
        }
    });

    let growthPercentage = 0;
    if (previousMonthCount === 0) {
        growthPercentage = currentMonthCount > 0 ? 100 : 0;
    } else {
        growthPercentage = ((currentMonthCount - previousMonthCount) / previousMonthCount) * 100;
    }

    // Get 5 most recent submissions
    const recentActivity = [...templates]
      .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt))
      .slice(0, 5);

    res.status(200).json({
      success: true,
      data: {
        total,
        approved,
        pending,
        rejected,
        growthPercentage: parseFloat(growthPercentage.toFixed(1)),
        recentActivity
      },
    });
  } catch (error) {
    console.error("Error fetching developer template stats:", error);
    res.status(500).json({
      success: false,
      message: "Server error while fetching template stats.",
    });
  }
};

exports.getDeveloperTemplateUsageStats = async (req, res) => {
  try {
    const userId = req.user.id;

    // Get all templates created by this dev (Approved & added by admin)
    const templates = await Template.find({CreatedBy: userId });

    // console.log("ye dekh lete h ",templates)

    // Map through each and count how many portfolios used it
    const stats = await Promise.all(
      templates.map(async (template) => {
        const count = await Portfolio.countDocuments({ templateId: template._id });

        return {
          templateId: template._id,
          name: template.name,
          usageCount: count,
        };
      })
    );

    res.status(200).json({ success: true, stats });
  } catch (err) {
    console.error("Error getting usage stats:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};



exports.getMonthlyRequestedTemplates = async (req, res) => {
  try {
    const userId = req.user.id;
    const startOfYear = new Date(new Date().getFullYear(), 0, 1);

    const templates = await DeveloperTemplateRequest.find({
      createdBy: userId,
      createdAt: { $gte: startOfYear },
    });

    const monthlyData = Array(12).fill(0);

    templates.forEach((template) => {
      const month = new Date(template.createdAt).getMonth();
      monthlyData[month]++;
    });

    const monthNames = [
      "January", "February", "March", "April", "May", "June",
      "July", "August", "September", "October", "November", "December"
    ];

    const response = monthNames.map((month, index) => ({
      month,
      count: monthlyData[index],
    }));

    res.status(200).json({ success: true, data: response });
  } catch (err) {
    console.error("Error fetching monthly requested templates:", err);
    res.status(500).json({ success: false, message: "Server Error" });
  }
};




exports.getTopUsedTemplates = async (req, res) => {
  try {
    const result = await Template.aggregate([
      {
        $project: {
          name: 1,
          previewImage: 1,
          usageCount: { $size: { $ifNull: ["$usage", []] } },
        },
      },
      { $sort: { usageCount: -1 } },
      { $limit: 5 },
    ]);

    return res.status(200).json({
      success: true,
      message: "Top 5 templates fetched",
      data: result,
    });
  } catch (err) {
    console.error(err);
    return res.status(500).json({
      success: false,
      message: "Error fetching templates",
    });
  }
};



exports.getAllRequestedTemplates = async (req, res) => {
  try {
    const templates = await DeveloperTemplateRequest.find()
      .sort({ createdAt: -1 }) // Latest first
      .select("_id name description  uploadedUrl createdBy status createdAt reviewedAt")
      .populate("createdBy", "_id firstName lastName")


    res.status(200).json({ success: true, templates });
  } catch (error) {
    console.error("Error fetching requested templates:", error);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.getPurchasedTemplates = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not logged in.",
      });
    }

    // Fetch user and populate purchased templates
    const user = await User.findById(userId)
      .populate({
        path: "purchasedTemplates",
        select: "name description price previewImage previewUrl CreatedBy",
        populate: {
          path: "CreatedBy",
          select: "firstName lastName email",
        },
      })
      .exec();

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    const purchasedTemplates = user.purchasedTemplates || [];
    const total = purchasedTemplates.length;

    return res.status(200).json({
      success: true,
      message:
        total > 0
          ? "Purchased templates fetched successfully."
          : "No purchased templates found.",
      total,
      userId: user._id,
      templates: purchasedTemplates,
    });
  } catch (err) {
    console.error("❌ Error fetching purchased templates:", err);
    return res.status(500).json({
      success: false,
      message: "Server error while fetching purchased templates.",
    });
  }
};
