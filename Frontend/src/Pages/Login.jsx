import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowRight } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { googleLogin, login } from "../services/operations/authApi";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";

// ─── Animated Browser Mockup ───
const BrowserMockup = () => {
  const [activeTab, setActiveTab] = useState(0);
  const tabs = [
    { name: "Portfolio", color: "from-violet-500 to-fuchsia-500" },
    { name: "About", color: "from-blue-500 to-cyan-500" },
    { name: "Projects", color: "from-emerald-500 to-teal-500" },
  ];

  useEffect(() => {
    const t = setInterval(() => setActiveTab(i => (i + 1) % tabs.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div
      initial={{ opacity: 0, y: 30, rotateX: 10 }}
      animate={{ opacity: 1, y: 0, rotateX: 0 }}
      transition={{ delay: 0.6, duration: 1, ease: [0.22, 1, 0.36, 1] }}
      className="relative w-full max-w-md perspective-[1200px]"
    >
      {/* Glow behind */}
      <div className="absolute -inset-6 bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-pink-500/20 blur-3xl rounded-3xl" />

      <div className="relative bg-[#0c0c1d]/80 rounded-2xl border border-white/[0.08] shadow-[0_30px_100px_rgba(0,0,0,0.6)] overflow-hidden backdrop-blur-xl">
        {/* Browser bar */}
        <div className="flex items-center gap-2 px-4 py-3 border-b border-white/[0.06] bg-white/[0.02]">
          <div className="flex gap-1.5">
            <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
            <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
          </div>
          <div className="flex-1 mx-3 bg-white/[0.04] rounded-lg px-3 py-1 flex items-center gap-2">
            <div className="w-3 h-3 rounded-full bg-green-400/40 flex-shrink-0" />
            <span className="text-[10px] text-white/25 font-mono truncate">harsh-kuih.netlify.app</span>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex gap-0 border-b border-white/[0.04]">
          {tabs.map((tab, i) => (
            <button key={i} onClick={() => setActiveTab(i)}
              className={`relative flex-1 py-2 text-[10px] font-semibold uppercase tracking-wider transition-colors ${activeTab === i ? 'text-white/70' : 'text-white/20'}`}>
              {tab.name}
              {activeTab === i && <motion.div layoutId="tab-indicator" className={`absolute bottom-0 left-0 right-0 h-[2px] bg-gradient-to-r ${tab.color}`} />}
            </button>
          ))}
        </div>

        {/* Content area */}
        <div className="p-5 h-52">
          <AnimatePresence mode="wait">
            <motion.div
              key={activeTab}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className="space-y-3"
            >
              {activeTab === 0 && (
                <>
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-violet-500/40 to-fuchsia-500/40 flex items-center justify-center text-sm">👨‍💻</div>
                    <div>
                      <div className="w-24 h-2 rounded bg-white/20" />
                      <div className="w-16 h-1.5 rounded bg-white/10 mt-1.5" />
                    </div>
                  </div>
                  <div className="w-full h-2 rounded bg-white/8" />
                  <div className="w-4/5 h-2 rounded bg-white/6" />
                  <div className="grid grid-cols-3 gap-2 mt-4">
                    <div className="h-16 rounded-xl bg-gradient-to-br from-violet-500/20 to-transparent border border-white/5" />
                    <div className="h-16 rounded-xl bg-gradient-to-br from-fuchsia-500/20 to-transparent border border-white/5" />
                    <div className="h-16 rounded-xl bg-gradient-to-br from-blue-500/20 to-transparent border border-white/5" />
                  </div>
                </>
              )}
              {activeTab === 1 && (
                <>
                  <div className="flex gap-4 items-start">
                    <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-blue-500/30 to-cyan-500/30 border border-white/5 flex-shrink-0" />
                    <div className="space-y-2 flex-1">
                      <div className="w-28 h-2.5 rounded bg-white/20" />
                      <div className="w-full h-1.5 rounded bg-white/8" />
                      <div className="w-3/4 h-1.5 rounded bg-white/6" />
                      <div className="w-1/2 h-1.5 rounded bg-white/5" />
                    </div>
                  </div>
                  <div className="flex gap-2 mt-3">
                    {["React", "Node.js", "Figma"].map(s => (
                      <span key={s} className="px-2.5 py-1 rounded-lg bg-white/5 text-[9px] text-white/30 font-semibold">{s}</span>
                    ))}
                  </div>
                </>
              )}
              {activeTab === 2 && (
                <div className="space-y-2.5">
                  {[1, 2, 3].map(i => (
                    <div key={i} className="flex items-center gap-3 p-2 rounded-xl bg-white/[0.02] border border-white/[0.04]">
                      <div className={`w-8 h-8 rounded-lg bg-gradient-to-br ${i === 1 ? 'from-emerald-500/30 to-teal-500/30' : i === 2 ? 'from-amber-500/30 to-orange-500/30' : 'from-rose-500/30 to-pink-500/30'}`} />
                      <div className="flex-1">
                        <div className="w-20 h-1.5 rounded bg-white/15" />
                        <div className="w-14 h-1 rounded bg-white/8 mt-1" />
                      </div>
                      <div className="w-5 h-5 rounded bg-white/5" />
                    </div>
                  ))}
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </motion.div>
  );
};



const Login = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { email, password } = formData;

  const handleOnChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); if (error) setError(""); };
  const handleOnSubmit = (e) => { e.preventDefault(); dispatch(login(email, password, navigate)); };
  const handleGoogleLoginSuccess = (r) => { if (r.credential) dispatch(googleLogin(r.credential, navigate)); };
  const handleGoogleLoginError = () => setError("Google login failed. Try again.");

  // Staggered form animation
  const formItems = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.08, delayChildren: 0.3 } } };
  const formItem = { hidden: { opacity: 0, y: 15 }, show: { opacity: 1, y: 0, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="relative min-h-screen flex bg-[#030014] text-white overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      {/* ═══════════ LEFT — IMMERSIVE SHOWCASE ═══════════ */}
      <div className="hidden lg:flex w-[50%] relative flex-col justify-center items-center p-6 xl:p-10 overflow-hidden">
        {/* Rich BG layers */}
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-[#050018] to-fuchsia-950/60" />
          <motion.div animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-violet-600/15 blur-[180px] rounded-full" />
          <motion.div animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, delay: 4 }}
            className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-fuchsia-600/12 blur-[160px] rounded-full" />
          <motion.div animate={{ opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[40%] left-[40%] w-[300px] h-[300px] bg-blue-500/10 blur-[100px] rounded-full" />
          {/* Grid overlay */}
          <div className="absolute inset-0 opacity-[0.025]" style={{ backgroundImage: `linear-gradient(rgba(255,255,255,0.15) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.15) 1px, transparent 1px)`, backgroundSize: "50px 50px" }} />
        </div>

        <div className="relative z-10 w-full max-w-lg flex flex-col items-center">
          {/* Brand */}
          <motion.div initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.1 }}
            className="flex items-center gap-3 mb-10 self-start">
            <div className="relative">
              <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center shadow-[0_8px_30px_rgba(168,85,247,0.35)]">
                <span className="text-white font-black italic text-lg">P</span>
              </div>
              <motion.div animate={{ scale: [1, 1.4, 1], opacity: [0.4, 0, 0.4] }} transition={{ duration: 2.5, repeat: Infinity }}
                className="absolute -inset-1.5 rounded-xl bg-violet-500/25 blur-md -z-10" />
            </div>
            <span className="font-bold text-lg tracking-tight text-white/70">PortfolioCraft</span>
          </motion.div>

          {/* Headline */}
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="self-start mb-8">
            <h2 className="text-4xl xl:text-5xl font-bold tracking-tighter leading-[1.1]">
              Your work<br />deserves a<br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">spotlight.</span>
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" />
              </span>
            </h2>
          </motion.div>

          {/* Browser Mockup */}
          <BrowserMockup />


        </div>
      </div>

      {/* ═══════════ RIGHT — FORM ═══════════ */}
      <div className="w-full lg:w-[50%] flex items-center justify-center p-6 sm:p-10 relative">
        {/* Mobile glow */}
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.1)_0%,transparent_60%)]" />
        </div>
        {/* Vertical separator */}
        <div className="absolute left-0 top-[8%] bottom-[8%] w-[1px] bg-gradient-to-b from-transparent via-violet-500/15 to-transparent hidden lg:block" />

        <motion.div variants={formItems} initial="hidden" animate="show"
          className="w-full max-w-[400px] relative z-10 pt-16 lg:pt-0 pb-10 lg:pb-0">

          {/* Mobile brand */}
          <motion.div variants={formItem} className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <span className="text-white font-black italic text-base">P</span>
            </div>
            <span className="font-bold tracking-tight text-white/80">PortfolioCraft</span>
          </motion.div>

          <motion.div variants={formItem}>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Sign in</h1>
              <motion.div animate={{ rotate: [0, 14, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <HiSparkles className="text-violet-400 text-xl" />
              </motion.div>
            </div>
            <p className="text-white/25 text-sm mb-8">Enter your details to access your account</p>
          </motion.div>

          {error && (
            <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 text-center text-red-400 text-sm font-medium">
              {error}
            </motion.div>
          )}

          <form onSubmit={handleOnSubmit} className="space-y-5 mb-8">
            <motion.div variants={formItem} className="flex flex-col gap-2">
              <label className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] ml-1">Email address</label>
              <input type="email" name="email" value={email} onChange={handleOnChange} required
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 text-white placeholder:text-white/15 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/15 focus:shadow-[0_0_30px_rgba(168,85,247,0.08)] transition-all text-sm font-medium"
                placeholder="name@example.com" />
            </motion.div>

            <motion.div variants={formItem} className="flex flex-col gap-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em]">Password</label>
                <Link to="/forgot-password" className="text-[10px] font-bold text-violet-400/40 hover:text-violet-400 transition-colors uppercase tracking-wider">Forgot?</Link>
              </div>
              <div className="relative">
                <input type={showPassword ? "text" : "password"} name="password" value={password} onChange={handleOnChange} required
                  className="w-full bg-white/[0.04] border border-white/[0.08] rounded-2xl px-5 py-4 pr-12 text-white placeholder:text-white/15 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/15 focus:shadow-[0_0_30px_rgba(168,85,247,0.08)] transition-all text-sm font-medium"
                  placeholder="••••••••" />
                <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/15 hover:text-white/50 transition-colors" onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <FaEyeSlash size={15} /> : <FaEye size={15} />}
                </button>
              </div>
            </motion.div>

            <motion.div variants={formItem}>
              <button type="submit" className="group relative w-full mt-2 py-4 rounded-2xl overflow-hidden cursor-pointer">
                {/* Pulsing glow */}
                <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-2 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/30 to-pink-500/30 blur-2xl rounded-3xl -z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-pink-400" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s]" />
                <span className="relative z-10 text-white font-bold uppercase tracking-[0.25em] text-[11px] flex items-center justify-center gap-3">
                  Continue <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </form>

          {/* Divider */}
          <motion.div variants={formItem} className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
            <span className="text-[10px] font-semibold text-white/12 uppercase tracking-widest">or continue with</span>
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
          </motion.div>

          {/* Google */}
          <motion.div variants={formItem} className="mb-10 flex justify-center">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} shape="pill" theme="filled_black" size="large" logo_alignment="center" text="continue_with" />
          </motion.div>

          <motion.p variants={formItem} className="text-center text-sm text-white/20">
            Don't have an account?{" "}
            <Link to="/signup" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">Sign up</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Login;
