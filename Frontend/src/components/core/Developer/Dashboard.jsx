import React, { useEffect, useState } from "react";
import { FaCheckCircle, FaClock, FaTimesCircle } from "react-icons/fa";
import { IoMdStats } from "react-icons/io";
import PerformanceGraph from "../../Visulization/PerformanceGraph";
import TemplateUsageComparison from "../../Visulization/TemplateUsageComparison";
import { useSelector } from "react-redux";
import {
  getDeveloperTemplateStats,
  getDeveloperTemplateUsageStats,
  getMonthlyRequestedTemplates,
} from "../../../services/operations/TemplateApi";

const Dashboard = () => {
  const [stats, setStats] = useState({
    total: 0,
    approved: 0,
    pending: 0,
    rejected: 0,
  });
  const [usageStats, setUsageStats] = useState([]);
  const [monthlyData, setMonthlyData] = useState([]);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchStats = async () => {
      const data = await getDeveloperTemplateStats(token);
      setStats(data);
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
      label: "Total Templates",
      value: stats.total,
      icon: <IoMdStats className="text-4xl text-blue-300" />,
      gradient: "from-indigo-800 to-blue-700",
      border: "border-blue-400/50",
      shadow: "hover:shadow-blue-500/60",
    },
    {
      label: "Approved",
      value: stats.approved,
      icon: <FaCheckCircle className="text-4xl text-green-300" />,
      gradient: "from-green-800 to-emerald-700",
      border: "border-green-400/50",
      shadow: "hover:shadow-green-500/60",
    },
    {
      label: "Pending",
      value: stats.pending,
      icon: <FaClock className="text-4xl text-yellow-300" />,
      gradient: "from-yellow-700 to-orange-500",
      border: "border-yellow-300/50",
      shadow: "hover:shadow-yellow-400/60",
    },
    {
      label: "Rejected",
      value: stats.rejected,
      icon: <FaTimesCircle className="text-4xl text-red-300" />,
      gradient: "from-red-800 to-rose-600",
      border: "border-red-400/50",
      shadow: "hover:shadow-red-500/60",
    },
  ];

  return (
    <div className="p-6 md:p-10  min-h-screen font-inter">
      <h1
        className="md:text-5xl text-3xl font-extrabold text-center mb-12 tracking-wide 
             bg-gradient-to-r from-cyan-400 via-purple-400 to-pink-500 
             bg-clip-text text-transparent 
           
             "
      >
        Developer Dashboard 
      </h1>

      {/* Stat Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
        {cards.map((card, idx) => (
          <div
            key={idx}
            className={`bg-gradient-to-br ${card.gradient} border ${card.border} backdrop-blur-sm bg-opacity-60 p-6 rounded-3xl shadow-2xl text-white flex items-center justify-between transition-all duration-300 transform hover:scale-[1.04] ${card.shadow}`}
          >
            {card.icon}
            <div className="text-right">
              <p className="text-4xl font-bold">{card.value}</p>
              <p className="text-lg text-gray-300">{card.label}</p>
            </div>
          </div>
        ))}
      </div>

      {/* Graphs Section */}
      <div className="grid grid-cols-1 gap-10 mt-16">
        <PerformanceGraph data={monthlyData} />
        <TemplateUsageComparison usageStats={usageStats} />
      </div>
    </div>
  );
};

export default Dashboard;
