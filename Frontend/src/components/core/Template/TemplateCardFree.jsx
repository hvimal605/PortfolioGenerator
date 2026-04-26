import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { FaArrowCircleRight } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import AnimatedButton2 from "../../common/AnimatedButton2";
import { createPortal } from "react-dom";
import { useState, useEffect } from "react";

export default function TemplateCardFree({ template, onSelect, onPreview }) {
  const [showModal, setShowModal] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  // 🖱️ 3D Tilt Values (Same as Premium for Continuity)
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const mouseXSpring = useSpring(x);
  const mouseYSpring = useSpring(y);
  const rotateX = useTransform(mouseYSpring, [-0.5, 0.5], ["10deg", "-10deg"]);
  const rotateY = useTransform(mouseXSpring, [-0.5, 0.5], ["-10deg", "10deg"]);

  const handleMouseMove = (e) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const width = rect.width;
    const height = rect.height;
    const mouseX = e.clientX - rect.left;
    const mouseY = e.clientY - rect.top;
    const xPct = mouseX / width - 0.5;
    const yPct = mouseY / height - 0.5;
    x.set(xPct);
    y.set(yPct);
  };

  const handleMouseLeave = () => {
    x.set(0);
    y.set(0);
  };

  useEffect(() => {
    document.body.style.overflow = showModal ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [showModal]);

  const truncatedDescription =
    template.description.split(" ").length > 12
      ? template.description.split(" ").slice(0, 10).join(" ") + "..."
      : template.description;

  const modalContent = (
    <div className="fixed inset-0 z-[9999] bg-black/70 backdrop-blur-2xl flex items-center justify-center">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
        className="relative w-full h-full bg-black shadow-xl overflow-hidden"
      >
        <button
          onClick={() => {
            setShowModal(false);
            setIframeLoading(true);
          }}
          className="absolute top-0 right-5 text-white bg-red-500 hover:bg-red-600 px-3 py-1 rounded-full shadow-md z-10"
        >
          ✕ close
        </button>

        {iframeLoading && (
          <div className="absolute inset-0 flex items-center justify-center bg-black z-20">
            <div className="w-12 h-12 border-4 border-green-400 border-t-transparent rounded-full animate-spin"></div>
          </div>
        )}

        <iframe
          src={template.previewUrl}
          title="Template Preview"
          className="w-full h-full"
          onLoad={() => setIframeLoading(false)}
        />
      </motion.div>
    </div>
  );

  return (
    <div style={{ perspective: "1000px" }}>
      <motion.div
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{ rotateX, rotateY }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
        className="relative group cursor-pointer backdrop-blur-3xl rounded-[2.8rem] overflow-hidden shadow-[0_30px_70px_rgba(0,0,0,0.8)] border border-white/5 bg-[#0a0a0a]/80 transition-all duration-500 hover:border-cyan-500/30 hover:shadow-[0_0_60px_rgba(34,211,238,0.1)]"
      >
        {/* ✨ Silver/Cyan Shine Sweep */}
        <motion.div
          initial={{ x: "-100%", opacity: 0 }}
          whileHover={{ x: "100%", opacity: 0.4 }}
          transition={{ duration: 1.2, ease: "circOut" }}
          className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-cyan-400/20 to-transparent skew-x-[-35deg]"
        />

        {/* 🏅 Free Badge */}
        <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] rounded-full backdrop-blur-lg bg-white/10 text-white border border-white/20 shadow-[0_0_20px_rgba(255,255,255,0.05)] group-hover:border-cyan-500/50 transition-colors duration-500">
          <motion.span 
            animate={{ scale: [1, 1.5, 1], opacity: [0.5, 1, 0.5] }}
            transition={{ duration: 2, repeat: Infinity }}
            className="w-2 h-2 rounded-full bg-cyan-400 shadow-[0_0_8px_rgba(34,211,238,0.8)]" 
          />
          Free Template
        </div>

        {/* 🖼️ Floating Preview Display */}
        <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gradient-to-b from-transparent to-black/60 flex items-center justify-center">
          <img
            src={template.previewImage}
            alt={template.name}
            className="w-[85%] h-[85%] object-contain transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-y-4 z-10 drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]"
          />

          <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-0"></div>
          <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-cyan-400/10 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
        </div>

        {/* 📝 Content Area */}
        <div className="p-6 sm:p-10 sm:pb-12 text-white">
          <div className="flex flex-col mb-4 relative group/header">
            <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-white/80 to-cyan-400 drop-shadow-sm uppercase italic">
              {template.name}
            </h2>
            <div className="h-[2px] w-12 bg-gradient-to-r from-cyan-400 to-transparent mt-1 transition-all duration-700 group-hover/header:w-full" />
          </div>

          <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 max-w-[90%]">
            {truncatedDescription}
          </p>

          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
            <div className="flex flex-col">
              <span className="text-[9px] uppercase tracking-[0.2em] text-cyan-400/50 mb-1">Price</span>
              <span className="text-2xl font-black text-white tracking-tight">Free</span>
            </div>

            <div className="text-left sm:text-right">
              <span className="text-[9px] uppercase tracking-[0.2em] text-gray-600 block mb-1">Created By</span>
              <span className="text-xs font-bold text-gray-200">
                {template.CreatedBy?.firstName} {template.CreatedBy?.lastName}
              </span>
            </div>
          </div>

          {/* ⚡ High-End Call to Actions */}
          <div className="flex flex-col gap-3">
            <div className="flex items-center gap-2 w-full">
              {onPreview && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onPreview(template);
                  }}
                  className="w-[30%] px-1 py-3.5 bg-white/5 border border-white/10 text-white text-[9px] font-black uppercase tracking-[0.1em] rounded-full hover:bg-white/10 transition-all duration-500 overflow-hidden text-ellipsis whitespace-nowrap"
                >
                  Details
                </button>
              )}
              <div onClick={(e) => { e.stopPropagation(); setShowModal(true); }} className="w-[70%]">
                <AnimatedButton2 text="Live Preview" />
              </div>
            </div>

            <button
              onClick={(e) => {
                e.stopPropagation();
                onSelect(template);
              }}
              className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_15px_40px_rgba(255,255,255,0.1)] hover:bg-cyan-400 hover:shadow-[0_0_30px_rgba(34,211,238,0.5)] active:scale-95 transition-all duration-500"
            >
              Select Template <FaArrowCircleRight className="text-lg" />
            </button>
          </div>
        </div>
      </motion.div>
      {showModal && createPortal(modalContent, document.body)}
    </div>
  );
}
