import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const TemplateUsageComparison = ({ usageStats }) => {
  const labels = usageStats.map((template) => template.name);
  const dataValues = usageStats.map((template) => template.usageCount);

  const data = {
    labels,
    datasets: [
      {
        label: "Users Using Template",
        data: dataValues,
        backgroundColor: "rgba(244, 114, 182, 0.6)",
        borderColor: "#f472b6",
        borderWidth: 2,
        hoverBackgroundColor: "#fb7185",
        hoverBorderColor: "#f43f5e",
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(20, 20, 20, 0.9)",
        titleColor: "#f472b6",
        bodyColor: "#e2e8f0",
        borderColor: "#f472b6",
        borderWidth: 1,
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: {
          color: "#e2e8f0",
          stepSize: 1,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
      },
      x: {
        grid: { color: "rgba(255, 255, 255, 0.1)" },
        ticks: { color: "#e2e8f0" },
      },
    },
  };

  return (
    <div className="bg-[#1a1a1a] p-6 rounded-2xl border border-[#f472b6] shadow-2xl hover:shadow-[#f472b6]/50 transition-all duration-300">
      <h2 className="text-2xl font-semibold text-[#e2e8f0] mb-4">
        Template Usage Comparison
      </h2>

      {usageStats.length === 0 ? (
        <p className="text-gray-400">No usage data available.</p>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default TemplateUsageComparison;
