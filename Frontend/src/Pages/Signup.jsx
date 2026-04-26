import React, { useState, useEffect } from "react";
import { GoogleLogin } from "@react-oauth/google";
import { motion, AnimatePresence } from "framer-motion";
import { FaEye, FaEyeSlash, FaArrowRight, FaCheck } from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { useNavigate, Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setSignupData } from "../slices/authSlice";
import { googleSignup, sendOtp } from "../services/operations/authApi";
import { ACCOUNT_TYPE } from "../utils/constants";
import Tab from "../components/common/Tab";
import { toast } from "sonner";

// ─── Animated Step Visual ───
const StepVisual = () => {
  const [step, setStep] = useState(0);
  const steps = [
    { emoji: "🎨", title: "Pick a Template", desc: "Choose from beautiful designs", color: "from-violet-500 to-fuchsia-500" },
    { emoji: "✏️", title: "Add Your Info", desc: "Fill in your details & projects", color: "from-blue-500 to-cyan-500" },
    { emoji: "🚀", title: "Go Live!", desc: "Your site is ready in seconds", color: "from-emerald-500 to-teal-500" },
  ];

  useEffect(() => {
    const t = setInterval(() => setStep(i => (i + 1) % steps.length), 3000);
    return () => clearInterval(t);
  }, []);

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.6, duration: 0.8 }}
      className="w-full max-w-md">
      {/* Step indicators */}
      <div className="flex items-center gap-0 mb-6">
        {steps.map((s, i) => (
          <React.Fragment key={i}>
            <motion.div
              animate={step >= i ? { scale: [1, 1.15, 1] } : {}}
              transition={{ duration: 0.4 }}
              className={`w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold transition-all duration-500 ${step >= i ? `bg-gradient-to-br ${s.color} shadow-lg` : 'bg-white/[0.04] border border-white/[0.06]'}`}
            >
              {step > i ? <FaCheck className="text-white text-[10px]" /> : <span className={step >= i ? '' : 'opacity-30'}>{s.emoji}</span>}
            </motion.div>
            {i < steps.length - 1 && (
              <div className="flex-1 h-[2px] mx-2 rounded-full overflow-hidden bg-white/[0.04]">
                <motion.div
                  animate={{ width: step > i ? "100%" : "0%" }}
                  transition={{ duration: 0.6, ease: "easeInOut" }}
                  className={`h-full bg-gradient-to-r ${s.color}`}
                />
              </div>
            )}
          </React.Fragment>
        ))}
      </div>

      {/* Current step content */}
      <div className="relative h-32">
        <AnimatePresence mode="wait">
          <motion.div key={step}
            initial={{ opacity: 0, y: 15, scale: 0.97 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: -15, scale: 0.97 }}
            transition={{ duration: 0.4 }}
            className={`absolute inset-0 rounded-2xl bg-gradient-to-br ${steps[step].color} p-[1px]`}
          >
            <div className="w-full h-full rounded-2xl bg-[#0a0a1e]/95 p-5 flex items-center gap-4">
              <div className="text-4xl">{steps[step].emoji}</div>
              <div>
                <h4 className="text-white font-bold text-base">{steps[step].title}</h4>
                <p className="text-white/35 text-sm mt-1">{steps[step].desc}</p>
                <div className="flex gap-1 mt-3">
                  {steps.map((_, i) => (
                    <div key={i} className={`h-1 rounded-full transition-all duration-500 ${i === step ? `w-6 bg-gradient-to-r ${steps[step].color}` : 'w-1.5 bg-white/10'}`} />
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        </AnimatePresence>
      </div>
    </motion.div>
  );
};

// ─── Feature Pill ───
const FeaturePill = ({ emoji, text, delay }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.9 }}
    animate={{ opacity: 1, scale: 1 }}
    transition={{ delay, duration: 0.5 }}
    whileHover={{ scale: 1.05, y: -2 }}
    className="px-4 py-2.5 rounded-2xl bg-white/[0.03] border border-white/[0.06] flex items-center gap-2.5 cursor-default"
  >
    <span className="text-sm">{emoji}</span>
    <span className="text-white/35 text-xs font-semibold">{text}</span>
  </motion.div>
);



