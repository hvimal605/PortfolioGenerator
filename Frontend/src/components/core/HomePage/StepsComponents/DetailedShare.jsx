import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaCopy, FaThLarge } from "react-icons/fa";

const DetailedShare = () => (
  <motion.div
    key="step3"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex flex-col items-center justify-center p-6 relative bg-[#050505] overflow-hidden"
  >
    {/* Fake Confetti Background */}
    <div className="absolute inset-0 z-0 pointer-events-none opacity-40">
      {[...Array(20)].map((_, i) => (
        <motion.div
          key={i}
          initial={{ y: -50, x: Math.random() * 400 - 200, rotate: 0 }}
          animate={{ y: 600, rotate: 360 }}
          transition={{ duration: 4 + Math.random() * 3, repeat: Infinity, ease: "linear", delay: Math.random() * 2 }}
          className={`absolute top-0 w-2 h-2 ${['bg-yellow-400', 'bg-blue-400', 'bg-pink-400', 'bg-emerald-400'][i % 4]}`}
          style={{ left: '50%' }}
        />
      ))}
    </div>

    {/* Big Checkmark */}
    <motion.div
      initial={{ scale: 0 }} animate={{ scale: 1 }} transition={{ type: "spring", delay: 0.2 }}
      className="w-14 h-14 rounded-2xl bg-emerald-400 text-white flex items-center justify-center text-2xl mb-4 shadow-[0_0_40px_rgba(52,211,153,0.4)] z-10"
    >
      <FaCheck />
    </motion.div>

    <div className="text-[2rem] font-black mb-1 z-10 tracking-tight">Your site is <span className="text-emerald-400">live!</span> 🎉</div>
    <div className="text-[7px] text-white/50 text-center max-w-[70%] mb-8 z-10 font-medium leading-relaxed">
      Share this link with recruiters, friends, or anyone. <br /> Your work is now visible to the entire world.
    </div>

    {/* URL Input Box */}
    <motion.div
      initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.5 }}
      className="w-full max-w-[85%] bg-[#121212] border border-white/5 rounded-[1rem] p-3 flex items-center justify-between shadow-[0_20px_40px_rgba(0,0,0,0.5)] z-10"
    >
      <div className="flex items-center gap-3">
        <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 shadow-[0_0_10px_rgba(52,211,153,1)] ml-1"></div>
        <span className="text-indigo-400 font-mono text-[9px] font-bold">https://harsh-9pdt.netlify.app</span>
      </div>
      <div className="w-7 h-7 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center text-white/50 cursor-pointer hover:bg-white/10 transition-colors">
        <FaCopy className="text-[10px]" />
      </div>
    </motion.div>

    {/* Action Buttons */}
    <div className="flex w-full max-w-[85%] gap-3 mt-4 z-10">
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.7 }}
        className="flex-1 bg-gradient-to-r from-indigo-500 to-blue-500 rounded-xl py-3 flex items-center justify-center text-[8px] font-black text-white shadow-[0_10px_20px_rgba(99,102,241,0.4)] cursor-pointer"
      >
        Visit Your Site ✨
      </motion.div>
      <motion.div
        initial={{ y: 20, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.8 }}
        className="flex-1 bg-[#151515] border border-white/5 rounded-xl py-3 flex items-center justify-center text-[8px] font-black text-white gap-2 cursor-pointer hover:bg-white/5"
      >
        <FaThLarge className="text-[10px]" /> My Dashboard
      </motion.div>
    </div>

    <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 1 }} className="mt-8 text-[5px] text-white/30 z-10 font-bold">
      You can always edit or redeploy from your dashboard
    </motion.div>
  </motion.div>
);

export default DetailedShare;
