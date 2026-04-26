import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import Confetti from "react-confetti";
import { FaCopy, FaCheck } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import AnimatedButton6 from "../components/common/AnimatedButton6";
import { useDispatch, useSelector } from "react-redux";
import { deployPortfolio } from "../services/operations/PortfolioApi";
import { setStep } from "../slices/PortfolioSlice";
import { MdDashboard } from "react-icons/md";

// Fun facts to show while deploying
const funFacts = [
  "Recruiters spend just 6 seconds on a resume — your portfolio changes that.",
  "A good portfolio can increase callback chances by 40%.",
  "You're ahead of 90% of job seekers who don't have a portfolio.",
  "First impressions are made in 0.05 seconds — yours will be stunning.",
  "People remember 80% of what they see, but only 20% of what they read.",
  "Your portfolio just made you unforgettable. Seriously.",
  "Companies love candidates who go the extra mile — that's you!",
  "A personal website shows initiative, creativity, and tech-savviness.",
];

const deploySteps = [
  { text: "Packing your site...", emoji: "📦", done: "Packed" },
  { text: "Making it look perfect on every screen...", emoji: "📱", done: "Responsive" },
  { text: "Adding a security lock...", emoji: "🔒", done: "Secured" },
  { text: "Sending it to the internet...", emoji: "🌐", done: "Connected" },
  { text: "Setting up your personal link...", emoji: "🔗", done: "Linked" },
  { text: "Final polish...", emoji: "✨", done: "Done" },
];

// Floating particle component
function FloatingParticles({ count = 30 }) {
  return (
    <div className="absolute inset-0 pointer-events-none overflow-hidden">
      {[...Array(count)].map((_, i) => (
        <motion.div
          key={i}
          className="absolute rounded-full"
          style={{
            width: Math.random() * 3 + 1,
            height: Math.random() * 3 + 1,
            left: `${Math.random() * 100}%`,
            top: `${Math.random() * 100}%`,
            background: `rgba(${130 + Math.random() * 70}, ${100 + Math.random() * 60}, ${200 + Math.random() * 55}, ${0.15 + Math.random() * 0.2})`,
          }}
          animate={{
            y: [0, -40 - Math.random() * 60, 0],
            x: [0, Math.random() * 30 - 15, 0],
            opacity: [0, 0.6, 0],
          }}
          transition={{
            duration: 4 + Math.random() * 6,
            repeat: Infinity,
            delay: Math.random() * 5,
            ease: "easeInOut",
          }}
        />
      ))}
    </div>
  );
}

