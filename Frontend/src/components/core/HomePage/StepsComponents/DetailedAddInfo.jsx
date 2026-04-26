import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { BsCpuFill } from "react-icons/bs";
import { FiUser } from "react-icons/fi";
import { FaLink, FaFilePdf, FaGlobe, FaQuoteLeft, FaRegFileAlt, FaPlus, FaSearch, FaBolt, FaRegClock, FaFolderOpen } from "react-icons/fa";

const PersonalInfoContent = () => (
  <motion.div
    key="personal" initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
    className="w-full h-full flex flex-col gap-5 px-5 py-2 bg-black relative overflow-hidden hidden-scrollbar"
  >
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-orange-500/5 blur-[80px] pointer-events-none z-0"></div>

    <motion.div
      animate={{ y: [0, 0, -280] }}
      transition={{ duration: 4.5, ease: "easeInOut", times: [0, 0.4, 1] }}
      className="flex flex-col gap-5 w-full relative z-10"
    >
      <div className="w-full bg-[#141414] border border-white/10 rounded-[1rem] p-4 relative overflow-hidden flex items-center shadow-[0_10px_30px_rgba(0,0,0,0.5)] mt-3">
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.03)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.03)_1px,transparent_1px)] bg-[size:10px_10px]"></div>

        <div className="w-10 h-10 rounded-[0.6rem] bg-cyan-900/40 border border-cyan-500/30 flex items-center justify-center text-cyan-400 z-10 mr-4 shadow-inner">
          <BsCpuFill className="text-[14px]" />
        </div>

        <div className="flex flex-col z-10 flex-1">
          <span className="text-[5px] text-cyan-400 font-extrabold uppercase tracking-widest flex items-center gap-1 mb-0.5">AI MAGIC FILL <FaLink className="text-[4px]" /></span>
          <span className="text-[12px] font-black text-white italic tracking-tight">FILL YOUR INFO <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-indigo-300">FAST.</span></span>
          <span className="text-[6px] text-white/50 leading-tight w-[90%] mt-1 font-medium">Just drop your PDF resume here and we'll fill the form for you.</span>
        </div>

        <motion.div
          animate={{ scale: [1, 1.05, 1] }} transition={{ repeat: Infinity, duration: 2 }}
          className="z-10 bg-white text-black px-4 py-2.5 rounded-xl flex items-center gap-2 text-[6px] font-black shadow-[0_5px_15px_rgba(255,255,255,0.2)] shrink-0 cursor-pointer"
        >
          <FaFilePdf className="text-[8px]" /> CHOOSE PDF
        </motion.div>
      </div>

      <div className="text-2xl font-black text-white drop-shadow-md tracking-tight">
        Personal <span className="text-white/30 italic font-medium">Information</span>
      </div>

      {/* Basic Details Entry Form */}
      <div className="w-full bg-[#121212] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col">
        <div className="flex items-center gap-3 border-b border-white/5 pb-3">
          <div className="w-5 h-5 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-[8px]"><FiUser /></div>
          <div className="flex flex-col">
            <span className="text-[9px] font-black text-white tracking-wide">Basic Details</span>
            <span className="text-[5px] text-white/40 font-medium">Manage your public profile information</span>
          </div>
        </div>

        <div className="flex gap-4 mt-4">
          <div className="flex flex-col gap-1.5 w-[30%]">
            <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 ml-1">Profile Picture</span>
            <div className="w-full aspect-square rounded-xl border-2 border-dashed border-white/10 bg-white/5 flex flex-col items-center justify-center gap-1 opacity-70">
              <div className="w-6 h-6 rounded-md bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[10px] mb-1"><FaGlobe /></div>
              <span className="text-[4px] text-white/50 text-center px-2">Drag and drop or <span className="text-yellow-500">browse</span></span>
            </div>
          </div>
          <div className="flex flex-col gap-3 flex-1">
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 ml-1">First Name</span>
                <div className="h-7 bg-[#0a0a0a] border border-white/10 rounded-lg px-2 flex items-center text-[7px] font-bold text-white shadow-inner">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.5 }}>Harsh</motion.span>
                </div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 ml-1">Last Name</span>
                <div className="h-7 bg-[#0a0a0a] border border-white/10 rounded-lg px-2 flex items-center text-[7px] font-bold text-white shadow-inner">
                  <motion.span initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.8 }}>Vimal</motion.span>
                </div>
              </div>
            </div>
            <div className="flex gap-3">
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 ml-1">Email Address</span>
                <div className="h-7 bg-[#0a0a0a] border border-white/10 rounded-lg px-2 flex items-center text-[7px] font-bold text-white/40 shadow-inner">email@domain.com</div>
              </div>
              <div className="flex-1 flex flex-col gap-1.5">
                <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 ml-1">Phone Number</span>
                <div className="h-7 bg-[#0a0a0a] border border-white/10 rounded-lg px-2 flex items-center text-[7px] font-bold text-white/40 shadow-inner">+xx xxxxx xxxxx</div>
              </div>
            </div>
            <div className="flex flex-col gap-1.5 w-full">
              <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 ml-1">Professional Perspectives</span>
              <div className="h-7 bg-[#0a0a0a] border border-white/10 rounded-lg px-2 flex items-center text-[7px] font-bold text-white/40 shadow-inner w-full">e.g. Product Architect, UI Designer</div>
            </div>
          </div>
        </div>
      </div>

      {/* Biography & Resume Row */}
      <div className="flex gap-4 w-full">
        {/* Bio */}
        <div className="flex-[2] bg-[#121212] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-3">
            <div className="w-5 h-5 rounded-md bg-yellow-500/10 border border-yellow-500/20 flex items-center justify-center text-yellow-400 text-[8px]"><FaQuoteLeft /></div>
            <span className="text-[9px] font-black text-white tracking-wide">Biography</span>
          </div>
          <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 mb-2">Personal Narrative</span>
          <div className="flex-1 min-h-[40px] bg-[#0a0a0a] border border-white/10 rounded-lg p-2.5 text-[6px] text-white/30 font-medium">Tell us about yourself and your experience...</div>
        </div>

        {/* Resume */}
        <div className="flex-1 bg-[#121212] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col">
          <div className="flex items-center gap-3 border-b border-white/5 pb-3 mb-3">
            <div className="w-5 h-5 rounded-md bg-orange-500/10 border border-orange-500/20 flex items-center justify-center text-orange-400 text-[8px]"><FaRegFileAlt /></div>
            <span className="text-[9px] font-black text-white tracking-wide">Resume</span>
          </div>
          <span className="text-[5px] font-bold uppercase tracking-wider text-white/50 mb-2">Upload CV (PDF)</span>
          <div className="flex-1 border border-dashed border-white/10 rounded-xl bg-white/5 flex flex-col items-center justify-center gap-1.5 p-2 text-center opacity-80">
            <div className="w-6 h-6 rounded-md bg-yellow-500/20 text-yellow-500 flex items-center justify-center text-[10px] mb-1"><FaFilePdf /></div>
            <span className="text-[5px] text-white/60 font-medium">Drag or <span className="text-yellow-500">browse</span></span>
          </div>
        </div>
      </div>

      {/* Online Presence */}
      <div className="w-full bg-[#121212] border border-white/5 rounded-2xl p-4 shadow-xl flex flex-col mt-auto pb-4">
        <div className="flex items-center justify-between border-b border-white/5 pb-3 mb-3">
          <div className="flex items-center gap-3">
            <div className="w-5 h-5 rounded-md bg-blue-500/10 border border-blue-500/20 flex items-center justify-center text-blue-400 text-[8px]"><FaLink /></div>
            <div className="flex flex-col">
              <span className="text-[9px] font-black text-white tracking-wide">Online Presence</span>
              <span className="text-[5px] text-white/40 font-medium">Connect your portfolio with your external profiles</span>
            </div>
          </div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 text-[5px] text-white font-bold flex items-center gap-1.5 cursor-pointer hover:bg-white/10"><FaPlus className="text-white/50" /> Add link</div>
        </div>
        <div className="text-[6px] text-white/30 italic text-center py-6 font-medium">No links added yet. Connect social profiles to stand out.</div>
      </div>
    </motion.div>
  </motion.div>
);

