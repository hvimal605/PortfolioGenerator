import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TemplateSelection from "../components/core/PorfolioCreation/TemplateSelection";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateId } from "../slices/PortfolioSlice";
import ConfirmationModal from "../components/common/ConfirmationModal";
import SEO from "../components/common/SEO.JSX";
import { HiOutlineRocketLaunch, HiOutlineSparkles, HiOutlineArrowRight } from "react-icons/hi2";
import { FaTimes } from "react-icons/fa";

const PortfolioCreatePage = () => {
  const { token } = useSelector((state) => state.auth);
  const [step, setStep] = useState(1);
  const navigate = useNavigate();
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const dispatch = useDispatch();

  const [previewTemplate, setPreviewTemplate] = useState(null);

  const handleTemplateSelect = (template, isPreview = false) => {
    if (isPreview) {
      setPreviewTemplate(template);
    } else {
      setSelectedTemplate(template);
      dispatch(setTemplateId(template._id));

      // 🚀 Directly navigate if logged in, otherwise show modal
      if (token) {
        navigate('/PortfolioCreate/UploadDetails');
      } else {
        setConfirmationModal({
          text1: "Sign in to Continue",
          text2: "You need an account to save your portfolio progress.",
          btn1Text: "Log In",
          btn2Text: "Cancel",
          btn1Handler: () => navigate("/login"),
          btn2Handler: () => setConfirmationModal(null),
        });
      }
    }
  };

  // 🔒 Lock background scroll when modal is open
  useEffect(() => {
    if (previewTemplate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [previewTemplate]);

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

              <div className="mt-12 text-center">
                <button onClick={() => setStep(1)} className="text-xs font-black text-white/30 hover:text-white uppercase tracking-[0.4em] transition-all">
                   ← Change Mind? Go Back
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}

        {/* 🪄 Holographic Template Preview Modal */}
        <AnimatePresence>
          {previewTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#030712]/95 backdrop-blur-2xl z-[9999] flex items-start md:items-center justify-center p-4 sm:p-6 overflow-y-auto no-scrollbar"
              onClick={() => setPreviewTemplate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 w-full max-w-4xl relative shadow-[0_50px_150px_rgba(0,0,0,1)] my-auto overflow-hidden text-left"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[100px] rounded-full"></div>

                <button
                  onClick={() => setPreviewTemplate(null)}
                  className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-20"
                >
                  <FaTimes size={18} />
                </button>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-indigo-400 mb-4 block">Template Insights</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-tight leading-none">{previewTemplate.name}</h3>
                    <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8">
                      {previewTemplate.description}
                    </p>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-10 w-fit">
                       <div className="w-10 h-10 rounded-full bg-indigo-600 flex items-center justify-center text-xs font-black">
                          {previewTemplate.CreatedBy?.firstName?.charAt(0) || "P"}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-white/40 uppercase tracking-widest">Designed By</span>
                          <span className="text-sm font-black text-white uppercase tracking-tight">
                             {previewTemplate.CreatedBy?.firstName} {previewTemplate.CreatedBy?.lastName}
                          </span>
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full relative group/modal-img flex items-center justify-center">
                    <img
                      src={previewTemplate.previewImage}
                      alt={previewTemplate.name}
                      className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 shadow-2xl w-full max-h-[300px] sm:max-h-[450px] object-cover object-top"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[1.5rem] sm:rounded-[2rem] opacity-40"></div>
                  </div>
                </div>

                <div className="mt-12 flex flex-col sm:flex-row justify-center gap-4">
                  <button 
                    onClick={() => {
                      handleTemplateSelect(previewTemplate, false);
                      setPreviewTemplate(null);
                    }}
                    className="group relative px-12 py-5 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-indigo-600 to-rose-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                     <span className="relative z-10 group-hover:text-white transition-colors flex items-center justify-center gap-3">
                        Use This Template <HiOutlineArrowRight className="group-hover:translate-x-2 transition-transform" />
                     </span>
                  </button>
                  <button 
                    onClick={() => window.open(previewTemplate.previewUrl, '_blank')}
                    className="px-12 py-5 bg-white/5 border border-white/10 text-white rounded-full font-black uppercase tracking-[0.2em] text-xs hover:bg-white/10 transition-all"
                  >
                    Live Preview
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

      </div>
    </>
  );
};

export default PortfolioCreatePage;
