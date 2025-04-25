import React, { useEffect } from "react";
import { createPortal } from "react-dom";
import { motion, AnimatePresence } from "framer-motion";
import { IoClose } from "react-icons/io5";

const backdropVariants = {
  hidden: { opacity: 0 },
  visible: { opacity: 1 },
};

const modalVariants = {
  hidden: { opacity: 0, scale: 0.9 },
  visible: { opacity: 1, scale: 1 },
};

const ProjectEditModal = ({
  isOpen,
  onClose,
  editData,
  setEditData,
  onSave,
  readOnly,
}) => {
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", handleEsc);
    return () => window.removeEventListener("keydown", handleEsc);
  }, [onClose]);

  if (!isOpen) return null;

  const getImagePreview = () => {
    if (!editData.projectBanner) return null;
    if (typeof editData.projectBanner === "string") return editData.projectBanner;
    if (editData.projectBanner.url) return editData.projectBanner.url;
    if (editData.projectBanner instanceof File) return URL.createObjectURL(editData.projectBanner);
    return null;
  };

  const modalContent = (
    <AnimatePresence>
      <motion.div
        key="modal"
        className="fixed inset-0 z-[1000] grid place-items-center bg-black bg-opacity-75 backdrop-blur-sm p-4"
        variants={backdropVariants}
        initial="hidden"
        animate="visible"
        exit="hidden"
        onClick={onClose}
      >
        <motion.div
          variants={modalVariants}
          initial="hidden"
          animate="visible"
          exit="hidden"
          className="relative bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] border border-purple-500/30 text-white p-10 rounded-2xl shadow-[0_0_15px_#8B5CF6] max-w-3xl mx-auto max-h-[90vh] overflow-y-auto"
          onClick={(e) => e.stopPropagation()}
        >
          <button
            className="absolute top-3 right-3 text-white text-3xl hover:text-yellow-500 transition"
            onClick={onClose}
          >
            <IoClose />
          </button>
  
          <h2 className="text-4xl font-extrabold mb-8 text-center text-purple-400">
            {readOnly ? "Project Details" : "Edit Project"}
          </h2>
  
          <div className="space-y-8">
  <div>
    <label className="block text-purple-300 font-semibold mb-2">Project Title</label>
    <input
      type="text"
      placeholder="Title"
      value={editData.title}
      onChange={(e) => setEditData({ ...editData, title: e.target.value })}
      disabled={readOnly}
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
  <div>
    <label className="block text-purple-300 font-semibold mb-2">Description</label>
    <textarea
      placeholder="Description"
      value={editData.description}
      onChange={(e) => setEditData({ ...editData, description: e.target.value })}
      disabled={readOnly}
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
      rows="4"
    />
  </div>
  <div>
    <label className="block text-purple-300 font-semibold mb-2">Technologies (comma-separated)</label>
    <input
      type="text"
      placeholder="Technologies"
      value={editData.technologies}
      onChange={(e) => setEditData({ ...editData, technologies: e.target.value })}
      disabled={readOnly}
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
  <div>
    <label className="block text-purple-300 font-semibold mb-2">GitHub Link</label>
    <input
      type="text"
      placeholder="GitHub Link"
      value={editData.gitRepoLink}
      onChange={(e) => setEditData({ ...editData, gitRepoLink: e.target.value })}
      disabled={readOnly}
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>
  <div>
    <label className="block text-purple-300 font-semibold mb-2">Live Link</label>
    <input
      type="text"
      placeholder="Live Link"
      value={editData.projectLink}
      onChange={(e) => setEditData({ ...editData, projectLink: e.target.value })}
      disabled={readOnly}
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
    />
  </div>

  {getImagePreview() && (
    <div className="mt-6">
      <img
        src={getImagePreview()}
        alt="Preview"
        className="w-full h-auto rounded-lg shadow-xl border-2 border-purple-500"
      />
    </div>
  )}

  {!readOnly && (
    <div className="mt-6">
      <label className="block text-purple-300 font-semibold mb-2">
        Update Project Banner
      </label>
      <input
        type="file"
        accept="image/*"
        onChange={(e) =>
          setEditData({ ...editData, projectBanner: e.target.files[0] })
        }
        className="block w-full text-sm text-gray-200 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:text-sm file:font-semibold file:bg-purple-600 file:text-black hover:file:bg-purple-500 cursor-pointer"
      />
    </div>
  )}
</div>

  
          <div className="flex justify-end gap-6 mt-8">
            <button
              className="px-8 py-4 bg-black/30 text-white rounded-lg hover:bg-black/40 border-purple-400 border transition-all shadow-lg"
              onClick={onClose}
            >
              Close
            </button>
            {!readOnly && (
              <button
                className="px-8 py-4 bg-purple-500 hover:bg-purple-600 text-black font-bold rounded-xl shadow-lg transition-all"
                onClick={onSave}
              >
                 Save
              </button>
            )}
          </div>
        </motion.div>
      </motion.div>
    </AnimatePresence>
  );
  

  return createPortal(modalContent, document.getElementById("modal-root"));
};

export default ProjectEditModal;
