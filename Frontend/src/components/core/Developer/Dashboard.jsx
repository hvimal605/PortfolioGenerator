import React, { useEffect, useState } from "react";
import { HiOutlineChartBar, HiOutlineCheckCircle, HiOutlineClock, HiOutlineXCircle, HiOutlineDocumentDuplicate, HiOutlineEye } from "react-icons/hi2";
import PerformanceGraph from "../../Visulization/PerformanceGraph";
import TemplateUsageComparison from "../../Visulization/TemplateUsageComparison";
import { useSelector } from "react-redux";
import { motion } from "framer-motion";
import { formatDistanceToNow } from "date-fns";
import {
  getDeveloperTemplateStats,
  getDeveloperTemplateUsageStats,
  getMonthlyRequestedTemplates,
} from "../../../services/operations/TemplateApi";

const SoftNoise = () => (
    <svg className="absolute inset-0 w-full h-full opacity-[0.02] pointer-events-none mix-blend-overlay">
      <filter id="noise-dev-soft">
        <feTurbulence type="fractalNoise" baseFrequency="0.75" numOctaves="3" stitchTiles="stitch" />
      </filter>
      <rect width="100%" height="100%" filter="url(#noise-dev-soft)" />
    </svg>
);

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
    growthPercentage: 0,
    recentActivity: []
  });
  const [usageStats, setUsageStats] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDeveloperTemplateStats(token);
      setStats({
          total: data?.total || 0,
          approved: data?.approved || 0,
          pending: data?.pending || 0,
          rejected: data?.rejected || 0,
          growthPercentage: data?.growthPercentage || 0,
          recentActivity: data?.recentActivity || []
      });
    };
    fetchStats();
  }, [token]);

  useEffect(() => {
    const fetchUsageStats = async () => {
      const usageData = await getDeveloperTemplateUsageStats(token);
      setUsageStats(usageData);
    };
    fetchUsageStats();
  }, [token]);

  useEffect(() => {
    const fetchMonthlyStats = async () => {
      const data = await getMonthlyRequestedTemplates(token);
      setMonthlyData(data);
    };
    fetchMonthlyStats();
  }, [token]);

  const cards = [
    {
      label: "Total Uploads",
      value: stats.total,
      icon: <HiOutlineDocumentDuplicate size={28} />,
      color: "text-blue-400",
      bgGlow: "group-hover:bg-blue-500/10",
      borderGlow: "group-hover:border-blue-500/40",
      growth: stats.growthPercentage,
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: <HiOutlineCheckCircle size={28} />,
      color: "text-emerald-400",
      bgGlow: "group-hover:bg-emerald-500/10",
      borderGlow: "group-hover:border-emerald-500/40",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <HiOutlineClock size={28} />,
      color: "text-amber-400",
      bgGlow: "group-hover:bg-amber-500/10",
      borderGlow: "group-hover:border-amber-500/40",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: <HiOutlineXCircle size={28} />,
      color: "text-rose-400",
      bgGlow: "group-hover:bg-rose-500/10",
      borderGlow: "group-hover:border-rose-500/40",
    },
  ];

  return (
    <div className="w-full max-w-[1400px] mx-auto space-y-12 pb-24 mt-6 px-4 sm:px-6">
      
      {/* 👑 Simple Header */}
      <div className="flex flex-col gap-2 relative z-10 px-2">
        <h1 className="text-4xl md:text-5xl font-black tracking-tight text-white mb-1">
           Your Dashboard
        </h1>
        <p className="text-zinc-500 font-medium text-base tracking-wide">
          See how your templates are performing.
        </p>
      </div>

      {/* 🔮 Deep Glass StatCards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 relative z-10">
        {cards.map((card, idx) => (
          <motion.div
            key={idx}
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.1, duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
            className="group relative h-44 cursor-default"
          >
            {/* Soft Ambient Glow */}
            <div className={`absolute inset-0 transition-opacity duration-1000 rounded-[2.5rem] blur-[50px] opacity-0 group-hover:opacity-100 pointer-events-none ${card.bgGlow}`}></div>
            
            <div className={`relative h-full bg-[#050505]/60 backdrop-blur-[50px] border border-white/5 rounded-[2.5rem] p-8 flex flex-col justify-between transition-all duration-700 ${card.borderGlow} group-hover:-translate-y-2 shadow-2xl overflow-hidden`}>
              <SoftNoise />

              <div className="relative z-10 flex items-center justify-between">
                <div className={`w-12 h-12 rounded-2xl flex items-center justify-center bg-white/[0.02] border border-white/5 transition-colors duration-500 ${card.color}`}>
                  {card.icon}
                </div>
                
                {/* Growth Tag for Total */}
                {card.growth !== undefined && (
                   <div className={`px-3 py-1.5 rounded-full border text-[11px] font-bold tracking-wider flex items-center gap-1 shadow-lg backdrop-blur-xl ${card.growth >= 0 ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' : 'bg-rose-500/10 border-rose-500/20 text-rose-400'}`}>
                      {card.growth >= 0 ? '↑' : '↓'} {Math.abs(card.growth)}% <span className="text-white/40 ml-1">this month</span>
                   </div>
                )}
              </div>

              <div className="relative z-10">
                <p className="text-4xl font-black tracking-tighter text-white drop-shadow-md">
                  {card.value}
                </p>
                <p className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mt-2 group-hover:text-zinc-400 transition-colors">
                  {card.label}
                </p>
              </div>
            </div>
          </motion.div>
        ))}
      </div>

       {/* 📈 Full-Width Upload History Chart */}
       <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.3 }}
          className="w-full relative z-10"
       >
          <div className="flex items-center gap-3 mb-6 px-2">
            <h2 className="text-lg font-black text-white tracking-wide">Upload History</h2>
          </div>
          <div className="bg-[#050505]/60 backdrop-blur-[50px] border border-white/5 p-8 md:p-10 rounded-[3rem] shadow-2xl relative group overflow-hidden">
            <SoftNoise />
            <div className="absolute top-[-100px] left-1/2 -translate-x-1/2 w-[500px] h-64 bg-blue-500/10 blur-[120px] rounded-full pointer-events-none transition-all duration-1000 group-hover:bg-blue-500/20"></div>
            <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-blue-500/30 transition-colors duration-1000"></div>
            
            <div className="relative z-10 w-full h-[350px]">
               <PerformanceGraph data={monthlyData} />
            </div>
          </div>
       </motion.div>

       {/* 🎬 Bottom Split: Recent Uploads & Template Usage */}
       <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 relative z-10">
          
          {/* Recent Uploads List */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.4 }}
             className="flex flex-col"
          >
             <div className="flex items-center gap-3 mb-6 px-2">
                 <h2 className="text-lg font-black text-white tracking-wide">Recent Uploads</h2>
             </div>
             
             <div className="bg-[#050505]/60 backdrop-blur-[50px] border border-white/5 p-8 rounded-[3rem] shadow-2xl relative overflow-hidden flex-1 group">
                <SoftNoise />
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-fuchsia-500/30 transition-colors duration-1000"></div>
                
                {stats.recentActivity.length === 0 ? (
                    <div className="h-full flex flex-col items-center justify-center text-center px-4 relative z-10 py-10">
                       <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                           <HiOutlineDocumentDuplicate className="text-3xl text-zinc-600" />
                       </div>
                       <p className="text-base font-bold text-white tracking-wide">No Uploads Yet</p>
                       <p className="text-sm text-zinc-500 mt-2">Your recent template submissions will appear here.</p>
                    </div>
                ) : (
                    <div className="space-y-4 relative z-10">
                        {stats.recentActivity.map((item, idx) => (
                            <div key={idx} className="group/item relative flex items-center justify-between p-5 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.05] hover:border-white/10 transition-all duration-300">
                                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.02] to-transparent -translate-x-full group-hover/item:translate-x-full transition-transform duration-700"></div>
                                
                                <div className="flex flex-col gap-1.5 relative z-10">
                                    <h4 className="text-base font-bold text-white tracking-wide truncate max-w-[200px] sm:max-w-[300px]">{item.name}</h4>
                                    <p className="text-xs font-semibold text-zinc-500 group-hover/item:text-zinc-400 transition-colors">
                                        Submitted {formatDistanceToNow(new Date(item.createdAt), { addSuffix: true })}
                                    </p>
                                </div>

                                <div className={`relative z-10 px-4 py-2 flex items-center gap-2 rounded-full border text-xs font-bold tracking-wide ${
                                    item.status === 'Approved' ? 'bg-emerald-500/10 border-emerald-500/20 text-emerald-400' :
                                    item.status === 'Pending' ? 'bg-amber-500/10 border-amber-500/20 text-amber-400' :
                                    'bg-rose-500/10 border-rose-500/20 text-rose-400'
                                }`}>
                                    <div className={`w-1.5 h-1.5 rounded-full ${
                                        item.status === 'Approved' ? 'bg-emerald-400' :
                                        item.status === 'Pending' ? 'bg-amber-400 animate-pulse' :
                                        'bg-rose-400'
                                    }`}></div>
                                    {item.status}
                                </div>
                            </div>
                        ))}
                    </div>
                )}
             </div>
          </motion.div>

          {/* Template Usage Chart */}
          <motion.div 
             initial={{ opacity: 0, y: 20 }}
             animate={{ opacity: 1, y: 0 }}
             transition={{ duration: 0.8, delay: 0.5 }}
             className="flex flex-col"
          >
             <div className="flex items-center gap-3 mb-6 px-2">
                 <h2 className="text-lg font-black text-white tracking-wide">Most Used Templates</h2>
             </div>
             
             <div className="bg-[#050505]/60 backdrop-blur-[50px] border border-white/5 p-8 md:p-10 rounded-[3rem] shadow-2xl relative overflow-hidden flex-1 group">
                <SoftNoise />
                <div className="absolute top-[-50px] right-[-50px] w-64 h-64 bg-fuchsia-500/10 blur-[100px] rounded-full pointer-events-none group-hover:bg-fuchsia-500/20 transition-all duration-1000"></div>
                <div className="absolute top-0 left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent group-hover:via-fuchsia-500/30 transition-colors duration-1000"></div>
                
                <div className="relative z-10 w-full h-full min-h-[300px] flex items-center justify-center">
                    {usageStats.length === 0 ? (
                       <div className="flex flex-col items-center justify-center text-center">
                          <div className="w-20 h-20 rounded-full bg-white/5 flex items-center justify-center mb-6">
                              <HiOutlineEye className="text-3xl text-zinc-600" />
                          </div>
                          <p className="text-base font-bold text-white tracking-wide">No Usage Data</p>
                          <p className="text-sm text-zinc-500 mt-2">Data will appear when users select your templates.</p>
                       </div>
                    ) : (
                       <TemplateUsageComparison usageStats={usageStats} />
                    )}
                </div>
             </div>
          </motion.div>

       </div>

    </div>
  );
};

export default Dashboard;

