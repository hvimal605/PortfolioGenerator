import { useEffect, useState, useRef } from "react";
import { FaEnvelope, FaTrash, FaEye } from "react-icons/fa";
import { deleteMessage, getAllMessages, getFullDetailsOfPortfolio, getPortfoliosForUser, getPortfolioVisitorStats, updateEmailNotificationStatus } from "../../../services/operations/PortfolioApi";
import { useSelector } from "react-redux";
import VisitorStats from "./visulization/VisitorStats";
import MessageList from "./components/MessageList";
import { SiGooglemessages } from "react-icons/si";
import { HiOutlineGlobeAlt, HiChevronDown, HiOutlineCheck } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

export default function MessagingInsights() {
  const { token } = useSelector((state) => state.auth);

  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(null);

  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState(null);

  // Custom dropdown state
  const [isOpen, setIsOpen] = useState(false);
  const dropdownRef = useRef(null);

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await getPortfoliosForUser(token);

        if (res?.success) {
          const deployedPortfolios = res.portfolios.filter(
            (portfolio) => portfolio.deployLink
          );
          setPortfolios(deployedPortfolios);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
    };

    if (token) {
      fetchPortfolios();
    }
  }, [token]);

  useEffect(() => {
    if (portfolios.length > 0) {
      setSelectedPortfolio(portfolios[0].portfolioId);
    }
  }, [portfolios]);

  // Handle outside click for dropdown
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  useEffect(() => {
    const fetchPortfolioStats = async () => {
      if (!selectedPortfolio || !token) return;
      try {
        const statsRes = await getPortfolioVisitorStats(selectedPortfolio, token);
        setStats(statsRes);
      } catch (error) {
        console.error("Failed to fetch visitor stats:", error);
      }
    };

    fetchPortfolioStats();
  }, [selectedPortfolio, token]);

  useEffect(() => {
    const fetchAllMessages = async () => {
      if (!selectedPortfolio || !token) return;
      try {
        const MsgRes = await getAllMessages(selectedPortfolio, token);
        setMsg(MsgRes);
      } catch (error) {
        console.error("Failed to fetch Messgaes:", error);
      }
    };

    fetchAllMessages();
  }, [selectedPortfolio, token]);

  const handleDelete = async (id) => {
    const data = {
      messageId: id,
      portfolioId: selectedPortfolio,
    };

    try {
      const msgDelRes = await deleteMessage(data, token);

      if (msgDelRes.success) {
        setMsg((prev) => ({
          ...prev,
          data: prev.data.filter((message) => message._id !== id),
        }));
      }
    } catch (err) {
      console.error("Error deleting message:", err);
    }
  };

  useEffect(() => {
    const fetchInitialStatus = async () => {
      if (!selectedPortfolio || !token) return;
  
      try {
        const res = await getFullDetailsOfPortfolio(selectedPortfolio, token);
        setEmailNotifications(res?.emailNotifications); 
      } catch (err) {
        console.error("Failed to fetch initial email notification status:", err);
      }
    };
  
    fetchInitialStatus();
  }, [selectedPortfolio, token]);

  const handleToggleEmailNotification = async () => {
    try {
      const res = await updateEmailNotificationStatus( selectedPortfolio , token);
  
      if (res?.success) {
        setEmailNotifications(res.emailNotifications);
        console.log(res.message);
      }
    } catch (error) {
      console.error("Error toggling email notification:", error);
    }
  };

  const selectedPortfolioObj = portfolios.find(p => p.portfolioId === selectedPortfolio);

  return (
    <div className="text-white space-y-12 pb-20">
      
      {/* --- EXTREME HEADER --- */}
      <div className="flex flex-col gap-2 pb-8 border-b border-white/[0.05] relative group/title">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 uppercase italic">
          Analytics & Insights
        </h2>
        <div className="absolute bottom-[30px] left-0 w-1/4 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700 group-hover/title:w-1/2"></div>
        <p className="text-neutral-400 mt-2 text-sm md:text-base tracking-[0.05em] font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500">
          Track visitor traffic and manage incoming messages across your deployed portfolios.
        </p>
      </div>

      {/* --- SEXY SELECTOR MODULE --- */}
      <div className="group relative flex flex-col items-center bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/[0.05] hover:border-white/[0.1] rounded-[2.5rem] p-8 md:p-10 transition-all duration-500 hover:shadow-[0_15px_40px_rgba(0,0,0,0.4)] overflow-visible max-w-2xl mx-auto mt-12 mb-12 z-30">
        <div className="absolute -inset-[50%] opacity-0 group-hover:opacity-100 transition-opacity duration-1000 pointer-events-none rounded-full blur-[100px] bg-cyan-600/5 translate-y-1/2" />
        <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none rounded-[2.5rem]"></div>

        <label className="text-xl md:text-2xl font-bold tracking-tight text-white mb-8 relative z-10 flex items-center justify-center gap-3">
          <HiOutlineGlobeAlt className="text-2xl md:text-3xl text-cyan-500" />
          Choose Your Deployed Portfolio
        </label>

        {/* CUSTOM FRAMER-MOTION DROPDOWN */}
        <div className="relative z-20 w-full md:w-5/6" ref={dropdownRef}>
          <button
            onClick={() => setIsOpen(!isOpen)}
            className={`w-full flex items-center justify-between bg-black/40 border ${isOpen ? 'border-cyan-500/50 shadow-[0_0_15px_rgba(34,211,238,0.1)]' : 'border-white/10 hover:border-cyan-500/30'} text-white px-6 py-5 rounded-[1.25rem] transition-all duration-300 shadow-[inset_0_2px_10px_rgba(0,0,0,0.3)]`}
          >
            <span className={`font-medium tracking-wide text-sm md:text-base truncate pr-4 ${!selectedPortfolioObj ? 'text-neutral-500' : 'text-neutral-100'}`}>
              {selectedPortfolioObj ? selectedPortfolioObj.deployLink : "No deployed portfolios found"}
            </span>
            <motion.div animate={{ rotate: isOpen ? 180 : 0 }} className="text-cyan-500/70">
              <HiChevronDown className="text-2xl" />
            </motion.div>
          </button>

          <AnimatePresence>
            {isOpen && portfolios.length > 0 && (
              <motion.div
                initial={{ opacity: 0, y: -10, scale: 0.98 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -10, scale: 0.98 }}
                transition={{ duration: 0.15, ease: "easeOut" }}
                className="absolute top-full left-0 right-0 mt-3 p-2 bg-[#0a0a0a]/98 backdrop-blur-2xl border border-white/10 rounded-[1.25rem] shadow-[0_20px_40px_rgba(0,0,0,0.6)] overflow-hidden z-50 origin-top flex flex-col"
              >
                <div className="max-h-64 overflow-y-auto w-full [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                  {portfolios.map((p) => {
                    const isSelected = selectedPortfolio === p.portfolioId;
                    return (
                      <button
                        key={p.portfolioId}
                        onClick={() => {
                          setSelectedPortfolio(p.portfolioId);
                          setIsOpen(false);
                        }}
                        className={`w-full flex items-center justify-between px-5 py-3.5 rounded-xl text-left transition-all duration-300 mb-1 last:mb-0 group
                          ${isSelected 
                            ? 'bg-cyan-500/10 text-cyan-400 border border-cyan-500/20' 
                            : 'bg-transparent text-neutral-300 hover:text-white hover:bg-white/[0.03] border border-transparent hover:border-white/5'
                          }`}
                      >
                        <span className="font-medium truncate pr-4 tracking-wide text-sm">{p.deployLink}</span>
                        {isSelected && <HiOutlineCheck className="text-xl text-cyan-500 shrink-0" />}
                      </button>
                    )
                  })}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

      <div className="relative z-10 animate-fade-in-up mt-12 border-t border-white/5 pt-12 space-y-12">
        {/* Visitor Stats Area */}
        {stats ? (
          <VisitorStats stats={stats} />
        ) : (
          <div className="flex justify-center items-center h-32 border border-white/5 bg-black/20 rounded-[2rem]">
            <p className="text-neutral-500 tracking-wide font-medium">Select a portfolio to view visitor insights.</p>
          </div>
        )}

        {/* Messaging Area & Email Notification Toggle */}
        <div className="bg-[#050505]/60 border border-white/[0.05] rounded-[2rem] p-6 shadow-2xl relative overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
          
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6 mb-8 relative z-10 pb-6 border-b border-white/[0.05]">
            <div className="flex items-center gap-4">
              <div className="p-4 rounded-2xl bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.1)]">
                <FaEnvelope className="text-2xl" />
              </div>
              <div>
                <h3 className="text-2xl font-bold tracking-tight text-white mb-1">Messages</h3>
                <p className="text-sm text-neutral-400 font-medium tracking-wide">Direct inquiries submitted via your deployed project.</p>
              </div>
            </div>

            {/* Sexy Email Notification Switch */}
            <div className="flex items-center gap-4 bg-white/[0.02] border border-white/10 py-3 px-5 rounded-2xl shadow-inner shadow-black/20">
              <span className="text-sm font-semibold tracking-wide text-neutral-300 flex items-center gap-2">
                <SiGooglemessages className="text-cyan-500" /> Notify me via Email
              </span>
              <button
                onClick={handleToggleEmailNotification}
                className={`relative w-14 h-7 rounded-full transition-all duration-500 border shadow-inner overflow-hidden
                  ${emailNotifications 
                    ? "bg-cyan-500/20 border-cyan-500/50 shadow-cyan-500/20" 
                    : "bg-black/50 border-white/10 shadow-black/50"}
                `}
              >
                <div className={`absolute inset-0 bg-cyan-400 transition-opacity duration-300 ${emailNotifications ? "opacity-20" : "opacity-0"}`} />
                <span
                  className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full shadow-[0_2px_4px_rgba(0,0,0,0.4)] transition-all duration-500 ease-[cubic-bezier(0.34,1.56,0.64,1)]
                    ${emailNotifications 
                      ? "translate-x-7 bg-cyan-400" 
                      : "translate-x-0 bg-neutral-500"}
                  `}
                />
              </button>
            </div>
          </div>

          <div className="relative z-10">
            <MessageList response={msg} onDelete={handleDelete} />
          </div>
        </div>
      </div>

    </div>
  );
}
