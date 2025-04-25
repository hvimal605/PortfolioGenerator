import { useEffect, useState } from "react";
import { MdLibraryBooks, MdMessage } from "react-icons/md";
import { FiEdit, FiSettings } from "react-icons/fi";
import { RxHamburgerMenu, RxCross2 } from "react-icons/rx";
import { IoAddCircle } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";

import MessagingInsights from "../components/core/UserDashboard/MessagingInsights.jsx";
import MyPortfolios from "../components/core/UserDashboard/MyPortfolios";
import ManagePortfolios from "../components/core/UserDashboard/ManagePortfolios.jsx";
import AddMoreInPortfolio from "../components/core/UserDashboard/AddDetailsInPorfolio/AddMoreInPortfolio.jsx";
import Settings from "../components/core/Setting/Settings.jsx";

const tabs = [
  { tab: "My Portfolios", icon: <MdLibraryBooks className="mr-2" /> },
  { tab: "Edit Porfolio", icon: <FiEdit className="mr-2" /> },
  { tab: "Add Details", icon: <IoAddCircle className="mr-2" /> },
  { tab: "Messages & Insights", icon: <MdMessage className="mr-2" /> },
  { tab: "Settings", icon: <FiSettings className="mr-2" /> },
];

const UserDashboard = () => {
  const [activeTab, setActiveTab] = useState("My Portfolios");
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
      <div className="md:hidden flex items-center justify-between px-4 py-6 bg-black/80 border-b border-white/10 mt-6">
        <h2 className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400">
          User Dashboard
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
                <RxCross2 className="text-3xl text-white" />
              </motion.div>
            ) : (
              <motion.div
                key="menu"
                initial={{ opacity: 0, rotate: 90 }}
                animate={{ opacity: 1, rotate: 0 }}
                exit={{ opacity: 0, rotate: -90 }}
                transition={{ duration: 0.3 }}
              >
                <RxHamburgerMenu className="text-3xl text-white" />
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
            className={`fixed md:static top-20 left-0 z-50 h-full md:h-[93vh] bg-black/60 backdrop-blur-md shadow-[0_0_20px_rgba(0,255,255,0.05)] p-6 border-r border-white/10 
            w-[70vw] md:w-64 transition-all duration-300`}
          >
            <h2 className="hidden md:block text-3xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-400 to-pink-400 uppercase tracking-wide text-center mb-8 mt-3">
              User Dashboard
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
                      ? "bg-gradient-to-r from-pink-500/20 via-purple-500/10 to-blue-500/20 border border-pink-500 text-pink-300 scale-105 shadow-[0_0_15px_rgba(255,0,150,0.3)]"
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
      <main className="flex-1 overflow-auto p-2 md:p-2 bg-black/90 backdrop-blur-md">
        <div className="max-w-6xl mx-auto">
          {activeTab === "My Portfolios" && <MyPortfolios />}
          {activeTab === "Edit Porfolio" && <ManagePortfolios />}
          {activeTab === "Add Details" && <AddMoreInPortfolio />}
          {activeTab === "Messages & Insights" && <MessagingInsights />}
          {activeTab === "Settings" && <Settings />}
        </div>
      </main>
    </div>
  );
};

export default UserDashboard;
