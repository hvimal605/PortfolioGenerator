const mongoose = require("mongoose");

const portfolioSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  templateId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Template",
    required: true,
  },
  deployLink: {
    type: String,

  },
  FirstName: {
    type: String,
    required: true,
  },
  LastName: {
    type: String
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
  updatedAt: {
    type: Date,
    default: Date.now,
  },

  // Portfolio Details
  profileImage: {
    type: String,

  },
  aboutme: {
    type: String,

  },
  roles: {
    type: [String],
    default: [],
  },


  skills: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Skill",
    },
  ],
  resume: {
    type: String,

  },
  contactDetails: {
    phone: {
      type: String,

    },
    email: {
      type: String,

    },
    
  },
  // socialLinks: {
  //   linkedIn: {
  //     type: String,

  //   },
  //   github: {
  //     type: String,

  //   },
  //   twitter: {
  //     type: String,

  //   },
  //   personalWebsite: {
  //     type: String,

  //   },

  // },


  socialLinks: [
    {
      platform: {
        type: String,
        // required: true,
      },
      url: {
        type: String,
        // required: true,
      },
    },
  ],
  
  projects: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Project",
    },
  ],
  softwareApplications: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "SoftwareApplication",
    },
  ],
  timeline: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "Timeline",
    },
  ],
  slug: {
    type: String,
    unique: true,
    required: true
  },

  totalVisitors: {
    type: Number,
    default: 0,
  },
  uniqueVisitors: {
    type: Number,
    default: 0,
  },
  messages: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: "Message",
  }],
  emailNotifications: {
    type: Boolean,
    default: true
  }



});








module.exports = mongoose.model("Portfolio", portfolioSchema);
