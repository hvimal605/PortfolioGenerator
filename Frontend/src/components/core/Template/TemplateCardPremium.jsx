import { motion, useMotionValue, useTransform, useSpring } from "framer-motion";
import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { createPortal } from "react-dom";
import AnimatedButton2 from "../../common/AnimatedButton2";
import { FaArrowCircleRight } from "react-icons/fa";
import { HiOutlineInformationCircle } from "react-icons/hi2";
import ConfirmationModal from "../../common/ConfirmationModal";
import { buyPremiumTemplate } from "../../../services/operations/UserfeaturesApi";

const shimmerStyle = `
@keyframes shimmer {
  0% { transform: translateX(-100%); }
  100% { transform: translateX(100%); }
}
`;

export default function TemplateCardPremium({ template, onSelect, onPreview }) {
  const { user } = useSelector((state) => state.profile);
  const { token } = useSelector((state) => state.auth);
  const { paymentLoading } = useSelector((state) => state.portfolio);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🖱️ 3D Tilt Values
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

  const [confirmationModal, setConfirmationModal] = useState(null);
  const [showModal, setShowModal] = useState(false);
  const [iframeLoading, setIframeLoading] = useState(true);

  const handleBuyTemplate = () => {
    if (token) {
      buyPremiumTemplate(token, [template._id], user, navigate, dispatch);
      return;
    }
    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to purchase this template.",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    });
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
            <div className="w-12 h-12 border-4 border-yellow-400 border-t-transparent rounded-full animate-spin"></div>
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

  if (paymentLoading) {
    return (
      <div className="grid min-h-[calc(100vh-3.5rem)] place-items-center">
        <div className="spinner">Loading...</div>
      </div>
    );
  }

  return (
    <>
      <div style={{ perspective: "1000px" }}>
        <motion.div
          onMouseMove={handleMouseMove}
          onMouseLeave={handleMouseLeave}
          style={{ rotateX, rotateY }}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="relative group cursor-pointer backdrop-blur-3xl rounded-[2.8rem] overflow-hidden shadow-[0_30px_90px_rgba(0,0,0,1)] border border-white/5 bg-[#0a0a0a]/80 transition-all duration-500 hover:border-[#FFD700]/40 hover:shadow-[0_0_80px_rgba(255,215,0,0.15)]"
        >
          {/* ✨ Ultra-High Frequency Shine Sweep */}
          <motion.div
            initial={{ x: "-100%", opacity: 0 }}
            whileHover={{ x: "100%", opacity: 0.6 }}
            transition={{ duration: 1.2, ease: "circOut" }}
            className="absolute inset-0 z-10 pointer-events-none bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-35deg]"
          />

          {/* 🏅 Premium Badge */}
          <div className="absolute top-6 right-6 z-20 flex items-center gap-2 px-5 py-2 text-[10px] font-black uppercase tracking-[0.25em] rounded-full backdrop-blur-lg bg-gradient-to-br from-[#FFD700] via-[#B8860B] to-[#996515] text-black border border-white/30 shadow-[0_0_30px_rgba(255,215,0,0.4)] group-hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] transition-all duration-500">
            <motion.span 
              animate={{ scale: [1, 1.4, 1], opacity: [0.7, 1, 0.7] }}
              transition={{ duration: 1.5, repeat: Infinity }}
              className="w-2 h-2 rounded-full bg-black shadow-[0_0_10px_rgba(0,0,0,0.5)]" 
            />
            Premium Template
          </div>

          {/* 🖼️ Floating Preview Display */}
          <div className="relative w-full h-64 sm:h-80 overflow-hidden bg-gradient-to-b from-transparent to-black/60 flex items-center justify-center">
            <img
              src={template.previewImage}
              alt={template.name}
              className="w-[85%] h-[85%] object-contain transition-transform duration-1000 group-hover:scale-110 group-hover:-translate-y-4 z-10 drop-shadow-[0_25px_40px_rgba(0,0,0,0.7)]"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent opacity-80 z-0"></div>
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-48 h-48 bg-[#FFD700]/15 blur-[120px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-1000"></div>
          </div>

          {/* 📝 Content Area */}
          <div className="p-6 sm:p-10 sm:pb-12 text-white">
            <div className="flex flex-col mb-4 relative group/header">
              <h2 className="text-2xl sm:text-3xl font-black tracking-tighter text-transparent bg-clip-text bg-gradient-to-r from-white via-[#FFD700] to-[#B8860B] drop-shadow-sm uppercase italic">
                {template.name}
              </h2>
              <div className="h-[2px] w-12 bg-gradient-to-r from-[#FFD700] to-transparent mt-1 transition-all duration-700 group-hover/header:w-full" />
            </div>

            <p className="text-sm text-gray-400 leading-relaxed font-light mb-8 max-w-[90%]">
              {truncatedDescription}
            </p>

            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0 mb-8 sm:mb-10">
              {!user?.purchasedTemplates?.some(id => String(id) === String(template?._id)) ? (
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#FFD700]/50 mb-1">Price</span>
                  <span className="text-2xl font-black text-white tracking-tight">₹{template.price}</span>
                </div>
              ) : (
                <div className="flex flex-col">
                  <span className="text-[9px] uppercase tracking-[0.2em] text-[#FFD700]/50 mb-1">Status</span>
                  <span className="text-sm font-black text-[#FFD700] uppercase tracking-widest">Template Purchased</span>
                </div>
              )}

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

              {user?.purchasedTemplates?.some(id => String(id) === String(template?._id)) ? (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      onSelect(template);
                    }}
                    className="w-full flex items-center justify-center gap-2 px-8 py-4 bg-white text-black text-[10px] font-black uppercase tracking-[0.2em] rounded-full shadow-[0_15px_40px_rgba(255,255,255,0.1)] hover:bg-[#FFD700] hover:shadow-[0_0_30px_rgba(255,215,0,0.4)] transition-all duration-500"
                  >
                    Select Template <FaArrowCircleRight className="text-lg" />
                  </button>
                ) : (
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleBuyTemplate();
                    }}
                    className="group relative overflow-hidden w-full flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-br from-[#FFE770] via-[#FFD700] to-[#B8860B] text-black text-[11px] font-black uppercase tracking-[0.25em] rounded-full shadow-[0_20px_50px_rgba(255,215,0,0.3)] hover:shadow-[0_0_40px_rgba(255,215,0,0.6)] active:scale-95 transition-all duration-500"
                  >
                    {/* ✨ Diamond Shine Effect */}
                    <div className="absolute inset-0 w-full h-full bg-gradient-to-r from-transparent via-white/50 to-transparent -translate-x-full group-hover:animate-[shimmer_1.5s_infinite] transition-transform duration-1000" />
                    
                    <span className="relative z-10 flex items-center gap-2">
                      <span className="text-lg animate-bounce">💎</span>
                      Buy Now
                    </span>
                  </button>
                )}
            </div>
          </div>
        </motion.div>
      </div>

      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      {showModal && createPortal(modalContent, document.body)}
    </>
  );
}