export default function DeployPage() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { templateId, portfolio } = useSelector((state) => state.portfolio);
  const { token } = useSelector((state) => state.auth);

  const [isDeploying, setIsDeploying] = useState(false);
  const [deployed, setDeployed] = useState(false);
  const [copied, setCopied] = useState(false);
  const [hovered, setHovered] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  const [deployedLink, setDeployedLink] = useState("");
  const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });

  const [currentStep, setCurrentStep] = useState(0);
  const [currentFact, setCurrentFact] = useState(0);
  const [progress, setProgress] = useState(0);
  const deployStarted = useRef(false);

  useEffect(() => {
    if (!templateId || !portfolio) {
      navigate("/PortfolioCreate/UploadDetails");
      dispatch(setStep(0));
    }
  }, []);

  useEffect(() => {
    if (deployed) {
      document.body.classList.add("overflow-hidden");
      setShowConfetti(true);
      setTimeout(() => setShowConfetti(false), 9000);
    } else {
      document.body.classList.remove("overflow-hidden");
    }
  }, [deployed]);

  useEffect(() => {
    const handleResize = () => setWindowSize({ width: window.innerWidth, height: window.innerHeight });
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  useEffect(() => {
    if (!isDeploying) return;

    const stepTimer = setInterval(() => {
      setCurrentStep((prev) => (prev < deploySteps.length - 1 ? prev + 1 : prev));
    }, 2800);

    const factTimer = setInterval(() => {
      setCurrentFact((prev) => (prev + 1) % funFacts.length);
    }, 4500);

    const progressTimer = setInterval(() => {
      setProgress((prev) => {
        if (prev >= 88) return 88;
        return prev + Math.random() * 2.5 + 0.8;
      });
    }, 350);

    return () => {
      clearInterval(stepTimer);
      clearInterval(factTimer);
      clearInterval(progressTimer);
    };
  }, [isDeploying]);

  useEffect(() => {
    if (deployed) {
      setProgress(100);
      setCurrentStep(deploySteps.length - 1);
    }
  }, [deployed]);

  const handleDeploy = async () => {
    if (deployStarted.current) return;
    deployStarted.current = true;
    setIsDeploying(true);
    setProgress(0);
    setCurrentStep(0);
    setCurrentFact(0);

    const PortfolioData = { templateId: templateId, PortfolioId: portfolio._id };
    const res = await deployPortfolio(PortfolioData, token);

    if (res?.success) {
      setDeployed(true);
      setDeployedLink(res.deployLink);
    }
    setIsDeploying(false);
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(`${deployedLink}`);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const progressPercent = Math.min(Math.round(progress), 100);

  return (
    <div className="min-h-screen bg-[#08080c] text-white flex flex-col items-center justify-center px-5 py-16 relative overflow-hidden">

      {/* ═══════ Ambient Background ═══════ */}
      <div className="absolute inset-0 pointer-events-none">
        {/* Top aurora glow */}
        <div className="absolute -top-[40%] left-1/2 -translate-x-1/2 w-[900px] h-[600px] bg-[radial-gradient(ellipse,_rgba(99,102,241,0.08)_0%,_rgba(168,85,247,0.04)_40%,_transparent_70%)]" />
        {/* Bottom warm glow */}
        <div className="absolute -bottom-[30%] left-1/2 -translate-x-1/2 w-[700px] h-[500px] bg-[radial-gradient(ellipse,_rgba(244,114,182,0.04)_0%,_transparent_60%)]" />
        {/* Grain texture */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-[0.03]" />
        {/* Grid lines */}
        <div className="absolute inset-0 bg-[linear-gradient(rgba(255,255,255,0.012)_1px,transparent_1px),linear-gradient(90deg,rgba(255,255,255,0.012)_1px,transparent_1px)] bg-[size:80px_80px]" />
      </div>

      <FloatingParticles count={25} />

      {/* Confetti */}
      {showConfetti && (
        <Confetti
          width={windowSize.width}
          height={windowSize.height}
          numberOfPieces={600}
          recycle={false}
          gravity={0.1}
          colors={["#6366f1", "#a78bfa", "#34d399", "#fbbf24", "#f472b6", "#818cf8"]}
        />
      )}

      {/* ═══════════════ PRE-DEPLOY ═══════════════ */}
      {!isDeploying && !deployed && (
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: [0.25, 0.1, 0, 1] }}
          className="relative z-10 flex flex-col items-center text-center max-w-2xl"
        >
          {/* Glowing orb behind rocket */}
          <div className="relative mb-10">
            <div className="absolute inset-0 w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-indigo-500/10 rounded-full blur-3xl" />
            <motion.div
              animate={{ y: [0, -15, 0], rotate: [0, 3, -3, 0] }}
              transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="text-7xl relative z-10"
            >
              🚀
            </motion.div>
          </div>

          {/* Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="flex items-center gap-2 px-4 py-1.5 bg-indigo-500/8 border border-indigo-500/15 rounded-full mb-8"
          >
            <span className="w-1.5 h-1.5 rounded-full bg-indigo-400 animate-pulse" />
            <span className="text-[10px] font-semibold uppercase tracking-[0.2em] text-indigo-300/70">Ready to launch</span>
          </motion.div>

          <h1 className="text-5xl sm:text-7xl font-bold tracking-[-0.04em] leading-[0.95] mb-6">
            Ready to share your
            <br />
            <span className="bg-gradient-to-r from-indigo-400 via-violet-400 to-fuchsia-400 bg-clip-text text-transparent">
              work with the world?
            </span>
          </h1>

          <p className="text-gray-500 text-lg sm:text-xl max-w-lg mb-12 leading-relaxed font-medium">
            One click and your portfolio goes live — visible to anyone, anywhere.
          </p>

          <button onClick={handleDeploy} className="cursor-pointer group relative">
            <div className="absolute -inset-8 bg-indigo-500/10 rounded-full blur-3xl opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
            <AnimatedButton6 text="Go Live Now" />
          </button>

          <p className="text-gray-700 text-[11px] mt-8 font-medium">Usually takes less than a minute</p>
        </motion.div>
      )}

      {/* ═══════════════ DEPLOYING ═══════════════ */}
      {isDeploying && !deployed && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.6 }}
          className="relative z-10 flex flex-col items-center w-full max-w-xl"
        >
          {/* Animated deploy orb */}
          <div className="relative mb-10">
            {/* Outer pulse ring */}
            <motion.div
              animate={{ scale: [1, 1.6, 1], opacity: [0.3, 0, 0.3] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeOut" }}
              className="absolute inset-0 w-28 h-28 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 rounded-full border border-indigo-500/20"
            />
            {/* Inner glow */}
            <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-indigo-500/10 rounded-full blur-2xl" />
            {/* Spinning orbit ring */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 8, repeat: Infinity, ease: "linear" }}
              className="absolute w-32 h-32 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 border border-dashed border-white/[0.06] rounded-full"
            >
              <div className="absolute -top-1 left-1/2 w-2 h-2 bg-indigo-400 rounded-full shadow-[0_0_8px_rgba(99,102,241,0.6)]" />
            </motion.div>

            <motion.div
              animate={{ y: [0, -8, 0] }}
              transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
              className="text-6xl relative z-10"
            >
              🚀
            </motion.div>
          </div>

          <h2 className="text-3xl sm:text-4xl font-bold text-center mb-2 tracking-tight">
            Going live...
          </h2>
          <p className="text-gray-500 text-sm mb-10 font-medium">Sit back, we're handling everything</p>

          {/* ── Glassmorphic Progress Card ── */}
          <div className="w-full bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-3xl p-8 mb-8 relative overflow-hidden">
            {/* Shimmer effect */}
            <motion.div
              animate={{ x: ["-100%", "200%"] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "linear" }}
              className="absolute top-0 left-0 w-1/3 h-full bg-gradient-to-r from-transparent via-white/[0.03] to-transparent skew-x-[-20deg]"
            />

            {/* Progress bar */}
            <div className="mb-7">
              <div className="flex items-center justify-between mb-3">
                <span className="text-[10px] uppercase tracking-[0.2em] font-bold text-gray-500">Progress</span>
                <span className="text-sm font-bold text-indigo-400 tabular-nums">{progressPercent}%</span>
              </div>
              <div className="w-full bg-white/[0.04] rounded-full h-2 overflow-hidden">
                <motion.div
                  className="h-full rounded-full relative overflow-hidden"
                  style={{
                    width: `${progress}%`,
                    background: "linear-gradient(90deg, #6366f1, #8b5cf6, #a855f7, #d946ef)",
                  }}
                  transition={{ duration: 0.4 }}
                >
                  <motion.div
                    animate={{ x: ["-100%", "100%"] }}
                    transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/30 to-transparent"
                  />
                </motion.div>
              </div>
            </div>

            {/* Steps */}
            <div className="space-y-2.5">
              {deploySteps.map((step, i) => {
                const isDone = i < currentStep;
                const isActive = i === currentStep;
                const isPending = i > currentStep;
                return (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -15 }}
                    animate={{ opacity: isPending ? 0.2 : 1, x: 0 }}
                    transition={{ delay: i * 0.12, duration: 0.4 }}
                    className={`flex items-center gap-3 py-1.5 px-3 rounded-xl transition-all duration-500 ${isActive ? "bg-indigo-500/[0.06]" : ""}`}
                  >
                    {/* Step indicator */}
                    <div className={`w-7 h-7 rounded-lg flex items-center justify-center text-xs shrink-0 transition-all duration-500 ${isDone
                      ? "bg-emerald-500/10 border border-emerald-500/20"
                      : isActive
                        ? "bg-indigo-500/10 border border-indigo-500/20"
                        : "bg-white/[0.03] border border-white/[0.04]"
                      }`}>
                      {isDone ? (
                        <motion.span
                          initial={{ scale: 0 }}
                          animate={{ scale: 1 }}
                          className="text-emerald-400 text-[10px] font-bold"
                        >✓</motion.span>
                      ) : (
                        <span className={isActive ? "animate-pulse" : ""}>{step.emoji}</span>
                      )}
                    </div>

                    <div className="flex-grow min-w-0">
                      <span className={`text-[13px] font-medium block transition-colors duration-300 ${isDone ? "text-emerald-400/60 line-through" : isActive ? "text-white" : "text-gray-600"
                        }`}>
                        {step.text}
                      </span>
                    </div>

                    {isDone && (
                      <motion.span
                        initial={{ opacity: 0, scale: 0.5 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="text-[9px] font-bold uppercase tracking-widest text-emerald-500/50 shrink-0"
                      >
                        {step.done}
                      </motion.span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>

          {/* ── Fun Fact Card ── */}
          <div className="w-full relative h-[90px] flex items-center justify-center">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentFact}
                initial={{ opacity: 0, y: 20, scale: 0.97 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: -20, scale: 0.97 }}
                transition={{ duration: 0.5 }}
                className="absolute inset-0 flex items-center"
              >
                <div className="w-full bg-gradient-to-br from-indigo-500/[0.04] via-purple-500/[0.03] to-fuchsia-500/[0.02] border border-white/[0.04] rounded-2xl px-6 py-5">
                  <p className="text-[9px] uppercase tracking-[0.25em] text-indigo-400/50 font-bold mb-1.5">💡 Did you know?</p>
                  <p className="text-gray-400 text-[13px] leading-relaxed font-medium">{funFacts[currentFact]}</p>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </motion.div>
      )}

      {/* ═══════════════ DEPLOYED SUCCESS ═══════════════ */}
      {deployed && (
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7, ease: [0.25, 0.1, 0, 1] }}
          className="relative z-10 flex flex-col items-center w-full max-w-xl"
        >
          {/* Celebration glow */}
          <div className="absolute -top-32 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-[radial-gradient(ellipse,_rgba(52,211,153,0.06)_0%,_transparent_60%)] pointer-events-none" />

          {/* Animated checkmark */}
          <motion.div
            initial={{ scale: 0, rotate: -30 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", stiffness: 180, damping: 14, delay: 0.1 }}
            className="relative mb-8"
          >
            <div className="absolute inset-0 w-24 h-24 -translate-x-1/2 -translate-y-1/2 left-1/2 top-1/2 bg-emerald-400/10 rounded-full blur-3xl" />
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 via-emerald-500 to-teal-500 flex items-center justify-center shadow-[0_10px_40px_rgba(52,211,153,0.25)]">
              <FaCheck className="text-white text-3xl" />
            </div>
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
            className="text-4xl sm:text-6xl font-bold tracking-[-0.03em] text-center mb-3"
          >
            Your site is{" "}
            <span className="bg-gradient-to-r from-emerald-400 to-teal-300 bg-clip-text text-transparent">live!</span>
            {" "}🎉
          </motion.h1>

          <motion.p
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
            className="text-gray-500 text-center mb-12 max-w-md font-medium leading-relaxed"
          >
            Share this link with recruiters, friends, or anyone.<br />Your work is now visible to the entire world.
          </motion.p>

          {/* ── Premium Link Card ── */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="w-full bg-white/[0.02] backdrop-blur-sm border border-white/[0.06] rounded-3xl p-7 mb-5 relative group overflow-hidden"
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
          >
            {/* Hover glow */}
            <div className="absolute inset-0 bg-gradient-to-r from-indigo-500/[0.02] via-transparent to-emerald-500/[0.02] opacity-0 group-hover:opacity-100 transition-opacity duration-700" />

            <div className="flex items-center gap-4 relative z-10">
              {/* Live indicator */}
              <div className="relative shrink-0">
                <div className="w-3 h-3 rounded-full bg-emerald-400" />
                <div className="absolute inset-0 w-3 h-3 rounded-full bg-emerald-400 animate-ping opacity-40" />
              </div>

              <Link
                to={deployedLink}
                target="_blank"
                className="text-indigo-400 hover:text-indigo-300 font-semibold text-sm sm:text-[15px] truncate transition-colors flex-grow"
              >
                {deployedLink}
              </Link>

              <button
                onClick={handleCopy}
                className="bg-white/[0.04] hover:bg-white/[0.08] border border-white/[0.06] p-3 rounded-xl transition-all duration-200 active:scale-90 shrink-0 group/btn"
              >
                {copied ? (
                  <FaCheck className="text-emerald-400 text-sm" />
                ) : (
                  <FaCopy className="text-gray-500 group-hover/btn:text-white text-sm transition-colors" />
                )}
              </button>
            </div>

            {/* Hover preview tooltip */}
            <AnimatePresence>
              {hovered && (
                <motion.div
                  initial={{ opacity: 0, y: 10, scale: 0.95 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: 10, scale: 0.95 }}
                  transition={{ duration: 0.25 }}
                  className="absolute left-1/2 -translate-x-1/2 bottom-[calc(100%+16px)] bg-[#0c0c12] border border-white/[0.08] rounded-2xl overflow-hidden w-[380px] h-[230px] z-50 shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
                >
                  <iframe
                    src={deployedLink}
                    title="Site preview"
                    className="w-[200%] h-[200%] origin-top-left scale-[0.5] pointer-events-none"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-[#0c0c12] via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-5 flex items-center gap-2">
                    <div className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                    <span className="text-[9px] uppercase tracking-[0.2em] text-gray-400 font-bold">Live Preview</span>
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>

          {/* Copy confirmation */}
          <AnimatePresence>
            {copied && (
              <motion.p
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0 }}
                className="text-emerald-400 text-xs font-bold mb-2"
              >
                ✓ Copied to clipboard
              </motion.p>
            )}
          </AnimatePresence>

          {/* Action buttons */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-3 w-full mt-5"
          >
            <Link
              to={deployedLink}
              target="_blank"
              className="flex-1 bg-gradient-to-r from-indigo-500 to-indigo-600 hover:from-indigo-600 hover:to-indigo-700 text-white font-bold text-sm py-4 px-6 rounded-2xl text-center transition-all duration-300 hover:-translate-y-0.5 shadow-[0_8px_30px_rgba(99,102,241,0.2)] hover:shadow-[0_12px_40px_rgba(99,102,241,0.3)]"
            >
              Visit Your Site ✨
            </Link>
            <Link
              to="/userdas"
              className="flex-1 bg-white/[0.03] hover:bg-white/[0.06] border border-white/[0.06] text-white font-bold text-sm py-4 px-6 rounded-2xl text-center transition-all duration-300 flex items-center justify-center gap-2"
            >
              <MdDashboard className="text-gray-400" />
              My Dashboard
            </Link>
          </motion.div>

          <p className="text-gray-700 text-[11px] mt-10 text-center font-medium">
            You can always edit or redeploy from your dashboard
          </p>
        </motion.div>
      )}
    </div>
  );
}