const Signup = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [accountType, setAccountType] = useState(ACCOUNT_TYPE.USER);
  const [formData, setFormData] = useState({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
  const [error, setError] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showconfirmPassword, setConfirmShowPassword] = useState(false);
  const { firstName, lastName, email, password, confirmPassword } = formData;

  const handleOnChange = (e) => { setFormData(prev => ({ ...prev, [e.target.name]: e.target.value })); };
  const handleOnSubmit = (e) => {
    e.preventDefault();
    if (password !== confirmPassword) { toast.error("Passwords don't match"); return; }
    dispatch(setSignupData({ ...formData, accountType }));
    dispatch(sendOtp(formData.email, navigate));
    setFormData({ firstName: "", lastName: "", email: "", password: "", confirmPassword: "" });
    setAccountType(ACCOUNT_TYPE.USER);
  };

  const tabData = [
    { id: 1, tabName: "User", type: ACCOUNT_TYPE.USER },
    { id: 2, tabName: "Developer", type: ACCOUNT_TYPE.DEVELOPER },
  ];

  const handleGoogleLoginSuccess = (r) => {
    if (!r.credential) { toast.error("Google signup failed"); return; }
    if (!accountType) { toast.error("Pick an account type first"); return; }
    dispatch(googleSignup(r.credential, accountType, navigate));
  };
  const handleGoogleLoginError = () => setError("Google Sign-In failed. Try again.");

  const formItems = { hidden: { opacity: 0 }, show: { opacity: 1, transition: { staggerChildren: 0.06, delayChildren: 0.2 } } };
  const formItem = { hidden: { opacity: 0, y: 12 }, show: { opacity: 1, y: 0, transition: { duration: 0.45, ease: [0.22, 1, 0.36, 1] } } };

  return (
    <div className="relative min-h-screen flex bg-[#030014] text-white overflow-y-auto overflow-x-hidden [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">

      {/* ═══════════ LEFT — IMMERSIVE SHOWCASE ═══════════ */}
      <div className="hidden lg:flex w-[48%] relative flex-col justify-center items-center p-6 xl:p-10 overflow-hidden">
        <div className="absolute inset-0">
          <div className="absolute inset-0 bg-gradient-to-br from-violet-950/90 via-[#050018] to-fuchsia-950/60" />
          <motion.div animate={{ scale: [1, 1.3, 1], x: [0, 30, 0] }} transition={{ duration: 15, repeat: Infinity }}
            className="absolute top-[5%] left-[5%] w-[600px] h-[600px] bg-violet-600/15 blur-[180px] rounded-full" />
          <motion.div animate={{ scale: [1, 1.2, 1], x: [0, -20, 0] }} transition={{ duration: 18, repeat: Infinity, delay: 4 }}
            className="absolute bottom-[5%] right-[5%] w-[500px] h-[500px] bg-fuchsia-600/12 blur-[160px] rounded-full" />
          <motion.div animate={{ opacity: [0.05, 0.12, 0.05] }} transition={{ duration: 8, repeat: Infinity }}
            className="absolute top-[50%] left-[30%] w-[300px] h-[300px] bg-cyan-500/8 blur-[100px] rounded-full" />
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
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }} className="self-start mb-5">
            <h2 className="text-4xl xl:text-5xl font-bold tracking-tighter leading-[1.1]">
              Start your<br />
              <span className="relative inline-block">
                <span className="bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400 bg-clip-text text-transparent">creative</span>
                <motion.div animate={{ width: ["0%", "100%"] }} transition={{ delay: 0.8, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute -bottom-1 left-0 h-[3px] rounded-full bg-gradient-to-r from-violet-400 via-fuchsia-400 to-pink-400" />
              </span> journey.
            </h2>
          </motion.div>

          <motion.p initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.35 }}
            className="text-white/25 text-sm leading-relaxed mb-8 self-start max-w-sm">
            Create a portfolio that shows the real you. It takes minutes, not hours.
          </motion.p>

          {/* Step Visual */}
          <StepVisual />

          {/* Feature pills */}
          <div className="flex flex-wrap gap-2.5 mt-8 w-full max-w-md">
            <FeaturePill emoji="🎭" text="Premium Templates" delay={0.9} />
            <FeaturePill emoji="🧠" text="Zero Coding" delay={1.0} />
            <FeaturePill emoji="⚡" text="Instant Deploy" delay={1.1} />
            <FeaturePill emoji="💎" text="Free Forever" delay={1.2} />
          </div>


        </div>
      </div>

      {/* ═══════════ RIGHT — FORM ═══════════ */}
      <div className="w-full lg:w-[52%] flex items-center justify-center p-6 sm:p-10 relative">
        <div className="absolute inset-0 lg:hidden">
          <div className="absolute top-[-10%] left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-[radial-gradient(ellipse_at_top,rgba(168,85,247,0.1)_0%,transparent_60%)]" />
        </div>
        <div className="absolute left-0 top-[8%] bottom-[8%] w-[1px] bg-gradient-to-b from-transparent via-violet-500/15 to-transparent hidden lg:block" />

        <motion.div variants={formItems} initial="hidden" animate="show"
          className="w-full max-w-[440px] relative z-10 pt-16 lg:pt-0 pb-10 lg:pb-0">

          {/* Mobile brand */}
          <motion.div variants={formItem} className="lg:hidden flex items-center gap-2.5 mb-8">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-violet-500 to-fuchsia-500 flex items-center justify-center">
              <span className="text-white font-black italic text-base">P</span>
            </div>
            <span className="font-bold tracking-tight text-white/80">PortfolioCraft</span>
          </motion.div>

          <motion.div variants={formItem}>
            <div className="flex items-center gap-2 mb-2">
              <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-white">Create account</h1>
              <motion.div animate={{ rotate: [0, 14, -8, 0] }} transition={{ duration: 2, repeat: Infinity, delay: 1 }}>
                <HiSparkles className="text-violet-400 text-xl" />
              </motion.div>
            </div>
            <p className="text-white/25 text-sm mb-6">Sign up to start building your portfolio</p>
          </motion.div>

          {error && (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}
              className="bg-red-500/10 border border-red-500/20 rounded-2xl p-4 mb-6 text-center text-red-400 text-sm font-medium">{error}</motion.div>
          )}

          {/* Account type */}
          <motion.div variants={formItem} className="mb-6 flex justify-center">
            <Tab tabData={tabData} field={accountType} setField={setAccountType} />
          </motion.div>

          <form onSubmit={handleOnSubmit} className="space-y-4 mb-6">
            <motion.div variants={formItem} className="flex gap-3">
              {[{ l: "First Name", n: "firstName", v: firstName, p: "John" }, { l: "Last Name", n: "lastName", v: lastName, p: "Doe" }].map(f => (
                <div key={f.n} className="flex flex-col gap-1.5 w-1/2">
                  <label className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] ml-1">{f.l}</label>
                  <input type="text" name={f.n} value={f.v} onChange={handleOnChange} required placeholder={f.p}
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/15 transition-all text-sm font-medium" />
                </div>
              ))}
            </motion.div>

            <motion.div variants={formItem} className="flex flex-col gap-1.5">
              <label className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] ml-1">Email</label>
              <input type="email" name="email" value={email} onChange={handleOnChange} required placeholder="name@example.com"
                className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 text-white placeholder:text-white/15 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/15 transition-all text-sm font-medium" />
            </motion.div>

            {[{ l: "Password", n: "password", v: password, sp: showPassword, t: () => setShowPassword(!showPassword) },
            { l: "Confirm Password", n: "confirmPassword", v: confirmPassword, sp: showconfirmPassword, t: () => setConfirmShowPassword(!showconfirmPassword) }
            ].map(f => (
              <motion.div key={f.n} variants={formItem} className="flex flex-col gap-1.5">
                <label className="text-[11px] font-semibold text-white/30 uppercase tracking-[0.15em] ml-1">{f.l}</label>
                <div className="relative">
                  <input type={f.sp ? "text" : "password"} name={f.n} value={f.v} onChange={handleOnChange} required placeholder="••••••••"
                    className="w-full bg-white/[0.04] border border-white/[0.08] rounded-xl px-4 py-3 pr-12 text-white placeholder:text-white/15 focus:outline-none focus:border-violet-500/30 focus:bg-white/[0.06] focus:ring-2 focus:ring-violet-500/15 transition-all text-sm font-medium" />
                  <button type="button" className="absolute right-4 top-1/2 -translate-y-1/2 text-white/15 hover:text-white/50 transition-colors" onClick={f.t}>
                    {f.sp ? <FaEyeSlash size={14} /> : <FaEye size={14} />}
                  </button>
                </div>
              </motion.div>
            ))}

            <motion.div variants={formItem}>
              <button type="submit" className="group relative w-full mt-2 py-4 rounded-2xl overflow-hidden cursor-pointer">
                <motion.div animate={{ opacity: [0.3, 0.6, 0.3] }} transition={{ duration: 3, repeat: Infinity }}
                  className="absolute -inset-2 bg-gradient-to-r from-violet-600/30 via-fuchsia-500/30 to-pink-500/30 blur-2xl rounded-3xl -z-10" />
                <div className="absolute inset-0 bg-gradient-to-r from-violet-600 via-fuchsia-500 to-pink-500" />
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 bg-gradient-to-r from-violet-500 via-fuchsia-400 to-pink-400" />
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-[200%] group-hover:translate-x-[200%] transition-transform duration-[1.5s]" />
                <span className="relative z-10 text-white font-bold uppercase tracking-[0.25em] text-[11px] flex items-center justify-center gap-3">
                  Create Account <FaArrowRight className="text-xs group-hover:translate-x-1.5 transition-transform duration-300" />
                </span>
              </button>
            </motion.div>
          </form>

          <motion.div variants={formItem} className="flex items-center gap-4 mb-6">
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
            <span className="text-[10px] font-semibold text-white/12 uppercase tracking-widest">or</span>
            <div className="flex-1 h-[1px] bg-white/[0.06]" />
          </motion.div>

          <motion.div variants={formItem} className="mb-8 flex justify-center">
            <GoogleLogin onSuccess={handleGoogleLoginSuccess} onError={handleGoogleLoginError} useOneTap shape="pill" theme="filled_black" text="continue_with" size="large" logo_alignment="center" />
          </motion.div>

          <motion.p variants={formItem} className="text-center text-sm text-white/20">
            Already have an account?{" "}
            <Link to="/login" className="text-violet-400 hover:text-violet-300 font-semibold transition-colors">Log in</Link>
          </motion.p>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup;
