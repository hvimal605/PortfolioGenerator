import React, { useState } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion } from "framer-motion";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { googleLogin, login } from "../services/operations/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import myBackground from '../assets/images/loginbg.webp'; 
const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [showPassword, setShowPassword] = useState(false);

  const { email, password } = formData;

  const handleOnChange = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();
    dispatch(login(email, password, navigate));
  };

  const handleGoogleLoginSuccess = (response) => {
    const { credential } = response;
    if (credential) {
      dispatch(googleLogin(credential, navigate));
    }
  };

  const handleGoogleLoginError = () => {
    console.log("Google login failed");
    alert("Google Sign-In failed!");
  };

  return (
    
    <div
    className="relative flex items-center justify-center h-[94vh] p-4"
    style={{
      backgroundImage: `url(${myBackground})`,
      backgroundPosition: "center",
    }}
  >
        {/* Gradient Overlay */}
        {/* <div className="absolute inset-0 bg-gradient-to-br from-black/70 to-gray-900/60 backdrop-blur-sm z-0" /> */}
  
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className="relative z-10 bg-gray-800 bg-opacity-60 p-8 rounded-2xl shadow-2xl w-full max-w-md border border-white/20 backdrop-blur-xl"
        >
          <h2 className="text-3xl font-bold text-center text-white mb-6 drop-shadow-[0_0_10px_#0ff]">
            Log In
          </h2>
  
          {error && <p className="text-red-500 text-center mb-4">{error}</p>}
  
          <form onSubmit={handleOnSubmit}>
            <motion.div className="mb-4" whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-400">
                Email
              </label>
              <input
                type="email"
                value={email}
                name="email"
                onChange={handleOnChange}
                className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
                placeholder="Enter your email"
              />
            </motion.div>
  
            <motion.div className="mb-2" whileFocus={{ scale: 1.05 }}>
              <label className="block text-sm font-semibold text-gray-400">
                Password
              </label>
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  value={password}
                  name="password"
                  onChange={handleOnChange}
                  className="w-full p-3 border border-gray-700 rounded-lg bg-gray-900 text-gray-300 focus:outline-none focus:ring-2 focus:ring-cyan-400 transition-all duration-300"
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
  
            {/* Forgot Password Link */}
            <div className="flex justify-end mb-4 ">
              <Link
                to={"/forgot-password"} 
                className="text-cyan-400 hover:underline text-sm"
              >
                Forgot Password?
              </Link>
            </div>
  
            <motion.button
              type="submit"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="w-full bg-cyan-500 text-white font-semibold p-3 rounded-lg hover:bg-cyan-700 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-cyan-500 shadow-md"
            >
              Log In
            </motion.button>
          </form>
  
          {/* Divider */}
          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-600" />
            <span className="px-3 text-gray-400 text-sm">OR</span>
            <hr className="flex-grow border-gray-600" />
          </div>
  
          {/* Google Login */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4, duration: 0.5 }}
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
  
          {/* Signup Link */}
          <p className="text-gray-400 text-center mt-6 text-sm">
            Don't have an account?{" "}
            <a href="/signup" className="text-cyan-400 hover:underline">
              Sign up
            </a>
          </p>
        </motion.div>
      </div>
  );
};

export default Login;
