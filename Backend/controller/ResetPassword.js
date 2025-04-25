
const bcrypt = require('bcrypt')
const User = require('../models/User')
const crypto = require("crypto");
const mailSender = require('../utils/mailSender');
const passwordResetTemplate = require('../mail/templates/PasswordResetTemplate');




//resetPasswordToken
exports.resetPasswordToken = async (req, res) => {
    try {
        
        const email = req.body.email;

        //check user for this email ,email validation
        const user = await User.findOne({ email: email })
        if (!user) {
            return res.json({
                success: false,
                message: "your email is not registered with us"
            });
        }

        //generate token
        const token = crypto.randomUUID();
        //update user by adding token and expiration time
        const updatedDetails = await User.findOneAndUpdate({ email: email },
            {
                token: token,
                resetPasswordExpires: Date.now() + 15 * 60 * 1000
            },
            { new: true })
        //create url
        const url = `https://theportfoliogenerator.netlify.app/update-password/${token}`
        //send mail conataining the url
        await mailSender(email, 'Password Reset Link', passwordResetTemplate(url))

        //return response
        return res.json({
            success: true,
            message: 'Email  sent successfully , please check email and change password'
        })
    }
    catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while reset Password'
        })

    }




}


//reset password

exports.resetPassword = async (req, res) => {
    try {
        //data fetch 
        const { password, confirmPassword, token } = req.body;

    
        //validation
        if (password !== confirmPassword) {
            return res.json({
                success: false,
                message: 'Password not matching'
            });
        }
        //get userdetails from db using token
        const userDetails = await User.findOne({ token: token });

        //if no entry -invalid token
        if (!userDetails) {
            return res.json({
                success: false,
                message: 'Token is invalid',
            })
        }

        //token time check
        if (userDetails.resetPasswordExpires < Date.now()) {
            return res.json({
                success: false,
                message: 'Token in expired ,please regenerate your token'

            });


        }
        //hash pwd
        const hashedPassword = await bcrypt.hash(password, 10);
        //password update
        await User.findOneAndUpdate({ token: token },
            { password: hashedPassword },
            { new: true },)

        //return response
        return res.status(200).json({
            success: true,
            message: 'Password reset Successful'
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
            success: false,
            message: 'Something Went wrong while reset Password'
        })


    }
}
