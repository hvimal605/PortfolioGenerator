import React from "react";
import { HiOutlineUserGroup, HiOutlineSparkles, HiOutlineChartBar } from "react-icons/hi2";
import { motion } from "framer-motion";

const VisitorStats = ({ stats }) => {
  if (!stats) return null;

  const { totalVisitors, uniqueVisitors } = stats;

  return (
    <div className="w-full bg-[#050505]/60 border border-white/[0.05] p-8 md:p-10 rounded-[2rem] shadow-2xl relative overflow-hidden mx-auto mt-3">
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>
      
      {/* Heading */}
      <div className="flex items-center gap-4 mb-10 relative z-10 border-b border-white/[0.05] pb-6">
        <div className="p-4 rounded-2xl bg-purple-500/10 border border-purple-500/20 text-purple-400 shadow-[inset_0_0_20px_rgba(168,85,247,0.15)]">
          <HiOutlineChartBar className="text-2xl" />
        </div>
        <div>
          <h2 className="text-2xl font-bold tracking-tight text-white mb-1">
            Visitor Statistics
          </h2>
          <p className="text-sm text-neutral-400 font-medium tracking-wide">
            Real-time traffic metrics for your active portfolio.
          </p>
        </div>
      </div>

      {/* Stat Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 relative z-10">
        <StatCard 
          label="Total Views" 
          value={totalVisitors} 
          icon={<HiOutlineUserGroup className="text-3xl text-blue-400 group-hover:scale-110 transition-transform duration-500" />}
          activeColor="blue"
          delay={0.1}
        />
        <StatCard 
          label="Unique Visitors" 
          value={uniqueVisitors} 
          icon={<HiOutlineSparkles className="text-3xl text-emerald-400 group-hover:scale-110 transition-transform duration-500" />}
          activeColor="emerald"
          delay={0.2}
        />
      </div>
    </div>
  );
};

const StatCard = ({ label, value, icon, activeColor, delay }) => {
  // We use explicitly defined class strings here instead of dynamic generation 
  // because Tailwind purged dynamically generated concatenations like `from-${color}-500/20`.
  const colorMap = {
    blue: {
      gradient: "from-blue-500/20 to-blue-500/5",
      borderGlow: "hover:border-blue-500/40",
      textGlow: "text-blue-400",
      shadow: "hover:shadow-[0_0_30px_rgba(59,130,246,0.15)]"
    },
    emerald: {
      gradient: "from-emerald-500/20 to-emerald-500/5",
      borderGlow: "hover:border-emerald-500/40",
      textGlow: "text-emerald-400",
      shadow: "hover:shadow-[0_0_30px_rgba(16,185,129,0.15)]"
    }
  };

  const currentTheme = colorMap[activeColor] || colorMap.blue;

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`relative group bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[1.5rem] p-6 transition-all duration-500 overflow-hidden shadow-[0_8px_30px_rgba(0,0,0,0.5)] ${currentTheme.borderGlow} ${currentTheme.shadow}`}
    >
      {/* Base Light */}
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.03] to-transparent pointer-events-none rounded-[1.5rem]"></div>
      
      {/* Hover Glow Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${currentTheme.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[1.5rem]`}></div>
      
      <div className="flex justify-between items-start relative z-10 w-full">
        <div className="space-y-4">
          <p className="text-sm font-semibold tracking-widest text-neutral-400 uppercase">
            {label}
          </p>
          <div className="flex items-baseline gap-2">
            <h3 className={`text-4xl md:text-5xl font-black ${currentTheme.textGlow} tracking-tighter drop-shadow-lg transition-colors duration-500`}>
              {value}
            </h3>
          </div>
        </div>
        
        <div className="p-4 rounded-full bg-white/[0.03] border border-white/10 group-hover:bg-white/[0.08] transition-colors duration-500">
          {icon}
        </div>
      </div>
    </motion.div>
  );
};

export default VisitorStats;
