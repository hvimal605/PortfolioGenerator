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
  Filler
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
  Legend,
  Filler
);

const PerformanceGraph = ({ data }) => {
  const currentMonth = new Date().getMonth(); // 0-indexed
  const filteredData = data.slice(0, currentMonth + 1);

  const labels = filteredData.map((item) => item.month);
  const values = filteredData.map((item) => item.count);

  return (
    <div className="w-full h-full pb-2">
      <Line
        data={{
          labels,
          datasets: [
            {
              label: "Templates Created",
              data: values,
              borderColor: "#3b82f6", // tailwind blue-500
              backgroundColor: (context) => {
                const ctx = context.chart.ctx;
                const gradient = ctx.createLinearGradient(0, 0, 0, 400);
                gradient.addColorStop(0, "rgba(59, 130, 246, 0.4)");
                gradient.addColorStop(1, "rgba(59, 130, 246, 0.0)");
                return gradient;
              },
              pointBackgroundColor: "#0A0A0A",
              pointBorderColor: "#3b82f6",
              pointBorderWidth: 2,
              pointRadius: 4,
              pointHoverRadius: 6,
              pointHoverBackgroundColor: "#3b82f6",
              pointHoverBorderColor: "#ffffff",
              fill: true,
              borderWidth: 3,
              tension: 0.4, // smooth bezier curve
            },
          ],
        }}
        options={{
          responsive: true,
          maintainAspectRatio: false,
          plugins: {
            legend: { display: false },
            tooltip: {
              backgroundColor: "rgba(10, 10, 10, 0.9)",
              titleColor: "#ffffff",
              bodyColor: "#a1a1aa", // zinc-400
              titleFont: { size: 13, weight: 'bold', family: 'Inter' },
              bodyFont: { size: 12, font: 'Inter' },
              padding: 12,
              borderColor: "rgba(255, 255, 255, 0.1)",
              borderWidth: 1,
              displayColors: false,
              callbacks: {
                label: function(context) {
                  return `Units: ${context.parsed.y}`;
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
        }}
      />
    </div>
  );
};

export default PerformanceGraph;
