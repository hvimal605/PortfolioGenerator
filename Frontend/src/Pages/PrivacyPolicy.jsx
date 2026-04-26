import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";
import { Shield, Eye, Lock, Share2, RefreshCw, FileText, Fingerprint, Database, Bell } from "lucide-react";
import SEO from "../components/common/SEO.JSX";

const sectionIcons = {
  1: Fingerprint,
  2: Eye,
  3: Lock,
  4: Share2,
  5: Bell
};

export default function PrivacyPolicy() {
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
    <div className="relative min-h-screen bg-[#020202] text-white selection:bg-emerald-500/30 overflow-x-hidden">
      <SEO 
        title="Privacy Protocol | PortfolioCraft"
        description="Learn how PortfolioCraft protects your data. Elite security protocols for your personal and professional information."
      />

      {/* --- Cinematic Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] right-[-10%] w-[50%] h-[50%] bg-emerald-500/5 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-teal-500/5 blur-[120px] rounded-full" />
        
        {/* Film Grain & Scanline Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.03] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-multiply"></div>
        
        {/* Vertical Scanlines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(18,16,16,0)_50%,rgba(0,0,0,0.1)_50%),linear-gradient(90deg,rgba(0,255,100,0.01),rgba(0,0,0,0),rgba(0,100,255,0.01))] bg-[length:100%_4px,3px_100%] pointer-events-none opacity-20"></div>

        {/* Radar Scanning Pulse (Green) */}
        <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent z-20"
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
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-emerald-500/5 border border-emerald-500/10 text-emerald-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_30px_rgba(16,185,129,0.1)]">
            <Database size={14} className="animate-pulse" />
            Security Protocol • Privacy
          </div>
          
          <h1 className="text-6xl sm:text-[6.5rem] font-black tracking-[-0.04em] leading-[0.9] flex flex-col items-center uppercase italic">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40">
                Privacy
            </span>
            <span className="relative inline-block text-transparent" style={{ WebkitTextStroke: '1px rgba(16,185,129,0.4)', letterSpacing: '0.02em' }}>
                Protocol
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-4 left-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500 to-transparent"
                />
            </span>
          </h1>
          
          <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto font-medium leading-relaxed tracking-tight mt-12 bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-600">
            At PortfolioCraft, we treat your data with the same precision we apply to our designs. Your privacy is not a policy—it’s a core architectural principle.
          </p>
        </motion.div>

        <div className="w-full flex flex-col lg:flex-row gap-12 max-w-7xl relative">
          
          {/* --- Sticky Glass Navigator --- */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-emerald-400 mb-8 px-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-emerald-500 rounded-full animate-ping" />
                Data Modules
              </h3>
              <nav className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5].map((num) => (
                  <button
                    key={num}
                    onClick={() => document.getElementById(`section-${num}`).scrollIntoView({ behavior: 'smooth' })}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${activeSection === num ? 'bg-emerald-500/20 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    <span className={`text-xs font-black transition-colors ${activeSection === num ? 'text-emerald-400' : 'text-neutral-700 group-hover:text-neutral-500'}`}>0{num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                      {num === 1 && "Collection"}
                      {num === 2 && "Utilization"}
                      {num === 3 && "Protection"}
                      {num === 4 && "Disclosure"}
                      {num === 5 && "Updates"}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* --- Floating Document Content --- */}
          <div className="flex-1 space-y-12 pb-32">
            {[
              { id: 1, title: "Information We Collect", content: "We may collect basic user information such as name, email, and contact details when you register or use our services. For premium features, payment details are collected securely via encrypted channels through our trusted payment partners." },
              { id: 2, title: "Use of Information", content: "The information we collect is strictly used to provide, improve, and personalize our services, process transactions, and communicate critical updates regarding your portfolio account." },
              { id: 3, title: "Data Protection", content: "We implement industry-standard security measures to protect your data. All payment transactions are processed securely by trusted gateways such as Razorpay. We do not store sensitive payment details on our local servers." },
              { id: 4, title: "Sharing of Information", content: "We do not sell, trade, or rent your personal information to third parties. Information may be shared only with verified service providers required to maintain platform operations." },
              { id: 5, title: "Policy Updates", content: "PortfolioCraft reserves the right to refine this Privacy Protocol at any time. Changes will be synchronized and reflected on this page with the updated revision date." }
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
                  <div className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-[#080808]/80 group-hover:border-emerald-500/20">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 -rotate-12 pointer-events-none">
                        <Icon size={180} />
                    </div>
                    
                    <div className="flex items-center gap-5 mb-8">
                       <div className="p-3 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.1)]">
                         <Icon size={24} />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-xs font-black text-emerald-500/40 tracking-widest uppercase">Module 0{section.id}</span>
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
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Authorized: 05/04/2026</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
