import React from "react";
import { ImStatsDots } from "react-icons/im";
import dayjs from "dayjs";

const VisitorStats = ({ stats }) => {
  if (!stats) return null;

  const { totalVisitors, uniqueVisitors } = stats;

  return (
    <div className="w-full backdrop-blur-xl p-6 md:p-10 rounded-3xl shadow-2xl mx-auto mt-3">
      {/* Heading */}
      <h2 className="text-2xl md:text-3xl font-bold text-center mb-8 flex justify-center items-center gap-3">
        <ImStatsDots />
        <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-blue-400 to-pink-400">
          Visitor Statistics
        </span>
      </h2>

      {/* Stat Cards */}
      <div className="flex flex-col sm:flex-row md:flex-row gap-4 mb-10 justify-center  mx-auto">
  <StatCard label="Total Visitors" value={totalVisitors} from="blue" />
  <StatCard label="Unique Visitors" value={uniqueVisitors} from="green" />
</div>

    </div>
  );
};

const StatCard = ({ label, value, from }) => (
  <div
    className={`relative bg-gradient-to-br from-${from}-300 to-${from}-200 text-white px-6 py-8 rounded-3xl shadow-lg border border-white/10 backdrop-blur-md hover:scale-[1.05] transition-transform duration-300 group overflow-hidden`}
  >
    {/* Soft Glow Border */}
    <div className="absolute inset-0 rounded-3xl bg-gradient-to-br from-white/10 via-white/5 to-transparent blur-[2px] opacity-20 group-hover:opacity-40 transition duration-300 pointer-events-none"></div>

    {/* Subtle inner glow */}
    <div className="absolute -inset-1 rounded-3xl bg-white opacity-[0.015] blur-2xl pointer-events-none"></div>

    {/* Light accent shine */}
    <div className="absolute top-1/3 -left-8 w-32 h-32 bg-white/10 rounded-full blur-2xl rotate-45 group-hover:translate-x-4 transition duration-500 ease-in-out"></div>

    {/* Content */}
    <p className="text-xs sm:text-sm font-medium text-white/60 tracking-wider mb-1 uppercase">
      {label}
    </p>
    <h3 className="text-3xl sm:text-4xl font-bold text-white drop-shadow-sm">
      {value}
    </h3>
  </div>
);

export default VisitorStats;
