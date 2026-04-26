import React from "react";
import { motion } from "framer-motion";
import { FiUser } from "react-icons/fi";
import { FaLinkedin, FaLink, FaTwitter, FaGithub, FaRegFileAlt, FaArrowRight, FaMousePointer } from "react-icons/fa";
import { HiOutlineSparkles } from "react-icons/hi2";

const DetailedPickDesign = () => (
  <motion.div
    key="step0"
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="w-full h-full flex items-center justify-center gap-4 bg-[#0a0f12] p-4 relative overflow-hidden"
  >
    {/* Background Glow */}
    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[400px] h-[400px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full top-glow"></div>

    {/* Card 1: NEXTLEVEL.DEV */}
    <motion.div
      animate={{ y: [0, -3, 0] }}
      transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      className="w-[48%] h-[92%] bg-[#0f0f0f] rounded-3xl border border-white/5 flex flex-col overflow-hidden shadow-2xl relative z-10"
    >
      {/* Image Mockup Area */}
      <div className="w-full h-[55%] bg-black relative flex flex-col pt-1 pb-2 border-b border-white/5 rounded-t-3xl">
        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md flex items-center gap-1.5 z-10 shadow-[0_0_10px_rgba(255,255,255,0.05)]">
          <div className="w-1.5 h-1.5 rounded-full bg-cyan-500"></div>
          <span className="text-[4px] font-black text-white tracking-widest uppercase">FREE TEMPLATE</span>
        </div>

        <div className="flex justify-center gap-2 mt-1 mb-2 border border-white/10 mx-4 rounded-full py-0.5 px-2">
          {['About', 'Timeline', 'Skills', 'Projects', 'Apps', 'Contact'].map(t => (
            <div key={t} className="text-[3px] text-white/50 flex items-center gap-0.5 font-bold"><FiUser className="text-[3px] text-white/40" /> {t}</div>
          ))}
        </div>

        <div className="flex px-4 items-center justify-between mt-1 h-full pb-2">
          <div className="flex flex-col h-full justify-center">
            <span className="text-[6px] text-fuchsia-400 font-bold mb-0.5 tracking-wide">Hello, It's Me</span>
            <span className="text-[10px] font-black text-cyan-400 leading-tight">Harsh Kumar<br />Vimal</span>
            <span className="text-[4px] text-white/60 mt-1.5">And I'm a <br /><span className="text-cyan-400 font-bold">Coder</span>|</span>

            <div className="flex gap-1.5 mt-2 text-cyan-400 text-[6px]">
              <FaLinkedin /><FaLink className="text-fuchsia-400" /><FaTwitter /><FaGithub className="text-white" />
            </div>

            <div className="mt-2 bg-cyan-500 text-black px-2 py-1 rounded-sm text-[4px] font-black w-max flex items-center gap-1 shadow-[0_0_10px_rgba(34,211,238,0.3)]"><FaRegFileAlt className="text-[5px]" /> Resume</div>
          </div>
          <div className="w-[60px] h-[60px] rounded-full border-2 border-cyan-500 bg-[url('https://res.cloudinary.com/dqvgcinom/image/upload/v1745608906/PortfolioGenrator/t91fdycvcnxfynb2qr4u.jpg')] bg-cover bg-center shrink-0 shadow-[0_0_15px_rgba(34,211,238,0.2)]"></div>
        </div>
      </div>

      <div className="flex flex-col p-4 flex-1 justify-between bg-[#111111]">
        <div className="flex flex-col">
          <span className="text-[11px] font-black italic text-white tracking-widest drop-shadow-md">NEXTLEVEL.DEV</span>
          <div className="w-5 h-[2px] bg-cyan-500 mt-1 mb-2"></div>
          <span className="text-[5px] text-white/40 leading-relaxed font-medium">A stylish and professional portfolio showcasing my Full Stack Development...</span>
        </div>

        <div className="flex justify-between items-end mt-2 border-b border-white/5 pb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[4px] text-cyan-500 font-bold tracking-widest uppercase mb-0.5">PRICE</span>
            <span className="text-[9px] font-black text-white">Free</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[4px] text-white/30 tracking-widest uppercase font-bold mb-0.5">CREATED BY</span>
            <span className="text-[6px] font-bold text-white">Harsh (ADMIN Dev)</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3 relative">
          <div className="flex-[0.8] py-2 rounded-full border border-white/10 bg-white/5 text-[6px] font-medium text-white/70 flex items-center justify-center gap-1 shadow-inner cursor-pointer hover:bg-white/10 transition-colors"><HiOutlineSparkles /> Live Preview</div>
          <div className="flex-1 py-2 rounded-full bg-white text-black font-black text-[6px] text-center flex items-center justify-center gap-1 shadow-[0_5px_15px_rgba(255,255,255,0.2)] cursor-pointer">CREATE PORTFOLIO <FaArrowRight /></div>
        </div>
      </div>
    </motion.div>

    {/* Card 2: NEONVERSE */}
    <motion.div
      animate={{ y: [0, 3, 0] }}
      transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
      className="w-[48%] h-[92%] bg-[#0a0a0a] rounded-3xl border border-white/5 flex flex-col overflow-hidden shadow-2xl relative z-10"
    >
      <div className="w-full h-[55%] bg-black relative flex flex-col pt-1 pb-2 border-b border-white/5 overflow-hidden rounded-t-3xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-yellow-500/20 blur-[40px] mix-blend-screen pointer-events-none rounded-full translate-x-10 -translate-y-10"></div>

        <div className="absolute top-2 right-2 px-2 py-0.5 rounded-full border border-yellow-500/50 bg-gradient-to-r from-yellow-600 to-yellow-500 shadow-[0_0_15px_rgba(234,179,8,0.4)] flex items-center gap-1.5 z-10">
          <div className="w-1.5 h-1.5 rounded-full bg-black"></div>
          <span className="text-[4px] font-black text-black tracking-widest uppercase">PREMIUM TEMPLATE</span>
        </div>

        <div className="flex px-4 items-center justify-between mt-6 h-full relative z-10">
          <div className="flex flex-col h-full justify-center -mt-2">
            <span className="text-[6px] text-white font-bold mb-0.5">Hello It's me</span>
            <span className="text-[10px] font-black text-white leading-tight">Harsh Kumar Vimal</span>
            <span className="text-[4px] text-white/50 mt-1">And I'm <span className="text-cyan-400 font-bold">Full Stack Developer</span><span className="text-cyan-400">|</span></span>

            <div className="flex gap-1 mt-2 text-[5px]">
              <div className="px-1 py-0.5 rounded border border-white/20 text-cyan-400 flex items-center justify-center"><FaLinkedin /></div>
              <div className="px-1 py-0.5 rounded border border-rose-500/50 text-rose-500 flex items-center justify-center"><FaLink /></div>
              <div className="px-1 py-0.5 rounded border border-white/20 text-blue-400 flex items-center justify-center"><FaTwitter /></div>
            </div>

            <div className="flex gap-1 mt-1 text-[4px] text-white font-bold">
              <div className="px-1.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1 bg-white/5"><FaGithub /> Github</div>
              <div className="px-1.5 py-0.5 rounded-full border border-white/20 flex items-center gap-1 bg-white/5"><FaRegFileAlt /> Resume</div>
            </div>
          </div>

          <div className="w-[60px] h-[60px] rounded-full border border-cyan-400 shadow-[0_0_20px_rgba(34,211,238,0.5)] bg-[url('https://res.cloudinary.com/dqvgcinom/image/upload/v1745608906/PortfolioGenrator/t91fdycvcnxfynb2qr4u.jpg')] bg-cover bg-center shrink-0 -mt-2 relative">
            <div className="absolute inset-[-4px] rounded-full bg-cyan-400/20 blur-[5px] -z-10"></div>
          </div>
        </div>

        <div className="absolute bottom-1 left-1/2 -translate-x-1/2 flex flex-col items-center z-10 w-full">
          <span className="text-[12px] font-black tracking-widest text-white drop-shadow-[0_0_2px_black]">ABOUT <span className="text-fuchsia-500">ME</span></span>
          <div className="w-5 h-[1.5px] bg-cyan-500 mt-0.5"></div>
        </div>
      </div>

      <div className="flex flex-col p-4 flex-1 justify-between bg-[#0a0a0a]">
        <div className="flex flex-col">
          <span className="text-[11px] font-black italic text-transparent bg-clip-text bg-gradient-to-r from-white to-yellow-500 tracking-widest drop-shadow-md">NEONVERSE</span>
          <div className="w-5 h-[2px] bg-yellow-500 mt-1 mb-2 shadow-[0_0_5px_rgba(234,179,8,1)]"></div>
          <span className="text-[5px] text-white/40 leading-relaxed font-medium">NeonVerse is a stunning dark-themed personal portfolio template designed for...</span>
        </div>

        <div className="flex justify-between items-end mt-2 border-b border-white/5 pb-2">
          <div className="flex flex-col gap-0.5">
            <span className="text-[4px] text-yellow-500 font-bold tracking-widest uppercase mb-0.5">PRICE</span>
            <span className="text-[9px] font-black text-white">₹1</span>
          </div>
          <div className="flex flex-col items-end gap-0.5">
            <span className="text-[4px] text-white/30 tracking-widest uppercase font-bold mb-0.5">CREATED BY</span>
            <span className="text-[6px] font-bold text-white">Harsh (ADMIN Dev)</span>
          </div>
        </div>

        <div className="flex gap-2 mt-3 relative">
          <div className="flex-[0.8] py-2 rounded-full border border-white/10 bg-white/5 text-[6px] font-medium text-white/70 flex items-center justify-center gap-1 shadow-inner cursor-pointer hover:bg-white/10 transition-colors"><HiOutlineSparkles /> Live Preview</div>
          <div className="flex-1 py-2 rounded-full bg-gradient-to-r from-yellow-400 to-yellow-600 text-black font-black text-[6px] text-center flex items-center justify-center gap-1 shadow-[0_0_20px_rgba(234,179,8,0.3)] relative cursor-pointer group">
            <span className="text-blue-700 text-[5px]">💎</span> <span className="group-hover:tracking-wider transition-all">BUY NOW</span>
          </div>
        </div>
      </div>
    </motion.div>

    {/* Mouse Animation */}
    <motion.div
      initial={{ x: 150, y: 150 }}
      animate={{ x: -10, y: 110, scale: [1, 0.9, 1] }}
      transition={{ duration: 1.5, ease: "easeInOut", times: [0, 0.8, 1] }}
      className="absolute z-20 flex flex-col items-center pointer-events-none"
    >
      <FaMousePointer className="text-white text-xl drop-shadow-[0_4px_10px_rgba(255,255,255,0.8)]" />
      <motion.div
        initial={{ opacity: 0, scale: 0 }}
        animate={{ opacity: [0, 1, 0], scale: [0, 1.5, 2] }}
        transition={{ delay: 1.2, duration: 0.6 }}
        className="w-6 h-6 border-2 border-cyan-400 rounded-full absolute -top-2 -left-2"
      ></motion.div>
    </motion.div>
  </motion.div>
);

export default DetailedPickDesign;
