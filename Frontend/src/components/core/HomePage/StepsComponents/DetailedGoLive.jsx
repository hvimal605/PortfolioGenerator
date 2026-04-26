import React from "react";
import { motion } from "framer-motion";
import { FaRocket, FaLink, FaCheck } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const CheckItem = ({ text, status, active, icon }) => (
  <div className={`flex items-center justify-between text-[7px] py-[1px] ${active ? 'text-emerald-400' : 'text-white/30'}`}>
    <div className="flex items-center gap-3">
      <div className={`w-4 h-4 rounded-[4px] flex items-center justify-center ${active ? 'bg-emerald-500/20 border border-emerald-500/40 text-emerald-400' : 'bg-white/5 border border-white/10 text-white/20'}`}>
        {active ? <FaCheck className="text-[5px]" /> : icon}
      </div>
      <span className="font-bold">{text}</span>
    </div>
    {status && <span className="text-[5px] font-bold tracking-widest opacity-80">{status}</span>}
  </div>
);

const DetailedGoLive = () => (
  <motion.div
    key="step2"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex flex-col items-center justify-center p-8 bg-[#030303] bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] bg-blend-overlay opacity-90"
  >
    {/* Rocket Header */}
    <div className="flex flex-col items-center mb-6 relative">
      <div className="absolute w-24 h-24 border border-dashed border-white/10 rounded-full flex items-center justify-center mb-4">
        <div className="absolute bottom-[-2px] w-1.5 h-1.5 bg-indigo-400 rounded-full"></div>
      </div>
      <motion.div animate={{ y: [-2, 2, -2] }} transition={{ repeat: Infinity, duration: 2 }} className="text-3xl mb-4 text-[#ff5f56] drop-shadow-[0_0_15px_rgba(255,95,86,0.8)] z-10"><FaRocket /></motion.div>
      <div className="text-2xl font-black mt-2 tracking-tight">Going <span className="text-white">live...</span></div>
      <div className="text-[7px] text-white/40 mt-1 font-medium">Sit back, we're handling everything</div>
    </div>

    {/* Deployment Checklist Box */}
    <div className="w-full max-w-[90%] bg-[#0f0f0f] rounded-2xl border border-white/5 p-5 flex flex-col gap-5 shadow-[0_20px_50px_rgba(0,0,0,0.8)]">
      {/* Progress Bar */}
      <div className="flex flex-col gap-2 border-b border-white/5 pb-5">
        <div className="flex justify-between items-center text-[5px] font-bold">
          <span className="text-white/40 tracking-[0.2em] uppercase">PROGRESS</span>
          <span className="text-[#a855f7] tracking-widest text-[7px]">60%</span>
        </div>
        <div className="w-full h-1.5 bg-white/5 rounded-full overflow-hidden shadow-inner flex items-center">
          <motion.div
            initial={{ width: "0%" }} animate={{ width: "60%" }} transition={{ delay: 0.5, duration: 2, ease: "easeOut" }}
            className="h-full bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.8)]"
          />
        </div>
      </div>

      {/* Checklist List */}
      <div className="flex flex-col gap-3.5">
        <CheckItem text="Packing your site..." status="PACKED" active={true} />
        <CheckItem text="Making it look perfect on every screen..." status="RESPONSIVE" active={true} />
        <CheckItem text="Adding a security lock..." status="SECURED" active={true} />
        <CheckItem text="Sending it to the internet..." status="CONNECTED" active={true} />
        <CheckItem text="Setting up your personal link..." active={false} icon={<FaLink />} />
        <CheckItem text="Final polish..." active={false} icon={<HiOutlineSparkles />} />
      </div>
    </div>
  </motion.div>
);

export default DetailedGoLive;
