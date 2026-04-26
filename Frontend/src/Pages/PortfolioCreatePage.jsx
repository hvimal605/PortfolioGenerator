import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TemplateSelection from "../components/core/PorfolioCreation/TemplateSelection";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateId } from "../slices/PortfolioSlice";
import ConfirmationModal from "../components/common/ConfirmationModal";
import SEO from "../components/common/SEO.JSX";
import { HiOutlineRocketLaunch, HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";

const PortfolioCreatePage = () => {
  const { token } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    dispatch(setTemplateId(template._id));
  };

  const handleUploadDetails = () => {
    if (token) {
      navigate('/PortfolioCreate/UploadDetails');
      return;
    }

    setConfirmationModal({
      text1: "Sign in to Continue",
      text2: "You need an account to save your portfolio progress.",
      btn1Text: "Log In",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
  };

  return (
    <>
      <SEO
        title="Create Your Portfolio | PortfolioCraft"
        description="Craft a stunning personal portfolio in minutes. Choose a premium template and launch your brand."
        keywords="portfolio builder, templates, personal website"
      />

      <div className="relative min-h-[94vh] bg-[#0A0A0A] text-white flex flex-col items-center justify-center overflow-x-hidden font-sans pb-20">
        {/* Soft Modern Backdrop */}
        <div className="absolute inset-0 pointer-events-none">
           <div className="absolute top-[-20%] left-[-10%] w-[60%] h-[60%] bg-indigo-600/20 blur-[140px] rounded-full"></div>
           <div className="absolute bottom-[-10%] right-[-10%] w-[60%] h-[60%] bg-rose-600/10 blur-[140px] rounded-full"></div>
           <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-10 brightness-100 contrast-100 mix-blend-overlay"></div>
        </div>

        <AnimatePresence mode="wait">
          {step === 1 && (
            <motion.div
              key="step1"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20, filter: "blur(10px)" }}
              transition={{ duration: 0.8, ease: "easeOut" }}
              className="text-center space-y-12 relative z-10 p-8 max-w-3xl"
            >
              <div className="space-y-6">
                 <motion.div 
                   initial={{ scale: 0.8, opacity: 0 }}
                   animate={{ scale: 1, opacity: 1 }}
                   transition={{ delay: 0.2, duration: 0.8 }}
                   className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/[0.05] border border-white/10 text-indigo-400 text-xs font-semibold uppercase tracking-wider mb-4"
                 >
                    <HiOutlineSparkles className="text-lg" /> Let's Get Started
                 </motion.div>
                 
                 <h1 className="text-5xl md:text-7xl font-extrabold tracking-tight leading-tight text-white">
                    Build Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 to-rose-400">Dream Portfolio.</span>
                 </h1>
                 <p className="text-gray-400 text-lg md:text-xl font-medium leading-relaxed">
                    Create a stunning personal website in just a few clicks. Pick a premium template, add your details, and launch your brand to the world.
                 </p>
              </div>

              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setStep(2)}
                className="group relative inline-flex items-center justify-center gap-3 px-10 py-5 bg-white text-black rounded-2xl font-bold text-lg shadow-xl shadow-white/10 transition-all hover:bg-gray-100"
              >
                  Start Building <HiOutlineArrowRight className="text-xl group-hover:translate-x-1 transition-transform" />
              </motion.button>
            </motion.div>
          )}

          {step === 2 && (
            <motion.div
              key="step2"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="w-full max-w-7xl relative z-10 p-6 md:p-12 flex flex-col items-center"
            >
              <header className="text-center space-y-4 mb-12">
                 <span className="text-sm font-bold text-indigo-400 uppercase tracking-widest">Step 1</span>
                 <h2 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white">
                    Choose a Template
                 </h2>
                 <p className="text-gray-400 text-lg">Pick a layout that perfectly matches your personal brand.</p>
              </header>

              <div className="w-full h-auto overflow-visible rounded-3xl bg-[#111111]/80 backdrop-blur-xl border border-white/10 p-6 sm:p-10 relative shadow-2xl">
                 <TemplateSelection onTemplateSelect={handleTemplateSelect} />
              </div>

              <div className="mt-10 flex flex-col items-center gap-6">
                 <motion.button
                   disabled={!selectedTemplate}
                   whileHover={selectedTemplate ? { scale: 1.05 } : {}}
                   whileTap={selectedTemplate ? { scale: 0.95 } : {}}
                   onClick={handleUploadDetails}
                   className={`flex items-center gap-3 px-10 py-4 rounded-2xl font-bold text-lg transition-all duration-300 ${
                     selectedTemplate 
                     ? "bg-indigo-600 text-white shadow-lg shadow-indigo-600/30 hover:bg-indigo-500 hover:shadow-indigo-500/40" 
                     : "bg-white/10 text-gray-500 cursor-not-allowed border border-white/5"
                   }`}
                 >
                   <HiOutlineRocketLaunch className="text-2xl" />
                   Continue to Details
                 </motion.button>
                 
                 <button onClick={() => setStep(1)} className="text-sm font-medium text-gray-500 hover:text-white transition-colors">
                    Go Back
                 </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

      </div>
    </>
  );
};

export default PortfolioCreatePage;
