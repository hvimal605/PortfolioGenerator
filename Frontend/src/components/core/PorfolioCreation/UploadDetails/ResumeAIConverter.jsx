import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSparkles, HiOutlineDocumentArrowUp } from "react-icons/hi2";
import { convertResume, getAIUsageStats } from "../../../../services/operations/AIApi";
import { setAiData, setResumeFile, setAiLoading } from "../../../../slices/PortfolioSlice";
import { toast } from "sonner";

const ResumeAIConverter = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { aiLoading: isAnalyzing } = useSelector((state) => state.portfolio);
  const fileInputRef = useRef(null);
  const [stats, setStats] = useState({ usageCount: 0, maxLimit: 3, resetTime: null });

  const fetchStats = async () => {
    if (!token) return;
    const res = await getAIUsageStats(token);
    if (res) setStats(res);
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF resume.");
      return;
    }

    // Limit to 5MB
    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume file is too large. Max 5MB allowed.");
      return;
    }

    dispatch(setAiLoading(true));
    dispatch(setResumeFile(file)); // Sync file immediately so scanner can show it
    
    try {
      const result = await convertResume(file, token);
      dispatch(setAiLoading(false));

      if (result) {
        dispatch(setAiData(result));
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchStats(); // Update stats after success
      }
    } catch (error) {
      dispatch(setAiLoading(false));
      toast.error("Failed to analyze resume. Please try again.");
    }
  };

  const handleButtonClick = () => {
    fileInputRef.current?.click();
  };

  return (
    <div className="w-full flex justify-center mb-10 px-4">
      <div className="relative group max-w-2xl w-full">
        {/* Glow Background */}
        <div className="absolute -inset-1 bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-amber-500 rounded-[2rem] blur-xl opacity-20 group-hover:opacity-40 transition duration-1000"></div>

        <div className="relative bg-[#0a0a0a]/60 backdrop-blur-3xl border border-white/10 rounded-[2rem] p-6 sm:p-8 flex flex-col sm:flex-row items-center justify-between gap-6 shadow-2xl overflow-hidden">
          
          {/* Internal Shimmer */}
          <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="flex items-center gap-5 relative z-10 w-full sm:w-auto">
            <div className="w-16 h-16 rounded-2xl bg-indigo-500/10 flex items-center justify-center border border-indigo-500/20 text-indigo-400 group-hover:bg-indigo-500/20 transition-all duration-500">
               <HiOutlineSparkles className={`text-3xl ${isAnalyzing ? 'animate-pulse' : ''}`} />
            </div>
            <div>
              <h3 className="text-xl font-black text-white tracking-tight">AI Resume Fill</h3>
              <p className="text-sm font-medium text-gray-500 mb-2">Upload your PDF to autofill the form</p>
              <div className="flex items-center gap-2 text-[13px] font-bold text-indigo-300 bg-indigo-500/20 border border-indigo-500/30 px-3 py-1.5 rounded-lg w-fit shadow-[0_0_15px_rgba(99,102,241,0.2)]">
                <span>You have used {stats.usageCount} / {stats.maxLimit} times</span>
                {stats.resetTime && (
                  <span className="text-gray-300 border-l border-indigo-500/30 pl-2 ml-1">
                    Resets in {Math.max(0, Math.ceil((new Date(stats.resetTime) - new Date()) / (1000 * 60 * 60)))} hours
                  </span>
                )}
              </div>
            </div>
          </div>

          <button
            onClick={handleButtonClick}
            disabled={isAnalyzing}
            className={`group/btn relative px-8 py-4 rounded-xl flex items-center gap-3 overflow-hidden transition-all active:scale-95 ${
              isAnalyzing 
              ? "bg-white/5 text-gray-400 cursor-not-allowed border border-white/5" 
              : "bg-white text-black hover:bg-white/90"
            }`}
          >
            <AnimatePresence mode="wait">
               {isAnalyzing ? (
                 <motion.div 
                    key="analyzing"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-3"
                 >
                    <div className="w-4 h-4 border-2 border-indigo-500 border-t-transparent rounded-full animate-spin"></div>
                    <span className="font-bold text-[13px] uppercase tracking-widest">Analyzing...</span>
                 </motion.div>
               ) : (
                 <motion.div 
                    key="upload"
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.8 }}
                    className="flex items-center gap-3"
                 >
                    <HiOutlineDocumentArrowUp className="text-xl" />
                    <span className="font-bold text-[13px] uppercase tracking-widest whitespace-nowrap">Upload Resume (PDF)</span>
                 </motion.div>
               )}
            </AnimatePresence>
          </button>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
        </div>
      </div>
    </div>
  );
};

export default ResumeAIConverter;
