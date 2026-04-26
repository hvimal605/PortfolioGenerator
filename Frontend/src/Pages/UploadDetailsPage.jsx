import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import CreationSidebar from '../components/core/PorfolioCreation/UploadDetails/CreationSidebar';
import PersonalDetails from '../components/core/PorfolioCreation/UploadDetails/PersonalDetails';
import Timeline from '../components/core/PorfolioCreation/UploadDetails/Timeline';
import Skills from '../components/core/PorfolioCreation/UploadDetails/Skills';
import Projects from '../components/core/PorfolioCreation/UploadDetails/Projects';
import SoftwareApplication from '../components/core/PorfolioCreation/UploadDetails/SoftwareApplication';
import PortfolioDashboardData from '../components/core/PorfolioCreation/PorttfolioDashboardData/PortfolioDashboardData';
import MagicResumePortal from '../components/core/PorfolioCreation/UploadDetails/MagicResumePortal';
import { setStep } from '../slices/PortfolioSlice';
import { ACCOUNT_TYPE } from '../utils/constants';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authApi';
import { motion, AnimatePresence } from 'framer-motion';
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineBolt,
  HiOutlineRectangleGroup,
  HiOutlineComputerDesktop,
  HiOutlineRocketLaunch,
  HiOutlineXMark
} from "react-icons/hi2";

