import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import { useDispatch } from "react-redux";
import { resetPortfolioState } from "../../../slices/PortfolioSlice";
import { motion, AnimatePresence } from "framer-motion";
import { FaArrowRight } from "react-icons/fa";

// ─── Interactive Canvas Starfield (adapts to mobile) ───
const Starfield = () => {
  const canvasRef = useRef(null);
  const mouseRef = useRef({ x: -1, y: -1 });

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext("2d");
    let animId;
    const isMobile = window.innerWidth < 768;

    const resize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    resize();
    window.addEventListener("resize", resize);

    const STAR_COUNT = isMobile ? 80 : 160;
    const colors = ["#a855f7", "#ec4899", "#3b82f6", "#06b6d4", "#f59e0b", "#ffffff", "#818cf8", "#34d399"];
    const stars = Array.from({ length: STAR_COUNT }, () => ({
      x: Math.random() * canvas.width,
      y: Math.random() * canvas.height,
      size: 0.4 + Math.random() * 2,
      color: colors[Math.floor(Math.random() * colors.length)],
      alpha: 0.15 + Math.random() * 0.6,
      twinkleSpeed: 0.005 + Math.random() * 0.025,
      twinklePhase: Math.random() * Math.PI * 2,
      vx: (Math.random() - 0.5) * 0.2,
      vy: (Math.random() - 0.5) * 0.2,
    }));

    const handleMouse = (e) => { mouseRef.current = { x: e.clientX, y: e.clientY }; };
    const handleTouch = (e) => {
      if (e.touches[0]) mouseRef.current = { x: e.touches[0].clientX, y: e.touches[0].clientY };
    };
    window.addEventListener("mousemove", handleMouse);
    window.addEventListener("touchmove", handleTouch, { passive: true });

    let time = 0;
    const draw = () => {
      time++;
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      const { x: mx, y: my } = mouseRef.current;

      for (let i = 0; i < stars.length; i++) {
        const s = stars[i];
        s.x += s.vx; s.y += s.vy;
        if (s.x < 0) s.x = canvas.width; if (s.x > canvas.width) s.x = 0;
        if (s.y < 0) s.y = canvas.height; if (s.y > canvas.height) s.y = 0;

        if (mx > 0) {
          const dx = s.x - mx, dy = s.y - my;
          const dist = Math.sqrt(dx * dx + dy * dy);
          if (dist < 180) { s.x += dx * ((180 - dist) / 180) * 0.025; s.y += dy * ((180 - dist) / 180) * 0.025; }
        }

        const twinkle = Math.sin(time * s.twinkleSpeed + s.twinklePhase);
        const alpha = s.alpha * (0.4 + 0.6 * twinkle);

        ctx.beginPath();
        ctx.arc(s.x, s.y, s.size, 0, Math.PI * 2);
        ctx.fillStyle = s.color;
        ctx.globalAlpha = alpha;
        ctx.fill();

        if (s.size > 1.3) {
          const grad = ctx.createRadialGradient(s.x, s.y, 0, s.x, s.y, s.size * 4);
          grad.addColorStop(0, s.color);
          grad.addColorStop(1, "transparent");
          ctx.fillStyle = grad;
          ctx.globalAlpha = alpha * 0.25;
          ctx.beginPath();
          ctx.arc(s.x, s.y, s.size * 4, 0, Math.PI * 2);
          ctx.fill();
        }
      }

      // Constellation lines
      if (!isMobile) {
        ctx.globalAlpha = 1;
        for (let i = 0; i < stars.length; i++) {
          for (let j = i + 1; j < stars.length; j++) {
            const dx = stars[i].x - stars[j].x, dy = stars[i].y - stars[j].y;
            const dist = Math.sqrt(dx * dx + dy * dy);
            if (dist < 110) {
              ctx.beginPath();
              ctx.moveTo(stars[i].x, stars[i].y);
              ctx.lineTo(stars[j].x, stars[j].y);
              ctx.strokeStyle = `rgba(168, 85, 247, ${(1 - dist / 110) * 0.1})`;
              ctx.lineWidth = 0.5;
              ctx.stroke();
            }
          }
        }
      }

      // Cursor glow
      if (mx > 0) {
        const grad = ctx.createRadialGradient(mx, my, 0, mx, my, 200);
        grad.addColorStop(0, "rgba(168, 85, 247, 0.07)");
        grad.addColorStop(0.5, "rgba(236, 72, 153, 0.03)");
        grad.addColorStop(1, "transparent");
        ctx.globalAlpha = 1;
        ctx.fillStyle = grad;
        ctx.fillRect(mx - 200, my - 200, 400, 400);
      }

      animId = requestAnimationFrame(draw);
    };
    draw();

    return () => {
      cancelAnimationFrame(animId);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", handleMouse);
      window.removeEventListener("touchmove", handleTouch);
    };
  }, []);

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" />;
};

