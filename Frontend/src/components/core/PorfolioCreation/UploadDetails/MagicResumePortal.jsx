import React, { useRef, useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSparkles, HiOutlineDocumentArrowUp, HiOutlineCpuChip, HiOutlineCubeTransparent } from "react-icons/hi2";
import { convertResume, getAIUsageStats } from "../../../../services/operations/AIApi";
import { setAiData, setResumeFile, setAiLoading } from "../../../../slices/PortfolioSlice";
import { toast } from "sonner";

const MagicResumePortal = () => {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const { aiLoading: isAnalyzing } = useSelector((state) => state.portfolio);

  const fileInputRef = useRef(null);
  const [isDragging, setIsDragging] = useState(false);
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const cardRef = useRef(null);
  const [stats, setStats] = useState({ usageCount: 0, maxLimit: 3, resetTime: null });

  const fetchStats = async () => {
    if (!token) return;
    const res = await getAIUsageStats(token);
    if (res) setStats(res);
  };

  useEffect(() => {
    fetchStats();
  }, [token]);

  const handleMouseMove = (e) => {
    if (!cardRef.current) return;
    const rect = cardRef.current.getBoundingClientRect();
    setMousePos({
      x: e.clientX - rect.left,
      y: e.clientY - rect.top,
    });
  };

  const isLimitReached = stats.usageCount >= stats.maxLimit;

  const processFile = async (file) => {
    if (isLimitReached) return;
    if (!file) return;

    if (file.type !== "application/pdf") {
      toast.error("Please upload a valid PDF resume.");
      return;
    }

    if (file.size > 5 * 1024 * 1024) {
      toast.error("Resume file is too large. Max 5MB allowed.");
      return;
    }

    dispatch(setAiLoading(true));
    dispatch(setResumeFile(file));

    try {
      const result = await convertResume(file, token);
      dispatch(setAiLoading(false));

      if (result) {
        dispatch(setAiData(result));
        toast.success("Intelligence Sync Complete");
        if (fileInputRef.current) fileInputRef.current.value = "";
        fetchStats(); // Update stats
      }
    } catch (error) {
      dispatch(setAiLoading(false));
      toast.error("Failed to analyze resume.");
    }
  };

  const handleFileChange = (e) => processFile(e.target.files[0]);

  const onDrop = (e) => {
    e.preventDefault();
    if (isLimitReached) return;
    setIsDragging(false);
    processFile(e.dataTransfer.files[0]);
  };

  const onDragOver = (e) => {
    e.preventDefault();
    if (isLimitReached) return;
    setIsDragging(true);
  };

  const onDragLeave = () => setIsDragging(false);

  return (
    <div className="w-full flex justify-center  px-4">
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onDragOver={onDragOver}
        onDragLeave={onDragLeave}
        onDrop={onDrop}
        onClick={() => !isLimitReached && fileInputRef.current?.click()}
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className={`relative w-full max-w-4xl p-[1px] rounded-[2.5rem] overflow-hidden group transition-all duration-500 ${isLimitReached ? "cursor-not-allowed opacity-75" : "cursor-pointer"} ${(!isLimitReached && isDragging) ? "scale-[1.02] rotate-1" : !isLimitReached ? "hover:scale-[1.01]" : ""
          }`}
      >
        {/* Dynamic Industrial Border (Follows Mouse) */}
        <div
          className="absolute inset-0 z-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
          style={{
            background: `radial-gradient(600px circle at ${mousePos.x}px ${mousePos.y}px, rgba(6,182,212,0.4), transparent 40%)`
          }}
        />

        {/* The Card Body */}
        <div className="relative z-10 bg-[#0a0a0a]/80 backdrop-blur-3xl border border-white/10 rounded-[2rem] sm:rounded-[2.5rem] p-6 sm:p-10 md:p-14 overflow-hidden">

          {/* Subtle Industrial Grid Overlay */}
          <div className="absolute inset-0 opacity-5 pointer-events-none bg-[linear-gradient(to_right,#888_1px,transparent_1px),linear-gradient(to_bottom,#888_1px,transparent_1px)] bg-[size:40px_40px]" />

          {/* Laser Scan Line (Idle) */}
          <motion.div
            animate={{ top: ["0%", "100%", "0%"] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-cyan-500/50 to-transparent z-20 opacity-30 group-hover:opacity-100 transition-opacity"
          />

          <div className="flex flex-col lg:flex-row items-center justify-between gap-8 sm:gap-12 relative z-30 text-center lg:text-left">

            <div className="flex flex-col sm:flex-row items-center gap-6 sm:gap-8 w-full lg:w-auto">
              <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl bg-cyan-500/10 flex items-center justify-center border border-cyan-500/20 text-cyan-500 relative shrink-0">
                <div className="absolute inset-0 bg-cyan-500/10 blur-xl animate-pulse rounded-2xl" />
                <HiOutlineCpuChip className={`text-3xl sm:text-4xl ${isAnalyzing ? 'animate-spin' : ''}`} />
              </div>
              <div className="space-y-3 flex-1">
                <div className="flex items-center gap-2 justify-center lg:justify-start">
                  <span className="text-[10px] font-black uppercase tracking-[0.4em] text-cyan-500">AI Magic Fill</span>
                  <HiOutlineSparkles className="text-cyan-400 text-xs animate-pulse" />
                </div>
                <h3 className="text-2xl sm:text-4xl font-black text-white tracking-tighter leading-none">
                  FILL YOUR INFO <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-white/40 italic">FAST.</span>
                </h3>
                <p className="text-gray-500 text-xs sm:text-base font-medium max-w-sm mx-auto lg:mx-0">
                  {isDragging ? "Drop your file here" : "Just drop your PDF resume here and we'll fill the form for you."}
                </p>
                
                <div className="flex flex-col gap-3 items-center lg:items-start mt-4">
                  <div className="flex flex-col sm:flex-row items-center gap-2 text-[11px] sm:text-[13px] font-bold text-cyan-300 bg-cyan-500/10 border border-cyan-500/20 px-4 py-2 rounded-xl shadow-[0_0_15px_rgba(6,182,212,0.15)]">
                    <span>{stats.usageCount} / {stats.maxLimit} used</span>
                    {stats.resetTime && (
                      <span className="hidden sm:block text-gray-600">|</span>
                    )}
                    {stats.resetTime && (
                      <span className="text-gray-400">
                        Resets in {Math.max(0, Math.ceil((new Date(stats.resetTime) - new Date()) / (1000 * 60 * 60)))}h
                      </span>
                    )}
                  </div>
                  {isLimitReached && (
                    <p className="text-amber-400/90 text-[11px] sm:text-[13px] font-medium bg-amber-500/10 px-4 py-2 rounded-xl border border-amber-500/20 max-w-[280px] sm:max-w-[320px]">
                      Limit reached! Fill manually below.
                    </p>
                  )}
                </div>
              </div>
            </div>

            <div className="relative w-full sm:w-auto mt-4 lg:mt-0">
              <AnimatePresence mode="wait">
                {isAnalyzing ? (
                  <motion.div
                    key="active"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="flex flex-col items-center gap-4"
                  >
                    <div className="flex items-center gap-3 px-8 py-5 bg-white/5 border border-white/10 rounded-2xl text-cyan-500 w-full justify-center">
                      <div className="w-5 h-5 border-2 border-cyan-500 border-t-transparent rounded-full animate-spin" />
                      <span className="font-black text-xs uppercase tracking-widest">Reading...</span>
                    </div>
                  </motion.div>
                ) : (
                  <motion.div
                    key="idle-btn"
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    className="group/hub w-full"
                  >
                    {!isLimitReached && <div className="absolute -inset-4 bg-cyan-500/10 blur-2xl rounded-full opacity-0 group-hover/hub:opacity-100 transition-opacity" />}
                    <div className={`relative flex items-center justify-center gap-4 px-8 sm:px-10 py-4 sm:py-5 rounded-2xl font-black text-xs uppercase tracking-[0.2em] transition-all shadow-xl shadow-cyan-500/5 ${isLimitReached ? "bg-white/5 text-gray-500" : "bg-white text-black transform active:scale-95 hover:bg-cyan-500 hover:text-white"}`}>
                      <HiOutlineDocumentArrowUp className="text-xl" />
                      <span>{isLimitReached ? "Limit Reached" : "Choose PDF"}</span>
                      <HiOutlineCubeTransparent className="text-lg opacity-40 ml-1 hidden sm:block" />
                    </div>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

          </div>

          <input
            type="file"
            ref={fileInputRef}
            onChange={handleFileChange}
            accept="application/pdf"
            className="hidden"
          />
        </div>
      </motion.div>
    </div>
  );
};

export default MagicResumePortal;
