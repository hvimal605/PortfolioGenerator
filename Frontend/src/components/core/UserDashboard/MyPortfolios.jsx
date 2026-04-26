import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import {
  HiOutlineClipboardDocument,
  HiOutlineCheck,
  HiOutlineArrowTopRightOnSquare,
  HiOutlinePlus,
  HiOutlineClock,
  HiOutlineCheckCircle,
  HiOutlineChartBar,
  HiOutlineSparkles
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

import { getPortfoliosForUser } from "../../../services/operations/PortfolioApi";
import { useDispatch, useSelector } from "react-redux";
import {
  setTemplateId,
  setPortfolio,
} from "../../../slices/PortfolioSlice";

export default function MyPortfolios() {
  const dispatch = useDispatch();
  const { token } = useSelector((state) => state.auth);
  const [portfolios, setPortfolios] = useState([]);
  const [copiedId, setCopiedId] = useState(null);
  const [stats, setStats] = useState({
    total: 0,
    completed: 0,
    pending: 0,
  });

  const handleCopy = (portfolioId, previewLink) => {
    navigator.clipboard.writeText(previewLink).then(() => {
      setCopiedId(portfolioId);
      setTimeout(() => setCopiedId(null), 3000);
    });
  };

  useEffect(() => {
    const fetchPortfolios = async () => {
      try {
        const res = await getPortfoliosForUser(token);

        if (res?.success) {
          setStats({
            total: res.totalPortfolios,
            completed: res.completed,
            pending: res.pending,
          });

          const formatted = res.portfolios.map((p, index) => ({
            _id: p.portfolioId,
            portfolioId: p.portfolioId,
            templateId: p.templateId,
            name: `Portfolio ${index + 1}`,
            createdDate: new Date(p.createdAt).toISOString().split("T")[0],
            status: p.deployLink ? "completed" : "pending",
            previewLink: p.deployLink || null,
          }));

          setPortfolios(formatted);
        }
      } catch (err) {
        console.error("Failed to fetch portfolios:", err);
      }
    };

    fetchPortfolios();
  }, [token]);

  const handleComplete = (portfolio) => {
    dispatch(setTemplateId(portfolio.templateId));
    dispatch(setPortfolio(portfolio));
  };

  const handleCreateNew = () => {
    dispatch(setPortfolio(null));
  };

  const statCards = [
    { label: "Total Portfolios", count: stats.total, color: "from-white to-neutral-400", glow: "shadow-[0_0_40px_rgba(255,255,255,0.05)] hover:shadow-[0_0_60px_rgba(255,255,255,0.15)]", border: "border-white/20", iconColor: "text-white" },
    { label: "Completed", count: stats.completed, color: "from-emerald-400 to-green-600", glow: "shadow-[0_0_40px_rgba(52,211,153,0.15)] hover:shadow-[0_0_60px_rgba(52,211,153,0.3)]", border: "border-green-500/30", iconColor: "text-green-400" },
    { label: "Pending Setup", count: stats.pending, color: "from-yellow-300 to-amber-600", glow: "shadow-[0_0_40px_rgba(250,204,21,0.15)] hover:shadow-[0_0_60px_rgba(250,204,21,0.3)]", border: "border-yellow-500/30", iconColor: "text-yellow-400" },
  ];

  return (
    <div className="text-white space-y-12">

      {/* Header & Create Action */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 pb-8 border-b border-white/[0.05]">
        <div className="relative group/title">
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-fuchsia-400 via-purple-300 to-cyan-400 drop-shadow-[0_0_15px_rgba(232,121,249,0.3)] relative z-10 uppercase italic">
            My Portfolios
          </h2>
          <div className="absolute -bottom-1 left-0 w-1/3 h-[2px] bg-gradient-to-r from-fuchsia-500 to-transparent transition-all duration-700 group-hover/title:w-full"></div>
          <p className="text-neutral-400 mt-3 text-sm md:text-base tracking-[0.05em] font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500">
            Orchestrate your professional digital footprint.
          </p>
        </div>

        <Link to="/portfolioCreate">
          <motion.button
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.95 }}
            onClick={handleCreateNew}
            className="group relative inline-flex items-center justify-center gap-3 px-8 py-4 font-bold text-white bg-black/40 backdrop-blur-2xl border border-white/20 rounded-2xl overflow-hidden transition-all duration-500 hover:border-fuchsia-500/50 shadow-[0_0_30px_rgba(0,0,0,0.5)] hover:shadow-[0_0_50px_rgba(217,70,239,0.4)]"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-1000"></div>
            <HiOutlinePlus className="text-2xl text-cyan-400 group-hover:text-white group-hover:rotate-180 transition-all duration-700 relative z-10 drop-shadow-[0_0_10px_rgba(34,211,238,0.8)]" />
            <span className="relative z-10 tracking-widest uppercase text-sm">Create New Portfolio</span>
          </motion.button>
        </Link>
      </div>

      {/* Premium Stats Row */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {statCards.map((stat, index) => (
          <motion.div
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1, ease: "easeOut" }}
            key={index}
            className={`relative p-8 rounded-[2rem] bg-black/40 border ${stat.border} ${stat.glow} backdrop-blur-xl transition-all duration-500 hover:-translate-y-2 group overflow-hidden`}
          >
            <div className="absolute top-0 right-0 p-8 opacity-20 group-hover:opacity-30 group-hover:scale-110 transition-all duration-700">
              <HiOutlineChartBar className={`text-6xl ${stat.iconColor} drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]`} />
            </div>
            <div className="relative z-10">
              <p className="text-xs font-bold text-neutral-400 tracking-[0.25em] uppercase mb-4">
                {stat.label}
              </p>
              <p className={`text-6xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-br ${stat.color} drop-shadow-[0_5px_15px_rgba(0,0,0,0.5)]`}>
                {stat.count}
              </p>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Portfolio Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence>
          {portfolios.map((portfolio, idx) => {
            const createdAt = new Date(portfolio.createdDate);
            const formattedDate = `${createdAt.getDate().toString().padStart(2, '0')} ${createdAt.toLocaleString('default', { month: 'short' })}, ${createdAt.getFullYear()}`;
            const isCompleted = portfolio.status === 'completed';

            return (
              <motion.div
                layout
                initial={{ opacity: 0, scale: 0.95, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { delay: idx * 0.1, duration: 0.4 },
                  scale: { delay: idx * 0.1, duration: 0.4 },
                  y: { 
                    duration: 4 + Math.random() * 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: idx * 0.2
                  }
                }}
                key={portfolio._id}
                className="group relative flex flex-col bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/30 rounded-[2rem] p-5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              >
                {/* Glow effect positioned behind card content, revealed on hover */}
                <div className={`absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem] bg-gradient-to-b ${isCompleted ? 'from-green-500/5' : 'from-yellow-500/5'} to-transparent`} />

                {/* Visual Preview Frame */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/50 border border-white/[0.05] mb-5 isolate">
                  {/* macOS style window dots */}
                  <div className="absolute top-3 left-3 flex gap-1.5 z-20">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
                  </div>

                  {portfolio.previewLink ? (
                    <div className="w-full h-full relative z-10 pt-6 px-2 opacity-80 group-hover:opacity-100 transition-opacity duration-500">
                      <div className="w-[200%] h-[200%] origin-top-left scale-50">
                        <iframe
                          src={portfolio.previewLink}
                          title={portfolio.name}
                          className="w-full h-full border-none rounded-xl"
                          sandbox="allow-scripts allow-same-origin allow-popups allow-forms"
                          style={{ scrollbarWidth: "none" }}
                        />
                      </div>
                    </div>
                  ) : (
                    <div className="w-full h-full flex flex-col items-center justify-center gap-3 text-neutral-600 relative z-10">
                      <HiOutlineSparkles className="text-3xl text-neutral-700" />
                      <p className="text-xs font-medium tracking-wide">Awaiting Deployment</p>
                    </div>
                  )}

                  {/* Status Badge */}
                  <motion.div 
                    animate={{ scale: [1, 1.05, 1] }}
                    transition={{ duration: 2, repeat: Infinity }}
                    className={`absolute top-3 right-3 z-30 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur-md border ${isCompleted
                        ? 'bg-green-500/20 text-green-300 border-green-500/30 shadow-[0_0_10px_rgba(34,197,94,0.2)]'
                        : 'bg-yellow-500/20 text-yellow-300 border-yellow-500/30 shadow-[0_0_10px_rgba(234,179,8,0.2)]'
                      }`}>
                    <span className="flex items-center gap-1.5">
                      {isCompleted ? <HiOutlineCheckCircle className="text-sm" /> : <HiOutlineClock className="text-sm" />}
                      {portfolio.status}
                    </span>
                  </motion.div>
                </div>

                {/* Card Context */}
                <div className="px-2 flex-1 relative z-10">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-colors">
                    {portfolio.name}
                  </h3>

                  <div className="mt-2 space-y-1">
                    <p className="text-[0.8rem] text-neutral-400 font-medium">Created: <span className="text-neutral-300">{formattedDate}</span></p>
                    {portfolio.previewLink && (
                      <p className="text-[0.75rem] text-purple-400/80 truncate">{portfolio.previewLink}</p>
                    )}
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-3 relative z-10">
                  {portfolio.previewLink && (
                    <button
                      onClick={() => handleCopy(portfolio._id, portfolio.previewLink)}
                      className={`flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all duration-300 ${copiedId === portfolio._id
                          ? 'bg-green-500/20 text-green-400 border border-green-500/30'
                          : 'bg-white/[0.03] text-neutral-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white'
                        }`}
                    >
                      {copiedId === portfolio._id ? <HiOutlineCheck className="text-lg" /> : <HiOutlineClipboardDocument className="text-lg" />}
                      {copiedId === portfolio._id ? 'Copied' : 'Copy'}
                    </button>
                  )}

                  {isCompleted ? (
                    <a
                      href={portfolio.previewLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex-[2] flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                    >
                      <span>Preview</span>
                      <HiOutlineArrowTopRightOnSquare className="text-lg" />
                    </a>
                  ) : (
                    <Link to={`/portfolio/deploy`} className="flex-1 w-full">
                      <button
                        onClick={() => handleComplete(portfolio)}
                        className="w-full flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-gradient-to-r from-yellow-500 to-amber-600 text-black hover:shadow-[0_0_20px_rgba(245,158,11,0.4)] transition-all"
                      >
                        <HiOutlineSparkles className="text-lg" />
                        <span>Deploy Now</span>
                      </button>
                    </Link>
                  )}
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

    </div>
  );
}
