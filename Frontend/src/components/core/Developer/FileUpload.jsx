import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineFolderArrowDown, HiOutlineDocumentCheck } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const ZipUpload = ({ onFileUpload, resetTrigger }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Reset file state when resetTrigger changes
    setFile(null);
  }, [resetTrigger]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/zip": [".zip"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      onFileUpload(uploadedFile);
    },
  });

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="w-full flex justify-center py-8">
      <div
        {...getRootProps()}
        className="relative w-80 h-80 flex items-center justify-center cursor-pointer group"
      >
        <input {...getInputProps({ accept: ".zip" })} />

        {/* --- Spinning Neon Dash Border (Pink & Cyan) --- */}
        <div className="absolute inset-0 rounded-full border-4 border-dashed border-white/5 group-hover:border-transparent transition-colors duration-500"></div>
        
        <motion.div 
           animate={{ rotate: 360 }}
           transition={{ duration: 15, repeat: Infinity, ease: "linear" }}
           className="absolute inset-0 rounded-full border-4 border-dashed border-t-pink-500 border-l-cyan-400 border-b-emerald-500 border-r-fuchsia-400 opacity-40 group-hover:opacity-100 transition-opacity duration-500"
           style={{ filter: "drop-shadow(0 0 8px rgba(236, 72, 153, 0.5))" }}
        />

        {/* Ambient Glow */}
        <div className="absolute inset-4 rounded-full bg-white/[0.03] backdrop-blur-xl group-hover:bg-white/[0.06] transition-all duration-500"></div>

        {/* Visual Content */}
        <div className="relative z-10 flex flex-col items-center text-center p-8">
          
          <AnimatePresence mode="wait">
            {file ? (
              <motion.div 
                key="file-ready"
                initial={{ opacity: 0, scale: 0.8 }}
                animate={{ opacity: 1, scale: 1 }}
                className="flex flex-col items-center gap-4"
              >
                 <HiOutlineDocumentCheck className="text-5xl text-emerald-400 drop-shadow-[0_0_15px_rgba(16,185,129,0.5)]" />
                 <div>
                    <p className="text-white font-black text-sm tracking-tighter truncate max-w-[150px]">{file.name}</p>
                    <p className="text-emerald-400/60 text-[10px] font-black uppercase tracking-[0.2em] mt-1">{formatFileSize(file.size)}</p>
                 </div>
                 <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/20 mt-4 hovrer:text-white transition-colors">Replace File</span>
              </motion.div>
            ) : (
              <motion.div 
                key="drop-zone"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                className="flex flex-col items-center gap-4"
              >
                 <HiOutlineFolderArrowDown className={`text-6xl transition-all duration-500 ${isDragActive ? 'text-cyan-400 scale-110 drop-shadow-[0_0_20px_rgba(34,211,238,0.5)]' : 'text-zinc-600 group-hover:text-pink-500 group-hover:scale-110 group-hover:drop-shadow-[0_0_15px_rgba(236, 72, 153, 0.4)]'}`} />
                 <div className="px-6">
                    <p className="text-white/80 text-[11px] font-black leading-relaxed tracking-wider">
                      Drag and drop your site output <br/>
                      <span className="text-cyan-400">ZIP</span> folder here.
                    </p>
                    <div className="mt-4 inline-block">
                       <span className="text-white/30 text-[10px] pb-1 border-b border-white/20 hover:text-white hover:border-white transition-all uppercase tracking-widest font-black">Browse Local</span>
                    </div>
                 </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default ZipUpload;
