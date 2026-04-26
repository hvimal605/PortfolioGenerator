import { useEffect, useState } from "react";
import { toast } from "sonner";
import { deleteProject, updateProject } from "../../../../services/operations/PortfolioApi";
import { useSelector } from "react-redux";
import ProjectEditModal from "./ProjectEditModal";
import { motion, AnimatePresence } from "framer-motion";
import { HiOutlineTrash, HiOutlinePencil, HiOutlineEye, HiCheck, HiOutlineExternalLink, HiOutlineCode, HiOutlineCollection } from "react-icons/hi";
import COMMON_SKILLS from "../../../../data/skills.json";
import { findSkill } from "../../../../utils/skillMatcher";

// Helper to find skill icon by tech name
const getSkillIcon = (techName) => {
  const match = findSkill(techName.trim());
  return match ? match.iconUrl : null;
};

export const Projects = ({ projects }) => {
  const [manageMode, setManageMode] = useState(false);
  const [projectList, setProjectList] = useState(projects);
  const [editingProject, setEditingProject] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  const handleDelete = async (projectId) => {
    try {
      const res = await deleteProject({ projectId, portfolioId, token });
      if (res) {
        setProjectList((prev) => prev.filter((proj) => proj._id !== projectId));
        toast.success("Project deleted");
      }
    } catch (err) {
      toast.error("Delete failed");
    }
  };

  const handleEditModalOpen = (project, viewOnly = false) => {
    setIsViewOnly(viewOnly);
    setEditingProject(project);
  };

  const handleEditModalClose = () => {
    setEditingProject(null);
    setIsViewOnly(false);
  };

  const handleSave = async () => {
    if (!editingProject) return;
    const formData = new FormData();
    formData.append("title", editingProject.title);
    formData.append("description", editingProject.description);
    formData.append("technologies", editingProject.technologies);
    formData.append("gitRepoLink", editingProject.gitRepoLink);
    formData.append("projectLink", editingProject.projectLink);
    formData.append("projectId", editingProject._id);

    // Track which existing banners are being kept
    const preservedBanners = editingProject.projectBanners || (editingProject.projectBanner ? [editingProject.projectBanner] : []);
    formData.append("retainedBanners", JSON.stringify(preservedBanners));

    // Support multiple new banner files
    if (editingProject.newBannerFiles && editingProject.newBannerFiles.length > 0) {
      editingProject.newBannerFiles.forEach(file => {
        formData.append("projectBanners", file);
      });
    } else if (editingProject.projectBanner instanceof File) {
      formData.append("projectBanner", editingProject.projectBanner);
    }

    try {
      const response = await updateProject(formData, token);
      if (response?.projectRes) {
        setProjectList(prev => prev.map(p => p._id === response.projectRes._id ? response.projectRes : p));
        toast.success("Project updated");
        setEditingProject(null);
      }
    } catch (error) {
      toast.error("Update failed");
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, y: 40 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-8 md:p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative group"
    >
      <div className="absolute top-[-10%] left-[-10%] w-[50%] h-[50%] bg-indigo-500/5 blur-[120px] rounded-full pointer-events-none opacity-40"></div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-6 relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-indigo-500 tracking-[0.4em]">Your Projects</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
            Project <span className="text-gray-500 italic font-medium">Catalog</span>
          </h2>
        </div>

        <button
          onClick={() => setManageMode(!manageMode)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${manageMode
              ? "bg-indigo-500 text-white hover:bg-indigo-400 shadow-lg shadow-indigo-500/20"
              : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
            }`}
        >
          {manageMode ? <><HiCheck className="text-lg" /> Done</> : <><HiOutlinePencil className="text-lg" /> Manage</>}
        </button>
      </header>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 relative z-10">
        <AnimatePresence mode="popLayout">
          {projectList.map((project) => {
            const techList = Array.isArray(project.technologies) ? project.technologies : project.technologies?.split(",") || [];

            return (
              <motion.div
                layout
                key={project._id}
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group/proj relative bg-white/[0.02] border border-white/5 rounded-[2rem] overflow-hidden hover:bg-white/[0.04] hover:border-indigo-500/20 transition-all duration-500"
              >
                {/* Banner */}
                <div className="relative aspect-video overflow-hidden">
                  <img
                    src={project.projectBanners?.[0]?.url || project.projectBanner?.url}
                    alt={project.title}
                    className="w-full h-full object-cover group-hover/proj:scale-105 transition-transform duration-700"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black via-black/30 to-transparent"></div>

                  {/* Action buttons overlay */}
                  <div className={`absolute top-3 right-3 flex gap-2 transition-all ${manageMode ? 'opacity-100 scale-100' : 'opacity-0 group-hover/proj:opacity-100 scale-90 group-hover/proj:scale-100'}`}>
                    <button onClick={() => handleEditModalOpen(project, true)} className="w-9 h-9 rounded-full bg-black/60 backdrop-blur-md border border-white/10 flex items-center justify-center text-white hover:bg-white hover:text-black transition-all">
                      <HiOutlineEye className="text-sm" />
                    </button>
                    {manageMode && (
                      <button onClick={() => handleEditModalOpen(project, false)} className="w-9 h-9 rounded-full bg-indigo-500 flex items-center justify-center text-white hover:bg-indigo-400 transition-all">
                        <HiOutlinePencil className="text-sm" />
                      </button>
                    )}
                    {manageMode && (
                      <button onClick={() => handleDelete(project._id)} className="w-9 h-9 rounded-full bg-red-500 flex items-center justify-center text-white hover:bg-red-400 transition-all">
                        <HiOutlineTrash className="text-sm" />
                      </button>
                    )}
                  </div>

                  {/* Banner count badge */}
                  {project.projectBanners && project.projectBanners.length > 1 && (
                    <div className="absolute bottom-3 right-3 bg-black/60 backdrop-blur-md text-[9px] font-black text-white px-3 py-1 rounded-full border border-white/10 uppercase tracking-widest">
                      {project.projectBanners.length} images
                    </div>
                  )}
                </div>

                {/* Content */}
                <div className="p-6 space-y-3">
                  <h3 className="text-lg font-black text-white tracking-tight">{project.title}</h3>
                  <p className="text-gray-500 text-xs leading-relaxed line-clamp-2 font-medium">{project.description}</p>

                  {/* Tech chips with icons */}
                  <div className="flex flex-wrap gap-1.5 pt-1">
                    {techList.map((tech, i) => {
                      const icon = getSkillIcon(tech);
                      return (
                        <span key={i} className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest px-2.5 py-1 rounded-lg bg-indigo-500/10 text-indigo-400 border border-indigo-500/15">
                          {icon && <img src={icon} alt={tech.trim()} className="w-3 h-3" />}
                          {tech.trim()}
                        </span>
                      );
                    })}
                  </div>

                  {/* Links */}
                  <div className="flex items-center gap-4 pt-3 border-t border-white/5 mt-2">
                    {project.gitRepoLink && (
                      <a href={project.gitRepoLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-gray-400 hover:text-white transition-colors">
                        <HiOutlineCode className="text-base" /> GitHub
                      </a>
                    )}
                    {project.projectLink && (
                      <a href={project.projectLink} target="_blank" rel="noreferrer" className="flex items-center gap-1.5 text-[9px] font-bold uppercase tracking-widest text-emerald-500 hover:text-emerald-400 transition-colors">
                        <HiOutlineExternalLink className="text-base" /> Live demo
                      </a>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!projectList.length && (
        <div className="text-center py-16 border-2 border-dashed border-white/5 rounded-[2.5rem]">
          <HiOutlineCollection className="mx-auto text-5xl text-gray-800 mb-3" />
          <p className="text-gray-600 font-bold text-sm">No projects added yet</p>
        </div>
      )}

      {editingProject && (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-xl flex justify-center items-center z-[100] p-6">
          <ProjectEditModal
            isOpen={!!editingProject}
            editData={editingProject}
            setEditData={setEditingProject}
            onClose={handleEditModalClose}
            onSave={handleSave}
            readOnly={isViewOnly}
          />
        </div>
      )}
    </motion.div>
  );
};
