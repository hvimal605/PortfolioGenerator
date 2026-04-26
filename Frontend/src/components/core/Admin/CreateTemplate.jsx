import React, { useState, useRef } from "react";
import AnimatedButton4 from "../../common/AnimatedButton4";
import { createTemplate } from "../../../services/operations/TemplateApi";
import ZipUpload from "../Developer/FileUpload";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlinePhoto, HiOutlineLink, HiOutlineUserCircle, HiOutlineDocumentText, HiOutlineSparkles, HiOutlineCursorArrowRays } from "react-icons/hi2";

const NoiseTexture = () => (
  <svg className="absolute inset-0 w-full h-full opacity-[0.03] pointer-events-none mix-blend-overlay">
    <filter id="noise-studio">
      <feTurbulence type="fractalNoise" baseFrequency="0.7" numOctaves="4" stitchTiles="stitch" />
    </filter>
    <rect width="100%" height="100%" filter="url(#noise-studio)" />
  </svg>
)

const StudioLabel = ({ children }) => (
  <label className="text-[10px] font-black tracking-[0.4em] text-zinc-500 uppercase flex items-center gap-3 mb-4 group-hover:text-zinc-300 transition-all duration-500">
    <span className="w-8 h-[1px] bg-white/10 group-hover:w-12 transition-all"></span>
    {children}
  </label>
)

