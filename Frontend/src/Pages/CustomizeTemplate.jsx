import React, { useState } from "react";
import { motion } from "framer-motion";
import { FaCheckCircle } from "react-icons/fa";
import { Link } from "react-router-dom";

const themes = [
  {
    name: "Default Theme",
    colors: { background: "#F0F0F0", text: "#333333", accent: "#007BFF", button: "#0056B3", border: "#CCCCCC" },
    font: "Arial",
    borderRadius: "8px",
    shadow: "shadow-md",
  },
  {
    name: "Modern Dark",
    colors: { background: "#121212", text: "#FFFFFF", accent: "#FF4081", button: "#BB86FC", border: "#333333" },
    font: "Inter",
    borderRadius: "8px",
    shadow: "shadow-lg",
  },
  {
    name: "Neon Night",
    colors: { background: "#0A0F1A", text: "#E0E0E0", accent: "#00E676", button: "#2979FF", border: "#444444" },
    font: "Orbitron",
    borderRadius: "10px",
    shadow: "shadow-xl",
  },
  {
    name: "Cyberpunk",
    colors: { background: "#1B1B2F", text: "#FF007F", accent: "#00FFFF", button: "#F9A825", border: "#393E46" },
    font: "Exo 2",
    borderRadius: "12px",
    shadow: "shadow-2xl",
  },
  {
    name: "Minimalist Black",
    colors: { background: "#000000", text: "#F5F5F5", accent: "#FF5733", button: "#C70039", border: "#888888" },
    font: "Roboto",
    borderRadius: "6px",
    shadow: "shadow-md",
  },
  // New Themes
  {
    name: "Ocean Breeze",
    colors: { background: "#D0E9F2", text: "#2C3E50", accent: "#1ABC9C", button: "#16A085", border: "#BDC3C7" },
    font: "Poppins",
    borderRadius: "8px",
    shadow: "shadow-lg",
  },
  {
    name: "Sunset Glow",
    colors: { background: "#FFB6C1", text: "#2F4F4F", accent: "#FF6347", button: "#FF4500", border: "#FF69B4" },
    font: "Lora",
    borderRadius: "10px",
    shadow: "shadow-xl",
  },
  {
    name: "Forest Green",
    colors: { background: "#228B22", text: "#FAFAFA", accent: "#32CD32", button: "#006400", border: "#8B4513" },
    font: "Roboto",
    borderRadius: "10px",
    shadow: "shadow-md",
  },
  {
    name: "Pastel Dreams",
    colors: { background: "#F1E5D3", text: "#3E3E3E", accent: "#FFB6C1", button: "#FF69B4", border: "#D8BFD8" },
    font: "Quicksand",
    borderRadius: "8px",
    shadow: "shadow-lg",
  },
  {
    name: "Tech Blue",
    colors: { background: "#1E2A47", text: "#FFFFFF", accent: "#4B8BF5", button: "#2C6DFF", border: "#3A4C73" },
    font: "Lato",
    borderRadius: "12px",
    shadow: "shadow-2xl",
  },
  {
    name: "Autumn Leaves",
    colors: { background: "#F4A300", text: "#2E2A47", accent: "#9C1F0D", button: "#D32F2F", border: "#6D4C41" },
    font: "Merriweather",
    borderRadius: "8px",
    shadow: "shadow-md",
  },
  {
    name: "Silver Lining",
    colors: { background: "#C0C0C0", text: "#2F4F4F", accent: "#8B0000", button: "#A52A2A", border: "#708090" },
    font: "Georgia",
    borderRadius: "10px",
    shadow: "shadow-lg",
  },
  {
    name: "Royal Purple",
    colors: { background: "#800080", text: "#FFFFFF", accent: "#D3B5D1", button: "#6A0DAD", border: "#4B0082" },
    font: "Times New Roman",
    borderRadius: "8px",
    shadow: "shadow-2xl",
  },
  {
    name: "Space Odyssey",
    colors: { background: "#1C1C1C", text: "#E8E8E8", accent: "#FF00FF", button: "#4B0082", border: "#696969" },
    font: "Ubuntu",
    borderRadius: "10px",
    shadow: "shadow-xl",
  },
  {
    name: "Golden Age",
    colors: { background: "#FFD700", text: "#2E2B5F", accent: "#D4AF37", button: "#B8860B", border: "#8B4513" },
    font: "Cinzel",
    borderRadius: "12px",
    shadow: "shadow-lg",
  },
  {
    name: "Royal Green",
    colors: { background: "#006400", text: "#F0FFF0", accent: "#9ACD32", button: "#8B0000", border: "#228B22" },
    font: "Noto Serif",
    borderRadius: "8px",
    shadow: "shadow-md",
  },
];


export default function CustomizeTemplate() {
  const PreviewLink = "hello";
  const [selectedTheme, setSelectedTheme] = useState("Default Theme");

  return (
    <div className="min-h-screen bg-black text-white p-8 flex flex-col">
      <h1 className="text-4xl font-extrabold text-center mb-8">Customize Your Portfolio Theme</h1>

      <div className="flex-grow overflow-y-auto p-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 max-h-[60vh]">
          {themes.map((theme, index) => (
            <motion.div whileHover={{ scale: 1.05 }} key={index}>
              <div
                className={`p-6 border-2 h-[20vh] rounded-lg cursor-pointer transition-all duration-300 relative overflow-hidden ${
                  selectedTheme === theme.name ? "border-green-500 shadow-2xl" : "border-gray-600"
                }`}
                onClick={() => setSelectedTheme(theme.name)}
                style={{
                  borderRadius: theme.borderRadius,
                  boxShadow: theme.shadow,
                  backgroundColor: theme.name === "Default Theme" ? "transparent" : theme.colors.background,
                }}
              >
                {selectedTheme === theme.name && (
                  <div className="absolute top-2 right-2 text-green-400">
                    <FaCheckCircle className="w-6 h-6" />
                  </div>
                )}
                <div className="text-center">
                  <h2
                    className="text-xl font-bold mb-3"
                    style={{ fontFamily: theme.font, color: theme.colors.text }}
                  >
                    {theme.name}
                  </h2>

                  {/* Hide color indicators for Default Theme */}
                  {theme.name !== "Default Theme" && (
                    <div className="flex justify-center gap-2 mb-4">
                      {Object.entries(theme.colors).map(([key, color], i) => (
                        <div key={i} className="text-center">
                          <div
                            className="w-8 h-8 rounded-full border"
                            style={{ backgroundColor: color, borderColor: theme.colors.border }}
                          ></div>
                          <p className="text-xs mt-1 capitalize" style={{ color: theme.colors.text }}>
                            {key}
                          </p>
                        </div>
                      ))}
                    </div>
                  )}

                  <p className="text-sm font-medium" style={{ fontFamily: theme.font, color: theme.colors.text }}>
                    Font: {theme.font}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center flex-col">
  {selectedTheme && (
    <div className="text-center mt-4 ">
      <p className="text-lg font-semibold text-white">Selected Theme: {selectedTheme}</p>
      <button className="mt-4 px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
        Apply Theme
      </button>
    </div>
  )}

  {PreviewLink && (
    <div className="text-center mt-2">
      <Link to={'/portfolio/deploy'}>
      <button className="px-6 py-3 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-all">
        Deploy
      </button>
      </Link>
    </div>
  )}
</div>

    </div>
  );
}

