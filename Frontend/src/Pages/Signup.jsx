import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";

import { useNavigate, } from "react-router-dom";
import { useDispatch } from "react-redux"
import { setSignupData } from "../slices/authSlice";
import { googleSignup, sendOtp } from "../services/operations/authApi";
import { ACCOUNT_TYPE } from "../utils/constants";
import Tab from "../components/common/Tab";
import toast from "react-hot-toast";


const Signup = () => {
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);


  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: "",
  })
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setConfirmShowPassword] = useState(false);


  const { firstName, lastName, email, password, confirmPassword } = formData

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }))
  }

  const handleOnSubmit = (e) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords Do Not Match")
      return
    }
    const signupData = {
      ...formData,
      accountType,
    }

    // Setting signup data to state
    // To be used after otp verification
    dispatch(setSignupData(signupData))
    // Send OTP to user for verification
    dispatch(sendOtp(formData.email, navigate))

    // Reset
    setFormData({
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      confirmPassword: "",
    })
    setAccountType(ACCOUNT_TYPE.USER)
  }

  
  const tabData = [
    {
      id: 1,
      tabName: "User",
      type: ACCOUNT_TYPE.USER,
    },
    {
      id: 2,
      tabName: "Developer",
      type: ACCOUNT_TYPE.DEVELOPER,
    },
  ]



  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;
  
    if (!credential) {
      toast.error("Google signup failed: Missing credential");
      return;
    }
  
    if (!accountType) {
      toast.error("Please select an account type before continuing");
      return;
    }
  
    dispatch(googleSignup(credential, accountType, navigate));
  };
  
  


  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    alert("Google Sign-In failed!");
  };



  return (
    <div
      className="flex items-center justify-center min-h-screen p-4 "
      style={{
        backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/1104069995/thumb/1.jpg?ip=x480')",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900 bg-opacity-10 p-8 rounded-xl shadow-2xl w-full max-w-md border-gray-500 border mt-12"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-[0_0_10px_#0ff]">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}

        
        {/* Toggle Tab */}
      <Tab tabData={tabData} field={accountType} setField={setAccountType}   />

        <form onSubmit={handleOnSubmit}>
          <div className="flex gap-4 mb-4">
            <motion.div
              className="w-1/2"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-400">First Name<sup className="text-pink-500">*</sup></label>
              <input
              required
                type="text"
                name="firstName"
                value={firstName}
                onChange={handleOnChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                placeholder="First Name"
              />
            </motion.div>
            <motion.div
              className="w-1/2"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-400">Last Name<sup className="text-pink-500">*</sup></label>
              <input
              required
                type="text"
                name="lastName"
                value={lastName}
                onChange={handleOnChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                placeholder="Last Name"
              />
            </motion.div>
          </div>

          <motion.div className="mb-4" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-400">Email<sup className="text-pink-500">*</sup></label>
            <input
            required
              type="email"
              name="email"
              value={email}
              onChange={handleOnChange}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
              placeholder="Enter your email"
            />
          </motion.div>

          <motion.div className="mb-6 relative" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-400">Password<sup className="text-pink-500">*</sup></label>
            <div className="relative">
              <input
              required
                type={showPassword ? "text" : "password"}
                name="password"
                value={password}
                onChange={handleOnChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                placeholder="Enter your password"
              />
              <button
              required
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>

          <motion.div className="mb-6 relative" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-400"> Confirm Password<sup className="text-pink-500">*</sup></label>
            <div className="relative">
              <input
              required
                type={showconfirmPassword ? "text" : "password"}
                name="confirmPassword"
                value={confirmPassword}
                onChange={handleOnChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                placeholder="Enter your confirm  password"
              />
              <button
                type="button"
                className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                onClick={() => setConfirmShowPassword(!showconfirmPassword)}
              >
                {showconfirmPassword ? <FaEyeSlash /> : <FaEye />}
              </button>
            </div>
          </motion.div>

          <motion.button
            type="submit"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="w-full bg-cyan-500 text-white p-3 rounded-lg hover:bg-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 shadow-md"
          >
            Sign Up
          </motion.button>
        </form>

        <motion.div
          className="mt-6 flex justify-center"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.5, duration: 0.5 }}
        >
          <GoogleLogin
            onSuccess={handleGoogleLoginSuccess}
            onError={handleGoogleLoginError}
            useOneTap
            shape="pill"
            theme="filled_black"
            width="100%"
            text="continue_with"
            
          />
        </motion.div>

        <p className="text-gray-400 text-center mt-6 text-sm">
          Already have an account?{" "}
          <a href="/login" className="text-cyan-400 hover:underline">
            Log in
          </a>
        </p>
      </motion.div>
    </div>
  );
};

export default Signup;
