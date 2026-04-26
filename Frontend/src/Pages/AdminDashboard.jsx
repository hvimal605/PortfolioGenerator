import { useState } from "react";
import { HiOutlineSquares2X2, HiOutlineEnvelope, HiOutlineDocumentCheck, HiOutlinePlusCircle, HiOutlineCog6Tooth } from "react-icons/hi2";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import Dashboard from "../components/core/Admin/Dashboard";
import TemplateRequest from "../components/core/Admin/TemplateRequests";
import CreateTemplate from "../components/core/Admin/CreateTemplate";
import Settings from "../components/core/Setting/Settings";
import PlatformMessages from "../components/core/Admin/PlatformMessages";

const tabs = [
  { id: "Dashboard", label: "Admin Stats", icon: <HiOutlineSquares2X2 /> },
  { id: "Template Requests", label: "Review Submissions", icon: <HiOutlineDocumentCheck /> },
  { id: "Platform Messages", label: "Message Center", icon: <HiOutlineEnvelope /> },
  { id: "Template Create", label: "Build Template", icon: <HiOutlinePlusCircle /> },
  { id: "Settings", label: "Control Panel", icon: <HiOutlineCog6Tooth /> },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex h-[88vh] bg-[#050505] text-white relative overflow-hidden font-sans selection:bg-indigo-500/30">

      {/* Cinematic Background Elements */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full pointer-events-none animate-pulse"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[30%] h-[30%] bg-fuchsia-500/5 blur-[100px] rounded-full pointer-events-none"></div>

      {/* Mobile Trigger */}
      <div className="md:hidden fixed top-6 right-6 z-[100]">
        <button
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="w-12 h-12 bg-white/5 backdrop-blur-xl border border-white/10 rounded-2xl flex items-center justify-center text-white"
        >
          {sidebarOpen ? <IoMdClose className="text-2xl" /> : <IoMdMenu className="text-2xl" />}
        </button>
      </div>

      {/* Sidebar - Ultra Minimalist Glass Pill */}
      <aside className={`fixed md:relative inset-y-0 left-0 z-50 w-72 md:w-80 p-8 flex flex-col transition-transform duration-500 ease-[0.16, 1, 0.3, 1] md:translate-x-0 ${sidebarOpen ? 'translate-x-0' : '-translate-x-full'}`}>
        <div className="bg-[#0A0A0A]/40 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] h-full w-full flex flex-col p-6 shadow-[0_20px_50px_rgba(0,0,0,0.5)]">
          <div className="mb-12 px-4 mt-4">
            <h1 className="text-2xl font-black tracking-tighter text-white">
              Admin <span className="text-white/30 italic">Hub</span>
            </h1>
            <p className="text-[10px] font-black uppercase tracking-[0.3em] text-white/20 mt-1">Platform Control</p>
          </div>

          <nav className="flex-1 space-y-3">
            {tabs.map(({ id, label, icon }) => (
              <button
                key={id}
                onClick={() => {
                  setActiveTab(id);
                  setSidebarOpen(false);
                }}
                className={`group relative flex items-center w-full px-5 py-4 rounded-2xl transition-all duration-300 ${activeTab === id
                    ? "bg-white/5 text-white"
                    : "text-zinc-500 hover:text-white hover:bg-white/5"
                  }`}
              >
                <span className={`text-xl mr-4 transition-all duration-300 ${activeTab === id ? 'text-indigo-400 scale-110 drop-shadow-[0_0_10px_rgba(129,140,248,0.5)]' : 'group-hover:text-white group-hover:scale-110'}`}>
                  {icon}
                </span>
                <span className="text-sm font-bold tracking-tight">{label}</span>

                {activeTab === id && (
                  <motion.div
                    layoutId="sidebar-pill"
                    className="absolute left-0 w-1 h-6 bg-indigo-500 rounded-full shadow-[0_0_15px_rgba(129,140,248,1)]"
                  />
                )}
              </button>
            ))}
          </nav>

          
        </div>
      </aside>

      {/* Main Content Area */}
      <main className="flex-1 h-screen overflow-y-auto px-6 md:px-12 py-8 md:py-12 scrollbar-none">
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          className="max-w-[1400px] mx-auto"
        >
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Template Requests" && <TemplateRequest />}
          {activeTab === "Platform Messages" && <PlatformMessages />}
          {activeTab === "Template Create" && <CreateTemplate />}
          {activeTab === "Settings" && <Settings />}
        </motion.div>
      </main>

    </div>
  );
};

export default AdminDashboard;
