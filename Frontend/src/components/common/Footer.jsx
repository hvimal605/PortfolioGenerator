import React from "react";
import { FaLinkedin, FaInstagram, FaEnvelope } from "react-icons/fa";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";

const Footer = () => {
  return (
    <footer className="bg-[#030712] text-white py-24 px-6 border-t border-white/5 relative overflow-hidden">
      {/* 🌌 Background Atmosphere */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[1px] bg-gradient-to-r from-transparent via-indigo-500/50 to-transparent"></div>
      <div className="absolute bottom-0 right-0 w-96 h-96 bg-indigo-600/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-start gap-16 md:gap-8 relative z-10">

        {/* 🏹 Logo + Simple English Tagline */}
        <div className="flex flex-col items-center md:items-start text-center md:text-left gap-6 flex-1">
          <Link to="/" className="group flex flex-col gap-1">
            <span className="text-3xl font-black tracking-tighter leading-none">
              Portfolio<span className="bg-gradient-to-r from-indigo-200 via-fuchsia-200 to-emerald-200 bg-clip-text text-transparent italic">Craft</span>
            </span>
            <div className="w-12 h-1 bg-indigo-500 rounded-full group-hover:w-full transition-all duration-500"></div>
          </Link>
          <p className="text-lg text-white/40 max-w-sm font-medium leading-relaxed">
            Build your professional website in minutes. The easiest way to get hired.
          </p>
          <div className="flex flex-col gap-1">
            <span className="text-[10px] font-black uppercase tracking-[0.4em] text-white/20">Support Center</span>
            <a href="mailto:generatorportfolio@gmail.com" className="text-indigo-400 hover:text-white transition-colors font-black tracking-tight underline-offset-4 underline decoration-indigo-500/30">
              generatorportfolio@gmail.com
            </a>
          </div>
        </div>

        <div className="flex flex-col items-center md:items-start gap-6">
          <h2 className="text-[11px] font-black text-emerald-400 uppercase tracking-[0.4em]">Connect With Us</h2>
          <div className="flex gap-4">
            <a
              href="https://www.linkedin.com/in/harsh-kumar-vimal-5a3a57262"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-indigo-500 hover:border-indigo-400 hover:scale-110 transition-all duration-500"
            >
              <FaLinkedin />
            </a>
            <a
              href="https://www.instagram.com/harshkvimal"
              target="_blank"
              rel="noopener noreferrer"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-fuchsia-500 hover:border-fuchsia-400 hover:scale-110 transition-all duration-500"
            >
              <FaInstagram />
            </a>
            <a
              href="mailto:generatorportfolio@gmail.com"
              className="w-14 h-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-xl hover:bg-emerald-500 hover:border-emerald-400 hover:scale-110 transition-all duration-500"
            >
              <FaEnvelope />
            </a>
          </div>
        </div>

        {/* 🛡️ Legal & Credits (Simple English) */}
        <div className="flex flex-col items-center md:items-end gap-10 flex-1 w-full md:w-auto">
          <div className="flex flex-wrap justify-center md:justify-end gap-x-10 gap-y-4">
            <Link to="/terms" className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Terms</Link>
            <Link to="/privacy" className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Privacy</Link>
            <Link to="/refund" className="text-[11px] font-black uppercase tracking-widest text-white/40 hover:text-white transition-colors">Refunds</Link>
          </div>

          <div className="text-center md:text-right">
            <p className="text-[10px] font-black text-white/20 uppercase tracking-[0.4em] mb-2">Designed With ❤️ By</p>
            <span className="text-xl font-black text-white tracking-tighter">Harsh Kumar Vimal</span>
          </div>

          <div className="flex flex-col items-center md:items-end gap-1 pt-6 border-t border-white/5 w-full">
            <p className="text-[9px] font-black text-white/10 uppercase tracking-[0.6em]">
              © {new Date().getFullYear()} PortfolioCraft Studio
            </p>

          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
