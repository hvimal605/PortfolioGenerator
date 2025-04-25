const mongoose = require("mongoose");

const skillSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true, 
  },
  proficiency: {
    type: Number,
    required: true, 
    min: 0,
    max: 100,
  },
  svg: {
    public_id: {
      type: String,
      required: true, 
    },
    url: {
      type: String,
      required: true, 
    },
  },
});

module.exports = mongoose.model("Skill", skillSchema);
