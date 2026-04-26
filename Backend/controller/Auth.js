const crypto = require("crypto");
const OTP = require("../models/otp");
const User = require('../models/User');
const bcrypt = require('bcrypt')
const jwt = require('jsonwebtoken');
const mailSender = require('../utils/mailSender');
const { uploadImageToCloudinary } = require('../utils/imageUploadToCloudinary');
const passwordUpdateTemplate = require('../mail/templates/PasswordUpdateTemplate');
const Portfolio = require("../models/Portfolio");
const DeveloperTemplateRequest = require("../models/TemplateReqByDev");
require("dotenv").config()

//sendOTP
exports.sendOTP = async (req, res) => {

    try {
        const { email } = req.body;

        const checkUserPresent = await User.findOne({ email });

        if (checkUserPresent) {
            return res.status(401).json({
                success: false,
                message: "User already registered",
            })
        }
        // ✅ SECURITY: Use cryptographically secure random numbers for OTP
        let otp = crypto.randomInt(100000, 999999).toString();

        let result = await OTP.findOne({ otp: otp });

        while (result) {
            otp = crypto.randomInt(100000, 999999).toString();
            result = await OTP.findOne({ otp: otp });
        }

        const otpPayload = { email, otp };

        //create an entry for otp
        const otpBody = await OTP.create(otpPayload)
        console.log(otpBody);

        //return response successful
        res.status(200).json({
            success: true,
            message: "OTP Sent Successfully",
        })


    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: error.message,
        })

    }
};


exports.signup = async (req, res) => {
    try {
        const {
            firstName,
            lastName,
            email,
            password,
            confirmPassword,
            accountType,
            otp,
        } = req.body;

        // Validate required fields
        if (!firstName || !lastName || !email || !password || !confirmPassword || !otp || !accountType) {
            return res.status(403).json({
                success: false,
                message: "All fields are required",
            });
        }

        // Check if passwords match
        if (password !== confirmPassword) {
            return res.status(400).json({
                success: false,
                message: "Password and Confirm Password do not match. Please try again.",
            });
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return res.status(400).json({
                success: false,
                message: "User is already registered",
            });
        }

        // Validate OTP
        const recentOtp = await OTP.find({ email }).sort({ createdAt: -1 }).limit(1);
        if (recentOtp.length === 0) {
            return res.status(400).json({
                success: false,
                message: "OTP not found",
            });
        } else if (otp !== recentOtp[0].otp) {
            return res.status(400).json({
                success: false,
                message: "Invalid OTP",
            });
        }

        // Hash the password
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create user entry in the database
        const userData = {
            firstName,
            lastName,
            email,
            password: hashedPassword,
            accountType,
            about: null,
            image: `https://api.dicebear.com/5.x/initials/svg?seed=${firstName}${lastName}`,
        };

        // Only for Developers, initialize requestedTemplate
        if (accountType === 'Developer') {
            userData.requestedTemplate = [];
        }

        const user = await User.create(userData);
        user.password = undefined; // ✅ SECURITY: Do not send password back

        // Return success response
        return res.status(200).json({
            success: true,
            message: "User is registered successfully",
            user,
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "User cannot be registered. Please try again.",
        });
    }
};


exports.login = async (req, res) => {
    try {
        //get data from req body
        const { email, password } = req.body;

        //validation data
        if (!email || !password) {
            return res.status(403).json({
                success: false,
                message: "All fields are required, please try again",

            })
        }
        //user check exist or not 
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(401).json({
                success: false,
                message: "user is not registered , please signup first"
            })
        }
        //generate JWT ,after password matching
        if (await bcrypt.compare(password, user.password)) {
            const payload = {
                email: user.email,
                id: user._id,
                accountType: user.accountType,
            }
            const token = jwt.sign(payload, process.env.JWT_SECRET, {
                expiresIn: '24h'
            })
            user.token = token;
            user.password = undefined;


            //create cookie and send response
            const Options = {
                expiresIn: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
                httpOnly: true,
            }

            res.cookie("token", token, Options).status(200).json({
                success: true,
                token,
                user,
                message: 'logged in successfully',
            })
        }
        else {
            return res.status(401).json({
                success: false,
                message: "Password is incorrect",
            })
        }



    }

    catch (error) {
        console.log(err);
        return res.status(500).json({
            success: false,
            message: 'Login Faliure ,Please try again',
        })
    }

}

