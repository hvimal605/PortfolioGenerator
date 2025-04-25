const { OAuth2Client } = require("google-auth-library");
const User = require("../models/User");
const jwt = require("jsonwebtoken");

const client = new OAuth2Client(process.env.GOOGLE_CLIENT_ID);

exports.googleSignup = async (req, res) => {
    try {
        const { credential, accountType } = req.body;

        if (!credential || !accountType) {
            return res.status(400).json({
                success: false,
                message: "Missing credential or account type",
            });
        }

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, given_name, family_name, picture } = payload;

        let user = await User.findOne({ email });

        if (!user) {
            user = await User.create({
                firstName: given_name,
                lastName: family_name,
                email,
                password: "",
                accountType: accountType,
                image: picture || `https://api.dicebear.com/5.x/initials/svg?seed=${given_name}${family_name}`,
                googleAuth: true,
            });
        }

        const tokenPayload = {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "7d",
        });

        user.password = undefined;
        user.token = token;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            message: "Google Sign-Up successful",
            user,
            token,
        });
    } catch (error) {
        console.error("Google Signup Error:", error);
        res.status(500).json({
            success: false,
            message: "Google sign-up failed",
        });
    }
};



// authController.js




exports.googleLogin = async (req, res) => {
    try {
        const { credential } = req.body;

        const ticket = await client.verifyIdToken({
            idToken: credential,
            audience: process.env.GOOGLE_CLIENT_ID,
        });

        const payload = ticket.getPayload();
        const { email, name, picture } = payload;
        const [firstName, ...rest] = name.split(" ");
        const lastName = rest.join(" ") || "";

        let user = await User.findOne({ email });

        
        if (!user) {
            return res.status(400).json({
                success: false,
                notRegistered: true,
                message: "You don't have an account. Please sign up first."
            });
        }
        

        // Generate JWT token
        const tokenPayload = {
            id: user._id,
            email: user.email,
            accountType: user.accountType,
        };

        const token = jwt.sign(tokenPayload, process.env.JWT_SECRET, {
            expiresIn: "24h",
        });

        user.token = token;
        user.password = undefined;

        const options = {
            expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000), // 3 days
            httpOnly: true,
        };

        res.cookie("token", token, options).status(200).json({
            success: true,
            token,
            user,
            message: "Google login successful",
        });

    } catch (error) {
        console.error("Google Login Error:", error);
        res.status(500).json({
            success: false,
            message: "Google login failed",
        });
    }
};


