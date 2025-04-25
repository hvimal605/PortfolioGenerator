import { FaChartLine, FaFire } from "react-icons/fa"
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  LineChart,
  Line,
  Legend,
  CartesianGrid,
} from "recharts"

export default function AdminVisulizations({ topTemplates, monthlyData }) {
  const currentMonthIndex = new Date().getMonth()
  const filteredMonthlyData = monthlyData.slice(0, currentMonthIndex + 1)

  return (
    <div className="mt-5 space-y-6 mb-3">

      {/* Top 5 Used Templates Visualization */}
      <div className="bg-gradient-to-br from-indigo-900 via-gray-900 to-gray-800 p-1 rounded-2xl shadow-2xl border border-indigo-700">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
  <FaFire className="text-red-500" />
  Top 5 Used Templates
</h2>
        <ResponsiveContainer width="100%" height={320}>
          <BarChart
            data={topTemplates}
            margin={{ top: 20, right: 30, left: 0, bottom: 20 }}
          >
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="name" tick={{ fill: "#e5e7eb", fontSize: 14 }} />
            <YAxis tick={{ fill: "#e5e7eb", fontSize: 14 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #4f46e5" }}
              itemStyle={{ color: "#e5e7eb" }}
              cursor={{ fill: "#6366f1", opacity: 0.2 }}
            />
            <Bar dataKey="usage" fill="#6366f1" barSize={50} radius={[12, 12, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Month-wise User and Portfolio Creation Visualization */}
      <div className="bg-gradient-to-br from-gray-800 via-gray-900 to-indigo-900 p-6 rounded-2xl shadow-2xl border border-yellow-600">
      <h2 className="text-3xl font-bold text-white mb-6 flex items-center gap-2">
  <FaChartLine className="text-blue-400" />
  Monthly User & Portfolio Creation - {new Date().getFullYear()}
</h2>
        <ResponsiveContainer width="100%" height={320}>
          <LineChart data={filteredMonthlyData} margin={{ top: 20, right: 30, left: 0, bottom: 10 }}>
            <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
            <XAxis dataKey="month" tick={{ fill: "#e5e7eb", fontSize: 14 }} />
            <YAxis tick={{ fill: "#e5e7eb", fontSize: 14 }} />
            <Tooltip
              contentStyle={{ backgroundColor: "#1f2937", border: "1px solid #facc15" }}
              itemStyle={{ color: "#e5e7eb" }}
            />
            <Legend wrapperStyle={{ color: "#fff", fontSize: 16 }} />
            <Line
              type="monotone"
              dataKey="users"
              stroke="#22c55e"
              strokeWidth={3}
              dot={{ stroke: "#22c55e", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
            <Line
              type="monotone"
              dataKey="portfolios"
              stroke="#facc15"
              strokeWidth={3}
              dot={{ stroke: "#facc15", strokeWidth: 2, r: 5 }}
              activeDot={{ r: 7 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

    </div>
  )
}
