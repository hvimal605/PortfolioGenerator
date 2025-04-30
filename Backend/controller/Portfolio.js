const Portfolio = require("../models/Portfolio");
const Template = require("../models/Template");
const User = require("../models/User");
const { uploadImageToCloudinary } = require("../utils/imageUploadToCloudinary");


// exports.createPortfolio = async (req, res) => {
//   try {
//     const { templateId } = req.body;
//     const userId = req.user.id;

//     if (!userId || !templateId) {
//       return res.status(400).json({
//         success: false,
//         message: "All required fields must be provided.",
//       });
//     }

//     // Check if the provided templateId exists
//     const templateIdExist = await Template.findById(templateId);
//     if (!templateIdExist) {
//       return res.status(400).json({
//         success: false,
//         message: "Template not found."
//       });
//     }

//     // Create the portfolio with default values
//     const portfolio = await Portfolio.create({
//       userId,
//       templateId,
//       deployLink: "", // Default deploy link
//       profileImage: "", // Default profile image
//       skills: [],
//       resume: "", // Default resume
//       contactDetails: {
//         phone: "",
//         email: "", // Default email
//         address: "",
//       },
//       socialLinks: {
//         linkedIn: "",
//         github: "",
//         twitter: "",
//         personalWebsite: "",
//       },
//       projects: [],
//       softwareApplications: [],
//       timeline: [],
//     });

//     res.status(201).json({
//       success: true,
//       message: "Portfolio created successfully!",
//       portfolio,
//     });
//   } catch (error) {
//     console.error("Error creating portfolio:", error);
//     res.status(500).json({
//       success: false,
//       message: "Error creating portfolio.",
//     });
//   }
// };




// exports.addPortfolioDetails = async (req, res) => {
//   try {
//     // Validate file uploads
//     // if (!req.files || Object.keys(req.files).length === 0) {
//     //   return res.status(400).json({
//     //     success: false,
//     //     message: "Profile image and resume are required!",
//     //   });
//     // }

//     const avatar = req.files.avatar;
//     if(!avatar ){
//       return res.status(400).json({
//         success: false,
//         message: "Please provide avatar",
//       });
//     }

//     const resume = req.files.resume;
//     if(!resume ){
//       return res.status(400).json({
//         success: false,
//         message: "Please provide resume",
//       });
//     }
//     // Validate required fields from body
//     const { portfolioId,FirstName,LastName, phone, email, address, linkedIn, github, twitter, personalWebsite } = req.body;

//     if (!portfolioId || !email || !phone || !address) {
//       return res.status(400).json({
//         success: false,
//         message: "Please provide all required details: portfolioId, email, phone, and address.",
//       });
//     }

//     // Upload profile image to Cloudinary
//     const profileImageUpload = await uploadImageToCloudinary(
//       avatar,
//       process.env.FOLDER_NAME,
//       1000,
//       1000
//     );

//     // Upload resume to Cloudinary
//     const resumeUpload = await uploadImageToCloudinary(
//       resume,
//       process.env.FOLDER_NAME
//     );

//     const updatedPortfolio = await Portfolio.findByIdAndUpdate(
//       portfolioId,
//       {
//         profileImage: profileImageUpload.secure_url,
//         resume: resumeUpload.secure_url,
//         FirstName:FirstName,
//         LastName:LastName,
//         contactDetails: {
//           phone,
//           email,
//           address,
//         },
//         socialLinks: {
//           linkedIn,
//           github,
//           twitter,
//           personalWebsite,
//         },
//       },
//       { new: true }
//     );

//     if (!updatedPortfolio) {
//       return res.status(404).json({
//         success: false,
//         message: "Portfolio not found!",
//       });
//     }

//     return res.status(200).json({
//       success: true,
//       message: "Portfolio details updated successfully!",
//       portfolio: updatedPortfolio,
//     });
//   } catch (error) {
//     console.error("Error in updatePortfolioDetails:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Server error. Please try again later.",
//     });
//   }
// };

const { customAlphabet } = require("nanoid");
const Visitor = require("../models/Visitor");
const nanoid = customAlphabet("abcdefghijklmnopqrstuvwxyz1234567890", 4);

