import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { HiOutlineDocumentText, HiOutlineExternalLink, HiOutlineUpload } from "react-icons/hi";
import { motion } from "framer-motion";

const ResumeViewer = ({ isEditing, resumeFile, formData, handleFileChange }) => {
  const resumeUrl = resumeFile ? URL.createObjectURL(resumeFile) : formData.resume;

  return (
    <div className="flex flex-col gap-8 w-full mt-8">
      {isEditing ? (
        <div className="space-y-6">
          <div className="flex flex-col md:flex-row items-center justify-between gap-6">
            <div className="space-y-1">
               <p className="text-[9px] font-black uppercase tracking-[0.4em] text-yellow-500">Resume Management</p>
               <h3 className="text-2xl font-black tracking-tighter text-white">Curriculum <span className="text-gray-500 italic font-medium">Vitae</span></h3>
            </div>
            
            {resumeUrl && (
              <button
                onClick={() => window.open(resumeUrl, '_blank')}
                className="group relative flex items-center gap-3 px-6 py-3 bg-white/5 border border-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest text-white hover:bg-white hover:text-black transition-all"
              >
                <HiOutlineExternalLink className="text-lg" />
                View Full Screen
              </button>
            )}
          </div>

          {resumeUrl ? (
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="w-full h-[600px] border border-white/10 rounded-[2.5rem] overflow-hidden bg-black/40 shadow-2xl relative group"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-yellow-500/5 to-transparent pointer-events-none z-10"></div>
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={resumeUrl} />
              </Worker>
            </motion.div>
          ) : (
            <div className="w-full h-40 border-2 border-dashed border-white/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-4 text-gray-700">
               <HiOutlineDocumentText className="text-5xl" />
               <p className="text-[10px] font-black uppercase tracking-widest">No document uploaded</p>
            </div>
          )}

          <div className="flex justify-center">
            <label
              htmlFor="resume"
              className="group cursor-pointer flex items-center gap-3 px-8 py-4 rounded-2xl bg-yellow-500 text-black font-black uppercase text-[10px] tracking-widest hover:scale-105 transition-all shadow-xl shadow-yellow-500/10"
            >
              <HiOutlineUpload className="text-lg" />
              Upload New 
              <input
                type="file"
                accept=".pdf"
                name="resume"
                onChange={handleFileChange}
                id="resume"
                className="hidden"
              />
            </label>
          </div>
        </div>
      ) : (
        <div className="space-y-6">
          {formData.resume ? (
            <>
              <div className="flex items-center justify-between">
                <p className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500">Document Preview</p>
                <button
                  onClick={() => window.open(formData.resume, '_blank')}
                  className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-yellow-500 hover:text-yellow-400 transition-colors"
                >
                  <HiOutlineExternalLink className="text-lg" />
                  Full Screen
                </button>
              </div>

              <div className="w-full h-[500px] border border-white/10 rounded-[2.5rem] overflow-hidden bg-black/20 shadow-inner">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={formData.resume} />
                </Worker>
              </div>
            </>
          ) : (
            <div className="text-center py-12 p-8 border border-white/5 bg-white/[0.01] rounded-[2.5rem]">
               <HiOutlineDocumentText className="mx-auto text-4xl text-gray-800 mb-4" />
               <p className="text-[10px] font-black text-gray-700 uppercase tracking-widest">Resume </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ResumeViewer;