// ─── Typewriter URL ───
const TypewriterURL = () => {
  const urls = ["harsh-kuih", "priya-xm2q", "rahul-9f4k", "sarah-vn7p", "alex-jw3d"];
  const [urlIndex, setUrlIndex] = useState(0);
  const [text, setText] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const fullText = urls[urlIndex];
    let timer;
    if (!isDeleting && text === fullText) timer = setTimeout(() => setIsDeleting(true), 2000);
    else if (isDeleting && text === "") { setIsDeleting(false); setUrlIndex(p => (p + 1) % urls.length); }
    else timer = setTimeout(() => setText(isDeleting ? fullText.substring(0, text.length - 1) : fullText.substring(0, text.length + 1)), isDeleting ? 40 : 80);
    return () => clearTimeout(timer);
  }, [text, isDeleting, urlIndex]);

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 1.2, duration: 0.6 }}
      className="mt-6 sm:mt-8 inline-flex items-center gap-0 px-4 sm:px-6 py-2.5 sm:py-3 rounded-xl sm:rounded-2xl bg-white/[0.04] border border-white/[0.08] backdrop-blur-xl font-mono text-xs sm:text-sm"
    >
      <span className="text-white/30">https://</span>
      <span className="text-violet-400">{text}</span>
      <motion.span animate={{ opacity: [1, 0, 1] }} transition={{ duration: 0.8, repeat: Infinity }}
        className="w-[2px] h-4 sm:h-5 bg-violet-400 ml-[1px] inline-block" />
      <span className="text-white/30">.netlify.app</span>
    </motion.div>
  );
};

// ─── Floating Mini Portfolio Card ───
const FloatingCard = ({ gradient, emoji, label, delay, className, rotation }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.5 }}
    animate={{
      opacity: [0, 1, 1],
      scale: [0.5, 1, 1],
      y: [-6, 6, -6],
      rotate: [rotation - 1.5, rotation + 1.5, rotation - 1.5],
    }}
    transition={{
      opacity: { delay, duration: 0.8 },
      scale: { delay, duration: 0.8 },
      y: { duration: 5 + delay, repeat: Infinity, ease: "easeInOut" },
      rotate: { duration: 7 + delay, repeat: Infinity, ease: "easeInOut" },
    }}
    className={`absolute pointer-events-none z-20 ${className}`}
  >
    <div className={`w-20 h-24 sm:w-28 sm:h-36 lg:w-36 lg:h-48 rounded-xl sm:rounded-2xl ${gradient} shadow-2xl overflow-hidden border border-white/10 backdrop-blur-md relative`}>
      {/* Mini browser bar */}
      <div className="h-3 sm:h-4 bg-black/30 flex items-center gap-0.5 sm:gap-1 px-1.5 sm:px-2">
        <div className="w-1 h-1 rounded-full bg-white/30" />
        <div className="w-1 h-1 rounded-full bg-white/30" />
        <div className="w-1 h-1 rounded-full bg-white/30" />
      </div>
      {/* Mini mockup */}
      <div className="p-1.5 sm:p-2 lg:p-3 space-y-1 sm:space-y-1.5 lg:space-y-2">
        <div className="text-base sm:text-lg lg:text-2xl">{emoji}</div>
        <div className="w-full h-1 sm:h-1.5 rounded bg-white/15" />
        <div className="w-3/4 h-1 sm:h-1.5 rounded bg-white/10" />
        <div className="w-1/2 h-1 sm:h-1.5 rounded bg-white/10 hidden sm:block" />
        <div className="mt-1 sm:mt-2 lg:mt-3 grid grid-cols-2 gap-1">
          <div className="h-5 sm:h-7 lg:h-10 rounded sm:rounded-lg bg-white/10" />
          <div className="h-5 sm:h-7 lg:h-10 rounded sm:rounded-lg bg-white/10" />
        </div>
      </div>
      <div className="absolute bottom-1 sm:bottom-2 left-2 right-2">
        <span className="text-[5px] sm:text-[6px] lg:text-[7px] font-bold text-white/40 uppercase tracking-wider">{label}</span>
      </div>
    </div>
  </motion.div>
);

