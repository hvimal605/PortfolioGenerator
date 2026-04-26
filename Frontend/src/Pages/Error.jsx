import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { AiOutlineHome } from "react-icons/ai";

export default function ErrorPage() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      // Normalize mouse position from -1 to 1 based on screen size
      const x = (e.clientX / window.innerWidth - 0.5) * 2;
      const y = (e.clientY / window.innerHeight - 0.5) * 2;
      setMousePosition({ x, y });
    };
    
    // Only add listener if we have a window (prevents errors on hydration/SSR)
    if (typeof window !== "undefined") {
      window.addEventListener("mousemove", handleMouseMove);
      return () => window.removeEventListener("mousemove", handleMouseMove);
    }
  }, []);

  return (
    <div className="min-h-screen bg-[#000000] flex flex-col items-center justify-center text-white relative font-sans overflow-hidden">
      
      {/* Top ambient highlight line */}
      <div className="absolute top-0 inset-x-0 h-[1px] bg-gradient-to-r from-transparent via-zinc-600/50 to-transparent"></div>
      
      {/* Interactive Spotlight tied to mouse */}
      <motion.div 
         animate={{ 
             x: mousePosition.x * 150, 
             y: mousePosition.y * 150 
         }}
         transition={{ type: "spring", damping: 30, stiffness: 50, mass: 0.5 }}
         className="absolute top-1/2 left-1/2 w-[800px] h-[800px] bg-[radial-gradient(circle,rgba(255,255,255,0.04)_0%,rgba(0,0,0,0)_60%)] pointer-events-none blend-screen z-0 -translate-x-1/2 -translate-y-1/2"
      />

      {/* Cinematic Film Grain */}
      <div className="absolute inset-0 z-10 opacity-[0.05] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay pointer-events-none"></div>

      <div className="relative z-20 flex flex-col items-center text-center px-6 w-full">
        <motion.div
           initial={{ opacity: 0, y: 30, filter: "blur(10px)" }}
           animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
           transition={{ duration: 1.2, ease: [0.16, 1, 0.3, 1] }}
           className="relative flex items-center justify-center mb-10 w-full"
        >
          {/* Intense vibrant aura strictly controlled behind the text */}
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[60%] h-[60%] bg-gradient-to-r from-rose-500/20 via-fuchsia-500/20 to-indigo-500/20 blur-[80px] pointer-events-none mix-blend-screen rounded-full"></div>
          
          {/* First "4" - Parallax Inverse */}
          <motion.div 
            animate={{ x: mousePosition.x * -20, y: mousePosition.y * -20 }}
            transition={{ type: "spring", damping: 50, stiffness: 100 }}
            className="text-[9rem] sm:text-[12rem] md:text-[15rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-br from-white via-zinc-400 to-[#111]"
          >
            4
          </motion.div>

          {/* Abstract 3D Gyroscope serving as the "0" */}
          <motion.div 
            animate={{ x: mousePosition.x * 20, y: mousePosition.y * 20 }}
            transition={{ type: "spring", damping: 40, stiffness: 80 }}
            className="relative w-28 h-28 sm:w-40 sm:h-40 md:w-56 md:h-56 mx-2 sm:mx-6 flex items-center justify-center"
            style={{ perspective: "1000px" }}
          >
            {/* Outer Glowing Ring */}
            <motion.div 
                animate={{ rotateX: [0, 360], rotateY: [0, 180] }} 
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }} 
                className="absolute inset-0 border-[2px] md:border-[4px] border-rose-500/40 rounded-full shadow-[0_0_30px_rgba(244,63,94,0.3)]" 
            />
            {/* Navigational Axis Ring */}
            <motion.div 
                animate={{ rotateY: [0, 360], rotateZ: [0, 90] }} 
                transition={{ duration: 7, repeat: Infinity, ease: "linear" }} 
                className="absolute inset-[15%] border-[1px] md:border-[3px] border-indigo-400/50 rounded-full" 
            />
            {/* High-speed Inner Axis */}
            <motion.div 
                animate={{ rotateZ: [0, 360], rotateX: [0, 90] }} 
                transition={{ duration: 4, repeat: Infinity, ease: "linear" }} 
                className="absolute inset-[30%] border-[1px] sm:border-[2px] border-white/80 rounded-full shadow-[0_0_20px_rgba(255,255,255,0.8)]" 
            />
            {/* Power Core Orb */}
            <motion.div
                animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                className="w-2 h-2 sm:w-3 sm:h-3 bg-white rounded-full shadow-[0_0_20px_rgba(255,255,255,1)]"
            />
          </motion.div>

          {/* Second "4" - Parallax Forward */}
          <motion.div 
            animate={{ x: mousePosition.x * -40, y: mousePosition.y * -40 }}
            transition={{ type: "spring", damping: 60, stiffness: 120 }}
            className="text-[9rem] sm:text-[12rem] md:text-[15rem] font-black tracking-tighter leading-none text-transparent bg-clip-text bg-gradient-to-bl from-white via-zinc-400 to-[#111]"
          >
            4
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1, delay: 0.2, ease: [0.16, 1, 0.3, 1] }}
          className="flex flex-col items-center"
        >
          <div className="flex items-center gap-2 px-3 py-1 rounded-full border border-white/5 bg-white/[0.02] backdrop-blur-md mb-8">
             <span className="w-1.5 h-1.5 rounded-full bg-rose-500 animate-[pulse_2s_infinite] shadow-[0_0_10px_rgba(244,63,94,0.6)]"></span>
             <span className="text-zinc-400 text-[9px] font-bold tracking-widest uppercase">System Lost</span>
          </div>

          <h2 className="text-3xl sm:text-4xl font-semibold tracking-tight mb-4 text-white">
            Page Not Found.
          </h2>
          
          <p className="text-base sm:text-lg text-zinc-500 mb-10 leading-relaxed max-w-sm mx-auto font-medium">
            This module has vanished into the dark, or you've been given a broken link. Let's get you back online.
          </p>

          <Link
            to="/"
            className="group relative inline-flex h-14 items-center justify-center overflow-hidden rounded-[2rem] bg-transparent border border-white/20 px-8 font-medium text-white transition-all hover:bg-white hover:border-white hover:text-black shadow-[0_4px_20px_rgba(0,0,0,0.5)] active:scale-95"
          >
             <AiOutlineHome className="mr-3 h-5 w-5 transition-transform group-hover:-translate-y-px group-hover:-rotate-3" />
             <span className="font-semibold text-sm">Return Home</span>
          </Link>
        </motion.div>
      </div>

    </div>
  );
}
