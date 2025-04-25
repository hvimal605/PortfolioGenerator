import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { jwtDecode } from "jwt-decode";


const Signup = () => {
  const [toggleOption, setToggleOption] = useState("User");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setConfirmShowPassword] = useState(false);

  const handleSignup = (e) => {
    e.preventDefault();

    if (!firstName || !lastName || !email || !password || !confirmPassword) {
      setError("Please fill out all fields");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      return;
    }

    alert(`Signup successful as ${toggleOption}!`);
  };



  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;
  
    if (credential) {
      const decoded = jwtDecode(credential);
      console.log("Decoded Google Credential:", decoded);
  
      alert(`Google Sign-In successful! Welcome, ${decoded.name}`);
    }
  };
  

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    alert("Google Sign-In failed!");
  };

  return (
    <div
      className="flex items-center justify-center min-h-screen p-4"
      style={{
        backgroundImage: "url('https://www.shutterstock.com/shutterstock/videos/1104069995/thumb/1.jpg?ip=x480')",
        backgroundPosition: "center",
      }}
    >
      <motion.div
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="bg-gray-900 bg-opacity-10 p-8 rounded-xl shadow-2xl w-full max-w-md border-white border-dashed border-2"
      >
        <h2 className="text-3xl font-bold text-center text-white mb-6">Sign Up</h2>
        {error && <p className="text-red-500 text-center mb-4">{error}</p>}
        
        {/* Toggle Tab */}
        {/* Toggle Tab */}
<div className="flex justify-center mb-6">
  <div className="relative  flex bg-gray-700 rounded-full overflow-hidden w-48  p-1">
    {/* Animated indicator */}
    <motion.div
      className="absolute  top-0 bottom-0 left-0 w-1/2 rounded-full bg-cyan-300"
      initial={false}
      animate={{ x: toggleOption === "User" ? 0 : "100%" }}
      transition={{ type: "spring", stiffness: 500, damping: 30 }}
    />
    {/* User Button */}
    <button
      onClick={() => setToggleOption("User")}
      className={`w-1/2 z-10 text-md font-semibold py-2 ${
        toggleOption === "User" ? "text-black" : "text-gray-300"
      }`}
    >
      User
    </button>
    {/* Developer Button */}
    <button
      onClick={() => setToggleOption("Developer")}
      className={`w-1/2 z-10 text-md font-semibold py-2 ${
        toggleOption === "Developer" ? "text-black" : "text-gray-300"
      }`}
    >
      Developer
    </button>
  </div>
</div>


        <form onSubmit={handleSignup}>
          <div className="flex gap-4 mb-4">
            <motion.div
              className="w-1/2"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-400">First Name</label>
              <input
                type="text"
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                placeholder="First Name"
              />
            </motion.div>
            <motion.div
              className="w-1/2"
              whileFocus={{ scale: 1.05 }}
              transition={{ duration: 0.2 }}
            >
              <label className="block text-sm font-semibold text-gray-400">Last Name</label>
              <input
                type="text"
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                placeholder="Last Name"
              />
            </motion.div>
          </div>

          <motion.div className="mb-4" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
            <label className="block text-sm font-semibold text-gray-400">Email</label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
              placeholder="Enter your email"
            />
          </motion.div>

         <motion.div className="mb-6 relative" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                     <label className="block text-sm font-semibold text-gray-400">Password</label>
                     <div className="relative">
                       <input
                         type={showPassword ? "text" : "password"}
                         value={password}
                         onChange={(e) => setPassword(e.target.value)}
                         className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-300 shadow-sm shadow-white"
                         placeholder="Enter your password"
                       />
                       <button
                         type="button"
                         className="absolute inset-y-0 right-3 flex items-center text-gray-400"
                         onClick={() => setShowPassword(!showPassword)}
                       >
                         {showPassword ? <FaEyeSlash /> : <FaEye />}
                       </button>
                     </div>
                   </motion.div>

        <motion.div className="mb-6 relative" whileFocus={{ scale: 1.05 }} transition={{ duration: 0.2 }}>
                   <label className="block text-sm font-semibold text-gray-400"> Confirm Password</label>
                   <div className="relative">
                     <input
                       type={showconfirmPassword ? "text" : "password"}
                       value={confirmPassword}
                       onChange={(e) => setConfirmPassword(e.target.value)}
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
