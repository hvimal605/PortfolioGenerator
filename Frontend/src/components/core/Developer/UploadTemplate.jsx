import React, { useState, useEffect, useRef } from "react";
import ZipUpload from "./FileUpload";
import Confetti from "react-confetti";
import AnimatedButton4 from "../../common/AnimatedButton4";
import { useSelector } from "react-redux";
import { createTemplateRequest } from "../../../services/operations/TemplateApi";
import { motion } from "framer-motion";

const UploadTemplate = () => {
  const [formData, setFormData] = useState({
    portfolioName: "",
    description: "",
    previewLink: "",
  });

  const [zipFile, setZipFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const { token } = useSelector((state) => state.auth);
  const [resetKey, setResetKey] = useState(0);

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleZipUpload = (file) => {
    setZipFile(file);
  };

  const handleConfetti = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 7000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.portfolioName || !formData.description || !zipFile) {
      return alert("All fields are required including the ZIP file.");
    }

    const res = await createTemplateRequest(
      {
        name: formData.portfolioName,
        description: formData.description,
        zipFile,
      },
      token
    );
  
    if(res?.success){
      handleConfetti();
    }

    setFormData({
      portfolioName: "",
      description: "",
    });
    setZipFile(null);
    setResetKey(prev => prev + 1); 
  };

  return (
    <motion.div
      ref={containerRef}
      initial={{ opacity: 0, x: 20 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 1, ease: [0.16, 1, 0.3, 1] }}
      className="w-full bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-10 md:p-12 shadow-[0_40px_80px_rgba(0,0,0,0.4)] relative group overflow-hidden"
    >
      {isSubmitted && (
        <Confetti
          width={containerSize.width}
          height={containerSize.height}
          colors={['#ec4899', '#22d3ee', '#10b981', '#ffffff']}
          numberOfPieces={400}
          recycle={false}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 50,
          }}
        />
      )}

      {/* Ambient Glow */}
      <div className="absolute -top-20 -right-20 w-40 h-40 bg-pink-500/10 blur-[100px] rounded-full group-hover:bg-pink-500/20 transition-all duration-700 pointer-events-none"></div>

      {/* Header */}
      <div className="flex flex-col items-center mb-10">
         <h2 className="text-4xl font-black tracking-tighter text-center">
           <span className="text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-500 to-cyan-400 drop-shadow-[0_0_12px_rgba(236,72,153,0.3)] animate-pulse">Upload Template</span>
         </h2>
      </div>

      <form onSubmit={handleSubmit} className="flex flex-col gap-8 relative z-10">
        
        <div className="flex flex-col gap-3">
          <label
            className="text-[11px] font-black tracking-[0.2em] text-pink-500 uppercase pl-1 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
            htmlFor="portfolioName"
          >
             Portfolio Template Name
          </label>
          <input
            type="text"
            id="portfolioName"
            name="portfolioName"
            value={formData.portfolioName}
            onChange={handleInputChange}
            className="w-full bg-[#000000]/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-pink-500/50 focus:bg-pink-500/[0.02] transition-all text-sm font-bold shadow-[inset_0_4px_30px_rgba(0,0,0,1)]"
            placeholder="e.g., My Modern Portfolio"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <label
            className="text-[11px] font-black tracking-[0.2em] text-pink-500 uppercase pl-1 drop-shadow-[0_0_8px_rgba(236,72,153,0.3)]"
            htmlFor="description"
          >
             Description
          </label>
          <textarea
            id="description"
            name="description"
            value={formData.description}
            onChange={handleInputChange}
            className="w-full bg-[#000000]/60 border border-white/10 rounded-2xl px-6 py-4 text-white placeholder:text-zinc-800 focus:outline-none focus:border-pink-500/50 focus:bg-pink-500/[0.02] transition-all text-sm font-bold shadow-[inset_0_4px_30px_rgba(0,0,0,1)] resize-none"
            placeholder="A short description of your project"
            rows="3"
            required
          />
        </div>

        <div className="flex flex-col gap-3">
          <ZipUpload onFileUpload={handleZipUpload} resetTrigger={resetKey} />
        </div>

        <div className="flex justify-center mt-6">
          <div className="group/btn relative inline-flex items-center justify-center p-[2px] rounded-2xl bg-gradient-to-r from-pink-500 to-cyan-400 overflow-hidden shadow-[0_0_40px_rgba(236,72,153,0.3)] hover:shadow-[0_0_60px_rgba(236,72,153,0.5)] transition-all duration-300">
             <div className="relative bg-black rounded-2xl px-2 py-0.5 group-hover/btn:bg-transparent transition-all">
                <AnimatedButton4 text="Upload" />
             </div>
          </div>
        </div>

      </form>
    </motion.div>
  );
};

export default UploadTemplate;
