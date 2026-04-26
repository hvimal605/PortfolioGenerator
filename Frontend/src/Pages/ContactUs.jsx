import React, { useState } from "react";
import { Link } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { Send, MapPin, Mail, ArrowRight } from "lucide-react";
import { FaLinkedin, FaInstagram, FaGithub, FaTwitter } from "react-icons/fa";
import { submitPlatformContact } from "../services/operations/contactApi";

const SocialLink = ({ href, icon: Icon, label }) => (
  <a
    href={href}
    target="_blank"
    rel="noopener noreferrer"
    className="group relative flex items-center justify-center w-12 h-12 rounded-full bg-white/[0.03] border border-white/10 hover:bg-white/[0.08] hover:border-white/30 transition-all duration-500 overflow-hidden shadow-lg"
  >
    <div className="absolute inset-0 bg-gradient-to-tr from-rose-500/20 to-violet-500/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
    <Icon className="text-xl text-zinc-400 group-hover:text-white relative z-10 transition-colors duration-500" />
    <span className="sr-only">{label}</span>
  </a>
);

export default function ContactUs() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    message: ""
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState(null);

  const handleOnChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleOnSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      const success = await submitPlatformContact(formData);
      if (success) {
        setFormData({ firstName: "", lastName: "", email: "", message: "" });
        setSubmitStatus('success');
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
    }
    setIsSubmitting(false);

    setTimeout(() => {
      setSubmitStatus(null);
    }, 5000);
  };

  return (
    <div className="min-h-screen bg-[#0f0f11] text-white flex items-center justify-center py-24 px-4 sm:px-6 relative selection:bg-rose-500/30 overflow-hidden font-sans">

      {/* Background Gradients & Grid (Sexy Version) */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        {/* Animated dynamic dual glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3]
          }}
          transition={{ duration: 10, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] left-[20%] w-[600px] h-[600px] bg-rose-600/30 blur-[150px] rounded-full"
        />
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.2, 0.4, 0.2]
          }}
          transition={{ duration: 12, repeat: Infinity, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-[0%] right-[10%] w-[700px] h-[700px] bg-violet-600/30 blur-[150px] rounded-full"
        />

        {/* Sharp Modern Grid overlaying the glow */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#ffffff0a_1px,transparent_1px),linear-gradient(to_bottom,#ffffff0a_1px,transparent_1px)] bg-[size:40px_40px] [mask-image:radial-gradient(ellipse_80%_80%_at_50%_50%,#000_20%,transparent_100%)]"></div>
        <div className="absolute inset-0 z-10 opacity-[0.03] bg-[url('https://grainy-gradients.vercel.app/noise.svg')] blend-overlay"></div>
      </div>

      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="w-full max-w-5xl relative z-10 grid grid-cols-1 lg:grid-cols-5 border border-white/10 rounded-[2.5rem] overflow-hidden shadow-[0_0_80px_rgba(0,0,0,0.6)] backdrop-blur-3xl bg-[#18181b]/60 group"
      >

        {/* Left Information Section - Glass Panel */}
        <div className="p-10 sm:p-14 lg:col-span-2 bg-white/[0.04] flex flex-col justify-between border-b lg:border-b-0 lg:border-r border-white/5 relative overflow-hidden">
          {/* Subtle inner top glow */}
          <div className="absolute top-0 left-0 w-full h-px bg-gradient-to-r from-transparent via-white/20 to-transparent"></div>

          <div className="relative z-10">
            <h1 className="text-4xl sm:text-5xl font-black tracking-tight mb-4 text-transparent bg-clip-text bg-gradient-to-r from-rose-100 via-white to-zinc-400">
              Get in touch
            </h1>
            <p className="text-zinc-400 text-sm sm:text-base leading-relaxed mb-10 font-medium">
              We're here to help and answer any questions you might have. Fill out the form and we'll reply shortly.
            </p>

            <div className="space-y-6">
              <a href="mailto:generatorportfolio@gmail.com" className="flex items-center gap-4 text-zinc-300 group/link transition-all">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 group-hover/link:bg-rose-500/20 group-hover/link:border-rose-500/50 transition-colors shadow-inner">
                  <Mail size={18} className="text-zinc-400 group-hover/link:text-rose-400 transition-colors" />
                </div>
                <span className="text-sm font-semibold group-hover/link:text-white transition-colors tracking-wide">generatorportfolio@gmail.com</span>
              </a>
              <div className="flex items-center gap-4 text-zinc-300 group/link">
                <div className="p-3 rounded-2xl bg-white/[0.05] border border-white/10 transition-colors shadow-inner">
                  <MapPin size={18} className="text-zinc-400" />
                </div>
                <span className="text-sm font-semibold tracking-wide">Remote Worldwide</span>
              </div>
            </div>
          </div>

          <div className="mt-16 sm:mt-24 pt-8 border-t border-white/5 relative z-10">
            <h3 className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest mb-4">Follow Us</h3>
            <div className="flex gap-3">
              <SocialLink href="https://www.linkedin.com/in/harsh-kumar-vimal-5a3a57262" icon={FaLinkedin} label="LinkedIn" />
              <SocialLink href="https://www.instagram.com/harshkvimal" icon={FaInstagram} label="Instagram" />
              <SocialLink href="https://github.com/hvimal605/" icon={FaGithub} label="GitHub" />
              
            </div>
          </div>
        </div>

        {/* Right Form Section - Deep contrast glass */}
        <div className="p-10 sm:p-14 lg:col-span-3 bg-[#111113]/80 relative">

          <form onSubmit={handleOnSubmit} className="space-y-6 relative z-10">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">First Name</label>
                <input
                  required
                  type="text"
                  name="firstName"
                  value={formData.firstName}
                  onChange={handleOnChange}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/50 focus:bg-rose-500/10 transition-all text-sm font-medium outline-none ring-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                  placeholder="Jane"
                />
              </div>
              <div className="space-y-2">
                <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Last Name</label>
                <input
                  type="text"
                  name="lastName"
                  value={formData.lastName}
                  onChange={handleOnChange}
                  className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/50 focus:bg-rose-500/10 transition-all text-sm font-medium outline-none ring-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Email Address</label>
              <input
                required
                type="email"
                name="email"
                value={formData.email}
                onChange={handleOnChange}
                className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/50 focus:bg-rose-500/10 transition-all text-sm font-medium outline-none ring-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                placeholder="jane@example.com"
              />
            </div>

            <div className="space-y-2">
              <label className="text-[10px] font-bold text-zinc-400 uppercase tracking-widest ml-1">Message</label>
              <textarea
                required
                name="message"
                value={formData.message}
                onChange={handleOnChange}
                rows={5}
                className="w-full bg-white/[0.06] border border-white/10 rounded-2xl px-5 py-4 text-white placeholder:text-zinc-500 focus:outline-none focus:border-rose-500/50 focus:bg-rose-500/10 transition-all text-sm resize-none font-medium outline-none ring-0 shadow-[inset_0_2px_10px_rgba(0,0,0,0.2)]"
                placeholder="How can we help you?"
              ></textarea>
            </div>

            <button
              type="submit"
              disabled={isSubmitting}
              className="w-full relative group/btn overflow-hidden rounded-2xl p-[1px] mt-4 shadow-xl"
            >
              <span className="absolute inset-0 bg-gradient-to-r from-rose-500 via-fuchsia-500 to-violet-500 rounded-2xl opacity-70 group-hover/btn:opacity-100 transition-opacity duration-300 pointer-events-none"></span>
              <div className="relative flex items-center justify-center gap-3 bg-[#18181b] px-4 py-4 rounded-2xl transition-all duration-300 group-hover/btn:bg-opacity-0">
                <span className="font-bold text-white tracking-wide transition-colors">
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </span>
                {!isSubmitting && <ArrowRight size={18} className="text-white transform group-hover/btn:translate-x-1 transition-transform" />}
              </div>
            </button>

            <AnimatePresence>
              {submitStatus === 'success' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-emerald-400 bg-emerald-500/10 border border-emerald-500/20 rounded-xl p-3 text-sm font-bold text-center mt-4 shadow-lg backdrop-blur-md"
                >
                  Your message has been sent. We'll be in touch!
                </motion.div>
              )}
              {submitStatus === 'error' && (
                <motion.div
                  initial={{ opacity: 0, y: 5 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -5 }}
                  className="text-rose-400 bg-rose-500/10 border border-rose-500/20 rounded-xl p-3 text-sm font-bold text-center mt-4 shadow-lg backdrop-blur-md"
                >
                  There was an error sending your message.
                </motion.div>
              )}
            </AnimatePresence>
          </form>
        </div>
      </motion.div>
    </div>
  );
}
