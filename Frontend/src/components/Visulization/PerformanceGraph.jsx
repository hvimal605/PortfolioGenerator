import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Line } from "react-chartjs-2";

// ChartJS register
ChartJS.register(
  CategoryScale,
  LinearScale,
  LineElement,
  PointElement,
  Title,
  Tooltip,
  Legend
);

const PerformanceGraph = ({ data }) => {
  const currentMonth = new Date().getMonth(); // 0-indexed: Jan = 0, Apr = 3
  const filteredData = data.slice(0, currentMonth + 1);

  const labels = filteredData.map((item) => item.month);
  const values = filteredData.map((item) => item.count);

  return (
    <div className="bg-[#1a1a1a] p-6 border border-[#4ade80] rounded-2xl shadow-2xl hover:shadow-[#4ade80]/50 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-4">
        📈 Performance in Current Year ({new Date().getFullYear()})
      </h2>

      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Templates Created",
              data: values,
              borderColor: "#4ade80",
              backgroundColor: "rgba(74, 222, 128, 0.2)",
              pointBackgroundColor: "#4ade80",
              pointBorderColor: "#ffffff",
              fill: true,
              borderWidth: 2,
              tension: 0.4,
            },
          ],
        }}
        options={{
          responsive: true,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(20, 20, 20, 0.9)",
              titleColor: "#4ade80",
              bodyColor: "#e2e8f0",
              borderColor: "#4ade80",
              borderWidth: 1,
            },
          },
          scales: {
            y: {
              beginAtZero: true,
              grid: { color: "rgba(255, 255, 255, 0.1)" },
              ticks: { color: "#e2e8f0" },
            },
            x: {
              grid: { color: "rgba(255, 255, 255, 0.1)" },
              ticks: { color: "#e2e8f0" },
            },
          },
        }}
      />
    </div>
  );
};

export default PerformanceGraph;
