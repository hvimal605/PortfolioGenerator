import React from "react";
import { HiOutlineCheckCircle } from "react-icons/hi2";
import { motion } from "framer-motion";

const Instructions = () => {
    const steps = [
        "Upload a ZIP file containing your portfolio template.",
        "The template should be built using React.",
        "Do not hardcode values for projects, about me, skills, or timeline—use sample JSON data instead.",
        "Once uploaded, our team will review your template and make necessary backend integrations.",
        "The review process takes 5-7 days. You’ll receive an email once your template is published on our platform.",
        "Your template must include the following sections:"
    ];

    const sections = [
        "Hero Section (User's Name & Image)",
        "About Me (Fetch data dynamically)",
        "Projects (Use JSON for project details)",
        "Skills (Dynamic skill display)",
        "Timeline (Fetched from JSON data)",
        "Contact Form"
    ];

    return (
        <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
            className="w-full bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative group overflow-hidden"
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-emerald-500/10 blur-[100px] rounded-full group-hover:bg-emerald-500/20 transition-all duration-700 pointer-events-none"></div>

            {/* Header */}
            <div className="flex items-center gap-5 mb-10">
                <div className="w-14 h-14 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400 shadow-[0_0_20px_rgba(16,185,129,0.2)]">
                    <HiOutlineCheckCircle className="text-3xl animate-pulse" />
                </div>
                <h2 className="text-3xl font-black tracking-tighter text-white leading-tight">
                    Portfolio Template <br/>
                    <span className="text-emerald-500">Submission Instructions</span>
                </h2>
            </div>

            {/* Numbered Steps */}
            <div className="flex flex-col gap-6 mb-10">
                {steps.map((step, idx) => (
                    <div key={idx} className="flex gap-5 group/item">
                        <span className="text-lg font-black text-white/20 group-hover/item:text-emerald-500 transition-colors duration-300 lining-nums">
                           0{idx + 1}
                        </span>
                        <p className="text-zinc-400 text-sm font-medium leading-[1.6] group-hover/item:text-zinc-200 transition-colors">
                           {step}
                        </p>
                    </div>
                ))}
            </div>

            {/* Required Sections Sub-box */}
            <div className="bg-white/5 border border-white/5 rounded-[2rem] p-8 shadow-inner">
                <h3 className="text-xs font-black uppercase tracking-[0.25em] text-emerald-400 mb-6 border-b border-emerald-500/20 pb-3 inline-block">
                   Required Sections:
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-4 gap-x-8">
                    {sections.map((section, idx) => (
                        <div key={idx} className="flex items-center gap-3 group/section">
                            <div className="w-1.5 h-1.5 rounded-full bg-emerald-500/30 group-hover/section:bg-emerald-500 group-hover/section:scale-125 transition-all duration-300"></div>
                            <span className="text-xs font-bold text-white/50 group-hover/section:text-white transition-colors">{section}</span>
                        </div>
                    ))}
                </div>
            </div>

        </motion.div>
    );
};

export default Instructions;
