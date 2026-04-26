import React from "react";
import { motion } from "framer-motion";
import mobileVideo from "../../../assets/videos/mobile.mp4";
import laptopVideo from "../../../assets/videos/laptop.mp4";
import { HiOutlineDevicePhoneMobile, HiOutlineComputerDesktop } from "react-icons/hi2";

const MobileFriendlyShowcase = () => {
  return (
    <section className="bg-[#030712] py-32 px-6 relative overflow-hidden">
      {/* 🌌 Atmospheric Glows */}
      <div className="absolute top-1/2 right-0 w-96 h-96 bg-fuchsia-600/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-1/4 w-[500px] h-[500px] bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto container relative z-10 flex flex-col items-center">
        {/* Title & Simple English Tagline */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-24"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-400 mb-6 block">Responsive Design</span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
            Perfect On <br />
            <span className="bg-gradient-to-r from-emerald-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent italic">Every Device</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            Your portfolio will look stunning on phones, tablets, and computers. We handle the design so you don't have to.
          </p>
        </motion.div>

        {/* 🧊 3D Interactive Device Showcase */}
        <div className="relative flex flex-col lg:flex-row items-center justify-center gap-20 w-full">

          {/* 📱 Mobile Glass Mockup */}
          <motion.div
            initial={{ opacity: 0, x: -50, rotate: -5 }}
            whileInView={{ opacity: 1, x: 0, rotate: -2 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="group relative"
          >
            {/* Energy Halo */}
            <div className="absolute inset-x-[-20px] inset-y-[-20px] bg-indigo-500/20 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative w-64 aspect-[9/19.5] bg-white/5 backdrop-blur-3xl border-4 border-white/10 rounded-[3rem] shadow-2xl overflow-hidden p-[2px] hover:border-white/30 transition-all duration-700">
              <div className="w-full h-full rounded-[2.8rem] overflow-hidden bg-black relative">
                <video
                  className="w-full h-full object-cover"
                  src={mobileVideo}
                  autoPlay
                  loop
                  muted
                ></video>
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/5 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute -bottom-6 -left-6 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3">
              <HiOutlineDevicePhoneMobile className="text-emerald-400 text-xl" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Mobile Bio-Render</span>
            </div>
          </motion.div>

          {/* 💻 Laptop Masterpiece Mockup */}
          <motion.div
            initial={{ opacity: 0, x: 50, rotate: 5 }}
            whileInView={{ opacity: 1, x: 0, rotate: 2 }}
            viewport={{ once: true }}
            transition={{ duration: 1 }}
            className="group relative"
          >
            {/* Energy Halo */}
            <div className="absolute inset-x-[-30px] inset-y-[-30px] bg-emerald-500/10 blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>

            <div className="relative w-full max-w-[600px] aspect-[16/10] bg-white/5 backdrop-blur-3xl border-4 border-white/10 rounded-[2.5rem] shadow-2xl overflow-hidden p-[2px] transition-all duration-700 hover:border-white/30">
              <div className="w-full h-full rounded-[2.3rem] overflow-hidden bg-black relative">
                <video
                  className="w-full h-full object-cover"
                  src={laptopVideo}
                  autoPlay
                  loop
                  muted
                ></video>
                {/* Glass Reflection */}
                <div className="absolute inset-0 bg-gradient-to-br from-transparent via-white/5 to-transparent pointer-events-none"></div>
              </div>
            </div>

            {/* Status Indicator */}
            <div className="absolute -top-6 -right-6 px-6 py-3 bg-white/5 backdrop-blur-2xl border border-white/10 rounded-2xl flex items-center gap-3">
              <HiOutlineComputerDesktop className="text-indigo-400 text-xl" />
              <span className="text-[10px] font-black uppercase tracking-widest text-white/60">Desktop Core-sync</span>
            </div>
          </motion.div>
        </div>

        {/* 🏷️ Bottom Accent */}
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 0.2 }}
          viewport={{ once: true }}
          className="mt-32 flex flex-col items-center gap-4"
        >
          <div className="w-40 h-[1px] bg-gradient-to-r from-transparent via-white to-transparent"></div>
          <span className="text-[9px] font-black uppercase tracking-[0.6em]">Responsive Studio Build</span>
        </motion.div>
      </div>
    </section>
  );
};

export default MobileFriendlyShowcase;
