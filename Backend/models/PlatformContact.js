const mongoose = require("mongoose");

const platformContactSchema = new mongoose.Schema({
    firstName: {
        type: String,
        required: true,
        trim: true,
    },
    lastName: {
        type: String,
        trim: true,
    },
    email: {
        type: String,
        required: true,
        trim: true,
    },
    message: {
        type: String,
        required: true,
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model("PlatformContact", platformContactSchema);
