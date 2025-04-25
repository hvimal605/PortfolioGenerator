const mongoose = require("mongoose");

const TemplateSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    unique: true, 
  },
  description: {
    type: String,
    required: true, 
  },
  previewUrl: {
    type: String, 
    required: true,
  },
  previewImage:{
    type: String, 
    required: true,

  },
  CreatedBy: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
},

  TemplateLink:{
    type: String, 
    required: true,
  },
  usage: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],

  isActive: {
    type: Boolean, 
    default: true,
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Template", TemplateSchema);
