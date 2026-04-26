import React, { useState, useEffect } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";
import "swiper/css/autoplay";
import { Pagination, Navigation, Autoplay } from "swiper/modules";
import { motion, AnimatePresence } from "framer-motion";
import { FaChevronLeft, FaChevronRight, FaTimes, FaRocket } from "react-icons/fa";
import { HiOutlineArrowRight } from "react-icons/hi2";

import TemplateCardFortemplates from "../Template/TempalteCardFortemplates";
import { getAllTemplates } from "../../../services/operations/TemplateApi";
import { setTemplateId } from "../../../slices/PortfolioSlice";
import { useNavigate } from "react-router-dom";
import Button from "../../common/AnimatedButton";
import { useDispatch, useSelector } from "react-redux";
import ConfirmationModal from "../../common/ConfirmationModal";

const TemplateSwiper = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [confirmationModal, setConfirmationModal] = useState(null);
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getAllTemplates();
      if (result) {
        setTemplates(result);
      }
    };
    fetchTemplates();
  }, []);

  // 🔒 Lock background scroll when modal is open
  useEffect(() => {
    if (selectedTemplate) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [selectedTemplate]);

  const handleMarketplaceSelect = (template) => {
    dispatch(setTemplateId(template._id));
    
    if (token) {
      navigate('/PortfolioCreate/UploadDetails');
    } else {
      setConfirmationModal({
        text1: "Sign in to Continue",
        text2: "You need an account to save your portfolio progress.",
        btn1Text: "Log In",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => setConfirmationModal(null),
      });
    }
  };

  const handleStartBuilding = () => {
    if (selectedTemplate) {
      dispatch(setTemplateId(selectedTemplate._id));
      navigate('/PortfolioCreate/UploadDetails');
    }
  }

  return (
    <>
    <section className="bg-[#030712] py-32 px-6 relative overflow-hidden">
      {/* 🌌 Cinematic Background Blobs */}
      <div className="absolute top-1/4 right-0 w-[500px] h-[500px] bg-emerald-500/5 blur-[140px] rounded-full pointer-events-none"></div>
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-indigo-500/5 blur-[140px] rounded-full pointer-events-none"></div>

      <div className="max-w-[90rem] mx-auto relative z-10">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <span className="text-[11px] font-black uppercase tracking-[0.6em] text-emerald-400 mb-6 block">Ready-To-Use Designs</span>
          <h2 className="text-5xl md:text-6xl font-black text-white tracking-tighter leading-none mb-8">
            Choose Your <br />
            <span className="bg-gradient-to-r from-emerald-200 via-indigo-200 to-fuchsia-200 bg-clip-text text-transparent italic">Winning Look</span>
          </h2>
          <p className="text-white/40 max-w-xl mx-auto text-lg leading-relaxed">
            Pick a professional template and start building your career today. No coding, no hassle.
          </p>
        </motion.div>

        <div className="relative group/swiper">
          <Swiper
            modules={[Pagination, Navigation, Autoplay]}
            slidesPerView={1}
            spaceBetween={30}
            pagination={{ 
              clickable: true,
              dynamicBullets: true,
            }}
            navigation={{
              nextEl: ".swiper-button-next-custom",
              prevEl: ".swiper-button-prev-custom",
            }}
            autoplay={{ delay: 4000, disableOnInteraction: false }}
            speed={1200}
            breakpoints={{
              768: { slidesPerView: 1.5 },
              1024: { slidesPerView: 2 },
              1536: { slidesPerView: 3 },
            }}
            className="pb-20 !overflow-visible"
          >
            {templates.map((template, index) => (
              <SwiperSlide key={index} className="transition-all duration-500 py-10">
                <motion.div
                  whileHover={{ y: -20 }}
                  className="bg-white/5 border border-white/10 rounded-[2.5rem] p-4 backdrop-blur-3xl shadow-2xl overflow-hidden"
                >
                  <TemplateCardFortemplates
                    template={template}
                    onSelect={handleMarketplaceSelect}
                    onPreview={setSelectedTemplate}
                  />
                </motion.div>
              </SwiperSlide>
            ))}
          </Swiper>

          {/* 🏹 Custom Glass Navigation Controls */}
          <button className="swiper-button-prev-custom absolute left-[-40px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all z-20 group/prev hidden lg:flex">
             <FaChevronLeft className="text-xl group-hover/prev:-translate-x-1 transition-transform" />
          </button>
          <button className="swiper-button-next-custom absolute right-[-40px] top-1/2 -translate-y-1/2 w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white hover:bg-white/10 hover:border-emerald-500/50 transition-all z-20 group/next hidden lg:flex">
             <FaChevronRight className="text-xl group-hover/next:translate-x-1 transition-transform" />
          </button>
        </div>


      </div>

      <style jsx>{`
        .swiper-pagination-bullet {
          background: rgba(255, 255, 255, 0.1) !important;
          width: 30px !important;
          height: 4px !important;
          border-radius: 2px !important;
          opacity: 1 !important;
          transition: all 0.5s ease;
        }
        .swiper-pagination-bullet-active {
          background: linear-gradient(90deg, #10b981, #6366f1) !important;
          width: 60px !important;
        }
        .swiper-button-disabled {
          opacity: 0.2;
          cursor: not-allowed;
        }
      `}</style>
    </section>

        {/* 🪄 Holographic Template Preview Modal */}
        <AnimatePresence>
          {selectedTemplate && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-[#030712]/95 backdrop-blur-2xl z-[9999] flex items-start md:items-center justify-center p-4 sm:p-6 overflow-y-auto custom-scrollbar"
              onClick={() => setSelectedTemplate(null)}
            >
              <motion.div
                initial={{ scale: 0.9, y: 50 }}
                animate={{ scale: 1, y: 0 }}
                exit={{ scale: 0.9, y: 50 }}
                transition={{ type: "spring", damping: 25 }}
                className="bg-[#0a0a0a] border border-white/10 rounded-[2rem] sm:rounded-[3rem] p-6 sm:p-12 w-full max-w-4xl relative shadow-[0_50px_150px_rgba(0,0,0,1)] my-auto overflow-hidden"
                onClick={(e) => e.stopPropagation()}
              >
                {/* Modal Glow */}
                <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/20 blur-[100px] rounded-full"></div>

                <button
                  onClick={() => setSelectedTemplate(null)}
                  className="absolute top-6 right-6 sm:top-10 sm:right-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white/5 border border-white/10 flex items-center justify-center text-white/60 hover:text-white hover:bg-white/10 transition-all z-20"
                >
                  <FaTimes />
                </button>

                <div className="flex flex-col md:flex-row gap-12 items-center">
                  <div className="flex-1">
                    <span className="text-[10px] font-black uppercase tracking-[0.4em] text-emerald-400 mb-4 block">Selected Design</span>
                    <h3 className="text-3xl sm:text-4xl font-black text-white mb-6 uppercase tracking-tight">{selectedTemplate.name}</h3>
                    <p className="text-white/40 text-base sm:text-lg leading-relaxed mb-8">
                      {selectedTemplate.description}
                    </p>
                    <div className="flex items-center gap-4 p-4 bg-white/5 rounded-2xl border border-white/5 mb-10 w-fit">
                       <div className="w-10 h-10 rounded-full bg-indigo-500 flex items-center justify-center text-xs font-black">
                          {selectedTemplate.CreatedBy?.firstName?.charAt(0) || "P"}
                       </div>
                       <div className="flex flex-col">
                          <span className="text-xs font-black text-white/40 uppercase tracking-widest">Created By</span>
                          <span className="text-sm font-black text-white uppercase tracking-tight">
                             {selectedTemplate.CreatedBy?.firstName || "Portfolio"} {selectedTemplate.CreatedBy?.lastName || "Craft"}
                          </span>
                       </div>
                    </div>
                  </div>

                  <div className="flex-1 w-full relative group/modal-img flex items-center justify-center">
                    <img
                      src={selectedTemplate.previewImage}
                      alt={selectedTemplate.name}
                      className="rounded-[1.5rem] sm:rounded-[2rem] border border-white/10 shadow-2xl w-full max-h-[300px] sm:max-h-[450px] object-cover object-top group-hover:scale-[1.02] transition-transform duration-700"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent rounded-[1.5rem] sm:rounded-[2rem] opacity-0 group-hover:opacity-100 transition-opacity"></div>
                  </div>
                </div>

                <div className="mt-12 flex justify-center">
                  <button 
                    onClick={handleStartBuilding}
                    className="group relative px-10 sm:px-16 py-4 sm:py-6 bg-white text-black rounded-full font-black uppercase tracking-[0.2em] sm:tracking-[0.4em] text-[10px] sm:text-xs hover:scale-105 active:scale-95 transition-all shadow-[0_20px_60px_rgba(255,255,255,0.2)]"
                  >
                     <div className="absolute inset-0 bg-gradient-to-r from-emerald-600 to-indigo-600 opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full"></div>
                     <span className="relative z-10 group-hover:text-white transition-colors flex items-center gap-3">
                        Build Portfolio <HiOutlineArrowRight className="group-hover:translate-x-2 transition-transform" />
                     </span>
                  </button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
    </>
  );
};

export default TemplateSwiper;
