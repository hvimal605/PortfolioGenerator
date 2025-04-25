const mongoose = require("mongoose");

const DeveloperTemplateRequestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
    },
    description:{
        type:String,
        required: true,
    },
    // previewUrl: {
    //     type: String,
    //     required: true,
    // },

    uploadedUrl: {
        type: String,
    },

    createdBy: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
        required: true,
    },

    
    status: {
        type: String,
        enum: ["Pending", "Approved", "Rejected"],
        default: "Pending",
    },

    reviewedAt: Date,

    createdAt: {
        type: Date,
        default: Date.now,
    },
});

module.exports = mongoose.model("DeveloperTemplateRequest", DeveloperTemplateRequestSchema);
