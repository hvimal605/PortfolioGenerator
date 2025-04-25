import { useState } from "react";
import { MdLibraryBooks, MdOutlineMessage } from "react-icons/md";
import { FiSettings } from "react-icons/fi";
import { FaPlusCircle } from "react-icons/fa";
import { IoMdMenu, IoMdClose } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";

import Dashboard from "../components/core/Admin/Dashboard";
import TemplateRequest from "../components/core/Admin/TemplateRequests";
import CreateTemplate from "../components/core/Admin/CreateTemplate";
import Settings from "../components/core/Setting/Settings";

const tabs = [
  { tab: "Dashboard", icon: <MdLibraryBooks className="mr-2" /> },
  { tab: "Template Requests", icon: <MdOutlineMessage className="mr-2" /> },
  { tab: "Template Create", icon: <FaPlusCircle className="mr-2" /> },
  { tab: "Settings", icon: <FiSettings className="mr-2" /> },
];

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState("Dashboard");
  const [sidebarOpen, setSidebarOpen] = useState(false);

  return (
    <div className="flex flex-col md:flex-row h-[94vh] bg-gradient-to-br from-black via-gray-900 to-black text-white relative overflow-hidden ">
      
      {/* Mobile Header */}
      <div className="md:hidden flex items-center justify-between px-4 py-4 bg-black/80 border-b border-white/10 mt-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400">
          Admin Dashboard
        </h2>
        <motion.button whileTap={{ scale: 0.9 }} onClick={() => setSidebarOpen(!sidebarOpen)}>
          <AnimatePresence mode="wait">
            {sidebarOpen ? (
              <motion.div
                key="close"
                initial={{ opacity: 0, rotate: -90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: 90 }}
              >
                <IoMdClose className="text-3xl text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
              >
                <IoMdMenu className="text-3xl text-white" />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.button>
      </div>

      {/* Animated Sidebar for mobile */}
      <AnimatePresence>
        {sidebarOpen && (
          <motion.aside
            initial={{ x: "-100%" }}
            animate={{ x: 0 }}
            exit={{ x: "-100%" }}
            transition={{ type: "spring", bounce: 0.2, duration: 0.4 }}
            className="fixed top-20 left-0 w-[70%] h-full z-50 bg-black/70 backdrop-blur-md border-r border-white/10 p-6 shadow-2xl md:hidden "
          >
           
            <nav className="space-y-4">
              {tabs.map(({ tab, icon }) => (
                <button
                  key={tab}
                  onClick={() => {
                    setActiveTab(tab);
                    setSidebarOpen(false);
                  }}
                  className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                    activeTab === tab
                      ? "bg-gradient-to-r from-purple-500/20 via-green-500/10 to-blue-500/20 border border-purple-500 text-purple-300 scale-105 shadow-[0_0_15px_rgba(128,0,255,0.3)]"
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

      {/* Sidebar for desktop */}
      <aside className="hidden md:block w-64 p-6 border-r border-white/10 bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.05)] h-screen">
        <h2 className="text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-blue-400 to-purple-400 uppercase tracking-wide text-center mb-8 mt-4">
          Admin Dashboard
        </h2>

        <nav className="space-y-4">
          {tabs.map(({ tab, icon }) => (
            <button
              key={tab}
              onClick={() => setActiveTab(tab)}
              className={`flex items-center w-full px-4 py-3 rounded-xl font-medium transition-all duration-300 ${
                activeTab === tab
                  ? "bg-gradient-to-r from-purple-500/20 via-green-500/10 to-blue-500/20 border border-purple-500 text-purple-300 scale-105 shadow-[0_0_15px_rgba(128,0,255,0.3)]"
                  : "hover:bg-white/5 text-white/70 hover:text-white"
              }`}
            >
              {icon} {tab}
            </button>
          ))}
        </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-1 overflow-auto p-4 md:p-6 bg-black/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          {activeTab === "Dashboard" && <Dashboard />}
          {activeTab === "Template Requests" && <TemplateRequest />}
          {activeTab === "Template Create" && <CreateTemplate />}
          {activeTab === "Settings" && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default AdminDashboard;
