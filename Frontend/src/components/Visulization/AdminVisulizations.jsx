import { HiOutlineFire, HiOutlineChartBar, HiOutlinePresentationChartBar, HiOutlineGlobeAlt } from "react-icons/hi2"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
  CartesianGrid,
  AreaChart,
  Area,
  Cell
} from "recharts"
import { motion } from "framer-motion"

const CustomTooltip = ({ active, payload, label }) => {
  if (active && payload && payload.length) {
    return (
      <motion.div 
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="bg-[#0a0a0a]/90 backdrop-blur-2xl border border-white/10 p-5 rounded-[1.5rem] shadow-2xl"
      >
        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-neutral-500 mb-3">{label}</p>
        <div className="flex flex-col gap-3">
           {payload.map((entry, index) => (
              <div key={index} className="flex items-center gap-4">
                 <div className="w-2 h-2 rounded-full shadow-[0_0_8px_currentColor]" style={{ backgroundColor: entry.color, color: entry.color }}></div>
                 <div className="flex flex-col">
                    <span className="text-[10px] font-bold text-neutral-500 uppercase tracking-widest">{entry.name}</span>
                    <span className="text-sm font-black text-white">{entry.value}</span>
                 </div>
              </div>
           ))}
        </div>
      </motion.div>
    );
  }
  return null;
};

export default function AdminVisulizations({ topTemplates, monthlyData }) {
  const currentMonthIndex = new Date().getMonth()
  const filteredMonthlyData = monthlyData.slice(0, currentMonthIndex + 1)

  return (
    <div className="grid grid-cols-1 xl:grid-cols-2 gap-10 mt-4">

      {/* 📊 Top Templates - Clean Bar Chart */}
      <motion.div 
        initial={{ opacity: 0, x: -20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="group relative bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-10">
           <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
                <HiOutlineFire className="text-fuchsia-500" />
                Popular Templates
              </h2>
              <p className="text-sm text-neutral-500 font-medium tracking-wide">Usage frequency by design.</p>
           </div>
        </div>

        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={topTemplates}
                margin={{ top: 0, right: 0, left: -25, bottom: 0 }}
              >
                <defs>
                   <linearGradient id="barGradient" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="0%" stopColor="#d946ef" stopOpacity={0.8} />
                      <stop offset="100%" stopColor="#d946ef" stopOpacity={0.2} />
                   </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#ffffff" strokeOpacity={0.05} strokeDasharray="3 3" />
                <XAxis 
                   dataKey="name" 
                   axisLine={false}
                   tickLine={false}
                   tick={{ fill: "#71717a", fontSize: 10, fontWeight: 700 }} 
                   dy={15}
                />
                <YAxis 
                   axisLine={false}
                   tickLine={false}
                   tick={{ fill: "#71717a", fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip content={<CustomTooltip />} cursor={{ fill: "rgba(255,255,255,0.03)", radius: 15 }} />
                <Bar 
                   dataKey="usage" 
                   name="Usage"
                   fill="url(#barGradient)" 
                   barSize={36} 
                   radius={[8, 8, 4, 4]} 
                />
              </BarChart>
            </ResponsiveContainer>
        </div>
      </motion.div>

      {/* 🌊 Growth Activity - Clean Area Chart */}
      <motion.div 
        initial={{ opacity: 0, x: 20 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ duration: 0.6 }}
        className="group relative bg-[#0a0a0a]/40 backdrop-blur-xl border border-white/10 rounded-[2.5rem] p-10 overflow-hidden"
      >
        <div className="flex items-center justify-between mb-10">
           <div className="flex flex-col gap-1">
              <h2 className="text-xl font-bold tracking-tight text-white flex items-center gap-3">
                <HiOutlineChartBar className="text-indigo-400" />
                Growth Map
              </h2>
              <p className="text-sm text-neutral-500 font-medium tracking-wide">Monthly user and portfolio trends.</p>
           </div>
        </div>

        <div className="h-[300px] w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={filteredMonthlyData} margin={{ top: 0, right: 0, left: -25, bottom: 0 }}>
                <defs>
                   <linearGradient id="colorUsers" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#6366f1" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#6366f1" stopOpacity={0} />
                   </linearGradient>
                   <linearGradient id="colorPortfolios" x1="0" y1="0" x2="0" y2="1">
                      <stop offset="5%" stopColor="#10b981" stopOpacity={0.15} />
                      <stop offset="95%" stopColor="#10b981" stopOpacity={0} />
                   </linearGradient>
                </defs>
                <CartesianGrid vertical={false} stroke="#ffffff" strokeOpacity={0.05} strokeDasharray="3 3" />
                <XAxis 
                   dataKey="month" 
                   axisLine={false}
                   tickLine={false}
                   tick={{ fill: "#71717a", fontSize: 10, fontWeight: 700 }} 
                   dy={15}
                />
                <YAxis 
                   axisLine={false}
                   tickLine={false}
                   tick={{ fill: "#71717a", fontSize: 10, fontWeight: 700 }} 
                />
                <Tooltip content={<CustomTooltip />} />
                <Legend 
                   verticalAlign="top" 
                   align="right" 
                   iconType="circle"
                   content={({ payload }) => (
                      <div className="flex gap-6 mb-6">
                         {payload.map((entry, index) => (
                            <div key={index} className="flex items-center gap-2">
                               <div className="w-2 h-2 rounded-full" style={{ backgroundColor: entry.color }}></div>
                               <span className="text-[10px] font-bold uppercase tracking-widest text-neutral-500">{entry.value}</span>
                            </div>
                         ))}
                      </div>
                   )}
                />
                <Area
                  type="monotone"
                  dataKey="users"
                  name="New Users"
                  stroke="#6366f1"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorUsers)"
                />
                <Area
                  type="monotone"
                  dataKey="portfolios"
                  name="Portfolios"
                  stroke="#10b981"
                  strokeWidth={3}
                  fillOpacity={1}
                  fill="url(#colorPortfolios)"
                />
              </AreaChart>
            </ResponsiveContainer>
        </div>
      </motion.div>

    </div>
  )
}
