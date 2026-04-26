import { useDispatch, useSelector } from "react-redux";
import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { createPortal } from "react-dom";
import { 
  HiOutlineViewColumns, 
  HiOutlineSparkles, 
  HiOutlineArrowRight, 
  HiOutlineEye,
  HiOutlineXMark,
  HiOutlineCheckBadge
} from "react-icons/hi2";
import { getPurchasedTemplate } from "../../../services/operations/TemplateApi";
import { setTemplateId } from "../../../slices/PortfolioSlice";
import { useNavigate } from "react-router-dom";

export default function MyTemplates() {
  const { token } = useSelector((state) => state.auth);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [selectedTemplateforCreate , setSelectedTemplateforCreate] = useState(null);
  
  const [purchasedTemplates, setPurchasedTemplates] = useState([]);
  const [iframeLoading, setIframeLoading] = useState(true);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  // 🧠 Fetch Purchased Templates
  useEffect(() => {
    const fetchPurchasedTemplates = async () => {
      try {
        const res = await getPurchasedTemplate(token);
        console.log("🔥 Purchased Templates Response:", res);

        if (res?.success) {
          setPurchasedTemplates(res.templates || []);
        }
      } catch (err) {
        console.error("❌ Failed to fetch purchased templates:", err);
      }
    };

    if (token) fetchPurchasedTemplates();
  }, [token]);

  // 🧩 Disable scroll when modal is open
  useEffect(() => {
    document.body.style.overflow = (selectedTemplate || selectedTemplateforCreate) ? "hidden" : "auto";
    return () => (document.body.style.overflow = "auto");
  }, [selectedTemplate, selectedTemplateforCreate]);

  const handleStartBuilding = ()=> {
    dispatch(setTemplateId(selectedTemplateforCreate._id));
    navigate('/PortfolioCreate/UploadDetails');
  }

  // 🖼 Modal Content for Template Preview
  const modalContent = (
    <AnimatePresence>
      {selectedTemplate && (
        <div className="fixed inset-0 z-[9999] bg-black/80 backdrop-blur-[20px] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            transition={{ type: "spring", damping: 25, stiffness: 300 }}
            className="relative w-full max-w-6xl h-[90vh] bg-[#050505] rounded-[2rem] border border-white/10 shadow-[0_0_50px_rgba(0,0,0,0.8)] overflow-hidden flex flex-col"
          >
            {/* Modal Header */}
            <div className="flex items-center justify-between px-6 py-4 border-b border-white/[0.05] bg-white/[0.02]">
              <div className="flex items-center gap-3">
                <div className="flex gap-1.5">
                  <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_rgba(239,68,68,0.8)]"></div>
                  <div className="w-3 h-3 rounded-full bg-yellow-400 shadow-[0_0_10px_rgba(250,204,21,0.8)]"></div>
                  <div className="w-3 h-3 rounded-full bg-green-500 shadow-[0_0_10px_rgba(34,197,94,0.8)]"></div>
                </div>
                <span className="text-white font-semibold tracking-wide ml-2">{selectedTemplate.name} Preview</span>
              </div>
              <button
                onClick={() => {
                  setSelectedTemplate(null);
                  setIframeLoading(true);
                }}
                className="flex items-center gap-2 text-neutral-400 hover:text-white bg-white/5 hover:bg-white/10 px-4 py-1.5 rounded-full transition-all duration-300"
              >
                <HiOutlineXMark className="text-lg" />
                <span className="text-sm font-bold uppercase tracking-widest">Close</span>
              </button>
            </div>

            <div className="relative flex-1 bg-black">
              {iframeLoading && (
                <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/50 z-20 gap-4">
                  <div className="w-12 h-12 border-4 border-fuchsia-500 border-t-transparent rounded-full animate-spin shadow-[0_0_15px_rgba(217,70,239,0.5)]"></div>
                  <p className="text-fuchsia-400 font-medium tracking-widest uppercase text-sm animate-pulse">Loading Engine</p>
                </div>
              )}

              <iframe
                src={selectedTemplate?.previewUrl}
                title="Template Preview"
                className="w-full h-full border-none"
                onLoad={() => setIframeLoading(false)}
              />
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );

  return (
    <div className="text-white space-y-12 pb-20">
      {/* --- EXTREME HEADER --- */}
      <div className="flex flex-col gap-2 pb-8 border-b border-white/[0.05] relative group/title">
        <h2 className="text-4xl md:text-5xl font-black tracking-tighter bg-clip-text text-transparent bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-500 drop-shadow-[0_0_15px_rgba(56,189,248,0.3)] uppercase italic">
          My Templates
        </h2>
        <div className="absolute bottom-[30px] left-0 w-1/4 h-[2px] bg-gradient-to-r from-cyan-500 to-transparent transition-all duration-700 group-hover/title:w-1/2"></div>
        <p className="text-neutral-400 mt-2 text-sm md:text-base tracking-[0.05em] font-medium bg-clip-text text-transparent bg-gradient-to-r from-neutral-300 to-neutral-500">
          Your collection of premium, high-converting architectural designs.
        </p>
      </div>

      {/* 🔸 Empty State */}
      {purchasedTemplates.length === 0 ? (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="flex flex-col items-center justify-center py-32 text-center"
        >
          <div className="relative mb-8">
            <div className="absolute inset-0 bg-cyan-500/20 blur-[50px] rounded-full"></div>
            <div className="relative p-6 rounded-full bg-white/[0.02] border border-white/10 shadow-[inset_0_0_20px_rgba(255,255,255,0.05)]">
              <HiOutlineViewColumns className="text-6xl text-cyan-400 drop-shadow-[0_0_15px_rgba(34,211,238,0.5)]" />
            </div>
          </div>
          <h3 className="text-2xl font-bold text-white mb-2 tracking-tight">You haven’t purchased any templates yet.</h3>
          <p className="text-neutral-400 text-lg">Go explore and get some premium designs.</p>
        </motion.div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
          <AnimatePresence>
            {purchasedTemplates.map((template, idx) => (
              <motion.div
                key={template._id}
                layout
                initial={{ opacity: 0, scale: 0.95, y: 0 }}
                animate={{ 
                  opacity: 1, 
                  scale: 1,
                  y: [0, -10, 0]
                }}
                transition={{ 
                  opacity: { delay: idx * 0.1, duration: 0.4 },
                  scale: { delay: idx * 0.1, duration: 0.4 },
                  y: { 
                    duration: 5 + Math.random() * 2, 
                    repeat: Infinity, 
                    ease: "easeInOut",
                    delay: idx * 0.15
                  }
                }}
                className="group relative flex flex-col bg-white/[0.02] backdrop-blur-xl border border-white/[0.08] hover:border-cyan-500/30 rounded-[2rem] p-5 transition-all duration-500 hover:shadow-[0_20px_60px_rgba(0,0,0,0.6)]"
              >
                {/* Glow effect positioned behind card content, revealed on hover */}
                <div className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none rounded-[2rem] bg-gradient-to-b from-cyan-500/5 to-transparent" />

                {/* Visual Preview Frame */}
                <div className="relative w-full h-48 rounded-2xl overflow-hidden bg-black/50 border border-white/[0.05] mb-5 isolate group-hover:border-cyan-500/20 transition-colors duration-500">
                  {/* macOS style window dots */}
                  <div className="absolute top-3 left-3 flex gap-1.5 z-40">
                    <div className="w-2 h-2 rounded-full bg-red-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-yellow-500/70"></div>
                    <div className="w-2 h-2 rounded-full bg-green-500/70"></div>
                  </div>

                  {/* Status Badge */}
                  <div className="absolute top-3 right-3 z-40 px-3 py-1 rounded-full text-[0.65rem] font-bold uppercase tracking-widest backdrop-blur-md border bg-green-500/20 text-green-300 border-green-500/30">
                    <span className="flex items-center gap-1.5">
                      <HiOutlineCheckBadge className="text-sm" />
                      PURCHASED
                    </span>
                  </div>

                  {/* Image Grid background */}
                  <div className="absolute inset-0 opacity-20 bg-[radial-gradient(circle_at_center,_white_1px,_transparent_1px)] bg-[length:15px_15px] z-10 pointer-events-none"></div>

                  {/* Shine effect */}
                  <div className="absolute inset-x-0 top-0 h-full w-20 bg-white/20 -skew-x-[45deg] -translate-x-[150%] group-hover:translate-x-[400%] transition-transform duration-[1.5s] ease-in-out z-30 pointer-events-none blur-sm"></div>

                  <div className="w-full h-full relative z-20 flex items-center justify-center p-6 mt-4">
                    <img
                      src={template.previewImage}
                      alt={template.name}
                      className="max-h-full max-w-full object-contain opacity-80 group-hover:opacity-100 transition-all duration-500 group-hover:scale-105 drop-shadow-[0_0_15px_rgba(34,211,238,0.2)]"
                    />
                  </div>
                </div>

                {/* Card Context */}
                <div className="px-2 flex-1 relative z-10">
                  <h3 className="text-xl font-bold tracking-tight text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-white group-hover:to-white/50 transition-colors">
                    {template.name}
                  </h3>
                  <p className="text-[0.8rem] text-neutral-400 mt-2 line-clamp-2 leading-relaxed">
                    {template.description || "No description provided."}
                  </p>

                  <div className="mt-3 space-y-1">
                    <p className="text-[0.75rem] text-neutral-400 font-medium">Created by: <span className="text-neutral-300 ml-1">{template.CreatedBy?.firstName} {template.CreatedBy?.lastName}</span></p>
                  </div>
                </div>

                {/* Action Buttons */}
                <div className="mt-6 flex items-center gap-3 relative z-10">
                  <button 
                    onClick={() => setSelectedTemplate(template)}
                    className="flex-[0.8] flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold bg-white/[0.03] text-neutral-300 border border-white/[0.08] hover:bg-white/[0.08] hover:text-white transition-all duration-300 shadow-[0_0_10px_rgba(255,255,255,0.02)]"
                  >
                    <HiOutlineEye className="text-lg" />
                    <span>Preview</span>
                  </button>

                  <button
                    onClick={() => setSelectedTemplateforCreate(template)}
                    className="flex-[1.2] flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-bold bg-white text-black hover:bg-neutral-200 transition-colors shadow-[0_0_15px_rgba(255,255,255,0.2)]"
                  >
                    <span>Create</span>
                    <HiOutlineArrowRight className="text-lg" />
                  </button>
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      )}

      {/* --- START BUILDING MODAL (Rendered at root body level via Portal) --- */}
      {createPortal(
        <AnimatePresence>
          {selectedTemplateforCreate && (
            <motion.div 
              className="fixed inset-0 z-[99999] bg-black/80 backdrop-blur-[25px] flex items-center justify-center p-4"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
            >
              <motion.div 
                className="bg-[#0a0a0a] border border-white/10 backdrop-blur-3xl text-white p-8 rounded-[2.5rem] shadow-[0_0_80px_rgba(34,211,238,0.15)] w-full max-w-lg relative overflow-hidden isolate"
                initial={{ scale: 0.8, y: 20 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.8, opacity: 0 }}
                transition={{ type: "spring", stiffness: 300, damping: 25 }}
              >
                {/* Modal Glows */}
                <div className="absolute -top-[50%] -right-[50%] w-full h-full bg-cyan-600/20 blur-[150px] rounded-full pointer-events-none"></div>

                <div className="flex justify-between items-start mb-6 relative z-10">
                  <h2 className="text-3xl font-black tracking-tight text-white">{selectedTemplateforCreate.name}</h2>
                  <button 
                    onClick={() => setSelectedTemplateforCreate(null)} 
                    className="p-2 bg-white/5 hover:bg-white/10 rounded-full text-neutral-400 hover:text-white transition-all shadow-[0_0_10px_rgba(255,255,255,0.05)]"
                  >
                    <HiOutlineXMark className="text-xl" />
                  </button>
                </div>
                
                <div className="relative z-10 space-y-4">
                  <p className="text-sm text-neutral-400 leading-relaxed font-medium">{selectedTemplateforCreate.description}</p>
                  <div className="inline-block px-3 py-1.5 bg-white/[0.03] border border-white/10 rounded-xl shadow-inner">
                    <p className="text-xs text-neutral-500 font-bold tracking-widest uppercase">
                      Created by: <span className="text-white ml-2">{selectedTemplateforCreate.CreatedBy?.firstName} {selectedTemplateforCreate.CreatedBy?.lastName}</span>
                    </p>
                  </div>

                  <div className="relative rounded-2xl overflow-hidden border border-white/5 shadow-[inset_0_4px_20px_rgba(0,0,0,0.5)] bg-black p-2 mt-6 group">
                    <div className="absolute inset-0 bg-gradient-to-t from-cyan-900/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    <img
                      src={selectedTemplateforCreate.previewImage}
                      alt={selectedTemplateforCreate.name}
                      className="w-full h-48 object-contain rounded-xl relative z-10 drop-shadow-2xl group-hover:scale-[1.02] transition-transform duration-500"
                    />
                  </div>
                </div>

                <div className="mt-8 flex justify-center relative z-10">
                  <button 
                    onClick={handleStartBuilding}
                    className="w-full flex items-center justify-center gap-3 py-4 rounded-[1.25rem] font-bold text-lg text-black bg-gradient-to-r from-cyan-400 to-blue-500 hover:scale-[1.02] transition-all duration-300 shadow-[0_0_20px_rgba(34,211,238,0.4)] hover:shadow-[0_0_40px_rgba(34,211,238,0.6)]"
                  >
                    <HiOutlineSparkles className="text-xl text-black" />
                    <span>Start Building</span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>,
        document.body
      )}

      {/* Render Template Preview Portal if Active */}
      {selectedTemplate && createPortal(modalContent, document.body)}
    </div>
  );
}
