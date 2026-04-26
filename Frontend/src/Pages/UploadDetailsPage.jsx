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
        <div className="pt-20">
          <CreationSidebar steps={steps} currentStep={step} />
        </div>

        {/* Main Content Area */}
        <main className="flex-1 min-h-screen relative lg:ml-96 pt-20">
           {/* Mobile Header (Simplified) */}
           <div className="lg:hidden p-5 border-b border-white/5 bg-black/60 backdrop-blur-xl sticky top-0 z-40 flex items-center justify-between">
               <h1 className="text-lg font-bold text-white">PortfolioCraft</h1>
               <div className="flex items-center gap-3">
                  <span className="text-xs font-medium text-gray-400">Step {step + 1} of {steps.length}</span>
                  <div className="w-14 h-1.5 bg-white/10 rounded-full overflow-hidden">
                     <div className="h-full bg-indigo-500 rounded-full transition-all" style={{ width: `${((step + 1) / steps.length) * 100}%` }}></div>
                  </div>
               </div>
            </div>

           <div className="p-4 md:p-12 lg:p-20 max-w-6xl mx-auto">
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

           {/* Quick Navigation Footer (Mobile Only) */}
           <div className="lg:hidden fixed bottom-6 left-1/2 -translate-x-1/2 flex items-center bg-black/60 backdrop-blur-3xl border border-white/5 p-2 rounded-[2rem] shadow-2xl z-40">
              {steps.map((_, i) => (
                <button 
                  key={i} 
                  onClick={() => dispatch(setStep(i))}
                   className={`w-10 h-10 rounded-full flex items-center justify-center text-sm font-semibold transition-all ${
                     step === i ? "bg-white text-black scale-110 shadow-xl" : "text-gray-500 hover:text-white"
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
