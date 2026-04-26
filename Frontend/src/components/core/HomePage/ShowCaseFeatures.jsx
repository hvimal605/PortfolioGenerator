import React from 'react';
import { motion } from 'framer-motion';
import { FaCheckCircle, FaUpload, FaRocket, FaGlobe } from "react-icons/fa";
import { GrDeploy } from "react-icons/gr";
import { CgInsights } from "react-icons/cg";
import { RxUpdate } from "react-icons/rx";
import { HiOutlineSparkles, HiOutlineCube, HiOutlineChartBar, HiOutlineCloudArrowUp, HiOutlineDocumentText } from "react-icons/hi2";

const features = [
  {
    heading: "Beautiful Templates",
    desc: "Choose from many unique and stylish designs. Find the one that fits your brand perfectly.",
    icon: <HiOutlineCube />,
    color: "from-indigo-500 to-blue-500",
    delay: 0.1
  },
  {
    heading: "One-Click Deploy",
    desc: "Put your portfolio online instantly. Just one click and your site is live for the world to see.",
    icon: <HiOutlineCloudArrowUp />,
    color: "from-emerald-500 to-teal-500",
    delay: 0.2
  },
  {
    heading: "Smart Insights",
    desc: "See how many people visit your site. Get feedback and stay connected with your audience.",
    icon: <HiOutlineChartBar />,
    color: "from-fuchsia-500 to-purple-500",
    delay: 0.3
  },
  {
    heading: "Easy Updates",
    desc: "Change your info anytime. Your portfolio stays fresh as your career grows and evolves.",
    icon: <RxUpdate />,
    color: "from-amber-400 to-orange-500",
    delay: 0.4
  },
  {
    heading: "Developer Studio",
    desc: "Are you a developer? Upload your own templates and share your creativity with the world.",
    icon: <HiOutlineSparkles />,
    color: "from-rose-500 to-pink-500",
    delay: 0.5
  },
  {
    heading: "AI Auto-Fill",
    desc: "Upload your resume and let our AI instantly create a structured, professional portfolio. Skip manual data entry and get a perfectly organized profile in minutes.",
    icon: <HiOutlineDocumentText />,
    color: "from-cyan-400 to-blue-500",
    delay: 0.6
  },
];

const FeatureCard = ({ heading, desc, icon, color, delay }) => (
  <motion.div
    initial={{ opacity: 0, y: 30 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true }}
    transition={{ duration: 0.8, delay }}
    whileHover={{ y: -10, scale: 1.02 }}
    className="relative group p-8 rounded-[2.5rem] bg-white/5 border border-white/10 backdrop-blur-2xl overflow-hidden hover:bg-white/10 transition-all duration-500"
  >
    {/* ✨ Dynamic Glow Background */}
    <div className={`absolute -top-24 -right-24 w-48 h-48 bg-gradient-to-br ${color} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700`}></div>

    <div className="relative z-10">
      <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${color} flex items-center justify-center text-white text-3xl shadow-lg mb-8 group-hover:rotate-12 transition-transform duration-500`}>
        {icon}
      </div>
      <h3 className="text-2xl font-black text-white mb-4 tracking-tight uppercase tracking-widest">{heading}</h3>
      <p className="text-white/50 leading-relaxed font-medium">
        {desc}
      </p>
    </div>

    {/* 🏹 Corner Accent */}
    <div className={`absolute bottom-6 right-6 opacity-0 group-hover:opacity-100 transition-all duration-700 translate-y-4 group-hover:translate-y-0`}>
      <FaRocket className="text-white/20 text-xl" />
    </div>
  </motion.div>
);

const ShowCaseFeatures = () => {
  return (
    <section className="bg-[#030712] text-white py-32 px-6 relative overflow-hidden">
      {/* 🌌 Space Blobs */}
      <div className="absolute top-1/2 left-0 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-600/10 blur-[120px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-emerald-600/5 blur-[120px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-indigo-400 mb-6 block">Premium Features</span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
            Power Up Your <br />
            <span className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-emerald-200 bg-clip-text text-transparent italic">Online Identity</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-indigo-500 to-emerald-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {features.map((feature, index) => (
            <FeatureCard
              key={index}
              heading={feature.heading}
              desc={feature.desc}
              icon={feature.icon}
              color={feature.color}
              delay={feature.delay}
            />
          ))}
        </div>
      </div>
    </section>
  );
};

export default ShowCaseFeatures;
