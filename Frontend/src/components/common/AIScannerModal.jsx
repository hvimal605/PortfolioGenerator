import React, { useState, useEffect, useMemo } from "react";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineSparkles } from "react-icons/hi2";

const AIScannerModal = () => {
    const { aiLoading, resumeFile } = useSelector((state) => state.portfolio);
    const [statusIndex, setStatusIndex] = useState(0);

    // Create a preview URL for the uploaded resume file
    const resumeUrl = useMemo(() => {
        if (!resumeFile || !(resumeFile instanceof File)) return null;
        return URL.createObjectURL(resumeFile);
    }, [resumeFile]);

    // Cleanup blob URL
    useEffect(() => {
        return () => {
            if (resumeUrl) URL.revokeObjectURL(resumeUrl);
        };
    }, [resumeUrl]);

    // Cycle status messages
    useEffect(() => {
        if (aiLoading) {
            const interval = setInterval(() => {
                setStatusIndex((prev) => (prev + 1) % 6);
            }, 3000);
            return () => clearInterval(interval);
        } else {
            setStatusIndex(0);
        }
    }, [aiLoading]);

    const statusMessages = [
        "Reading your resume...",
        "Finding your skills...",
        "Organizing your experience...",
        "Writing your profile...",
        "Checking your links...",
        "Everything is almost ready..."
    ];

    return (
        <AnimatePresence>
            {aiLoading && (
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    className="fixed inset-0 z-[9999] bg-[#020202]/95 backdrop-blur-3xl flex flex-col items-center justify-center p-6 text-center overflow-hidden"
                >
                    {/* 🧠 Subtle Atmospheric Glow */}
                    <div className="absolute inset-0 z-0 bg-[radial-gradient(circle_at_center,_rgba(6,182,212,0.08)_0%,_transparent_70%)]" />

                    {/* Background Blurred Resume (Very Subtle) */}
                    {resumeUrl && (
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 0.05 }}
                            className="absolute inset-0 z-0 overflow-hidden pointer-events-none"
                        >
                            <iframe
                                src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0`}
                                className="w-full h-full border-none filter blur-[100px] grayscale brightness-50 scale-150"
                                title="Atmospheric Resume"
                            />
                        </motion.div>
                    )}

                    <div className="relative z-20 flex flex-col items-center gap-12 max-w-7xl w-full h-full justify-center overflow-y-auto py-20 px-4">
                        
                        {/* 📱 Responsive Scanner Layout */}
                        <div className="relative flex flex-col xl:flex-row items-center gap-12 xl:gap-24 w-full h-fit justify-center">
                            
                            {/* 🚀 Fluid Document Frame */}
                            <motion.div 
                                initial={{ y: 20, opacity: 0 }}
                                animate={{ y: 0, opacity: 1 }}
                                className="relative group shrink-0 w-full max-w-[340px] xs:max-w-[420px] sm:max-w-[500px]"
                            >
                                {/* Static Glowing Border */}
                                <div className="absolute -inset-[1px] rounded-[2.1rem] sm:rounded-[3.1rem] bg-cyan-500/30 blur-[2px]" />
                                <div className="absolute -inset-[15px] bg-cyan-500/5 blur-[80px] rounded-full opacity-50" />
                                
                                <div className="relative aspect-[1/1.4] w-full bg-black/40 border border-white/10 rounded-[2rem] sm:rounded-[3rem] shadow-2xl overflow-hidden backdrop-blur-md">
                                    
                                    {/* Actual Resume Content (Responsive Fill) */}
                                    {resumeUrl && (
                                        <iframe
                                            src={`${resumeUrl}#toolbar=0&navpanes=0&scrollbar=0&view=FitH`}
                                            className="w-full h-[150%] border-none filter brightness-100 scale-[1.2] sm:scale-[1.3] origin-top"
                                            title="Main Resume Scan"
                                        />
                                    )}

                                    {/* ⚡ Clean Laser Line */}
                                    <motion.div
                                        animate={{ 
                                            top: `${[10, 30, 50, 70, 90, 100][statusIndex]}%` 
                                        }}
                                        transition={{ type: "spring", stiffness: 30, damping: 10 }}
                                        className="absolute left-0 w-full h-[2px] sm:h-[3px] bg-cyan-500 shadow-[0_0_25px_rgba(6,182,212,0.8)] z-30"
                                    >
                                        <div className="absolute right-0 top-1/2 -translate-y-1/2 w-2 h-2 sm:w-3 sm:h-3 bg-cyan-500 rounded-full blur-[2px] animate-pulse" />
                                    </motion.div>
                                </div>

                                {/* 📎 Clean Filename Badge */}
                                <div className="absolute -bottom-6 sm:-bottom-8 left-1/2 -translate-x-1/2 px-4 sm:px-8 py-2 sm:py-3 bg-black/80 backdrop-blur-xl rounded-xl sm:rounded-2xl border border-white/5 shadow-2xl flex items-center gap-2 sm:gap-3 w-[90%] sm:w-auto max-w-[300px] sm:min-w-[300px] justify-center text-cyan-500/80">
                                    <div className="w-2 h-2 rounded-full bg-cyan-500 animate-pulse shrink-0" />
                                    <p className="text-[10px] sm:text-[12px] font-bold truncate font-mono uppercase">
                                        {resumeFile?.name || "SOURCE_RESUME.PDF"}
                                    </p>
                                </div>
                            </motion.div>

                            {/* 📊 Responsive Status Area */}
                            <div className="flex flex-col items-center xl:items-start text-center xl:text-left space-y-8 sm:space-y-12 w-full max-w-[340px] xs:max-w-md">
                                <div className="space-y-4 sm:space-y-6">
                                    <div className="flex items-center gap-2 px-3 py-1 bg-cyan-500/10 border border-cyan-500/20 rounded-full w-fit mx-auto xl:mx-0">
                                        <span className="text-[9px] font-bold text-cyan-400 uppercase tracking-[0.2em]">AI Magic Fill Active</span>
                                    </div>
                                    
                                    <h2 className="text-5xl sm:text-7xl xl:text-8xl font-black text-white tracking-tighter uppercase leading-none italic">
                                        AI <span className="text-cyan-500">READ</span>
                                    </h2>
                                    
                                    <div className="h-8 flex items-center justify-center xl:justify-start border-b-2 xl:border-b-0 xl:border-l-2 border-cyan-500/20 pb-4 xl:pb-0 xl:pl-6">
                                        <AnimatePresence mode="wait">
                                            <motion.p
                                                key={statusIndex}
                                                initial={{ opacity: 0, y: 10 }}
                                                animate={{ opacity: 1, y: 0 }}
                                                exit={{ opacity: 0, y: -10 }}
                                                className="text-[14px] sm:text-[16px] font-bold text-white/90 italic uppercase tracking-wider"
                                            >
                                                {statusMessages[statusIndex]}
                                            </motion.p>
                                        </AnimatePresence>
                                    </div>
                                </div>

                                <div className="w-full space-y-6 sm:space-y-8">
                                    <div className="w-full bg-white/5 h-1 sm:h-[4px] rounded-full overflow-hidden">
                                        <motion.div
                                            initial={{ width: "0%" }}
                                            animate={{ width: "100%" }}
                                            transition={{ duration: 40, ease: "linear" }}
                                            className="h-full bg-cyan-500 shadow-[0_0_15px_rgba(6,182,212,1)]"
                                        />
                                    </div>

                                    <div className="bg-white/[0.02] border border-white/5 px-6 sm:px-8 py-4 sm:py-6 rounded-2xl sm:rounded-3xl flex items-center gap-4 sm:gap-6 backdrop-blur-sm">
                                        <div className="w-10 h-10 sm:w-14 sm:h-14 rounded-xl sm:rounded-2xl bg-cyan-500/10 flex items-center justify-center shrink-0">
                                            <HiOutlineSparkles className="text-cyan-400 text-xl sm:text-3xl animate-pulse" />
                                        </div>
                                        <div className="space-y-1 text-left">
                                            <p className="text-[10px] sm:text-[12px] text-white font-bold uppercase tracking-wide italic">One moment...</p>
                                            <p className="text-[9px] sm:text-[11px] text-gray-500 font-medium leading-relaxed">
                                                We're reading your resume to fill the form for you.
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* 🎬 Subtle Footer */}
                    <div className="absolute bottom-10 left-1/2 -translate-x-1/2 flex items-center gap-6 opacity-30">
                         <span className="text-[9px] font-bold text-white uppercase tracking-widest">Fast & Secure</span>
                         <div className="h-3 w-[1px] bg-white/20" />
                         <span className="text-[9px] font-bold text-white uppercase tracking-widest">Powered by AI</span>
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    );
};

export default AIScannerModal;
