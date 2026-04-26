const mongoose = require("mongoose");
const bcrypt = require("bcrypt");

const UserSchema = new mongoose.Schema({
	firstName: {
		type: String,
		required: true,
		trim: true,
		index: true,
	},
	lastName: {
		type: String,
		required: true,
		trim: true,
		index: true,
	},
    email: {
        type: String,
        required: true,
        unique: true,
        lowercase: true,
        trim: true,
    },
    password: {
        type: String,
        required: function () {
            return !this.googleAuth;
        },
    }
    ,
    about: {
        type: String,
    },
    accountType: {
        type: String,
        enum: ['Admin', 'User', 'Developer'],
        required: true,
    },
    portfolios: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Portfolio",

    }],
     // 💸 For premium templates / payments later
    purchasedTemplates: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",
      },
    ],
    deployLink: {
        type: String,

    },
    selectedTemplate: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Template",

    },
    requestedTemplate: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: "DeveloperTemplateRequest",

    }],
    image: {
        type: String,
        required: true,

    },
    googleAuth: {
        type: Boolean,
        default: false,
    },

    token: {
        type: String,
        index: true,
    },
    resetPasswordToken: {
        type: String,
        index: true,
    },
    resetPasswordExpires: {
        type: Date,
    },
    createdAt: {
        type: Date,
        default: Date.now,
    },
    updatedAt: {
        type: Date,
        default: Date.now,
    },
    aiResumeUsageCount: {
        type: Number,
        default: 0
    },
    aiResumeUsageResetTime: {
        type: Date,
        default: null
    }
});


module.exports = mongoose.model("User", UserSchema);