const StepGlows = ({ step }) => {
  const colors = [
    "from-amber-500/20",
    "from-rose-500/20",
    "from-emerald-500/20",
    "from-indigo-500/20",
    "from-sky-500/20",
    "from-slate-500/20"
  ];
  
  return (
    <div className="fixed inset-0 pointer-events-none overflow-hidden z-0">
      <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-black to-transparent z-10 opacity-60"></div>
      <motion.div 
         key={`glow-top-${step}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.8 }}
         transition={{ duration: 1.5 }}
         className={`absolute top-[-10%] right-[-10%] w-[70%] h-[70%] bg-gradient-radial ${colors[step]} to-transparent blur-[140px]`}
      />
      <motion.div 
         key={`glow-bottom-${step}`}
         initial={{ opacity: 0 }}
         animate={{ opacity: 0.6 }}
         transition={{ duration: 1.5 }}
         className={`absolute bottom-[-10%] left-[-10%] w-[70%] h-[70%] bg-gradient-radial ${colors[step]} to-transparent blur-[140px]`}
      />
    </div>
  );
};

const UploadDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step } = useSelector((state) => state.portfolio);
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);

  const [confirmationModal, setConfirmationModal] = useState(null);

  const handleLogout = () => {
    dispatch(logout(navigate));
  };

  const steps = ["Personal details", "Timeline", "Skills", "Projects", "Software & tools", "Dashboard"];
  
  const stepIcons = [
    <HiOutlineUser />,
    <HiOutlineClock />,
    <HiOutlineBolt />,
    <HiOutlineRectangleGroup />,
    <HiOutlineComputerDesktop />,
    <HiOutlineRocketLaunch />
  ];

  const stepColors = [
    "from-amber-400 to-amber-600",
    "from-rose-400 to-rose-600",
    "from-emerald-400 to-emerald-600",
    "from-indigo-400 to-indigo-600",
    "from-sky-400 to-sky-600",
    "from-slate-400 to-slate-600"
  ];

  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in.",
        text2: "Please log in first to create a portfolio.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => navigate("/"),
      });
      return;
    }

    if (user?.accountType !== ACCOUNT_TYPE.USER) {
      setConfirmationModal({
        text1: "You are logged in as a Developer.",
        text2: "To create a portfolio, please log in with a regular User account.",
        btn1Text: "Logout",
        btn1Handler: () => handleLogout(),
      });
    }
  }, [token, user, navigate]);

  return (
    <div className="min-h-screen bg-[#0a0a0c] text-white selection:bg-blue-500/30 selection:text-blue-200 overflow-hidden">
      <StepGlows step={step} />
      
      {/* Dynamic Mesh Gradient Overlay */}
      <div className="fixed inset-0 pointer-events-none z-0 opacity-40">
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 contrast-150 brightness-100"></div>
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-blue-500/10 blur-[120px] rounded-full"></div>
      </div>
      
      <div className="relative z-10 flex h-full">
        {/* Sidebar - Desktop Only */}
        <div className="hidden lg:block pt-0">
          <CreationSidebar steps={steps} currentStep={step} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen relative lg:ml-96">
           {/* 🚀 Mobile/Tablet Step Info Bar - Fixed below MainNavbar */}
           <div className="lg:hidden fixed top-20 left-0 z-40 w-full px-6 py-4 flex items-center justify-between bg-[#0a0a0a]/80 backdrop-blur-3xl border-b border-white/5">
              <div className="flex flex-col">
                 <span className="text-[9px] font-black text-indigo-400 uppercase tracking-[0.3em] mb-0.5">Step {step + 1} of {steps.length}</span>
                 <h2 className="text-[13px] font-black text-white uppercase tracking-tighter">{steps[step]}</h2>
              </div>

              <div className="flex items-center gap-6">
                 <div className="flex flex-col items-end">
                    <span className="text-[10px] font-black text-white italic">{Math.round(((step + 1) / steps.length) * 100)}%</span>
                    <div className="w-16 h-1.5 bg-white/5 rounded-full overflow-hidden mt-1 border border-white/5">
                       <div className="h-full bg-white transition-all duration-700 shadow-[0_0_10px_rgba(255,255,255,0.3)]" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
                    </div>
                 </div>

                 <button 
                   onClick={() => setIsMenuOpen(true)}
                   className="w-10 h-10 shrink-0 flex items-center justify-center bg-white/5 rounded-full border border-white/10 text-white active:scale-90 transition-all shadow-lg"
                 >
                   <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                     <path d="M2.25 13.5H15.75M2.25 9H15.75M2.25 4.5H15.75" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                   </svg>
                 </button>
              </div>
           </div>

           {/* Mobile Steps Drawer (Hamburger content) */}
           <AnimatePresence>
             {isMenuOpen && (
               <>
                 <motion.div 
                   initial={{ opacity: 0 }}
                   animate={{ opacity: 1 }}
                   exit={{ opacity: 0 }}
                   onClick={() => setIsMenuOpen(false)}
                   className="fixed inset-0 bg-black/60 backdrop-blur-sm z-[1001] lg:hidden"
                 />
                 <motion.div 
                   initial={{ x: "100%" }}
                   animate={{ x: 0 }}
                   exit={{ x: "100%" }}
                   transition={{ type: "spring", damping: 25, stiffness: 200 }}
                   className="fixed top-0 right-0 h-full w-[80%] max-w-xs bg-[#0a0a0a] border-l border-white/10 z-[1002] p-8 lg:hidden"
                 >
                    <div className="flex items-center justify-between mb-12">
                      <div className="flex flex-col">
                        <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Creation Progress</span>
                        <h3 className="text-xl font-black text-white uppercase tracking-tighter mt-1">Section Details</h3>
                      </div>
                      <button onClick={() => setIsMenuOpen(false)} className="w-12 h-12 flex items-center justify-center bg-white/5 rounded-full text-white border border-white/10 shadow-xl">
                        <HiOutlineXMark size={24} />
                      </button>
                    </div>

                    <div className="space-y-3">
                      {steps.map((s, index) => {
                        const isActive = step === index;
                        const isCompleted = index < step;
                        
                        return (
                          <button
                            key={index}
                            onClick={() => {
                              dispatch(setStep(index));
                              setIsMenuOpen(false);
                            }}
                            className={`w-full group relative flex items-center gap-5 px-5 py-5 rounded-[1.5rem] transition-all duration-500 text-left border ${
                              isActive
                                ? "bg-white/[0.05] border-white/20 shadow-2xl"
                                : "bg-white/[0.02] border-transparent hover:bg-white/5 hover:border-white/10"
                            }`}
                          >
                            {/* Icon matching Laptop */}
                            <div className={`w-12 h-12 shrink-0 rounded-[1.2rem] flex items-center justify-center text-xl transition-all duration-700 ${
                              isActive
                                ? `bg-gradient-to-br ${stepColors[index]} text-black shadow-lg shadow-black/50`
                                : isCompleted
                                  ? "bg-white/10 text-white"
                                  : "bg-white/[0.03] text-gray-700"
                            }`}>
                              {stepIcons[index]}
                            </div>

                            <div className="flex flex-col">
                              <span className={`text-[10px] font-black uppercase tracking-widest mb-0.5 ${
                                isActive ? "text-indigo-400" : "text-white/20"
                              }`}>Step 0{index + 1}</span>
                              <span className={`text-[11px] font-black uppercase tracking-[0.1em] ${
                                isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                              }`}>{s}</span>
                            </div>

                            {isCompleted && (
                              <div className="absolute right-6 w-2 h-2 rounded-full bg-emerald-500 shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                 </motion.div>
               </>
             )}
           </AnimatePresence>

           <div className="p-4 md:p-12 lg:p-20 pt-40 lg:pt-20 max-w-6xl mx-auto">
              <AnimatePresence mode="wait">
                <motion.div
                  key={step}
                  initial={{ opacity: 0, x: 20, filter: "blur(10px)" }}
                  animate={{ opacity: 1, x: 0, filter: "blur(0px)" }}
                  exit={{ opacity: 0, x: -20, filter: "blur(10px)" }}
                  transition={{ duration: 0.5, ease: "circOut" }}
                  className="w-full"
                >
                  <div className="relative">
                    {/* Perspective background card */}
                    <div className="absolute inset-0 bg-white/[0.01] border border-white/[0.03] rounded-[4rem] -rotate-1 scale-[1.02] pointer-events-none"></div>
                    
                    {step === 0 && (
                      <div className="flex flex-col gap-10">
                        <MagicResumePortal />
                        <PersonalDetails />
                      </div>
                    )}
                    {step === 1 && <Timeline />}
                    {step === 2 && <Skills />}
                    {step === 3 && <Projects />}
                    {step === 4 && <SoftwareApplication />}
                    {step === 5 && <PortfolioDashboardData />}
                  </div>
                </motion.div>
              </AnimatePresence>
           </div>

           {/* Quick Navigation Footer (Floating Tablet & Mobile Only) */}
           <div className="lg:hidden fixed bottom-8 left-1/2 -translate-x-1/2 flex items-center bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 p-2 px-3 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] z-[60]">
              {steps.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => dispatch(setStep(i))}
                   className={`w-11 h-11 rounded-full flex items-center justify-center text-[11px] font-black transition-all duration-500 ${
                     step === i 
                     ? "bg-white text-black scale-110 shadow-2xl" 
                     : "text-white/30 hover:text-white"
                  }`}
                >
                  {i + 1}
                </button>
              ))}
           </div>
        </main>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      
    </div>
  );
};

export default UploadDetailsPage;
