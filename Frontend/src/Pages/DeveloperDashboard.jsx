import { useState, useEffect } from "react";
import { MdDashboard, MdLibraryBooks } from "react-icons/md";
import { FaFileUpload } from "react-icons/fa";
import { FiSettings } from "react-icons/fi";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import Dashboard from "../components/core/Developer/Dashboard";
import MyTemplates from "../components/core/Developer/MyTemplates";
import DeveloperUpload from "./DevloperUpload";
import Settings from "../components/core/Setting/Settings";
import { motion, AnimatePresence } from "framer-motion";

const tabs = [
  { tab: "Dashboard", icon: <MdDashboard className="mr-2" /> },
  { tab: "My Templates", icon: <MdLibraryBooks className="mr-2" /> },
  { tab: "Upload", icon: <FaFileUpload className="mr-2" /> },
  { tab: "Settings", icon: <FiSettings className="mr-2" /> },
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
    <div className="flex flex-col md:flex-row h-[94vh] bg-gradient-to-br from-black via-gray-900 to-black text-white">

      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-black/80 border-b border-white/10 mt-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400">
          Developer Dashboard
        </h2>
        <motion.button
          whileTap={{ scale: 0.9 }}
          onClick={() => setSidebarOpen(!sidebarOpen)}
          className="transition duration-300"
        >
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
                transition={{ duration: 0.3 }}
              >
                <IoMdClose className="text-3xl text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <IoMdMenu className="text-3xl text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Sidebar */}
      <AnimatePresence>
        {(sidebarOpen || !isMobile) && (
          <motion.aside
            key="sidebar"
            initial={{ x: -300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: -300, opacity: 0 }}
            transition={{ type: "tween", duration: 0.3 }}
            className={`fixed md:static top-0 left-0 z-50 h-full md:h-[94vh] bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.05)] p-6 border-r border-white/10 
            w-[60vw] md:w-64 transition-all duration-300`}
          >
            <h2 className="hidden md:block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-400 to-purple-400 uppercase tracking-wide text-center mb-8 mt-3">
              Developer Dashboard
            </h2>

            <nav className="space-y-4 mt-16 md:mt-0">
              {tabs.map(({ tab, icon }) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    if (isMobile) setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500/20 via-cyan-500/10 to-blue-500/20 border border-purple-500 text-purple-300 scale-105 shadow-[0_0_15px_rgba(128,0,255,0.3)]"
                      : "hover:bg-white/5 text-white/70 hover:text-white"
                  }`}
                >
                  {icon} {tab}
                </button>
              ))}
            </nav>
          </motion.aside>
        )}
      </AnimatePresence>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-black/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "My Templates" && <MyTemplates />}
          {activeTab === "Upload" && <DeveloperUpload />}
          {activeTab === "Settings" && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default DeveloperDashboard;
