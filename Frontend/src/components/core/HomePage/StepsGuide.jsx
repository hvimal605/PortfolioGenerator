import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPortfolioState } from "../../../slices/PortfolioSlice";
import { FaArrowRight } from "react-icons/fa";

// Import the newly extracted sub-components
import DetailedPickDesign from "./StepsComponents/DetailedPickDesign";
import DetailedAddInfo from "./StepsComponents/DetailedAddInfo";
import DetailedGoLive from "./StepsComponents/DetailedGoLive";
import DetailedShare from "./StepsComponents/DetailedShare";

export default function StepsGuide() {
  const dispatch = useDispatch();
  const [activeStep, setActiveStep] = useState(0);

  const stepsData = [
    { step: "01", title: "Pick Your Design", desc: "Start by choosing a template that matches your personal style." },
    { step: "02", title: "Add Your Info", desc: "Type in your projects, skills, and links in just a few minutes." },
    { step: "03", title: "Go Live Instantly", desc: "Click 'Deploy' and your beautiful portfolio is live on the web." },
    { step: "04", title: "Share Your Link", desc: "Send your new portfolio to companies and get hired faster." }
  ];

  // Animation Loop Sequence
  useEffect(() => {
    let isActive = true;
    const runSequence = async () => {
      while (isActive) {
        setActiveStep(0);
        await new Promise(r => setTimeout(r, 4500));
        if (!isActive) break;

        setActiveStep(1);
        await new Promise(r => setTimeout(r, 8500));
        if (!isActive) break;

        setActiveStep(2);
        await new Promise(r => setTimeout(r, 4500));
        if (!isActive) break;

        setActiveStep(3);
        await new Promise(r => setTimeout(r, 4500));
      }
    };
    runSequence();
    return () => { isActive = false; };
  }, []);

  return (
    <section className="relative min-h-screen py-24 flex flex-col items-center overflow-hidden bg-[#0a0a0a] text-white border-t border-white/5">

      {/* 🔮 Background Energy Blooms */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
      <div className="absolute inset-0 z-0 pointer-events-none">
        <div className="absolute top-0 left-[20%] w-[800px] h-[800px] bg-[radial-gradient(ellipse_at_center,rgba(99,102,241,0.06)_0%,transparent_60%)]"></div>
        <div className="absolute bottom-0 right-[-10%] w-[600px] h-[600px] bg-[radial-gradient(ellipse_at_center,rgba(52,211,153,0.05)_0%,transparent_60%)]"></div>
      </div>

      <div className="container mx-auto px-6 relative z-30 max-w-7xl">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-cyan-400 mb-6 block">How It Works</span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
            Fast Track To <br />
            <span className="bg-gradient-to-r from-cyan-400 via-indigo-400 to-fuchsia-400 bg-clip-text text-transparent italic">Success</span>
          </h2>
          <div className="w-24 h-1.5 bg-gradient-to-r from-cyan-400 to-fuchsia-500 mx-auto rounded-full"></div>
        </motion.div>

        <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20 h-full">

          {/* Left Side: Syncing Step Text */}
          <div className="flex-1 flex flex-col justify-center w-full max-w-xl mx-auto lg:mx-0">
            {/* Ultra-Sexy Elite Interactive Steps List */}
            <div className="flex flex-col gap-6 mb-12 w-full relative">
              {/* Animated Connection Track */}
              <div className="absolute left-[54px] top-10 bottom-10 w-[2px] bg-[#1a1a1a] hidden sm:block rounded-full shadow-inner">
                <motion.div
                  animate={{ height: `${(activeStep / (stepsData.length - 1)) * 100}%` }}
                  className="w-full bg-gradient-to-b from-cyan-400 via-indigo-500 to-fuchsia-500 rounded-full shadow-[0_0_15px_rgba(34,211,238,0.8)] relative"
                  transition={{ duration: 0.6, ease: "anticipate" }}
                >
                  <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-2.5 h-2.5 rounded-full bg-white shadow-[0_0_15px_white]"></div>
                </motion.div>
              </div>

              {stepsData.map((item, index) => {
                const isActive = activeStep === index;
                const isPast = index < activeStep;
                return (
                  <div
                    key={item.step}
                    className={`flex items-start gap-6 p-5 rounded-[1.5rem] transition-all duration-700 ease-out cursor-pointer relative overflow-hidden group ${isActive ? 'bg-[#0f1115]/80 border border-white/10 shadow-[0_20px_40px_rgba(0,0,0,0.8),inset_0_1px_10px_rgba(255,255,255,0.05)] scale-[1.02] -translate-y-1' : 'bg-transparent border border-transparent hover:bg-white/[0.02]'}`}
                    onClick={() => setActiveStep(index)}
                  >
                    {/* Active Glimmer Background Effects */}
                    {isActive && (
                      <>
                        <div className="absolute top-0 right-0 w-64 h-64 bg-indigo-500/10 blur-[60px] pointer-events-none rounded-full translate-x-1/2 -translate-y-1/2"></div>
                        <div className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-cyan-400 to-indigo-500 rounded-l-[1.5rem] shadow-[0_0_20px_rgba(52,211,153,0.4)]"></div>
                      </>
                    )}

                    {/* Highly Crafted Orb Icon */}
                    <div className={`w-[70px] h-[70px] flex-shrink-0 rounded-2xl flex items-center justify-center font-black transition-all duration-700 z-10 relative overflow-hidden ${isActive ? 'bg-gradient-to-b from-cyan-400 to-indigo-600 text-white shadow-[0_10px_30px_rgba(99,102,241,0.5),inset_0_2px_5px_rgba(255,255,255,0.5)]' : isPast ? 'bg-[#151a20] text-cyan-400/50 border border-cyan-900/40 shadow-inner' : 'bg-[#0a0a0a] text-white/20 border border-white/5 shadow-inner group-hover:border-white/10'}`}>
                      {isActive && <div className="absolute inset-0 bg-[url('https://upload.wikimedia.org/wikipedia/commons/7/76/1k_Dissolve_Noise_Texture.png')] opacity-20 mix-blend-overlay pointer-events-none"></div>}
                      <span className={`${isActive ? 'text-2xl tracking-tighter' : 'text-xl'} relative z-10 font-mono tracking-tight`}>{item.step}</span>
                    </div>

                    <div className="flex flex-col justify-center pt-2 z-10">
                      {/* Technical Monospace Overline */}
                      <span className={`text-[9px] font-mono font-bold tracking-[0.2em] uppercase mb-1.5 transition-colors ${isActive ? 'text-cyan-400 drop-shadow-[0_0_8px_rgba(34,211,238,0.8)]' : isPast ? 'text-indigo-900' : 'text-white/20'}`}>
                        {isActive ? `// STEP_${item.step} : EXECUTING` : isPast ? `// STEP_${item.step} : DONE` : `// STEP_${item.step} : PENDING`}
                      </span>

                      <h3 className={`text-[1.35rem] font-black tracking-tight transition-colors duration-500 ${isActive ? 'text-white drop-shadow-md' : isPast ? 'text-white/60' : 'text-white/30 group-hover:text-white/50'}`}>
                        {item.title}
                      </h3>

                      <AnimatePresence>
                        {isActive && (
                          <motion.p
                            initial={{ height: 0, opacity: 0, y: -10 }}
                            animate={{ height: "auto", opacity: 1, y: 0 }}
                            exit={{ height: 0, opacity: 0, y: -10 }}
                            transition={{ duration: 0.4, ease: "easeOut" }}
                            className="text-white/50 text-[14px] leading-[1.8] overflow-hidden font-medium max-w-sm mt-3"
                          >
                            {item.desc}
                          </motion.p>
                        )}
                      </AnimatePresence>
                    </div>
                  </div>
                );
              })}
            </div>

            <div className="flex justify-center lg:justify-start">
              <Link
                to="/portfolioCreate"
                onClick={() => dispatch(resetPortfolioState())}
                className="group px-10 py-5 bg-white text-black font-black uppercase tracking-[0.2em] text-[11px] rounded-full hover:scale-[1.02] active:scale-[0.98] transition-all duration-300 shadow-[0_20px_40px_rgba(255,255,255,0.15)] hover:shadow-[0_20px_50px_rgba(34,211,238,0.3)] flex items-center gap-4 relative overflow-hidden"
              >
                <div className="absolute inset-0 flex h-full w-full justify-center [transform:skew(-12deg)_translateX(-150%)] group-hover:duration-1000 group-hover:[transform:skew(-12deg)_translateX(150%)]">
                  <div className="relative h-full w-8 bg-white/20"></div>
                </div>
                <span className="relative z-10 flex items-center justify-center gap-3 w-full">Start Generating Free <FaArrowRight className="group-hover:translate-x-1 transition-transform" /></span>
              </Link>
            </div>
          </div>

          {/* Right Side: Elite Abstract UI Automation Window */}
          <div className="flex-1 w-full max-w-xl lg:max-w-none flex justify-center lg:justify-end perspective-[2000px]">
            <motion.div
              initial={{ rotateY: -15, rotateX: 5 }}
              animate={{ y: [-10, 10, -10] }}
              transition={{ y: { duration: 8, repeat: Infinity, ease: "easeInOut" } }}
              className="w-full max-w-[400px] xl:max-w-[500px] aspect-[4/5] sm:aspect-square bg-[#050505]/80 border border-white/10 rounded-[2.5rem] shadow-[0_40px_100px_rgba(0,0,0,1),inset_0_1px_20px_rgba(255,255,255,0.05)] overflow-hidden relative backdrop-blur-3xl"
            >
              {/* Premium Mac Window Header */}
              <div className="h-10 bg-[#0a0a0a] border-b border-white/5 flex items-center px-6 gap-2">
                <div className="w-2.5 h-2.5 rounded-full bg-[#ff5f56]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#ffbd2e]"></div>
                <div className="w-2.5 h-2.5 rounded-full bg-[#27c93f]"></div>
              </div>

              {/* Ultra-Detailed Animated Engine */}
              <div className="absolute inset-0 top-10 flex items-center text-center">
                <AnimatePresence mode="wait">
                  {activeStep === 0 && <DetailedPickDesign />}
                  {activeStep === 1 && <DetailedAddInfo />}
                  {activeStep === 2 && <DetailedGoLive />}
                  {activeStep === 3 && <DetailedShare />}
                </AnimatePresence>
              </div>
            </motion.div>
          </div>

        </div>
      </div>
    </section>
  );
}
