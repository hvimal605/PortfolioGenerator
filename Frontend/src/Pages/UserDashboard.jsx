import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import {
  HiOutlineDocumentDuplicate,
  HiOutlineViewColumns,
  HiOutlinePencilSquare,
  HiOutlinePlusCircle,
  HiOutlineChartBar,
  HiOutlineCog8Tooth,
  HiOutlineSparkles,
  HiOutlineUser
} from "react-icons/hi2";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { motion, AnimatePresence } from "framer-motion";

import MessagingInsights from "../components/core/UserDashboard/MessagingInsights.jsx";
import MyPortfolios from "../components/core/UserDashboard/MyPortfolios";
import ManagePortfolios from "../components/core/UserDashboard/ManagePortfolios.jsx";
import AddMoreInPortfolio from "../components/core/UserDashboard/AddDetailsInPorfolio/AddMoreInPortfolio.jsx";
import Settings from "../components/core/Setting/Settings.jsx";
import MyTemplates from "../components/core/UserDashboard/MyTemplates.jsx";

const tabs = [
  { tab: "My Portfolios", icon: <HiOutlineDocumentDuplicate className="text-[1.3rem]" /> },
  { tab: "My Templates", icon: <HiOutlineViewColumns className="text-[1.3rem]" /> },
  { tab: "Edit Portfolio", icon: <HiOutlinePencilSquare className="text-[1.3rem]" /> },
  { tab: "Add Details", icon: <HiOutlinePlusCircle className="text-[1.3rem]" /> },
  { tab: "Insights", icon: <HiOutlineChartBar className="text-[1.3rem]" /> },
  { tab: "Settings", icon: <HiOutlineCog8Tooth className="text-[1.3rem]" /> },
];

