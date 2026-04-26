const express = require("express");
const router = express.Router();
const { submitContactForm, getAllContactMessages, deleteContactMessage } = require("../controller/platformContact");
const { auth } = require("../middlewares/auth");

// Public route for anyone to submit a contact message
router.post("/submit", submitContactForm);

// Protected route for Admins to view all messages (Assuming auth validates JWT)
router.get("/all", auth, getAllContactMessages);

// Protected route to delete a message
router.delete("/delete", auth, deleteContactMessage);

module.exports = router;
