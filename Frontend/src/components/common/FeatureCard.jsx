import React from "react";
import { motion } from "framer-motion";

const FeatureCard = ({ icon, heading, desc, borderColor, iconColor }) => {
  return (
    <motion.div
  initial={{ opacity: 0, y: 50 }}
  whileInView={{ opacity: 1, y: 0 }}
  whileHover={{ scale: 1.09 }}
  transition={{
    type: "spring",
    stiffness: 150,
    damping: 20,
    duration: 0.8,
    delay: 0.3,
  }}
  viewport={{ once: true }}
  className={`relative p-6 rounded-lg shadow-2xl bg-gradient-to-r from-gray-800 to-black border-2 ${borderColor} hover:bg-gray-800 transition-colors`}
>
  {/* Icon */}
  <div className={`text-4xl mb-4 text-gradient ${iconColor} hover:text-white transition-all duration-300 ease-in-out`}>
    {icon}
  </div>

  {/* Heading */}
  <h3 className="text-2xl font-bold mb-2 text-white tracking-wider hover:text-teal-400 transition-all duration-300 ease-in-out">
    {heading}
  </h3>

  {/* Description */}
  <p className="text-gray-400">{desc}</p>
</motion.div>

  );
};

export default FeatureCard;