// ─── Animated Glow Ring ───
const GlowRing = ({ size, duration, color, opacity, delay = 0, mobile = true }) => (
  <motion.div
    animate={{ rotate: 360 }}
    transition={{ duration, repeat: Infinity, ease: "linear", delay }}
    className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 rounded-full pointer-events-none ${!mobile ? 'hidden sm:block' : ''}`}
    style={{ width: size, height: size, border: `1px solid`, borderColor: color, opacity }}
  >
    <div className="absolute w-1.5 h-1.5 sm:w-2 sm:h-2 rounded-full -top-1 left-1/2 -translate-x-1/2"
      style={{ background: color, boxShadow: `0 0 10px ${color}` }} />
  </motion.div>
);

// ─── Character Reveal ───
const CharReveal = ({ text, delay = 0, className = "" }) => (
  <span className={className}>
    {text.split("").map((ch, i) => (
      <motion.span key={i} className="inline-block"
        initial={{ opacity: 0, y: 50, filter: "blur(10px)" }}
        animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
        transition={{ duration: 0.45, delay: delay + i * 0.025, ease: [0.22, 1, 0.36, 1] }}
      >{ch === " " ? "\u00A0" : ch}</motion.span>
    ))}
  </span>
);

// ─── Ultra Sexy CTA Button ───
const SexyButton = ({ to, dispatch, children }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={to}
      onClick={() => dispatch(resetPortfolioState())}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative inline-flex items-center justify-center"
    >
      {/* Outer pulsing glow rings */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.1, 0.3] }}
        transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -inset-4 sm:-inset-6 rounded-full bg-gradient-to-r from-violet-600/20 via-fuchsia-500/20 to-pink-500/20 blur-xl pointer-events-none"
      />
      <motion.div
        animate={{ scale: [1, 1.25, 1], opacity: [0.2, 0.05, 0.2] }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut", delay: 0.5 }}
        className="absolute -inset-8 sm:-inset-10 rounded-full bg-gradient-to-r from-cyan-500/10 via-violet-500/10 to-fuchsia-500/10 blur-2xl pointer-events-none"
      />

      {/* Rotating rainbow border */}
      <div className="absolute -inset-[2px] rounded-full overflow-hidden">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 3, repeat: Infinity, ease: "linear" }}
          className="w-full h-full"
          style={{ background: "conic-gradient(from 0deg, #a855f7, #ec4899, #3b82f6, #06b6d4, #10b981, #f59e0b, #a855f7)" }}
        />
      </div>

      {/* Button body */}
      <div className="relative px-10 sm:px-16 py-4 sm:py-6 bg-[#0c0020] rounded-full flex items-center gap-4 hover:bg-[#12002e] transition-all duration-500">
        {/* Shimmer sweep */}
        <div className="absolute inset-0 rounded-full overflow-hidden">
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/[0.12] to-transparent -translate-x-[150%] group-hover:translate-x-[150%] transition-transform duration-[1.2s]" />
        </div>

        {/* Inner gradient glow on hover */}
        <motion.div
          animate={isHovered ? { opacity: 0.15 } : { opacity: 0 }}
          className="absolute inset-0 rounded-full bg-gradient-to-r from-violet-500 via-fuchsia-500 to-pink-500"
        />

        {/* Text */}
        <span className="relative z-10 text-white font-bold uppercase tracking-[0.2em] text-[11px] sm:text-[13px] flex items-center gap-3">
          {children}
          <motion.span
            animate={isHovered ? { x: [0, 5, 0] } : { x: 0 }}
            transition={{ duration: 0.6, repeat: isHovered ? Infinity : 0 }}
          >
            <FaArrowRight className="text-xs sm:text-sm" />
          </motion.span>
        </span>
      </div>
    </Link>
  );
};

// ═══════════════════════════════════
// ███   MAIN HERO COMPONENT   ███
// ═══════════════════════════════════
export default function Hero() {
  const dispatch = useDispatch();

  const words = [
    { text: "Beautiful", gradient: "from-violet-400 via-fuchsia-400 to-pink-400" },
    { text: "Stunning", gradient: "from-cyan-400 via-blue-400 to-indigo-400" },
    { text: "Powerful", gradient: "from-amber-300 via-orange-400 to-red-400" },
    { text: "Perfect", gradient: "from-emerald-400 via-teal-400 to-cyan-400" },
  ];
  const [wordIndex, setWordIndex] = useState(0);
  useEffect(() => {
    const interval = setInterval(() => setWordIndex(i => (i + 1) % words.length), 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <section className="relative min-h-[100svh] flex flex-col justify-center items-center overflow-hidden bg-[#030014] text-center px-4 sm:px-6">

      {/* ═══ STARFIELD ═══ */}
      <Starfield />

      {/* ═══ COLOR ATMOSPHERE ═══ */}
      <div className="absolute inset-0 z-[1] pointer-events-none overflow-hidden">
        {/* Top aurora */}
        <motion.div
          animate={{ opacity: [0.4, 0.7, 0.4] }}
          transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-[20%] sm:-top-[30%] left-1/2 -translate-x-1/2 w-[600px] sm:w-[1200px] h-[400px] sm:h-[600px]"
          style={{ background: "radial-gradient(ellipse at top, rgba(168,85,247,0.18) 0%, rgba(59,130,246,0.08) 40%, transparent 70%)" }}
        />
        {/* Drifting color clouds */}
        <motion.div animate={{ x: [0, 60, -40, 0], y: [0, -30, 20, 0] }}
          transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
          className="absolute top-[10%] -left-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-violet-600/10 blur-[100px] sm:blur-[140px] rounded-full" />
        <motion.div animate={{ x: [0, -40, 60, 0], y: [0, 40, -30, 0] }}
          transition={{ duration: 22, repeat: Infinity, ease: "easeInOut", delay: 4 }}
          className="absolute bottom-[5%] -right-[10%] w-[300px] sm:w-[500px] h-[300px] sm:h-[500px] bg-fuchsia-600/10 blur-[100px] sm:blur-[140px] rounded-full" />
        <motion.div animate={{ x: [0, 30, -30, 0], y: [0, -40, 40, 0] }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut", delay: 2 }}
          className="absolute top-[45%] left-[25%] w-[250px] sm:w-[400px] h-[250px] sm:h-[400px] bg-cyan-600/8 blur-[80px] sm:blur-[120px] rounded-full" />

        {/* Edge accents */}
        <div className="absolute top-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-violet-500/30 to-transparent" />
        <div className="absolute bottom-0 left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-fuchsia-500/15 to-transparent" />
      </div>

      {/* ═══ FLOATING CARDS ═══ */}
      <FloatingCard gradient="bg-gradient-to-br from-violet-600/40 to-fuchsia-600/30" emoji="👨‍💻" label="Developer"
        delay={0.5} className="top-[14%] sm:top-[18%] left-[2%] sm:left-[6%]" rotation={-8} />
      <FloatingCard gradient="bg-gradient-to-br from-blue-600/40 to-cyan-600/30" emoji="🎨" label="Designer"
        delay={0.8} className="top-[16%] sm:top-[22%] right-[2%] sm:right-[5%]" rotation={6} />
      <FloatingCard gradient="bg-gradient-to-br from-emerald-600/40 to-teal-600/30" emoji="💼" label="Freelancer"
        delay={1.1} className="bottom-[12%] sm:bottom-[18%] left-[3%] sm:left-[8%]" rotation={5} />
      <FloatingCard gradient="bg-gradient-to-br from-orange-600/40 to-pink-600/30" emoji="✨" label="Creative"
        delay={1.4} className="bottom-[14%] sm:bottom-[22%] right-[2%] sm:right-[7%]" rotation={-6} />

      {/* ═══ MAIN CONTENT ═══ */}
      <div className="relative z-30 flex flex-col items-center pt-24 sm:pt-28 pb-16 sm:pb-20 max-w-5xl w-full">

        {/* Headline with orbit rings */}
        <div className="relative w-full">
          <div className="absolute inset-0 z-0 hidden sm:block">
            <GlowRing size="400px" duration={25} color="rgba(168,85,247,0.4)" opacity={0.08} mobile={false} />
            <GlowRing size="600px" duration={40} color="rgba(236,72,153,0.3)" opacity={0.05} delay={3} mobile={false} />
          </div>
          {/* Mobile ring — smaller */}
          <div className="absolute inset-0 z-0 sm:hidden">
            <GlowRing size="280px" duration={20} color="rgba(168,85,247,0.3)" opacity={0.1} />
          </div>

          <h1 className="relative z-10 text-[2.8rem] sm:text-[4.5rem] md:text-[5.5rem] lg:text-[7.2rem] font-bold tracking-tighter leading-[0.88] text-white">
            <CharReveal text="Build Your" delay={0.15} />{" "}
            <br className="hidden sm:block" />
            <span className="relative inline-block min-w-[200px] sm:min-w-[350px] lg:min-w-[400px]">
              <AnimatePresence mode="wait">
                <motion.span
                  key={words[wordIndex].text}
                  initial={{ opacity: 0, y: 35, scale: 0.9, filter: "blur(12px)" }}
                  animate={{ opacity: 1, y: 0, scale: 1, filter: "blur(0px)" }}
                  exit={{ opacity: 0, y: -35, scale: 0.9, filter: "blur(12px)" }}
                  transition={{ duration: 0.55, ease: [0.22, 1, 0.36, 1] }}
                  className={`inline-block bg-gradient-to-r ${words[wordIndex].gradient} bg-clip-text text-transparent`}
                >
                  {words[wordIndex].text}
                </motion.span>
              </AnimatePresence>
            </span>
            <br />
            <CharReveal text="Portfolio" delay={0.45} />
            <motion.span
              initial={{ opacity: 0, scale: 0 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.9, type: "spring", stiffness: 300 }}
              className="bg-gradient-to-r from-violet-400 to-fuchsia-400 bg-clip-text text-transparent"
            >.</motion.span>
          </h1>
        </div>

        {/* Subtitle */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.7 }}
          className="mt-5 sm:mt-6 text-base sm:text-lg md:text-xl text-white/35 max-w-md sm:max-w-lg text-center leading-relaxed px-2"
        >
          Pick a design. Add your stuff. Get a website that looks
          <span className="text-white/60 font-medium"> amazing</span> — ready in minutes.
        </motion.p>

        {/* Typewriter URL */}
        <TypewriterURL />

        {/* Sexy CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 1.4 }}
          className="mt-10 sm:mt-12"
        >
          <SexyButton to="/portfolioCreate" dispatch={dispatch}>
            Create My Portfolio
          </SexyButton>
        </motion.div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 2.2, duration: 1 }}
          className="mt-12 sm:mt-16 flex flex-col items-center gap-2"
        >
          <motion.div
            animate={{ y: [0, 8, 0] }}
            transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
            className="w-5 h-8 sm:w-6 sm:h-10 rounded-full border border-white/10 flex items-start justify-center pt-1.5 sm:pt-2"
          >
            <motion.div
              animate={{ opacity: [1, 0.3, 1], y: [0, 5, 0] }}
              transition={{ duration: 2.5, repeat: Infinity, ease: "easeInOut" }}
              className="w-1 sm:w-1.5 h-2 sm:h-3 rounded-full bg-gradient-to-b from-violet-400 to-fuchsia-400"
            />
          </motion.div>
        </motion.div>

      </div>
    </section>
  );
}
