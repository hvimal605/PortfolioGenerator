import { motion, AnimatePresence } from "framer-motion";
import { FaCheckCircle, FaTimesCircle, FaInfoCircle, FaSpinner } from "react-icons/fa";

export const StudioToast = ({ message, type, visible, id }) => {
  const themes = {
    success: {
      icon: <FaCheckCircle className="text-emerald-300 text-xl" />,
      glow: "shadow-[0_0_50px_rgba(16,185,129,0.3)]",
      border: "border-emerald-400/40",
      accent: "bg-emerald-400",
      bg: "bg-[radial-gradient(circle_at_top_left,rgba(16,185,129,0.1),transparent_70%)]",
      label: "Success",
    },
    error: {
      icon: <FaTimesCircle className="text-rose-300 text-xl" />,
      glow: "shadow-[0_0_50px_rgba(244,63,94,0.3)]",
      border: "border-rose-400/40",
      accent: "bg-rose-400",
      bg: "bg-[radial-gradient(circle_at_top_left,rgba(244,63,94,0.15),transparent_70%)]",
      label: "Error",
    },
    loading: {
      icon: <FaSpinner className="text-cyan-300 text-xl animate-spin" />,
      glow: "shadow-[0_0_50px_rgba(34,211,238,0.2)]",
      border: "border-cyan-400/40",
      accent: "bg-cyan-400",
      bg: "bg-[radial-gradient(circle_at_top_left,rgba(34,211,238,0.1),transparent_70%)]",
      label: "Processing",
    },
    info: {
      icon: <FaInfoCircle className="text-sky-300 text-xl" />,
      glow: "shadow-[0_0_50px_rgba(56,189,248,0.2)]",
      border: "border-sky-400/40",
      accent: "bg-sky-400",
      bg: "bg-[radial-gradient(circle_at_top_left,rgba(56,189,248,0.1),transparent_70%)]",
      label: "Notice",
    },
  };

  const theme = themes[type] || themes.info;

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          initial={{ opacity: 0, y: 20, scale: 0.9, rotateX: -10 }}
          animate={{ opacity: 1, y: 0, scale: 1, rotateX: 0 }}
          exit={{ opacity: 0, scale: 0.8, filter: "blur(10px)" }}
          transition={{ type: "spring", stiffness: 300, damping: 25 }}
          className={`
            relative flex items-center gap-4 px-6 py-4 
            bg-[#0a0a0a]/90 ${theme.bg} backdrop-blur-2xl rounded-2xl 
            border ${theme.border} ${theme.glow}
            min-w-[320px] max-w-[450px] overflow-hidden
          `}
        >
          {/* ✨ Studio Sheen Layer */}
          <div className="absolute inset-0 pointer-events-none bg-gradient-to-tr from-transparent via-white/[0.02] to-transparent" />

          {/* 🔘 Icon Sphere */}
          <div className="relative z-10 flex-shrink-0">
             <motion.div
               animate={type === 'loading' ? {} : { scale: [1, 1.2, 1] }}
               transition={{ duration: 0.4, repeat: type === 'loading' ? 0 : 0 }}
             >
               {theme.icon}
             </motion.div>
          </div>

          {/* 📝 Content Area */}
          <div className="relative z-10 flex flex-col justify-center">
            <span className="text-[10px] font-black uppercase tracking-[0.2em] opacity-40 mb-1">
              {theme.label}
            </span>
            <p className="text-sm font-medium text-white/90 leading-tight tracking-tight">
              {message}
            </p>
          </div>

          {/* 🌊 Liquid Progress Bar */}
          {type !== 'loading' && (
            <motion.div
              initial={{ width: "100%" }}
              animate={{ width: "0%" }}
              transition={{ duration: 4, ease: "linear" }}
              className={`absolute bottom-0 left-0 h-[2px] ${theme.accent} shadow-[0_0_10px_${theme.accent}] opacity-60`}
            />
          )}

          {/* 💫 Corner Flare */}
          <div className={`absolute -top-1 -right-1 w-8 h-8 ${theme.accent} opacity-5 blur-2xl rounded-full`} />
        </motion.div>
      )}
    </AnimatePresence>
  );
};
