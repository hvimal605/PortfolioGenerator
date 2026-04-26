import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { CreditCard, Ban, HelpCircle, FileText, ShieldAlert, History, MinusCircle, CheckCircle2 } from "lucide-react";
import SEO from "../components/common/SEO.JSX";

const sectionIcons = {
  1: MinusCircle,
  2: Ban,
  3: HelpCircle,
  4: History
};

export default function RefundPolicy() {
  const [activeSection, setActiveSection] = useState(1);

  // Intersection Observer for sticky nav
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveSection(parseInt(entry.target.id.split('-')[1]));
          }
        });
      },
      { threshold: 0.5 }
    );

    document.querySelectorAll('section[id^="section-"]').forEach((section) => {
      observer.observe(section);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="relative min-h-screen bg-[#040101] text-white selection:bg-pink-500/30 overflow-x-hidden">
      <SEO 
        title="Refund Protocol | PortfolioCraft"
        description="Review our refund and cancellation policies. Clear, transparent, and fair protocols for our elite members."
      />

      {/* --- Cinematic Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-pink-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[10%] w-[50%] h-[50%] bg-rose-500/5 blur-[120px] rounded-full" />
        
        {/* Film Grain & Scanline Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-multiply"></div>
        
        {/* Radar Scanning Pulse (Pink) */}
        <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 9, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-pink-500/20 to-transparent z-20"
        />
      </div>

      <div className="relative z-10 container mx-auto px-6 py-24 lg:py-32 flex flex-col items-center">
        
        {/* --- Extreme Editorial Header --- */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 1.2 }}
          className="text-center mb-24 relative group/hero"
        >
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-pink-500/5 border border-pink-500/10 text-pink-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_30px_rgba(236,72,153,0.1)]">
            <ShieldAlert size={14} className="animate-pulse" />
            Financial Protocol • Refund
          </div>
          
          <h1 className="text-6xl sm:text-[6.5rem] font-black tracking-[-0.04em] leading-[0.9] flex flex-col items-center uppercase italic">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40">
                Refund
            </span>
            <span className="relative inline-block text-transparent" style={{ WebkitTextStroke: '1px rgba(236,72,153,0.4)', letterSpacing: '0.02em' }}>
                Protocol
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-4 left-0 h-[2px] bg-gradient-to-r from-transparent via-pink-500 to-transparent"
                />
            </span>
          </h1>
          
          <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto font-medium leading-relaxed tracking-tight mt-12 bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-600">
            Transparency is part of our design language. We provide clear financial protocols to ensure a professional experience for every creator.
          </p>
        </motion.div>

        <div className="w-full flex flex-col lg:flex-row gap-12 max-w-7xl relative">
          
          {/* --- Sticky Glass Navigator --- */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-pink-400 mb-8 px-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-pink-500 rounded-full animate-ping" />
                Index Rules
              </h3>
              <nav className="flex flex-col gap-2">
                {[1, 2, 3, 4].map((num) => (
                  <button
                    key={num}
                    onClick={() => document.getElementById(`section-${num}`).scrollIntoView({ behavior: 'smooth' })}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${activeSection === num ? 'bg-pink-500/20 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    <span className={`text-xs font-black transition-colors ${activeSection === num ? 'text-pink-400' : 'text-neutral-700 group-hover:text-neutral-500'}`}>0{num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                      {num === 1 && "Non-Refundable"}
                      {num === 2 && "Cancellations"}
                      {num === 3 && "Support"}
                      {num === 4 && "Amendments"}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* --- Floating Document Content --- */}
          <div className="flex-1 space-y-12 pb-32">
            {[
              { id: 1, title: "Non-Refundable Services", content: "All purchases, including premium plans, templates, and additional services, are non-refundable once processed, except as explicitly required by applicable consumer law. As digital resources are instantly accessible, we cannot revert access once granted." },
              { id: 2, title: "Cancellations", content: "Users may cancel future subscriptions at any time via their account dashboard. Please note that payments already processed for the current billing cycle will not be refunded, though access will remain active until the cycle ends." },
              { id: 3, title: "Service Issues", content: "If you encounter technical issues with a template or service, contact our support team immediately. We review all performance claims on a case-by-case basis to ensure your vision is realized." },
              { id: 4, title: "Policy Amendments", content: "PortfolioCraft reserves the right to modify this Refund Protocol. Continued use of the platform after updates constitutes agreement to the synchronized terms." }
            ].map((section) => {
              const Icon = sectionIcons[section.id];
              return (
                <motion.section
                  id={`section-${section.id}`}
                  key={section.id}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, margin: "-100px" }}
                  className="group"
                >
                  <div className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-[#0a0505]/80 group-hover:border-pink-500/20">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 -rotate-12 pointer-events-none">
                        <Icon size={180} />
                    </div>
                    
                    <div className="flex items-center gap-5 mb-8">
                       <div className="p-3 bg-pink-500/10 border border-pink-500/20 rounded-2xl text-pink-400 shadow-[0_0_20px_rgba(236,72,153,0.1)]">
                         <Icon size={24} />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-xs font-black text-pink-500/40 tracking-widest uppercase">Rule 0{section.id}</span>
                         <h2 className="text-2xl font-black text-white uppercase tracking-tight">{section.title}</h2>
                       </div>
                    </div>
                    
                    <p className="text-gray-400 text-lg leading-relaxed font-medium">
                      {section.content}
                    </p>
                  </div>
                </motion.section>
              );
            })}
            
            <div className="mt-20 pt-10 border-t border-white/5 flex flex-col sm:flex-row justify-between items-center gap-6 opacity-40 italic">
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Validated: 05/04/2026</span>
            
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