const CreateTemplate = () => {
    const [formData, setFormData] = useState({
        portfolioName: "",
        description: "",
        previewLink: "",
        createdBy: "",
    });

    const [zipFile, setZipFile] = useState(null);
    const [previewImg, setPreviewImg] = useState(null);
    const [previewImgUrl, setPreviewImgUrl] = useState(null);
    const [isFocused, setIsFocused] = useState(false);

    const { token } = useSelector((state) => state.auth);
    const [resetKey, setResetKey] = useState(0);
    const fileInputRef = useRef(null);

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

    const handlePreviewImgUpload = (e) => {
        const file = e.target.files[0];
        if (file) {
            setPreviewImg(file);
            setPreviewImgUrl(URL.createObjectURL(file));
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (
            !formData.portfolioName ||
            !formData.description ||
            !formData.previewLink ||
            !zipFile ||
            !previewImg
        ) {
            return alert("All fields are required.");
        }

        const payload = new FormData();
        payload.append("name", formData.portfolioName);
        payload.append("description", formData.description);
        payload.append("previewUrl", formData.previewLink);
        payload.append("file", zipFile);
        payload.append("previewImg", previewImg);
        payload.append("CreatedBy", formData.createdBy);

        const res = await createTemplate(payload, token);

        if (res?.success) {
            setFormData({
                portfolioName: "",
                description: "",
                previewLink: "",
                createdBy: ""
            });
            setZipFile(null);
            setPreviewImg(null);
            setPreviewImgUrl(null);
            setResetKey((prev) => prev + 1);
        }
    };

    return (
        <motion.div 
            initial={{ opacity: 0, scale: 0.98 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 1, ease: [0.23, 1, 0.32, 1] }}
            className="w-full flex justify-center py-4"
        >
            <div className={`w-full max-w-[800px] bg-[#050505]/60 backdrop-blur-[60px] border border-white/10 rounded-[4rem] p-12 md:p-20 shadow-[0_60px_120px_-30px_rgba(0,0,0,1)] relative group transition-all duration-1000 ${isFocused ? 'border-indigo-500/30' : ''}`}>
                
                <NoiseTexture />
                
                {/* 🔮 Aura Glow (Breathing Core) */}
                <div className={`absolute -inset-40 bg-indigo-500/10 blur-[150px] rounded-full transition-all duration-1000 pointer-events-none group-hover:bg-indigo-500/15 ${isFocused ? 'scale-110 opacity-60' : 'opacity-40 animate-pulse'}`}></div>
                <div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent pointer-events-none"></div>

                {/* ✨ Header Section */}
                <div className="relative z-10 flex flex-col items-center mb-20">
                    <motion.div 
                       animate={{ y: [0, -4, 0] }}
                       transition={{ duration: 4, repeat: Infinity }}
                       className="p-4 rounded-[2rem] bg-white/5 border border-white/10 mb-8 shadow-2xl"
                    >
                       <HiOutlineSparkles className="text-4xl text-indigo-400 drop-shadow-[0_0_15px_rgba(129,140,248,0.8)]" />
                    </motion.div>
                    <h2 className="text-5xl font-black tracking-tight text-white text-center leading-tight">
                        Launch a new <br/>
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-400 via-fuchsia-400 to-indigo-400 animate-gradient-x drop-shadow-2xl">Studio Template</span>
                    </h2>
                    <p className="mt-6 text-neutral-500 font-medium tracking-wide">Bring your creative visions to life in plain English.</p>
                </div>

                <form onSubmit={handleSubmit} className="relative z-10 flex flex-col gap-16">
                    
                    {/* Design Name */}
                    <div className="group relative flex flex-col gap-2">
                        <StudioLabel>Design Name</StudioLabel>
                        <input
                            type="text"
                            name="portfolioName"
                            value={formData.portfolioName}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-black/60 border border-white/5 rounded-3xl px-8 py-5 text-xl text-white placeholder:text-zinc-800 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] transition-all font-bold shadow-[inset_0_4px_30px_rgba(0,0,0,1)] peer"
                            placeholder="Give your design a beautiful name."
                            required
                        />
                        <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent peer-focus:via-indigo-500/60 transition-all duration-700"></div>
                    </div>

                    {/* About the Design */}
                    <div className="group relative flex flex-col gap-2">
                        <StudioLabel>Tell us about it</StudioLabel>
                        <textarea
                            name="description"
                            value={formData.description}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-black/60 border border-white/5 rounded-3xl px-8 py-5 text-lg text-white placeholder:text-zinc-800 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] transition-all font-bold shadow-[inset_0_4px_30px_rgba(0,0,0,1)] peer resize-none"
                            placeholder="What makes this template special?"
                            rows="4"
                            required
                        />
                         <div className="absolute inset-x-0 bottom-0 h-[1px] bg-gradient-to-r from-transparent via-white/10 to-transparent peer-focus:via-indigo-500/60 transition-all duration-700"></div>
                    </div>

                    {/* Live Preview Link */}
                    <div className="group relative flex flex-col gap-2">
                        <StudioLabel>External Live Link</StudioLabel>
                        <input
                            type="url"
                            name="previewLink"
                            value={formData.previewLink}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-black/60 border border-white/5 rounded-3xl px-8 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] transition-all font-bold shadow-[inset_0_4px_30px_rgba(0,0,0,1)] peer"
                            placeholder="https://your-template.com"
                            required
                        />
                    </div>

                    {/* Author ID */}
                    <div className="group relative flex flex-col gap-2">
                        <StudioLabel>Author / Developer ID</StudioLabel>
                        <input
                            type="text"
                            name="createdBy"
                            value={formData.createdBy}
                            onChange={handleInputChange}
                            onFocus={() => setIsFocused(true)}
                            onBlur={() => setIsFocused(false)}
                            className="w-full bg-black/60 border border-white/5 rounded-3xl px-8 py-5 text-white placeholder:text-zinc-800 focus:outline-none focus:border-indigo-500/50 focus:bg-indigo-500/[0.02] transition-all font-bold shadow-[inset_0_4px_30px_rgba(0,0,0,1)] peer"
                            placeholder="Paste the developer's unique ID."
                            required
                        />
                    </div>

                    {/* Studio Asset: Silk Visualizer */}
                    <div className="flex flex-col gap-8 mt-4 border-t border-white/5 pt-16">
                        <div className="flex flex-col gap-6">
                            <StudioLabel>Design Cover Design</StudioLabel>
                            <div 
                                onClick={() => fileInputRef.current.click()}
                                className="group/silk relative w-full h-96 rounded-[3rem] bg-black/60 border border-white/10 flex items-center justify-center cursor-pointer overflow-hidden hover:border-indigo-500/40 transition-all duration-700 shadow-2xl"
                            >
                                <input type="file" ref={fileInputRef} accept="image/*" onChange={handlePreviewImgUpload} className="hidden" />

                                <AnimatePresence mode="wait">
                                    {previewImgUrl ? (
                                        <motion.div key="preview" initial={{ opacity: 0, scale: 1.1 }} animate={{ opacity: 1, scale: 1 }} className="absolute inset-0 w-full h-full">
                                            <img src={previewImgUrl} alt="Preview" className="w-full h-full object-cover transform transition-transform group-hover/silk:scale-105 duration-1000 shadow-2xl" />
                                            {/* Silk Satin Overlay */}
                                            <div className="absolute inset-0 bg-gradient-to-b from-transparent via-black/10 to-black/60 transition-opacity duration-700"></div>
                                            
                                            <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover/silk:opacity-100 transition-opacity">
                                                <div className="px-8 py-3 bg-white/10 backdrop-blur-3xl rounded-full border border-white/20 shadow-2xl scale-90 group-hover/silk:scale-100 transition-transform duration-500">
                                                   <span className="text-xs font-black uppercase tracking-widest text-white">Change Cover</span>
                                                </div>
                                            </div>
                                        </motion.div>
                                    ) : (
                                        <motion.div key="empty" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-col items-center gap-6 px-12">
                                            <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center group-hover/silk:bg-indigo-500/20 group-hover/silk:border-indigo-500/40 transition-all duration-700">
                                                <HiOutlinePhoto className="text-4xl text-zinc-700 group-hover/silk:text-indigo-400 transition-all duration-500" />
                                            </div>
                                            <div className="text-center">
                                                <p className="text-sm font-black uppercase tracking-widest text-zinc-500 group-hover/silk:text-zinc-300">Upload High-Gloss Cover</p>
                                                <p className="text-[10px] font-medium text-zinc-800 mt-2 tracking-widest uppercase">Select design visuals</p>
                                            </div>
                                        </motion.div>
                                    )}
                                </AnimatePresence>
                            </div>
                        </div>

                        {/* Deployment Build */}
                        <div className="flex flex-col gap-6">
                            <StudioLabel>Studio Build Folder (ZIP)</StudioLabel>
                            <div className="bg-black/30 rounded-[3rem] border border-white/5 p-2 hover:border-indigo-500/20 transition-all duration-700 overflow-hidden shadow-2xl group/zip">
                                <ZipUpload onFileUpload={handleZipUpload} resetTrigger={resetKey} />
                            </div>
                        </div>
                    </div>

                    {/* ✨ Final Mastery Submit */}
                    <div className="flex flex-col items-center mt-12 mb-8">
                        <motion.button 
                            whileHover={{ scale: 1.05 }}
                            whileTap={{ scale: 0.98 }}
                            className="group/master relative px-16 py-6 rounded-3xl bg-indigo-500 overflow-hidden shadow-[0_20px_50px_rgba(99,102,241,0.4)] hover:shadow-[0_25px_60px_rgba(99,102,241,0.6)] transition-all duration-500"
                        >
                            <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover/master:translate-x-full transition-transform duration-1000"></div>
                            <div className="relative flex items-center gap-4">
                                <span className="text-lg font-black uppercase tracking-[0.2em] text-white">Publish Studio Design</span>
                                <HiOutlineCursorArrowRays className="text-2xl animate-bounce" />
                            </div>
                        </motion.button>
                        <p className="mt-8 text-[11px] font-black tracking-[0.4em] text-zinc-900 uppercase">Master Suite Ready</p>
                    </div>

                </form>
            </div>
        </motion.div>
    );
};

export default CreateTemplate;
