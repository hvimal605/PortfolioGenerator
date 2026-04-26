import React, { useEffect, useState } from "react";
import { Projects } from "./Projects";
import { SoftwareApplications } from "./SoftwareApplications";
import { Timeline } from "./Timeline";
import { Link, useNavigate } from "react-router-dom";
import { getFullDetailsOfPortfolio } from "../../../../services/operations/PortfolioApi";
import { PersonalportfolioData } from "./PersonalportfolioData";
import AnimatedButton4 from "../../../common/AnimatedButton4";
import { useDispatch, useSelector } from "react-redux";
import { Skills } from "./skills";
import { setStep } from "../../../../slices/PortfolioSlice";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineRocketLaunch, HiOutlineGlobeAlt } from "react-icons/hi2";

const PortfolioDashboardData = ({ selectedPortfolio }) => {
  const { token } = useSelector((state) => state.auth);
  const reduxPortfolio = useSelector((state) => state.portfolio.portfolio);
  const portfolioId = selectedPortfolio?.portfolioId || reduxPortfolio?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [portfolioData, setPortfolioData] = useState(null);

  useEffect(() => {
    if (!reduxPortfolio) {
      navigate("/PortfolioCreate/UploadDetails");
      dispatch(setStep(0));
    }
  }, [reduxPortfolio, navigate, dispatch]);

  useEffect(() => {
    if (!portfolioId) return;
    const fetchPortfolio = async () => {
      try {
        const data = await getFullDetailsOfPortfolio(portfolioId, token);
        setPortfolioData(data);
      } catch (error) {
        console.error("Error fetching portfolio data:", error);
      }
    };
    fetchPortfolio();
  }, [portfolioId, token]);

  if (!portfolioData) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] space-y-6">
        <div className="w-12 h-12 border-4 border-white/10 border-t-purple-500 rounded-full animate-spin"></div>
        <p className="text-gray-500 font-black uppercase tracking-[0.3em] text-[10px]">Loading Dashboard...</p>
      </div>
    );
  }

  return (
    <motion.div 
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="max-w-[1400px] mx-auto space-y-12 pb-24"
    >
      {/* Cinematic Header */}
      <header className="relative py-16 px-8 rounded-[4rem] overflow-hidden text-center border border-white/20 bg-white/[0.03] backdrop-blur-3xl shadow-[0_20px_50px_rgba(0,0,0,0.5)] group">
        <div className="absolute inset-0 bg-gradient-to-b from-purple-500/5 via-transparent to-transparent pointer-events-none"></div>
        
        <motion.div
           initial={{ y: 20, opacity: 0 }}
           animate={{ y: 0, opacity: 1 }}
           className="relative z-10"
        >
          <p className="text-sm font-bold text-purple-400 mb-2 tracking-wider">Portfolio Overview</p>
          <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl">
            Your <span className="text-white/40 italic font-medium">Dashboard</span>
          </h1>
        </motion.div>
      </header>

      {/* Grid of Modules */}
      <div className="space-y-12 px-2 md:px-0">
        <PersonalportfolioData portfolioData={portfolioData} />
        
        <div className="grid grid-cols-1 lg:grid-cols-1 gap-12">
           <Timeline timeline={portfolioData.timeline} />
        </div>

        <Skills skills={portfolioData.skills} />
        <SoftwareApplications software={portfolioData.softwareApplications} />

        <Projects projects={portfolioData.projects} />
      </div>

      {/* Final Deployment Vector */}
      <AnimatePresence>
        {portfolioData.deployLink === "" && (
          <motion.div 
            initial={{ opacity: 0, y: 50 }}
            animate={{ opacity: 1, y: 0 }}
            className="fixed bottom-12 left-1/2 -translate-x-1/2 z-[100]"
          >
            <Link to="/portfolio/deploy">
               <button className="group relative flex items-center gap-4 px-10 py-5 bg-white text-black rounded-full font-black uppercase text-xs tracking-widest hover:scale-105 transition-all shadow-2xl">
                  <div className="absolute -inset-4 bg-white/20 blur-2xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  <HiOutlineRocketLaunch className="text-xl group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                  Deploy Portfolio
               </button>
            </Link>
          </motion.div>
        )}
      </AnimatePresence>

      <footer className="pt-24 pb-8 text-center">
         <p className="text-[9px] font-black text-gray-700 uppercase tracking-widest flex items-center justify-center gap-2">
            <HiOutlineGlobeAlt className="text-sm" /> Portfolio Generator © 2024 • All Rights Reserved
         </p>
      </footer>
    </motion.div>
  );
};

export default PortfolioDashboardData;
