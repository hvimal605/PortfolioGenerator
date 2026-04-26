import React from "react";
import { HiOutlineXMark, HiOutlinePencilSquare, HiOutlineCodeBracket, HiOutlineLink, HiOutlinePhoto, HiOutlineCpuChip } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const Editcom = ({ isOpen, onClose, editData, setEditData, onSave }) => {
    if (!isOpen) return null;

    return (
        <AnimatePresence>
            <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8">
                {/* Backdrop */}
                <motion.div 
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                    className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                />

                {/* Modal Container */}
                <motion.div
                    initial={{ opacity: 0, scale: 0.9, y: 20 }}
                    animate={{ opacity: 1, scale: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.9, y: 20 }}
                    className="relative w-full max-w-4xl bg-[#0a0a0a] border border-white/10 rounded-[3rem] shadow-2xl overflow-hidden flex flex-col max-h-[90vh]"
                >
                    {/* Header */}
                    <header className="p-8 border-b border-white/5 flex items-center justify-between bg-white/[0.02]">
                        <div className="flex items-center gap-4">
                            <div className="w-12 h-12 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20">
                                <HiOutlinePencilSquare className="text-2xl" />
                            </div>
                            <div>
                                <h2 className="text-2xl font-black text-white uppercase tracking-tight">Refine Production</h2>
                                <p className="text-[10px] text-gray-500 font-bold uppercase tracking-widest">Update asset intelligence</p>
                            </div>
                        </div>
                        <button 
                            onClick={onClose}
                            className="w-12 h-12 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 hover:bg-white/10 hover:text-white transition-all"
                        >
                            <HiOutlineXMark className="text-2xl" />
                        </button>
                    </header>

                    {/* Scrollable Content */}
                    <div className="flex-1 overflow-y-auto p-8 md:p-12 space-y-10 no-scrollbar">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-10">
                            {/* Left: Metadata */}
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Entity Identity</label>
                                    <input
                                        type="text"
                                        placeholder="PROJECT TITLE"
                                        value={editData.title}
                                        onChange={(e) => setEditData({ ...editData, title: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white text-xs font-black uppercase tracking-widest focus:border-indigo-500/40 outline-none transition-all placeholder:text-gray-800"
                                    />
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Tech Stack</label>
                                    <div className="relative">
                                        <input
                                            type="text"
                                            placeholder="NEXT.JS, TAILWIND..."
                                            value={editData.technologies}
                                            onChange={(e) => setEditData({ ...editData, technologies: e.target.value })}
                                            className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white text-[10px] font-black uppercase tracking-widest focus:border-indigo-500/40 outline-none transition-all placeholder:text-gray-800"
                                        />
                                        <HiOutlineCodeBracket className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-700" />
                                    </div>
                                </div>

                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Deployment Narrative</label>
                                    <textarea
                                        placeholder="EXPLAIN PROJECT IMPACT..."
                                        value={editData.description}
                                        onChange={(e) => setEditData({ ...editData, description: e.target.value })}
                                        className="w-full bg-white/[0.02] border border-white/10 rounded-[2rem] px-6 py-5 text-gray-300 text-[13px] leading-relaxed focus:border-indigo-500/40 outline-none transition-all placeholder:text-gray-800 resize-none"
                                        rows="6"
                                    />
                                </div>
                            </div>

                            {/* Right: Visual & Links */}
                            <div className="space-y-8">
                                <div className="space-y-3">
                                    <label className="text-[9px] font-black uppercase tracking-[0.4em] text-gray-500 ml-4">Visual Asset</label>
                                    <div className="bg-white/[0.02] border border-white/10 rounded-[2.5rem] p-6 space-y-6">
                                        {editData.projectBanner && (
                                            <div className="relative aspect-video rounded-2xl overflow-hidden border border-white/10">
                                                <img
                                                    src={
                                                        editData.projectBanner.url
                                                            ? editData.projectBanner.url
                                                            : editData.projectBanner instanceof File
                                                            ? URL.createObjectURL(editData.projectBanner)
                                                            : null
                                                    }
                                                    alt="Preview"
                                                    className="w-full h-full object-cover grayscale-[0.5] hover:grayscale-0 transition-all duration-700"
                                                />
                                            </div>
                                        )}
                                        <label className="flex items-center justify-center gap-3 w-full py-4 bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl cursor-pointer transition-all">
                                            <HiOutlinePhoto className="text-gray-400" />
                                            <span className="text-[10px] font-black uppercase tracking-widest text-gray-400">Update Visualization</span>
                                            <input
                                                type="file"
                                                accept="image/*"
                                                onChange={(e) => setEditData({ ...editData, projectBanner: e.target.files[0] })}
                                                className="hidden"
                                            />
                                        </label>
                                    </div>
                                </div>

                                <div className="space-y-6 bg-indigo-500/5 p-6 rounded-[2.5rem] border border-indigo-500/10">
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-500/60 ml-2">Source (GIT)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="GIT REPO"
                                                value={editData.gitRepoLink}
                                                onChange={(e) => setEditData({ ...editData, gitRepoLink: e.target.value })}
                                                className="w-full bg-transparent border-b border-indigo-500/20 px-2 py-3 text-white text-[10px] font-mono focus:border-indigo-500 outline-none transition-all"
                                            />
                                            <HiOutlineLink className="absolute right-2 top-1/2 -translate-y-1/2 text-indigo-500/30" />
                                        </div>
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[8px] font-black uppercase tracking-[0.3em] text-indigo-500/60 ml-2">Environment (LIVE)</label>
                                        <div className="relative">
                                            <input
                                                type="text"
                                                placeholder="LIVE APP LINK"
                                                value={editData.projectLink}
                                                onChange={(e) => setEditData({ ...editData, projectLink: e.target.value })}
                                                className="w-full bg-transparent border-b border-indigo-500/20 px-2 py-3 text-white text-[10px] font-mono focus:border-indigo-500 outline-none transition-all"
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Footer */}
                    <footer className="p-8 border-t border-white/5 flex justify-end gap-5 bg-white/[0.01]">
                        <button
                            className="px-10 py-5 bg-transparent text-gray-500 font-black uppercase text-[10px] tracking-widest hover:text-white transition-all"
                            onClick={onClose}
                        >
                            Abort Changes
                        </button>
                        <button
                            className="px-12 py-5 bg-indigo-600 text-white font-black uppercase text-[10px] tracking-widest rounded-2xl hover:bg-indigo-500 shadow-xl shadow-indigo-500/20 transition-all active:scale-95 flex items-center gap-3"
                            onClick={onSave}
                        >
                            <HiOutlineCpuChip className="text-lg" /> Commit Update
                        </button>
                    </footer>
                </motion.div>
            </div>
        </AnimatePresence>
    );
};

export default Editcom;
