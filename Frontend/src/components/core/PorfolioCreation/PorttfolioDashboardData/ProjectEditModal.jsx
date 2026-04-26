import React, { useEffect, useState, useCallback } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineX, HiOutlineCloudUpload, HiOutlineLink, HiOutlineCode, HiOutlineDocumentText, HiOutlinePlus, HiOutlineTrash, HiOutlineXCircle } from "react-icons/hi";
import { toast } from "sonner";
import { useDropzone } from "react-dropzone";

const ProjectEditModal = ({
  isOpen,
  onClose,
  editData,
  setEditData,
  onSave,
  readOnly,
}) => {
  const [newFiles, setNewFiles] = useState([]);
  const [newPreviews, setNewPreviews] = useState([]);

  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  const onDrop = useCallback((acceptedFiles) => {
    setNewFiles(prev => [...prev, ...acceptedFiles]);
    const previews = acceptedFiles.map(file => URL.createObjectURL(file));
    setNewPreviews(prev => [...prev, ...previews]);
    setEditData(prev => ({
      ...prev,
      newBannerFiles: [...(prev.newBannerFiles || []), ...acceptedFiles]
    }));
  }, [setEditData]);

  const removeNewFile = (index) => {
    setNewFiles(prev => prev.filter((_, i) => i !== index));
    setNewPreviews(prev => prev.filter((_, i) => i !== index));
    setEditData(prev => ({
      ...prev,
      newBannerFiles: (prev.newBannerFiles || []).filter((_, i) => i !== index)
    }));
  };

  const removeExistingBanner = (index) => {
    const currentExisting = editData.projectBanners || (editData.projectBanner ? [editData.projectBanner] : []);
    const totalCount = currentExisting.length + newFiles.length;

    if (totalCount <= 1) {
      toast.error("Maintenance Alert: At least one visual asset must remain active.");
      return;
    }

    const updated = [...currentExisting];
    updated.splice(index, 1);

    setEditData(prev => ({
      ...prev,
      projectBanners: updated,
      projectBanner: updated[0] || null
    }));
  };

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"], "image/webp": [".webp"] },
    onDrop,
    disabled: readOnly,
  });

  if (!isOpen) return null;

  // Existing banners from DB
  const existingBanners = editData.projectBanners || (editData.projectBanner ? [editData.projectBanner] : []);

  const modalContent = (
    <AnimatePresence>
      <div className="fixed inset-0 z-[1000] flex items-center justify-center p-4 md:p-8">
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          className="absolute inset-0 bg-black/80 backdrop-blur-2xl"
        />

        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 20 }}
          animate={{ opacity: 1, scale: 1, y: 0 }}
          exit={{ opacity: 0, scale: 0.9, y: 20 }}
          className="relative w-full max-w-5xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col md:flex-row max-h-[90vh]"
        >
          {/* Left Side: Visual Preview */}
          <div className="md:w-1/2 bg-black/40 relative overflow-y-auto custom-scrollbar flex flex-col p-6 md:p-8 border-b md:border-b-0 md:border-r border-white/5 gap-6">
            <div className="absolute inset-0 bg-gradient-to-br from-indigo-500/5 to-transparent pointer-events-none"></div>

            <div className="relative z-10 space-y-5">
              <h4 className="text-sm font-bold tracking-tight text-gray-500">Project Gallery</h4>

              {/* Existing Banners */}
              {existingBanners.length > 0 && (
                <div className="grid grid-cols-2 gap-3">
                  {existingBanners.map((banner, idx) => (
                    <div key={idx} className="relative group aspect-video rounded-2xl overflow-hidden border border-white/10 bg-black/40 shadow-lg">
                      <img
                        src={banner.url || (typeof banner === "string" ? banner : "")}
                        alt={`banner-${idx}`}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      />
                      {!readOnly && (
                        <button
                          type="button"
                          onClick={() => removeExistingBanner(idx)}
                          className="absolute top-2 right-2 w-6 h-6 bg-red-500/80 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover/proj:opacity-100 group-hover:opacity-100 transition-all text-xs z-30"
                        >
                          <HiOutlineTrash />
                        </button>
                      )}
                      {idx === 0 && (
                        <div className="absolute top-2 left-2 bg-indigo-500/80 backdrop-blur-md text-xs font-bold text-white px-3 py-1.5 rounded-full border border-white/20 tracking-tight z-20">
                          Primary Cover
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              )}

              {/* New uploads preview */}
              {newPreviews.length > 0 && (
                <div className="space-y-2">
                  <h4 className="text-sm font-bold tracking-tight text-emerald-500">New Uploads</h4>
                  <div className="grid grid-cols-2 gap-3">
                    {newPreviews.map((preview, idx) => (
                      <div key={`new-${idx}`} className="relative group aspect-video rounded-2xl overflow-hidden border border-emerald-500/20 bg-black/40 shadow-lg">
                        <img src={preview} alt={`new-${idx}`} className="w-full h-full object-cover" />
                        {!readOnly && (
                          <button
                            type="button"
                            onClick={() => removeNewFile(idx)}
                            className="absolute top-2 right-2 w-6 h-6 bg-red-500 rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 transition-all text-xs"
                          >
                            <HiOutlineX />
                          </button>
                        )}
                        <div className="absolute bottom-2 left-2 bg-emerald-500/80 backdrop-blur-md text-xs font-bold text-white px-3 py-1.5 rounded-full border border-white/20 tracking-tight">
                          New Asset
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Dropzone for new images */}
              {!readOnly && (
                <div
                  {...getRootProps()}
                  className={`flex flex-col items-center justify-center gap-3 p-8 border-2 border-dashed rounded-2xl cursor-pointer transition-all ${isDragActive
                      ? "border-indigo-500 bg-indigo-500/10"
                      : "border-white/10 bg-white/[0.02] hover:border-indigo-500/40 hover:bg-white/[0.04]"
                    }`}
                >
                  <input {...getInputProps()} />
                  <HiOutlinePlus className="text-2xl text-gray-500" />
                  <p className="text-base font-bold text-gray-400 tracking-tight text-center">
                    {isDragActive ? "Drop images here..." : "Click or drag to add project images"}
                  </p>
                  <p className="text-xs text-gray-600 font-medium tracking-wide">Supported formats: PNG, JPG, WEBP</p>
                </div>
              )}
            </div>
          </div>

          {/* Right Side: Data Entry */}
          <div className="md:w-1/2 p-6 md:p-10 overflow-y-auto custom-scrollbar flex flex-col">
            <header className="mb-8 flex justify-between items-start">
              <div className="space-y-1">
                <p className="text-sm font-bold text-indigo-500 tracking-wider mb-2">{readOnly ? "Project Details" : "Edit Project"}</p>
                <h2 className="text-3xl font-black tracking-tighter text-white">{editData.title || "Untitled"}</h2>
              </div>
              <button onClick={onClose} className="p-2.5 bg-white/5 hover:bg-red-500/20 text-white hover:text-red-500 rounded-full transition-all">
                <HiOutlineX className="text-lg" />
              </button>
            </header>

            <div className="space-y-5 flex-grow">
              {/* Title */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Project Title</label>
                <input
                  type="text"
                  value={editData.title}
                  onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                  disabled={readOnly}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-base focus:border-indigo-500/40 focus:bg-white/[0.04] outline-none transition-all disabled:opacity-50"
                />
              </div>

              {/* Description */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1">Description</label>
                <textarea
                  rows={3}
                  value={editData.description}
                  onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                  disabled={readOnly}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-base focus:border-indigo-500/40 focus:bg-white/[0.04] outline-none transition-all resize-none disabled:opacity-50"
                />
              </div>

              {/* Technologies */}
              <div className="space-y-2">
                <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                  <HiOutlineCode className="text-indigo-500" /> Technology Stack
                </label>
                <input
                  type="text"
                  placeholder="React, Node.js, MongoDB"
                  value={editData.technologies}
                  onChange={(e) => setEditData({ ...editData, technologies: e.target.value })}
                  disabled={readOnly}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-xl px-5 py-4 text-white text-sm font-mono focus:border-indigo-500/40 outline-none transition-all disabled:opacity-50 placeholder:text-gray-700"
                />
              </div>

              {/* Links */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                    <HiOutlineLink className="text-gray-500" /> GitHub Repository
                  </label>
                  <input
                    type="text"
                    value={editData.gitRepoLink}
                    onChange={(e) => setEditData({ ...editData, gitRepoLink: e.target.value })}
                    disabled={readOnly}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-4 py-4 text-white text-sm focus:border-indigo-500/40 outline-none transition-all font-mono disabled:opacity-50"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-bold text-gray-400 ml-1 flex items-center gap-2">
                    <HiOutlineLink className="text-emerald-500" /> Live Project Link
                  </label>
                  <input
                    type="text"
                    value={editData.projectLink}
                    onChange={(e) => setEditData({ ...editData, projectLink: e.target.value })}
                    disabled={readOnly}
                    className="w-full bg-white/[0.01] border border-white/5 rounded-xl px-4 py-4 text-white text-sm focus:border-emerald-500/40 outline-none transition-all font-mono disabled:opacity-50"
                  />
                </div>
              </div>
            </div>

            <footer className="mt-8 flex items-center justify-end gap-4 pt-6 border-t border-white/5">
              <button onClick={onClose} className="text-sm font-bold text-gray-500 hover:text-white transition-colors px-6 py-2">Cancel</button>
              {!readOnly && (
                <button
                  onClick={onSave}
                  className="px-10 py-4 bg-white text-black rounded-2xl font-bold text-sm tracking-tight hover:bg-indigo-500 hover:text-white active:scale-95 transition-all shadow-xl"
                >
                  Save Changes
                </button>
              )}
            </footer>
          </div>
        </motion.div>
      </div>
    </AnimatePresence>
  );

  return createPortal(modalContent, document.getElementById("modal-root") || document.body);
};

export default ProjectEditModal;
