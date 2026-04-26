import { useState, useEffect } from "react"
import { HiOutlineUsers, HiOutlineCodeBracket, HiOutlineSquare3Stack3D, HiOutlineCloudArrowUp, HiOutlineBanknotes, HiOutlineChartPie } from "react-icons/hi2"
import AdminVisulizations from "../../Visulization/AdminVisulizations"
import { motion } from "framer-motion"
import { useSelector } from "react-redux"
import { getAdminDashboardStats, getMonthlyUserDeveloperPortfolioStats } from "../../../services/operations/PortfolioApi"
import { getTopUsedTemplates } from "../../../services/operations/TemplateApi"

const StatCard = ({ label, value, icon, color, delay }) => {
  const colorMap = {
    indigo: "from-indigo-500/20 to-indigo-500/5 hover:border-indigo-500/40 text-indigo-400 shadow-indigo-500/10",
    fuchsia: "from-fuchsia-500/20 to-fuchsia-500/5 hover:border-fuchsia-500/40 text-fuchsia-400 shadow-fuchsia-500/10",
    blue: "from-blue-500/20 to-blue-500/5 hover:border-blue-500/40 text-blue-400 shadow-blue-500/10",
    emerald: "from-emerald-500/20 to-emerald-500/5 hover:border-emerald-500/40 text-emerald-400 shadow-emerald-500/10",
    amber: "from-amber-500/20 to-amber-500/5 hover:border-amber-500/40 text-amber-400 shadow-amber-500/10",
  }

  const theme = colorMap[color] || colorMap.indigo

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay, ease: "easeOut" }}
      className={`group relative bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-[2rem] p-8 transition-all duration-500 overflow-hidden shadow-2xl hover:shadow-[0_0_40px_rgba(0,0,0,0.3)] hover:border-white/20`}
    >
      <div className={`absolute inset-0 bg-gradient-to-br ${theme} opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>
      <div className="absolute inset-0 bg-gradient-to-b from-white/[0.02] to-transparent pointer-events-none"></div>

      <div className="relative z-10 flex flex-col gap-6">
        <div className="flex items-center justify-between">
          <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/10 group-hover:bg-white/[0.08] transition-all duration-500">
            <div className="text-2xl">{icon}</div>
          </div>
          <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/5 border border-white/10">
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
            <span className="text-[10px] font-black tracking-widest text-emerald-500 uppercase">Live</span>
          </div>
        </div>

        <div>
          <p className="text-sm font-bold tracking-widest text-neutral-400 uppercase mb-2">
            {label}
          </p>
          <h3 className={`text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-lg`}>
            {value}
          </h3>
        </div>
      </div>
    </motion.div>
  )
}

export default function Dashboard() {
  const { token } = useSelector((state) => state.auth)

  const [stats, setStats] = useState({
    users: 0,
    developers: 0,
    templates: 0,
    deployedPortfolios: 0,
    revenue: 0,
  })

  const [topTemplates, setTopTemplates] = useState([])
  const [monthlyData, setMonthlyData] = useState([])

  useEffect(() => {
    const fetchStats = async () => {
      const response = await getAdminDashboardStats(token)
      if (response) {
        setStats({
          users: response.totalUsers,
          developers: response.totalDevelopers,
          templates: response.totalTemplates,
          deployedPortfolios: response.deployedPortfolios,
          revenue: response.totalRevenue || 0,
        })
      }

      const topTemplateRes = await getTopUsedTemplates(token)
      if (topTemplateRes) {
        setTopTemplates(topTemplateRes.map(t => ({ name: t.name, usage: t.usageCount })))
      }

      const monthlyStatsRes = await getMonthlyUserDeveloperPortfolioStats(token)
      if (monthlyStatsRes) setMonthlyData(monthlyStatsRes)
    }

    fetchStats()
  }, [token])

  const statConfig = [
    { label: "Total Users", value: stats.users, icon: <HiOutlineUsers />, color: "indigo" },
    { label: "Active Developers", value: stats.developers, icon: <HiOutlineCodeBracket />, color: "fuchsia" },
    { label: "Templates", value: stats.templates, icon: <HiOutlineSquare3Stack3D />, color: "blue" },
    { label: "Deployed Sites", value: stats.deployedPortfolios, icon: <HiOutlineCloudArrowUp />, color: "emerald" },
    { label: "Total Revenue", value: `₹${stats.revenue.toLocaleString('en-IN')}`, icon: <HiOutlineBanknotes />, color: "amber" },
  ]

  return (
    <div className="flex flex-col gap-12 py-4">

      {/* 🟢 Clean Header */}
      <div className="flex flex-col gap-3 relative z-10">
        <div className="flex items-center gap-4">
          <div className="p-4 rounded-[1.5rem] bg-indigo-500/10 border border-indigo-500/20 text-indigo-400 shadow-[inset_0_0_20px_rgba(99,102,241,0.15)]">
            <HiOutlineChartPie className="text-3xl" />
          </div>
          <div>
            <h1 className="text-4xl font-black tracking-tight text-white mb-1">
              Admin Dashboard
            </h1>
            <p className="text-neutral-400 font-medium tracking-wide">
              Comprehensive overview of platform activity and growth.
            </p>
          </div>
        </div>
      </div>

      {/* 📊 Simple Stat Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-6">
        {statConfig.map((stat, index) => (
          <StatCard key={index} {...stat} delay={index * 0.1} />
        ))}
      </div>

      {/* 📈 Charts Section */}
      <div className="w-full bg-[#050505]/60 border border-white/[0.05] p-10 rounded-[3rem] shadow-2xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-10 border-b border-white/[0.05] pb-6">
          <h3 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
            Growth & Activity
          </h3>
          <div className="flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 uppercase tracking-widest text-[10px] font-black">
            <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></div>
            <span className="text-emerald-500">Live Statistics</span>
          </div>
        </div>
        <AdminVisulizations topTemplates={topTemplates} monthlyData={monthlyData} />
      </div>

    </div>
  )
}