const SkillsContent = () => (
  <motion.div key="skills" initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0 }} transition={{ duration: 0.5 }} className="w-full h-full flex flex-col gap-4 p-5 justify-center relative bg-black">
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[300px] h-[300px] bg-emerald-500/5 blur-[100px] pointer-events-none rounded-full"></div>
    {/* Header */}
    <div className="text-3xl font-black text-center mb-1 w-full flex justify-center text-white drop-shadow-md tracking-tight z-10">
      My <span className="text-white/30 italic font-medium ml-2">skills</span>
    </div>

    {/* 2 Col wrapper */}
    <div className="flex w-full flex-1 border border-emerald-900/40 rounded-[1.5rem] bg-[#09110d] shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_2px_20px_rgba(16,185,129,0.05)] overflow-hidden z-10">
      {/* Left Col - Select Skills */}
      <div className="flex-[1.5] p-5 flex flex-col gap-4 border-r border-emerald-900/40 relative">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg border border-emerald-500/20 bg-emerald-900/30 flex items-center justify-center text-emerald-500 text-[10px] shadow-inner"><FaSearch /></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white">Select Skills</span>
            <span className="text-[6px] text-white/50">Choose From Our Library</span>
          </div>
        </div>

        <div className="w-full h-8 rounded-xl border border-emerald-800/50 bg-[#050906] px-3 flex items-center justify-between shadow-inner mt-2">
          <span className="text-[6px] text-white/30 font-medium">Search for skills...</span>
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.8)]"></div>
        </div>

        <div className="flex flex-wrap gap-2 overflow-hidden relative mt-2 text-[6px] font-bold">
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-yellow-400 font-mono text-[7px]">JS</span> JavaScript</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-blue-400 font-mono text-[7px]">TS</span> TypeScript</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-blue-500 font-black text-[7px]">Py</span> Python</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-orange-500 text-[8px]">☕</span> Java</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-blue-600 font-black text-[7px]">C++</span> C++</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-purple-500 font-black text-[7px]">C#</span> C#</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-cyan-400 font-black text-[7px]">Go</span> Go</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-orange-600 font-black text-[7px]">Rs</span> Rust</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-indigo-400 font-black text-[7px]">PHP</span> PHP</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-red-500 font-black text-[7px]">Rb</span> Ruby</div>
          <div className="px-3 py-1.5 rounded-lg border border-white/10 bg-white/5 flex items-center gap-1.5 drop-shadow-lg"><span className="text-orange-400 font-black text-[7px]">Sw</span> Swift</div>
        </div>
      </div>

      {/* Right Col - Add Custom Skill */}
      <div className="flex-[1] p-5 flex flex-col gap-4 bg-[#0a120e]">
        <div className="flex items-center gap-2">
          <div className="w-7 h-7 rounded-lg border border-indigo-500/20 bg-indigo-900/30 flex items-center justify-center text-indigo-400 text-[10px] shadow-inner"><FaBolt /></div>
          <div className="flex flex-col">
            <span className="text-[10px] font-black text-white">Add Custom Skill</span>
            <span className="text-[6px] text-white/50">Add A Skill Not In Our List</span>
          </div>
        </div>

        <div className="flex flex-col gap-1.5 w-full mt-2">
          <span className="text-[5px] font-bold tracking-wider text-white/60 ml-0.5">Skill name</span>
          <div className="w-full h-8 rounded-xl border border-emerald-800/50 bg-[#050906] px-3 flex items-center text-[6px] text-white/30 shadow-inner">e.g. GraphQL</div>
        </div>

        <div className="flex flex-col gap-1.5 w-full flex-1">
          <span className="text-[5px] font-bold tracking-wider text-white/60 ml-0.5">Skill Icon</span>
          <div className="flex-1 rounded-xl border border-dashed border-white/10 bg-[#080d0a] flex flex-col items-center justify-center gap-1.5 opacity-90 relative overflow-hidden transition-all hover:border-emerald-500/50">
            <div className="w-8 h-8 rounded-xl bg-emerald-900/30 text-emerald-400 flex items-center justify-center text-[12px] mb-1 z-10"><FaGlobe /></div>
            <span className="text-[5px] font-bold text-white z-10">Drag and drop or <span className="text-emerald-400">browse</span></span>
            <span className="text-[4px] text-white/40 font-bold z-10">JPG, PNG only <span className="text-white/20">Max 5MB</span></span>
          </div>
        </div>

        <div className="w-full py-3 bg-white text-black text-center rounded-xl text-[7px] font-black mt-2 shadow-[0_5px_20px_rgba(255,255,255,0.15)] cursor-pointer hover:bg-gray-200 transition-colors">
          Add to list
        </div>
      </div>
    </div>
  </motion.div>
);

