import React from "react";
import { motion } from "framer-motion";
import { FaCheck, FaArrowRight, FaInfinity, FaTags, FaPalette, FaGem } from "react-icons/fa";
import { Link } from "react-router-dom";
import SEO from "../components/common/SEO";

const Pricing = () => {
  return (
    <>
      <SEO
        title="Pricing | PortfolioCraft"
        description="No subscriptions. No recurring fees. You only pay for the premium template you love, once."
        keywords="portfolio pricing, premium templates, no subscription, web builder, one time fee"
      />
      
      <div className="relative min-h-screen bg-[#020202] text-white pt-32 pb-20 overflow-hidden flex flex-col items-center justify-center">
        {/* 🌌 Sexy Cinematic Background Glows */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <div className="absolute top-[-10%] left-[20%] w-[50%] h-[50%] bg-[#FF007F]/10 blur-[150px] rounded-full mix-blend-screen"></div>
          <div className="absolute bottom-[10%] right-[10%] w-[40%] h-[40%] bg-[#7000FF]/15 blur-[150px] rounded-full mix-blend-screen"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03] mix-blend-overlay"></div>
        </div>

        <div className="max-w-6xl mx-auto px-6 relative z-10 w-full">
          
          {/* 🏷️ Header Section */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="text-center mb-16"
          >

            
            <h1 className="text-5xl md:text-7xl font-black tracking-tighter mb-6 leading-tight">
              We killed the <br className="md:hidden" /> monthly plan.<br/>
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#FFD700] via-[#FF007F] to-[#7000FF] italic">
                Pay per template.
              </span>
            </h1>
            
            <p className="text-xl text-gray-400 max-w-3xl mx-auto font-light leading-relaxed">
              Why pay every month for a website you build once? At PortfolioCraft, the platform is free. You simply pick a template—some are free, some are premium—and you pay exactly what it's worth. <strong className="text-white">Once.</strong>
            </p>
          </motion.div>

          {/* 💎 Simple Pricing Explanation */}
          <div className="w-full max-w-4xl mx-auto bg-white/5 border border-white/10 rounded-[2rem] p-8 md:p-12 backdrop-blur-xl relative overflow-hidden mb-20">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#FFD700] via-[#FF007F] to-[#7000FF]"></div>
            
            <h2 className="text-3xl md:text-4xl font-black mb-8 text-center">One-Time Purchases. No Hidden Fees.</h2>
            
            <div className="space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-white/10 flex items-center justify-center shrink-0">
                    <FaPalette className="text-gray-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Free Templates</h3>
                    <p className="text-sm text-gray-400">Beautiful, minimal designs to get you started.</p>
                  </div>
                </div>
                <div className="text-2xl font-black text-white sm:text-right">Free</div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors gap-4">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-full bg-blue-500/20 flex items-center justify-center shrink-0">
                    <FaTags className="text-blue-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Standard Templates</h3>
                    <p className="text-sm text-gray-400">Professional layouts with smooth animations.</p>
                  </div>
                </div>
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 sm:text-right uppercase tracking-wider">One-time fee</div>
              </div>

              <div className="flex flex-col sm:flex-row sm:items-center justify-between p-6 bg-white/[0.03] border border-white/5 rounded-2xl hover:bg-white/[0.06] transition-colors relative overflow-hidden gap-4">
                <div className="absolute inset-0 bg-gradient-to-r from-[#FF007F]/5 to-[#7000FF]/5 pointer-events-none"></div>
                <div className="flex items-center gap-4 relative z-10">
                  <div className="w-12 h-12 rounded-full bg-fuchsia-500/20 flex items-center justify-center shrink-0">
                    <FaGem className="text-fuchsia-400 text-lg" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white">Premium & 3D Templates</h3>
                    <p className="text-sm text-gray-400">Masterpieces with WebGL and interactive elements.</p>
                  </div>
                </div>
                <div className="text-xl font-black text-transparent bg-clip-text bg-gradient-to-r from-fuchsia-400 to-purple-400 sm:text-right relative z-10 uppercase tracking-wider">One-time fee</div>
              </div>
            </div>
          </div>

          {/* Features / Guarantees */}
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.8, duration: 1 }}
            className="flex flex-wrap justify-center gap-8 md:gap-16 mb-16"
          >
            {[
              "Pay Once, Keep Forever",
              "Free Hosting Included",
              "Unlimited Edits"
            ].map((feature, i) => (
              <div key={i} className="flex items-center gap-3">
                <div className="w-5 h-5 rounded-full bg-white/10 flex items-center justify-center">
                  <FaCheck className="text-[#FF007F] text-[10px]" />
                </div>
                <span className="text-sm font-semibold uppercase tracking-wider text-gray-300">{feature}</span>
              </div>
            ))}
          </motion.div>

          {/* CTA */}
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 1, duration: 0.8 }}
            className="flex justify-center"
          >
            <Link
              to="/templates"
              className="relative px-10 py-5 rounded-full font-black uppercase tracking-widest text-sm transition-all duration-300 hover:scale-105 overflow-hidden flex items-center justify-center gap-3 group/btn"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-[#FFD700] via-[#FF007F] to-[#7000FF] transition-transform duration-500"></div>
              <div className="absolute inset-[2px] bg-[#020202] rounded-full transition-colors duration-300 group-hover/btn:bg-transparent"></div>
              <span className="relative z-10 text-white group-hover/btn:text-white flex items-center gap-3 transition-colors duration-300">
                Explore The Marketplace <FaArrowRight className="group-hover/btn:translate-x-1 transition-transform" />
              </span>
            </Link>
          </motion.div>

        </div>
      </div>
    </>
  );
};

export default Pricing;
