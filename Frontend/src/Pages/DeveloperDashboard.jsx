import { useEffect, useState } from "react";
import {
  HiOutlineSquare2Stack,
  HiOutlineViewColumns,
  HiOutlineCloudArrowUp,
  HiOutlineCog8Tooth,
  HiOutlineCommandLine,
  HiOutlineSparkles
} from "react-icons/hi2";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

import Dashboard from "../components/core/Developer/Dashboard";
import MyTemplates from "../components/core/Developer/MyTemplates";
import DeveloperUpload from "./DevloperUpload";
import Settings from "../components/core/Setting/Settings";

const tabs = [
  { tab: "Dashboard", icon: <HiOutlineCommandLine className="text-[1.3rem]" /> },
  { tab: "My Templates", icon: <HiOutlineViewColumns className="text-[1.3rem]" /> },
  { tab: "Upload", icon: <HiOutlineCloudArrowUp className="text-[1.3rem]" /> },
  { tab: "Settings", icon: <HiOutlineCog8Tooth className="text-[1.3rem]" /> },
];

const DeveloperDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-[88vh] w-full bg-[#020202] text-neutral-200 overflow-hidden font-sans selection:bg-cyan-500/30 selection:text-white">

      {/* --- CINEMATIC DEVELOPER BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Technical Grid for Developer feel */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at center, rgba(255,255,255,0.1) 1px, transparent 1px)`,
            backgroundSize: '32px 32px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-20%)',
            maskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)'
          }}
        ></div>

        {/* Deep space radial glow with Cyan/Indigo undertones */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#0c1a2b] via-[#020202] to-[#020202] opacity-80"></div>

        {/* Intense Neon Orbs (Cyan/Indigo) */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.1, 0.2, 0.1] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[10%] w-[40vw] h-[40vw] bg-cyan-600 rounded-full blur-[160px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.08, 0.15, 0.08] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-indigo-600 rounded-full blur-[180px] mix-blend-screen"
        />

        {/* Film Grain Texture */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-multiply"></div>
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 flex flex-col md:flex-row h-full p-3 md:p-6 md:pr-0 gap-6">

        {/* Mobile Header elements */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shrink-0">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2 uppercase tracking-widest text-xs">
            <HiOutlineCommandLine className="text-cyan-400" /> Dev Dashboard
          </h2>
          <button
            onClick={() => setSidebarOpen(!sidebarOpen)}
            className="p-2 rounded-full bg-white/5 border border-white/10 text-white transition-all hover:bg-white/10"
          >
            {sidebarOpen ? <RxCross2 className="text-2xl" /> : <RxHamburgerMenu className="text-2xl" />}
          </button>
        </div>

        {/* --- SIDEBAR --- */}
        <AnimatePresence>
          {(sidebarOpen || !isMobile) && (
            <motion.aside
              key="sidebar"
              initial={isMobile ? { x: -300, opacity: 0 } : false}
              animate={{ x: 0, opacity: 1 }}
              exit={isMobile ? { x: -300, opacity: 0 } : undefined}
              transition={{ type: "spring", stiffness: 200, damping: 25 }}
              className={`fixed md:relative top-24 md:top-0 left-4 md:left-0 z-50 md:z-10 w-[75vw] md:w-80 h-[80vh] md:h-full flex flex-col bg-[#050505]/70 backdrop-blur-[40px] border border-white/10 rounded-[2.5rem] shadow-[0_8px_32px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden transition-all`}
            >
              <div className="p-8 hidden md:flex items-center gap-3 shrink-0">
                <div className="relative flex items-center justify-center w-11 h-11 rounded-2xl bg-gradient-to-br from-cyan-500 to-indigo-600 shadow-[0_0_20px_rgba(34,211,238,0.4)] transition-transform hover:scale-105 duration-500">
                  <HiOutlineCommandLine className="text-white text-2xl" />
                  <div className="absolute inset-0 rounded-2xl bg-white/20 mix-blend-overlay"></div>
                </div>
                <div>
                  <h2 className="text-2xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-white via-white to-white/40">
                    Developer
                  </h2>
                  <div className="text-[9px] font-black tracking-[0.3em] text-cyan-500 uppercase mt-[-4px]">Workspace</div>
                </div>
              </div>

              <div className="flex-1 overflow-y-auto py-2 px-6 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-3 mt-4 md:mt-4 pb-4">
                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.3em] mb-2 px-4 italic">Core Modules</div>

                {tabs.map(({ tab, icon }, index) => {
                  const isActive = activeTab === tab;

                  return (
                    <motion.button
                      key={tab}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        setActiveTab(tab);
                        if (isMobile) setSidebarOpen(false);
                      }}
                      className={`group relative flex items-center w-full px-4 py-3 rounded-2xl font-medium transition-all duration-500 overflow-hidden ${isActive
                        ? "text-white bg-white/[0.04] border border-white/[0.05] shadow-[0_4px_20px_rgba(0,0,0,1)]"
                        : "text-neutral-500 hover:text-white border border-transparent"
                        }`}
                    >
                      {/* Active Tab Laser */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabLaser"
                          className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-cyan-400 to-indigo-600 rounded-r-md shadow-[0_0_15px_rgba(34,211,238,0.8)] z-20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-4 w-full">
                        {/* Premium Icon Bounding Box */}
                        <div className={`relative flex items-center justify-center w-12 h-12 rounded-[1rem] transition-all duration-500 overflow-hidden shrink-0 ${isActive
                          ? "bg-gradient-to-br from-cyan-600/20 to-indigo-600/20 border border-cyan-500/50 shadow-[0_0_30px_rgba(34,211,238,0.2)] text-white"
                          : "bg-[#0a0a0a] border border-white/5 text-neutral-500 group-hover:text-white group-hover:border-white/20 group-hover:bg-[#111111]"
                          }`}>
                          {isActive && (
                            <>
                              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                              <motion.div
                                animate={{ scale: [1, 1.2, 1], opacity: [0.3, 0.6, 0.3] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-cyan-500/10 blur-xl"
                              />
                            </>
                          )}
                          <span className={`relative z-10 transition-transform duration-500 ${isActive ? "scale-110 drop-shadow-[0_0_12px_rgba(34,211,238,0.8)]" : "group-hover:scale-110"}`}>
                            {icon}
                          </span>
                        </div>
                        <span className={`tracking-widest text-[11px] font-black uppercase transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-300'}`}>{tab}</span>
                      </div>
                    </motion.button>
                  )
                })}
              </div>

            </motion.aside>
          )}
        </AnimatePresence>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 w-full h-[80vh] md:h-full relative isolate flex flex-col bg-[#050505]/60 backdrop-blur-[60px] border border-white/10 md:border-r-0 rounded-[2.5rem] md:rounded-r-none shadow-[0_0_60px_rgba(0,0,0,1),inset_0_1px_0_rgba(255,255,255,0.05)] overflow-hidden">

          {/* Top light slash accent */}
          <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-cyan-500/30 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-[100px] bg-gradient-to-b from-cyan-500/[0.03] to-transparent blur-3xl"></div>

          {/* Content Entry with Blur Mask */}
          <div className="flex-1 overflow-y-auto p-6 md:p-12 relative z-10 scroll-smooth [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-white/5 hover:[&::-webkit-scrollbar-thumb]:bg-white/10">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto h-full"
              >
                {activeTab === "Dashboard" && <Dashboard />}
                {activeTab === "My Templates" && <MyTemplates />}
                {activeTab === "Upload" && <DeveloperUpload />}
                {activeTab === "Settings" && <Settings />}
              </motion.div>
            </AnimatePresence>
          </div>

          <div className="absolute bottom-0 left-0 w-full h-24 bg-gradient-to-t from-[#050505] to-transparent pointer-events-none z-20"></div>
        </main>

      </div>
    </div>
  );
};

export default DeveloperDashboard;