const DetailedAddInfo = () => {
  const [subStep, setSubStep] = useState(0);

  useEffect(() => {
    let isActive = true;
    const timer = setTimeout(() => {
      if (isActive) setSubStep(1);
    }, 4500); // Transitions to Skills after 4.5s
    return () => {
      isActive = false;
      clearTimeout(timer);
    };
  }, []);

  return (
    <motion.div
      key="step1"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      className="w-full h-full flex bg-black overflow-hidden rounded-[2.5rem] border border-white/5"
    >
      {/* Dynamic Sidebar */}
      <div className="w-[30%] h-full border-r border-white/5 bg-black py-6 px-3 flex flex-col gap-1 z-20 shadow-2xl relative">
        {/* Step 01 */}
        <div className={`p-2.5 flex items-center gap-3 relative rounded-xl border transition-all duration-500 ${subStep === 0 ? 'bg-[#1f160d] border-orange-500/30 shadow-md' : 'border-transparent opacity-30 blur-[0.5px]'}`}>
          {subStep === 0 && <motion.div layoutId="leftIndicator" className="absolute left-0 top-0 bottom-0 w-[2px] bg-orange-500"></motion.div>}
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-500 ${subStep === 0 ? 'bg-orange-500 text-black shadow-inner' : 'bg-white/5 border border-white/20 text-white'}`}><FiUser className="text-[10px] font-bold" /></div>
          <div className="flex flex-col">
            <span className={`text-[4px] font-black uppercase tracking-wider transition-colors ${subStep === 0 ? 'text-orange-500' : 'text-white/60'}`}>Step 01</span>
            <span className="text-[7px] text-white font-bold tracking-wide mt-0.5">Personal details</span>
          </div>
          {subStep === 1 && <div className="absolute right-3 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,1)]"></div>}
        </div>

        {/* Dimmed Steps */}
        <div className="p-2.5 flex items-center gap-3 opacity-30 mt-2">
          <div className="w-5 h-5 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-[8px]"><FaRegClock /></div>
          <div className="flex flex-col">
            <span className="text-[4px] font-bold uppercase tracking-wider text-white/60">Step 02</span><span className="text-[7px] text-white font-bold mt-0.5">Timeline</span>
          </div>
        </div>

        {/* Step 03 */}
        <div className={`p-2.5 flex items-center gap-3 relative rounded-xl border transition-all duration-500 ${subStep === 1 ? 'bg-emerald-500/10 border-emerald-500/30 shadow-md opacity-100' : 'border-transparent opacity-30'} mt-1`}>
          {subStep === 1 && <motion.div layoutId="leftIndicator" className="absolute left-0 top-0 bottom-0 w-[2px] bg-emerald-500"></motion.div>}
          <div className={`w-6 h-6 rounded-lg flex items-center justify-center transition-colors duration-500 ${subStep === 1 ? 'bg-emerald-400 text-black shadow-[0_0_15px_rgba(52,211,153,0.5)]' : 'bg-white/5 border border-white/20 text-white'}`}><FaBolt className="text-[10px] font-bold" /></div>
          <div className="flex flex-col">
            <span className={`text-[4px] font-black uppercase tracking-wider transition-colors ${subStep === 1 ? 'text-emerald-400' : 'text-white/60'}`}>Step 03</span>
            <span className="text-[7px] text-white font-bold tracking-wide mt-0.5">Skills</span>
          </div>
        </div>

        <div className="p-2.5 flex items-center gap-3 opacity-30 mt-1">
          <div className="w-5 h-5 rounded-lg border border-white/20 bg-white/5 flex items-center justify-center text-[8px]"><FaFolderOpen /></div>
          <div className="flex flex-col">
            <span className="text-[4px] font-bold uppercase tracking-wider text-white/60">Step 04</span><span className="text-[7px] text-white font-bold mt-0.5">Projects</span>
          </div>
        </div>

        <div className="mt-auto opacity-30 p-2 border border-white/10 rounded-xl flex items-center justify-between">
          <div className="flex flex-col">
            <span className="text-[5px] text-white/50">Total Progress</span>
            <span className="text-[8px] font-black text-white">{subStep === 0 ? '17%' : '50%'}</span>
          </div>
          <div className="w-6 h-6 rounded-full border-2 border-white/20 border-t-white"></div>
        </div>
      </div>

      {/* Main Dynamically Swapping Data Area */}
      <div className="w-[70%] h-full relative overflow-hidden bg-black">
        <AnimatePresence mode="wait">
          {subStep === 0 && <PersonalInfoContent />}
          {subStep === 1 && <SkillsContent />}
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

export default DetailedAddInfo;
