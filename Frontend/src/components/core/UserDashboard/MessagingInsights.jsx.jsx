import { useEffect, useState } from "react";
import { FaEnvelope, FaTrash, FaEye } from "react-icons/fa";
import { deleteMessage, getAllMessages, getFullDetailsOfPortfolio, getPortfoliosForUser, getPortfolioVisitorStats, updateEmailNotificationStatus } from "../../../services/operations/PortfolioApi";
import { useSelector } from "react-redux";
import VisitorStats from "./visulization/VisitorStats";
import MessageList from "./components/MessageList";
import { SiGooglemessages } from "react-icons/si";
export default function MessagingInsights() {
  const { token } = useSelector((state) => state.auth);

  const [portfolios, setPortfolios] = useState([]);
  const [selectedPortfolio, setSelectedPortfolio] = useState("");
  const [emailNotifications, setEmailNotifications] = useState(null);

  const [stats, setStats] = useState(null);
  const [msg, setMsg] = useState(null);

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
        // Filter out the deleted message from state
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
       
  
        //  console.log('yha kiya chal rha h ',res)
        
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


  


  return (
    <div className="min-h-screen text-white p-6 md:p-8 space-y-6">
      <h1 className="text-3xl md:text-4xl font-extrabold text-center pb-4 uppercase tracking-wide bg-clip-text text-transparent bg-gradient-to-r from-blue-400 to-pink-500">
        Messaging & Visitor Insights
      </h1>

      {/* Portfolio Selector - 🔥 Deluxe Glass Neon UI 🔥 */}
      <div className="relative bg-gradient-to-br from-white/10 via-white/5 to-white/0 backdrop-blur-2xl p-6 md:p-8 rounded-3xl shadow-[0_10px_30px_-5px_rgba(0,0,0,0.7)] border border-white/10 w-full max-w-md mx-auto group transition-all duration-300 ease-in-out">
        <div className="absolute inset-0 z-0 rounded-3xl border border-blue-500/20 blur-[2px] opacity-30 pointer-events-none"></div>

        <label className="block text-sm md:text-base mb-4 font-bold tracking-wide">
          <span className=" text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-400">Choose Your Deployed Portfolio</span>
        </label>

        <select
          className="relative z-10 bg-gradient-to-br from-gray-900/80 to-gray-800/80 text-white p-3 md:p-3.5 rounded-xl w-full border border-gray-700 focus:outline-none focus:ring-2 focus:ring-pink-500/70 focus:border-blue-400 transition duration-300 placeholder:text-gray-400 text-sm md:text-base shadow-inner shadow-black/20"
          value={selectedPortfolio}
          onChange={(e) => setSelectedPortfolio(e.target.value)}
        >
          {portfolios.length > 0 ? (
            portfolios.map((p) => (
              <option key={p.portfolioId} value={p.portfolioId} className="text-black">
                {p.deployLink}
              </option>
            ))
          ) : (
            <option disabled>No deployed portfolios found</option>
          )}
        </select>
      </div>



      {/* Visitor Stats */}
      {stats ? (
        <VisitorStats stats={stats} />
      ) : (
        <p className="text-center text-gray-400">Select a portfolio to view visitor insights.</p>
      )}
      {/* Email Notifications Toggle - Sexy Neon Switch */}
      <div className="border rounded-xl">


      <div className="flex items-center justify-end mt-2 mr-5">
  <div className="flex flex-wrap items-center gap-4 bg-gradient-to-br from-white/10 via-white/5 to-transparent p-3 sm:p-4 px-5 rounded-2xl border border-white/10 shadow-[0_0_20px_2px_rgba(255,255,255,0.05)] backdrop-blur-md transition-all duration-300 m-2">
    
    <span className="text-sm sm:text-base font-semibold tracking-wide text-white/80 flex justify-center items-center gap-2 ">
    <SiGooglemessages /> Messages Email Notifications
    </span>

    <button
      onClick={handleToggleEmailNotification}
      className={`relative w-14 h-7 rounded-full transition-all duration-300 border border-white/20 shadow-inner shadow-black/30 
        ${emailNotifications ? "bg-green-500/80" : "bg-gray-700/70"}
      `}
    >
      <span
        className={`absolute top-0.5 left-0.5 w-6 h-6 rounded-full bg-white shadow-md transition-transform duration-300 ease-in-out
          ${emailNotifications ? "translate-x-7" : "translate-x-0"}
        `}
      />
    </button>
  </div>
</div>

        <div>
          <MessageList response={msg} onDelete={handleDelete} />
        </div>
      </div>



    </div>
  );
}