const UserDashboard = () => {
  const location = useLocation();
  const [activeTab, setActiveTab] = useState(location.state?.activeTab || "My Portfolios");
  const [sidebarOpen, setSidebarOpen] = useState(false);
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    if (location.state?.activeTab) {
      setActiveTab(location.state.activeTab);
    }
  }, [location.state]);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return (
    <div className="relative h-[88vh] w-full bg-[#050505] text-neutral-200 overflow-hidden font-sans selection:bg-purple-500/30 selection:text-white">

      {/* --- HYPER-MODERN BACKGROUND --- */}
      <div className="absolute inset-0 z-0 overflow-hidden pointer-events-none">
        {/* Animated Grid SVG to give depth */}
        <div
          className="absolute inset-0 z-0 opacity-20"
          style={{
            backgroundImage: `radial-gradient(circle at center, #ffffff 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
            transform: 'perspective(1000px) rotateX(60deg) scale(2.5) translateY(-20%)',
            maskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)',
            WebkitMaskImage: 'linear-gradient(to bottom, black 10%, transparent 80%)'
          }}
        ></div>

        {/* Deep space radial glow */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-[#1d1033] via-[#050505] to-[#050505] opacity-80"></div>

        {/* Intense Neon Orbs with Framer Motion */}
        <motion.div
          animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.3, 0.15] }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[-20%] left-[10%] w-[40vw] h-[40vw] bg-fuchsia-600 rounded-full blur-[160px] mix-blend-screen"
        />
        <motion.div
          animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.25, 0.1] }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[-10%] right-[-5%] w-[45vw] h-[45vw] bg-blue-600 rounded-full blur-[180px] mix-blend-screen"
        />

        {/* Film Grain & Scanline Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-multiply"></div>
        <motion.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 pointer-events-none h-1/2 w-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent opacity-20"
        />
      </div>

      {/* --- MAIN LAYOUT --- */}
      <div className="relative z-10 flex flex-col md:flex-row h-full p-3 md:p-6 md:pr-0 gap-6">

        {/* Mobile Header elements */}
        <div className="md:hidden flex items-center justify-between px-6 py-4 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-2xl shadow-2xl shrink-0">
          <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-2">
            <HiOutlineSparkles className="text-purple-400" /> Dashboard
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
              className={`fixed md:relative top-24 md:top-0 left-4 md:left-0 z-50 md:z-10 w-[75vw] md:w-80 h-[80vh] md:h-full flex flex-col bg-[#0a0a0a]/70 backdrop-blur-[40px] border-t border-l border-r border-white/10 border-b border-black rounded-[2rem] shadow-[0_8px_32px_rgba(0,0,0,0.5),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden transition-all`}
            >
              <div className="p-8 hidden md:flex items-center gap-3 shrink-0">
                <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-purple-500 to-indigo-600 shadow-[0_0_15px_rgba(168,85,247,0.5)]">
                  <HiOutlineSparkles className="text-white text-xl" />
                  <div className="absolute inset-0 rounded-xl bg-white/20 mix-blend-overlay"></div>
                </div>
                <h2 className="text-2xl font-bold tracking-tight bg-clip-text text-transparent bg-gradient-to-r from-white to-white/60">
                  Dashboard
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto py-2 px-5 [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] flex flex-col gap-2 mt-4 md:mt-0 pb-4">
                <div className="text-xs font-semibold text-white/30 uppercase tracking-[0.2em] mb-2 px-4">Menu</div>

                {tabs.map(({ tab, icon }, index) => {
                  const isActive = activeTab === tab || (activeTab === "Edit Porfolio" && tab === "Edit Portfolio") || (activeTab === "Messages & Insights" && tab === "Insights");

                  return (
                    <motion.button
                      key={tab}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: index * 0.05 }}
                      onClick={() => {
                        if (tab === "Edit Portfolio") setActiveTab("Edit Porfolio");
                        else if (tab === "Insights") setActiveTab("Messages & Insights");
                        else setActiveTab(tab);
                        if (isMobile) setSidebarOpen(false);
                      }}
                      className={`group relative flex items-center w-full px-4 py-3 rounded-2xl font-medium transition-all duration-500 overflow-hidden ${isActive
                          ? "text-white bg-white/[0.04] border border-white/[0.05] shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                          : "text-neutral-500 hover:text-white border border-transparent"
                        }`}
                    >
                      {/* Active Tab Glow & Background indicator */}
                      {isActive && (
                        <motion.div
                          layoutId="activeTabLaser"
                          className="absolute left-0 top-1/4 bottom-1/4 w-[3px] bg-gradient-to-b from-fuchsia-400 to-purple-600 rounded-r-md shadow-[0_0_10px_rgba(192,38,211,0.8)] z-20"
                          transition={{ type: "spring", stiffness: 300, damping: 30 }}
                        />
                      )}

                      <div className="relative z-10 flex items-center gap-4 w-full">
                        {/* Premium Icon Bounding Box effect */}
                        <div className={`relative flex items-center justify-center w-11 h-11 rounded-[0.85rem] transition-all duration-500 overflow-hidden shrink-0 ${isActive
                            ? "bg-gradient-to-br from-fuchsia-600/20 to-purple-600/20 border border-fuchsia-500/50 shadow-[0_0_20px_rgba(217,70,239,0.3)] text-fuchsia-300"
                            : "bg-[#111111] border border-white/5 text-neutral-400 group-hover:text-white group-hover:border-white/20 group-hover:bg-[#1a1a1a]"
                          }`}>
                          {isActive && (
                            <>
                              <div className="absolute inset-0 bg-white/10 mix-blend-overlay"></div>
                              <motion.div 
                                animate={{ scale: [1, 1.2, 1], opacity: [0.5, 0.8, 0.5] }}
                                transition={{ duration: 2, repeat: Infinity }}
                                className="absolute inset-0 bg-fuchsia-500/10 blur-md"
                              />
                            </>
                          )}
                          <span className={`relative z-10 transition-transform duration-300 ${isActive ? "scale-110 drop-shadow-[0_0_8px_rgba(232,121,249,0.8)]" : "group-hover:scale-105"}`}>
                            {icon}
                          </span>
                        </div>
                        <span className={`tracking-wide text-[0.95rem] font-semibold transition-colors duration-300 whitespace-nowrap overflow-hidden text-ellipsis ${isActive ? 'text-white' : 'text-neutral-500 group-hover:text-neutral-200'}`}>{tab}</span>
                      </div>

                    </motion.button>
                  )
                })}
              </div>

            </motion.aside>
          )}
        </AnimatePresence>

        {/* --- MAIN CONTENT AREA --- */}
        <main className="flex-1 w-full h-[80vh] md:h-full relative isolate flex flex-col bg-[#0a0a0a]/60 backdrop-blur-[40px] border border-white/10 md:border-r-0 rounded-[2rem] md:rounded-r-none shadow-[0_0_40px_rgba(0,0,0,0.8),inset_0_1px_0_rgba(255,255,255,0.1)] overflow-hidden">

          {/* Subtle top light effect */}
          <div className="absolute top-0 left-1/4 w-1/2 h-[1px] bg-gradient-to-r from-transparent via-white/30 to-transparent"></div>
          <div className="absolute top-0 left-1/4 w-1/2 h-[50px] bg-gradient-to-b from-white/[0.03] to-transparent blur-md"></div>



          {/* Dynamic Content */}
          <div className="flex-1 overflow-y-auto p-4 md:pl-10 md:pt-10 md:pb-16 md:pr-10 relative z-10 scroll-smooth [&::-webkit-scrollbar]:w-2.5 [&::-webkit-scrollbar-track]:bg-black/20 [&::-webkit-scrollbar-thumb]:bg-white/10 hover:[&::-webkit-scrollbar-thumb]:bg-white/20">
            <AnimatePresence mode="wait">
              <motion.div
                key={activeTab}
                initial={{ opacity: 0, y: 30, filter: 'blur(10px)' }}
                animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
                exit={{ opacity: 0, y: -30, filter: 'blur(10px)' }}
                transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                className="max-w-7xl mx-auto h-full"
              >
                {activeTab === "My Portfolios" && <MyPortfolios />}
                {activeTab === "My Templates" && <MyTemplates />}
                {activeTab === "Edit Porfolio" && <ManagePortfolios />}
                {activeTab === "Add Details" && <AddMoreInPortfolio />}
                {activeTab === "Messages & Insights" && <MessagingInsights />}
                {activeTab === "Settings" && <Settings />}
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Bottom subtle gradient to indicate scrolling */}
          <div className="absolute bottom-0 left-0 w-full h-12 bg-gradient-to-t from-[#0a0a0a] to-transparent pointer-events-none z-20"></div>
        </main>

      </div>
    </div>
  );
};

export default UserDashboard;
