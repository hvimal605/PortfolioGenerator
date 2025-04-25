import React from "react";
import { motion } from "framer-motion";
import Button from "../../common/AnimatedButton";
import { FaArrowRight } from "react-icons/fa";
import ShineText from "../../common/ShineText";
import { Link } from "react-router-dom";
import HeroBg from '../../../assets/images/HeroBg.webp';
import { useDispatch } from "react-redux";
import { resetPortfolioState } from "../../../slices/PortfolioSlice";




export default function Hero() {
  const dispatch = useDispatch();

  const handleStartBuilding = () => {
    dispatch(resetPortfolioState()); // 
  };

  return (
    <div className="relative min-h-screen text-white overflow-hidden">
      {/* Background Animation */}
      <div className="absolute inset-0 bg-gradient-to-r from-gray-800 via-gray-900 to-gray-800">
        <div
          className="absolute inset-0 animate-bg-pattern opacity-10"
          style={{ backgroundImage: `url(${HeroBg})` }}
        ></div>


      </div>

      {/* Hero Section */}
      <header className="relative flex flex-col items-center justify-center min-h-screen text-center px-4 z-10">
        <motion.h1
          className="text-4xl md:text-5xl lg:text-6xl font-extrabold drop-shadow-xl"
          initial={{ opacity: 0, y: -50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 2.5 }}
        >
          Create Stunning <ShineText text={"Portfolio"} /> in Minutes
        </motion.h1>
        <motion.p
          className="mt-6 text-lg md:text-xl max-w-3xl mx-auto px-4"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.8, delay: 0.3 }}
        >
          Design the perfect portfolio to land your dream job or impress potential clients.
          With powerful tools and stunning templates.
        </motion.p>
        <motion.div
          className="mt-10 flex flex-wrap justify-center space-x-4 gap-2 items-center"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.5 }}
        >
          <Link to="/portfolioCreate" onClick={handleStartBuilding}>
            <Button content="Start Building" />
          </Link>
          {/* <button className="bg-transparent mr-3 border-2 border-white px-6 py-3 font-semibold rounded-lg hover:bg-white hover:text-blue-500 transition-all duration-300">
            <span className="flex justify-center items-center gap-2">Explore Portfolios <FaArrowRight /></span>  
          </button> */}
        </motion.div>
        {/* <motion.div
          className="mt-6 text-sm text-gray-400"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1.2, delay: 0.8 }}
        >
          <a
            href="https://your-deployed-link.com"
            target="_blank"
            rel="noopener noreferrer"
            className="underline hover:text-white"
          >
            Check out live portfolios deployed by our users!
          </a>
        </motion.div> */}
      </header>

      {/* Style for Animations */}
      <style jsx>{`
        .animate-bg-pattern {
          background-size: 200% 200%;
          animation: movePattern 20s linear infinite;
        }

        @keyframes movePattern {
          0% {
            background-position: 0% 0%;
          }
          100% {
            background-position: 100% 100%;
          }
        }
      `}</style>
    </div>
  );
}
