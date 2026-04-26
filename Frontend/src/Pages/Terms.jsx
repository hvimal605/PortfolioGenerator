import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Scale, ShieldCheck, FileText, Globe, UserCheck, CreditCard, RefreshCw, AlertTriangle, Clock } from "lucide-react";
import SEO from "../components/common/SEO.JSX";

const sectionIcons = {
  1: Scale,
  2: Globe,
  3: UserCheck,
  4: CreditCard,
  5: RefreshCw,
  6: ShieldCheck,
  7: AlertTriangle,
  8: Clock
};

export default function Terms() {
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
    <div className="relative min-h-screen bg-[#030303] text-white selection:bg-indigo-500/30 overflow-x-hidden">
      <SEO 
        title="Terms & Conditions | PortfolioCraft"
        description="Review the terms and conditions for using PortfolioCraft. Understand your rights and responsibilities on our elite portfolio platform."
      />

      {/* --- Cinematic Background --- */}
      <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[120px] rounded-full animate-pulse" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-fuchsia-500/10 blur-[120px] rounded-full" />
        
        {/* Film Grain & Scanline Overlay */}
        <div className="absolute inset-0 z-10 opacity-[0.04] pointer-events-none bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-multiply"></div>
        <motion.div 
          animate={{ y: ["0%", "100%"] }}
          transition={{ duration: 12, repeat: Infinity, ease: "linear" }}
          className="absolute inset-0 z-10 pointer-events-none h-1/2 w-full bg-gradient-to-b from-transparent via-white/[0.03] to-transparent opacity-20"
        />
        
        {/* Radar Scanning Pulse */}
        <motion.div
            animate={{ top: ["-10%", "110%"] }}
            transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
            className="absolute left-0 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent z-20"
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
          <div className="inline-flex items-center gap-3 px-6 py-2 rounded-full bg-white/5 border border-white/10 text-indigo-400 text-[10px] font-black uppercase tracking-[0.3em] mb-10 shadow-[0_0_30px_rgba(79,70,229,0.1)]">
            <FileText size={14} className="animate-pulse" />
            Legal Protocol • Agreement
          </div>
          
          <h1 className="text-6xl sm:text-[6.5rem] font-black tracking-[-0.04em] leading-[0.9] flex flex-col items-center uppercase italic">
            <span className="bg-clip-text text-transparent bg-gradient-to-b from-white via-white/80 to-white/40">
                Terms of
            </span>
            <span className="relative inline-block text-transparent stroke-white" style={{ WebkitTextStroke: '1px rgba(255,255,255,0.4)', letterSpacing: '0.02em' }}>
                Service
                <motion.div 
                    initial={{ width: 0 }}
                    animate={{ width: "100%" }}
                    transition={{ duration: 1.5, delay: 0.5 }}
                    className="absolute bottom-4 left-0 h-[2px] bg-gradient-to-r from-transparent via-indigo-500 to-transparent"
                />
            </span>
          </h1>
          
          <p className="text-gray-500 text-lg sm:text-xl max-w-xl mx-auto font-medium leading-relaxed tracking-tight mt-12 bg-clip-text text-transparent bg-gradient-to-b from-gray-300 to-gray-600">
            Welcome to the elite portfolio studio. By using PortfolioCraft, you are entering into a strategic partnership defined by the protocols below.
          </p>
        </motion.div>

        <div className="w-full flex flex-col lg:flex-row gap-12 max-w-7xl relative">
          
          {/* --- Sticky Glass Navigator --- */}
          <div className="hidden lg:block w-72 shrink-0">
            <div className="sticky top-32 p-6 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] shadow-2xl">
              <h3 className="text-[10px] font-black uppercase tracking-[0.3em] text-indigo-400 mb-8 px-4 flex items-center gap-2">
                <div className="w-2 h-2 bg-indigo-500 rounded-full animate-ping" />
                Index Protocols
              </h3>
              <nav className="flex flex-col gap-2">
                {[1, 2, 3, 4, 5, 6, 7, 8].map((num) => (
                  <button
                    key={num}
                    onClick={() => document.getElementById(`section-${num}`).scrollIntoView({ behavior: 'smooth' })}
                    className={`flex items-center gap-4 px-4 py-3 rounded-2xl transition-all duration-300 group ${activeSection === num ? 'bg-indigo-500/20 text-white' : 'text-neutral-500 hover:text-neutral-300'}`}
                  >
                    <span className={`text-xs font-black transition-colors ${activeSection === num ? 'text-indigo-400' : 'text-neutral-700 group-hover:text-neutral-500'}`}>0{num}</span>
                    <span className="text-[10px] font-bold uppercase tracking-widest truncate">
                      {num === 1 && "Acceptance"}
                      {num === 2 && "Services"}
                      {num === 3 && "Accounts"}
                      {num === 4 && "Payments"}
                      {num === 5 && "Refunds"}
                      {num === 6 && "Property"}
                      {num === 7 && "Liability"}
                      {num === 8 && "Updates"}
                    </span>
                  </button>
                ))}
              </nav>
            </div>
          </div>

          {/* --- Floating Document Content --- */}
          <div className="flex-1 space-y-12 pb-32">
            {[
              { id: 1, title: "Acceptance of Terms", content: "By accessing or using our platform, you acknowledge that you have read, understood, and agreed to these Terms. If you do not agree, you must discontinue use of our services immediately." },
              { id: 2, title: "Use of Services", content: "Our platform allows users to create and customize professional portfolio websites using pre-built templates. You agree to use the services only for lawful purposes and in compliance with all applicable laws and regulations." },
              { id: 3, title: "Accounts & Security", content: "You are responsible for maintaining the confidentiality of your account and password. Any activity that occurs under your account will be your responsibility." },
              { id: 4, title: "Payments & Subscriptions", content: "PortfolioCraft offers premium plans, templates, and additional services for a fee. All payments are processed securely through third-party payment gateways such as Razorpay. By purchasing, you agree to provide accurate payment details and authorize us to charge the applicable fees." },
              { id: 5, title: "Refund & Cancellation", content: "Once a premium plan or template is purchased, it is non-refundable except as required by law. You may cancel future subscriptions anytime, but charges already processed will not be refunded. Please review our Refund Policy for details." },
              { id: 6, title: "Intellectual Property", content: "All content, templates, branding, and code on this website are the intellectual property of PortfolioCraft. You may not copy, modify, or distribute any part of the service without prior written consent." },
              { id: 7, title: "Limitation of Liability", content: "PortfolioCraft will not be liable for any direct, indirect, or incidental damages resulting from the use or inability to use our services. Your reliance on any content or service is solely at your own risk." },
              { id: 8, title: "Updates to Terms", content: "We reserve the right to update these Terms & Conditions at any time. Any changes will be posted on this page with the updated date at the bottom." }
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
                  <div className="p-10 bg-white/5 backdrop-blur-3xl border border-white/10 rounded-[3rem] shadow-2xl relative overflow-hidden transition-all duration-500 group-hover:bg-[#0a0a0a]/80 group-hover:border-indigo-500/20">
                    <div className="absolute top-0 right-0 p-12 opacity-[0.03] group-hover:opacity-[0.08] transition-opacity duration-1000 -rotate-12 pointer-events-none">
                        <Icon size={180} />
                    </div>
                    
                    <div className="flex items-center gap-5 mb-8">
                       <div className="p-3 bg-indigo-500/10 border border-indigo-500/20 rounded-2xl text-indigo-400 shadow-[0_0_20px_rgba(79,70,229,0.1)]">
                         <Icon size={24} />
                       </div>
                       <div className="flex flex-col">
                         <span className="text-xs font-black text-indigo-500/40 tracking-widest uppercase">Protocol 0{section.id}</span>
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
               <span className="text-[10px] font-black uppercase tracking-[0.2em]">Issued: 05/04/2026</span>

            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
