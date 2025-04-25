import { useState, useEffect } from "react"
import { FaUsers, FaCode, FaClipboardList, FaCloudUploadAlt } from "react-icons/fa"
import AdminVisulizations from "../../Visulization/AdminVisulizations"

import { useSelector } from "react-redux"
import { getAdminDashboardStats, getMonthlyUserDeveloperPortfolioStats } from "../../../services/operations/PortfolioApi"
import { getTopUsedTemplates } from "../../../services/operations/TemplateApi"

export default function Dashboard() {
  const { token } = useSelector((state) => state.auth)

  const [stats, setStats] = useState({
    users: 0,
    developers: 0,
    templates: 0,
    deployedPortfolios: 0,
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
        })
      }
  
      // Fetch top templates from API
      const topTemplateRes = await getTopUsedTemplates(token)
      if (topTemplateRes) {
        const formattedTemplates = topTemplateRes.map((template) => ({
          name: template.name,
          usage: template.usageCount,
        }))
        setTopTemplates(formattedTemplates)
      }
  
      const monthlyStatsRes = await getMonthlyUserDeveloperPortfolioStats(token)
      if (monthlyStatsRes) {
        setMonthlyData(monthlyStatsRes)  
      }
    }
  
    fetchStats()
  }, [token])
  
  return (
    <div className=" min-h-screen p-6 text-white">
      <h1 className="text-4xl text-center font-extrabold mb-8 bg-gradient-to-r from-pink-500 via-purple-500 to-indigo-500 text-transparent bg-clip-text tracking-wide drop-shadow-md">
  Dashboard Overview
</h1>


      {/* Stats Section */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
  {[
    { label: "Total Users", value: stats.users, icon: <FaUsers />, color: "from-cyan-500 to-blue-500" },
    { label: "Total Developers", value: stats.developers, icon: <FaCode />, color: "from-pink-500 to-purple-500" },
    { label: "Total Templates", value: stats.templates, icon: <FaClipboardList />, color: "from-yellow-400 to-orange-500" },
    { label: "Deployed Portfolios", value: stats.deployedPortfolios, icon: <FaCloudUploadAlt />, color: "from-green-400 to-emerald-500" },
  ].map((stat, index) => (
    <div
      key={index}
      className={`bg-gradient-to-br ${stat.color} p-1 rounded-2xl shadow-lg transform transition-transform hover:scale-105`}
    >
      <div className="bg-gray-900 rounded-2xl h-full w-full p-6 flex items-center gap-4 shadow-inner">
        <div className="text-5xl text-white bg-black/30 p-4 rounded-full shadow-lg">
          {stat.icon}
        </div>
        <div>
          <h2 className="text-lg text-gray-300 font-medium">{stat.label}</h2>
          <p className="text-3xl text-white font-extrabold">{stat.value}</p>
        </div>
      </div>
    </div>
  ))}
</div>


      {/* Visualizations Section */}
      <AdminVisulizations topTemplates={topTemplates} monthlyData={monthlyData} />
    </div>
  )
}
