import React from "react";
import { motion } from "framer-motion";
import { GrSelect } from "react-icons/gr";

import { FaRegShareFromSquare } from "react-icons/fa6";
import { GrDeploy } from "react-icons/gr";
import { IoAddCircleOutline } from "react-icons/io5";

const steps = [
  {
    id: 1,
    icon: <GrSelect size={30} className="text-green-400" />,
    title: "Choose a Template",
    titleColor: "text-green-400",
    description: "Start by selecting a template that suits your style.",
  },
  {
    id: 2,
    icon: <IoAddCircleOutline size={35} className="text-pink-400" />,
    title: "Add Details",
    titleColor: "text-pink-400",
    description: "Add your personal details, skills, and projects to the template.",
  },
  {
    id: 3,
    icon: <GrDeploy size={30} className="text-cyan-400" />,
    title: "Deploy",
    titleColor: "text-cyan-400",
    description: "Deploy your portfolio with just a click and get your live link.",
  },
  {
    id: 4,
    icon: <FaRegShareFromSquare size={30} className="text-red-400" />,
    title: "Share",
    titleColor: "text-red-400",
    description: "Share your portfolio with the world by sending your link.",
  },
];

const StepsGuide = () => {
  return (
    <section className="py-16 bg-black text-white">
    <div className="container mx-auto px-6">
      <h2 className="text-4xl font-bold mb-10 text-center text-transparent bg-clip-text bg-gradient-to-r from-pink-500 to-blue-500">
        How It Works
      </h2>
      <div className="relative border-l-2 border-dashed border-gray-400 ml-16">
        {steps.map((step, index) => (
          <motion.div
            key={step.id}
            className="mb-16 flex flex-col items-start gap-4 pl-10"
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{
              delay: index * 0.3,
              duration: 0.6,
              ease: "easeInOut",
            }}
            viewport={{ once: true }}
          >
            {/* Dot and Icon */}
            <motion.span
              className="absolute -left-8 flex items-center justify-center w-14 h-14 bg-gray-800 rounded-full shadow-xl"
              whileHover={{ rotate: 360, scale: 1.3 }}
              transition={{ duration: 0.5, ease: "easeInOut" }}
            >
              {step.icon}
            </motion.span>
  
            {/* Step Content */}
            <h3
              className={`text-2xl font-semibold ${step.titleColor} mb-2`}
            >
              {step.title}
            </h3>
            <p className="text-gray-400">{step.description}</p>
          </motion.div>
        ))}
      </div>
    </div>
  </section>
  
  );
};

export default StepsGuide;
