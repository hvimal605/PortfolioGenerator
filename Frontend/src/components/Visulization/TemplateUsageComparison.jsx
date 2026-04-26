import React from "react";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";

// Register chart components
ChartJS.register(CategoryScale, LinearScale, BarElement, Tooltip, Legend);

const TemplateUsageComparison = ({ usageStats }) => {
  const labels = usageStats.map((template) => template.name);
  const dataValues = usageStats.map((template) => template.usageCount);

  const data = {
    labels,
    datasets: [
      {
        label: "Uses",
        data: dataValues,
        backgroundColor: "rgba(217, 70, 239, 0.2)", // fuchsia-500/20
        borderColor: "rgba(217, 70, 239, 0.8)",     // fuchsia-500
        borderWidth: 2,
        hoverBackgroundColor: "rgba(217, 70, 239, 0.6)",
        hoverBorderColor: "#ffffff",
        borderRadius: 4, // rounded bar tops
        barThickness: 'flex',
        maxBarThickness: 40,
      },
    ],
  };

  const options = {
    responsive: true,
    maintainAspectRatio: false,
    plugins: {
      legend: { display: false },
      tooltip: {
        backgroundColor: "rgba(10, 10, 10, 0.9)",
        titleColor: "#ffffff",
        bodyColor: "#a1a1aa",
        titleFont: { size: 13, weight: 'bold', family: 'Inter' },
        bodyFont: { size: 12, font: 'Inter' },
        padding: 12,
        borderColor: "rgba(255, 255, 255, 0.1)",
        borderWidth: 1,
        displayColors: false,
        callbacks: {
          label: function(context) {
            return `Active Users: ${context.parsed.y}`;
          }
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        grid: { 
          color: "rgba(255, 255, 255, 0.05)",
          drawBorder: false,
        },
        ticks: {
          color: "rgba(255, 255, 255, 0.4)",
          font: { family: 'Inter', size: 11 },
          stepSize: 1,
          padding: 10,
          callback: function (value) {
            return Number.isInteger(value) ? value : null;
          },
        },
        border: { display: false }
      },
      x: {
        grid: { 
          display: false,
          drawBorder: false,
        },
        ticks: { 
          color: "rgba(255, 255, 255, 0.4)",
          font: { family: 'Inter', size: 11 },
          padding: 10,
        },
        border: { display: false }
      },
    },
  };

  return (
    <div className="w-full h-full pb-2">
      {usageStats.length === 0 ? (
        <div className="flex items-center justify-center h-48">
          <p className="text-zinc-500 text-sm font-semibold italic">No usage data found.</p>
        </div>
      ) : (
        <Bar data={data} options={options} />
      )}
    </div>
  );
};

export default TemplateUsageComparison;