const generateUniqueSlug = async (FirstName) => {
  let slug;
  let isUnique = false;

  while (!isUnique) {
    let baseSlug = FirstName
      .toLowerCase()
      .trim()
      .replace(/[^a-z0-9\s]/g, "")   // Remove special chars except space
      .replace(/\s+/g, "-")          // Replace spaces with single dash
      .replace(/-+/g, "-")           // Remove multiple dashes

    baseSlug = baseSlug.replace(/^-+|-+$/g, ""); // Remove starting/ending dashes

    slug = `${baseSlug}-${nanoid()}`;

    const existingPortfolio = await Portfolio.findOne({ slug });
    if (!existingPortfolio) {
      isUnique = true;
    }
  }

  return slug;
};


exports.createPortfolio = async (req, res) => {
  try {
    let socialLinks = [];
    console.log("SOCIAL LINKS RAW BODY:", req.body.socialLinks);

    // Extract stringified array from req.body (FormData sends them as array of strings)
    if (req.body.socialLinks) {
      try {
        const links = Array.isArray(req.body.socialLinks)
          ? req.body.socialLinks
          : [req.body.socialLinks]; // In case there's only one item
    
        socialLinks = links.map((linkStr) => JSON.parse(linkStr));
      } catch (err) {
        return res.status(400).json({
          success: false,
          message: "Invalid format for socialLinks",
        });
      }
    }
    // Extract other necessary fields from the request body
    const { templateId, FirstName, LastName, phone, email, roles, aboutme } = req.body;
    const userId = req.user.id;

    // Validate required fields
    if (!userId || !templateId || !email || !phone) {
      return res.status(400).json({
        success: false,
        message: "All required fields must be provided.",
      });
    }

    // Handle avatar and resume file uploads...
    const avatar = req.files?.avatar;
    const resume = req.files?.resume;

    // Ensure avatar is present
    if (!avatar) {
      return res.status(400).json({
        success: false,
        message: "Profile image is required!",
      });
    }

    // Upload avatar to Cloudinary
    const profileImageUpload = await uploadImageToCloudinary(avatar, process.env.FOLDER_NAME, 1000, 1000);

    // Resume is optional
    let resumeUrl = "";
    if (resume) {
      const resumeUpload = await uploadImageToCloudinary(resume, process.env.FOLDER_NAME);
      resumeUrl = resumeUpload.secure_url;
    }

    // Ensure FirstName is provided for slug generation
    if (!FirstName) {
      return res.status(400).json({
        success: false,
        message: "FirstName is required to generate slug.",
      });
    }

    // Generate a unique slug for the portfolio
    const slug = await generateUniqueSlug(FirstName);

    // Create the portfolio in the database
    const portfolio = await Portfolio.create({
      userId,
      templateId,
      deployLink: "",
      profileImage: profileImageUpload.secure_url,
      resume: resumeUrl, // Optional resume
      skills: [], // Empty array for now
      FirstName,
      LastName,
      aboutme: aboutme || "",
      roles: roles || [],
      contactDetails: { phone, email },
      socialLinks: socialLinks.map(link => ({
        platform: link.label,
        url: link.url,
      })),
      projects: [], // Empty array for now
      softwareApplications: [], // Empty array for now
      timeline: [], // Empty array for now
      slug,
    });

    // Update the user document with the newly created portfolio
    await User.findByIdAndUpdate(userId, { $push: { portfolios: portfolio._id } });

    // Send a success response
    res.status(201).json({
      success: true,
      message: "Portfolio created successfully!",
      portfolio,
    });
  } catch (error) {
    // Log the error and send a server error response
    console.error("Error creating portfolio:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};




exports.updatePortfolioDetails = async (req, res) => {
  try {
    const {
      portfolioId,
      FirstName,
      LastName,
      phone,
      email,
      aboutme,
      roles, 
      socialLinks,
    } = req.body;
  
  
   
    let parsedSocialLinks = socialLinks;
    if (typeof socialLinks === 'string') {
      try {
        parsedSocialLinks = JSON.parse(socialLinks); 
      } catch (error) {
        console.error("Error parsing socialLinks:", error);
        return res.status(400).json({
          success: false,
          message: "Invalid socialLinks format.",
        });
      }
    }

   

    if (!portfolioId) {
      return res.status(400).json({
        success: false,
        message: "Portfolio ID is required.",
      });
    }

    // Fetch the portfolio
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found.",
      });
    }

   

    // Handle optional file uploads
    const avatar = req.files?.avatar;
    const resume = req.files?.resume;

    let profileImageUrl = portfolio.profileImage;
    let resumeUrl = portfolio.resume;

    if (avatar) {
      const profileImageUpload = await uploadImageToCloudinary(
        avatar,
        process.env.FOLDER_NAME,
        1000,
        1000
      );
      profileImageUrl = profileImageUpload.secure_url;
    }

    if (resume) {
      const resumeUpload = await uploadImageToCloudinary(
        resume,
        process.env.FOLDER_NAME
      );
      resumeUrl = resumeUpload.secure_url;
    }

    // Handle roles: support both array and comma-separated string
    const updatedRoles = Array.isArray(roles)
      ? roles
      : roles?.split(",").map((role) => role.trim());

    // Update portfolio fields
    portfolio.FirstName = FirstName || portfolio.FirstName;
    portfolio.LastName = LastName || portfolio.LastName;
    portfolio.profileImage = profileImageUrl;
    portfolio.resume = resumeUrl;
    portfolio.aboutme = aboutme || portfolio.aboutme;
    portfolio.roles = updatedRoles || portfolio.roles;

    // Update contact details
    portfolio.contactDetails = {
      phone: phone || portfolio.contactDetails.phone,
      email: email || portfolio.contactDetails.email,
    };

    // Compare the socialLinks to detect changes
    if (Array.isArray(parsedSocialLinks)) {
     
      const isSocialLinksChanged = JSON.stringify(parsedSocialLinks) !== JSON.stringify(portfolio.socialLinks);

      if (isSocialLinksChanged) {
        console.log("SocialLinks are different, updating...");

        portfolio.socialLinks = [...parsedSocialLinks]; // Reassign socialLinks to a new array
        portfolio.markModified("socialLinks"); // Mark the field as modified to trigger Mongoose update
      } else {
        console.log("SocialLinks are the same, no update needed.");
      }
    }

    console.log("Updated socialLinks to be saved:", portfolio.socialLinks);

    portfolio.updatedAt = new Date();

    const updatedPortfolio = await portfolio.save(); 

    res.status(200).json({
      success: true,
      message: "Portfolio updated successfully!",
      updatedPortfolio: updatedPortfolio,
    });
  } catch (error) {
    console.error("Error updating portfolio:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};


exports.getPortfolioDetailsById = async (req, res) => {
  try {
    const { portfolioId } = req.body;

    const portfolio = await Portfolio.findById(portfolioId)
      .populate("skills")
      .populate("projects")
      .populate("softwareApplications")
      .populate("timeline");

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Portfolio details fetched successfully",
      data: portfolio,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Error fetching portfolio details",
      error: error.message,
    });
  }
};

exports.getPortfolioBySlug = async (req, res) => {
  try {
    const { slug } = req.body;

    if (!slug) {
      return res.status(400).json({
        success: false,
        message: "Slug is required",
      });
    }

    // Find portfolio by slug
    const portfolio = await Portfolio.findOne({ slug })
      .populate("userId", "email")
      .populate("templateId")
      .populate("skills")
      .populate("projects")
      .populate("softwareApplications")
      .populate("timeline");

    if (!portfolio) {
      return res.status(404).json({
        success: false,
        message: "Portfolio not found",
      });
    }

    res.status(200).json({
      success: true,
      portfolio,
    });
  } catch (error) {
    console.error("Error fetching portfolio by slug:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};



exports.getPortfoliosForUser = async (req, res) => {
  try {
    const userId = req.user.id;

    if (!userId) {
      return res.status(400).json({
        success: false,
        message: "User not logged in.",
      });
    }

    // Fetch portfolios of the logged-in user
    const portfolios = await Portfolio.find({ userId });

    const total = portfolios.length;

    // Prepare output with essential info (add templateId too!)
    const portfolioList = portfolios.map((p) => ({
      portfolioId: p._id,
      createdAt: p.createdAt,
      templateId: p.templateId, // include this
      ...(p.deployLink && { deployLink: p.deployLink }), // include only if exists
    }));

    const completed = portfolioList.filter((p) => p.deployLink).length;
    const pending = total - completed;

    res.status(200).json({
      success: true,
      message: "Portfolios successfully fetched.",
      userId,
      totalPortfolios: total,
      completed,
      pending,
      portfolios: portfolioList,
    });
  } catch (err) {
    console.error(err);
    res.status(500).json({
      success: false,
      message: "Server error",
    });
  }
};


exports.trackVisitofPortfolio = async (req, res) => {





  try {
    const { slug, visitorId } = req.body;
    if (!visitorId) {
      return res.status(400).json({ message: "visitorId is required" });
    }
    const portfolio = await Portfolio.findOne({ slug });
    if (!portfolio) return res.status(404).json({ message: "Portfolio not found" });

    // Check if the visitor has already visited this portfolio
    const alreadyVisited = await Visitor.findOne({
      portfolioId: portfolio._id,
      visitorId
    });

    // If visitor hasn't been counted before, store their visit
    if (!alreadyVisited) {
      await Visitor.create({ portfolioId: portfolio._id, visitorId });

      // Increment both unique and total visitors if it's a new visitor
      await Portfolio.updateOne(
        { _id: portfolio._id },
        { $inc: { uniqueVisitors: 1, totalVisitors: 1 } }
      );
    } else {
      // If the visitor has already been recorded, just increment totalVisitors
      await Portfolio.updateOne(
        { _id: portfolio._id },
        { $inc: { totalVisitors: 1 } }
      );
    }

    res.status(200).json({ success: true, message: "Visit tracked" });

  } catch (error) {
    console.error("Visit track error:", error);
    res.status(500).json({ message: "Server error" });
  }
};



exports.getVisitorStats = async (req, res) => {
  try {
    const { portfolioId } = req.body;

    // 1. Validate Portfolio
    const portfolio = await Portfolio.findById(portfolioId);
    if (!portfolio) {
      return res.status(404).json({ success: false, message: "Portfolio not found" });
    }

    // 2. Get Total & Unique Visitors Directly from Portfolio Schema
    const totalVisitors = portfolio.totalVisitors; // Already stored in Portfolio
    const uniqueVisitors = portfolio.uniqueVisitors; // Already stored in Portfolio

    res.status(200).json({
      success: true,
      message: "Visitor stats fetched successfully.",
      totalVisitors,
      uniqueVisitors
    });
  } catch (err) {
    console.error("Error fetching visitor stats:", err);
    res.status(500).json({ success: false, message: "Server error" });
  }
};



exports.getallstats = async (req, res) => {
  try {
    const totalUsers = await User.countDocuments({ accountType: "User" });
    const totalDevelopers = await User.countDocuments({ accountType: "Developer" });
    const totalTemplates = await Template.countDocuments();
    const deployedPortfolios = await Portfolio.countDocuments({
      deployLink: { $exists: true, $ne: null, $ne: "" },
    });


    return res.status(200).json({
      success: true,
      message: "Dashboard stats fetched successfully",
      data: {
        totalUsers,
        totalDevelopers,
        totalTemplates,
        deployedPortfolios,
      },
    });
  } catch (error) {
    console.error("Error fetching admin stats:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch dashboard stats",
    });
  }
};

exports.getMonthlyUserDeveloperPortfolioStats = async (req, res) => {
  try {
    const currentYear = new Date().getFullYear();

    // Monthly User count (accountType: User)
    const monthlyUsers = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
          accountType: "User",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly Developer count (accountType: Developer)
    const monthlyDevelopers = await User.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
          accountType: "Developer",
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Monthly fully-created portfolios (having deployLink)
    const monthlyPortfolios = await Portfolio.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(`${currentYear}-01-01`),
            $lte: new Date(`${currentYear}-12-31`),
          },
          deployLink: { $exists: true, $ne: null, $ne: "" },
        },
      },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
    ]);

    // Combine all in a single response
    const result = Array.from({ length: 12 }, (_, i) => {
      const monthIndex = i + 1;

      const userEntry = monthlyUsers.find((u) => u._id === monthIndex);
      const devEntry = monthlyDevelopers.find((d) => d._id === monthIndex);
      const portfolioEntry = monthlyPortfolios.find((p) => p._id === monthIndex);

      return {
        month: new Date(currentYear, i).toLocaleString("default", { month: "short" }),
        users: userEntry ? userEntry.count : 0,
        developers: devEntry ? devEntry.count : 0,
        portfolios: portfolioEntry ? portfolioEntry.count : 0,
      };
    });

    return res.status(200).json({
      success: true,
      message: "Monthly stats fetched successfully",
      data: result,
    });
  } catch (err) {
    console.error("MONTHLY_STATS_FETCH_ERROR:", err);
    return res.status(500).json({
      success: false,
      message: "Failed to fetch monthly stats",
    });
  }
};