exports.changePassword = async (req, res) => {
    try {
        const userDetails = await User.findById(req.user.id)

        if (userDetails.googleAuth) {
            return res.status(400).json({ success: false, message: "This operation is not allowed for Google-authenticated users" })
        }

        const { oldPassword, newPassword } = req.body


        const isPasswordMatch = await bcrypt.compare(
            oldPassword,
            userDetails.password
        )
        if (!isPasswordMatch) {
            return res
                .status(401)
                .json({ success: false, message: "The password is incorrect" })
        }

        const encryptedPassword = await bcrypt.hash(newPassword, 10)
        const updatedUserDetails = await User.findByIdAndUpdate(
            req.user.id,
            { password: encryptedPassword },
            { new: true }
        )

        try {
            const emailResponse = await mailSender(
                updatedUserDetails.email,
                "Password for your account has been updated",
                passwordUpdateTemplate(updatedUserDetails)
            );

            // console.log("Email sent successfully:", emailResponse.response)
        } catch (error) {

            console.error("Error occurred while sending email:", error)
            return res.status(500).json({
                success: false,
                message: "Error occurred while sending email",
                error: error.message,
            })
        }

        return res
            .status(200)
            .json({ success: true, message: "Password updated successfully" })
    } catch (error) {

        console.error("Error occurred while updating password:", error)
        return res.status(500).json({
            success: false,
            message: "Error occurred while updating password",
            error: error.message,
        })
    }
}

exports.updateProfile = async (req, res) => {
    try {
        const {
            firstName = "",
            lastName = "",
            about = "",

        } = req.body
        const id = req.user.id


        const user = await User.findByIdAndUpdate(id, {
            firstName,
            lastName,
            about,
        })
        await user.save()



        // Find the updated user details
        const updatedUserDetails = await User.findById(id).select("-password")


        return res.json({
            success: true,
            message: "Profile updated successfully",
            updatedUserDetails,
        })
    } catch (error) {
        console.log(error)
        return res.status(500).json({
            success: false,
            error: error.message,
        })
    }
}


exports.getUserDetails = async (req, res) => {
    try {
        const id = req.user.id;
        // ✅ SECURITY: Explicitly select only non-internal fields
        const userDetails = await User.findById(id).select("-password -token -resetPasswordExpires");

        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        return res.status(200).json({
            success: true,
            message: "User data fetched successfully",
            data: userDetails,
        });
    } catch (error) {
        console.error("GET USER DETAILS ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error",
        });
    }
};


exports.deleteAccount = async (req, res) => {
    try {
        const id = req.user.id;

        const userDetails = await User.findById(id);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        // ✅ SECURITY: Clean up all associated user data to prevent orphan records
        await Portfolio.deleteMany({ userId: id });
        await DeveloperTemplateRequest.deleteMany({ createdBy: id });

        // Delete user
        await User.findByIdAndDelete(id);

        return res.status(200).json({
            success: true,
            message: "User deleted successfully along with all associated data",
        });
    } catch (error) {
        console.error("DELETE ACCOUNT ERROR:", error);
        return res.status(500).json({
            success: false,
            message: "Internal Server Error. User could not be deleted",
        });
    }
};


exports.updateDisplayPicture = async (req, res) => {
    try {
        const displayPicture = req.files.displayPicture;


        const userId = req.user.id



        const userDetails = await User.findById(userId);
        if (!userDetails) {
            return res.status(404).json({
                success: false,
                message: "User not found",
            });
        }

        const image = await uploadImageToCloudinary(
            displayPicture,
            process.env.FOLDER_NAME,
            1000,
            1000
        )
        // console.log(image)
        const updatedProfile = await User.findByIdAndUpdate(
            { _id: userId },
            {
                image: image.secure_url
            },
            { new: true }
        )
        res.send({
            success: true,
            message: `Image Updated successfully`,
            data: updatedProfile,
        })
    } catch (error) {

        return res.status(500).json({
            success: false,
            message: error.message,
        })
    }
}
