import { useState, useEffect } from "react";
import { HiOutlineBolt, HiOutlineMagnifyingGlass, HiOutlineXMark, HiPlus, HiOutlineCpuChip, HiOutlineCubeTransparent, HiOutlineCheckBadge, HiOutlineCommandLine, HiOutlineTrash, HiOutlineCheck, HiOutlinePhoto } from "react-icons/hi2";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { deleteSkill, updateSkill } from "../../../../services/operations/PortfolioApi";

export const Skills = ({ skills }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localSkills, setLocalSkills] = useState([]);
  const [editedSkills, setEditedSkills] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setLocalSkills(skills);
    setEditedSkills(
      skills.map((skill) => ({
        ...skill,
        newSvgFile: null,
        previewSvgUrl: skill.svg?.url || null,
      }))
    );
  }, [skills]);

  const handleSvgChange = (index, file) => {
    const updated = [...editedSkills];
    updated[index].newSvgFile = file;
    updated[index].previewSvgUrl = URL.createObjectURL(file);
    setEditedSkills(updated);
  };

  const handleDelete = async (index, id) => {
    try {
      setLoadingIndex(index);
      const success = await deleteSkill({ skillId: id, portfolioId, token });
      if (success) {
        const updatedSkills = [...localSkills];
        updatedSkills.splice(index, 1);
        setLocalSkills(updatedSkills);
        const updatedEdited = [...editedSkills];
        updatedEdited.splice(index, 1);
        setEditedSkills(updatedEdited);
        toast.success("Skill removed");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to remove skill");
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleUpdate = async (index) => {
    const skill = editedSkills[index];
    if (!skill.newSvgFile) return;
    const formData = new FormData();
    formData.append("skillId", skill._id);
    formData.append("portfolioId", portfolioId);
    formData.append("svg", skill.newSvgFile);
    try {
      setLoadingIndex(index);
      const response = await updateSkill(formData, token);
      if (response?.success) {
        const updatedSkills = [...localSkills];
        updatedSkills[index].svg = { url: skill.previewSvgUrl };
        setLocalSkills(updatedSkills);
        toast.success("Skill updated");
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("Update failed");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, scale: 0.98 }}
      animate={{ opacity: 1, scale: 1 }}
      className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-8 md:p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group h-full flex flex-col"
    >
      <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/5 blur-[100px] rounded-full pointer-events-none opacity-40"></div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-6 relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-emerald-500 tracking-[0.4em]">Your Skills</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
            Technology <span className="text-gray-500 italic font-medium">Stack</span>
          </h2>
        </div>

        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
            isEditMode 
            ? "bg-emerald-500 text-black hover:bg-emerald-400 shadow-lg shadow-emerald-500/20" 
            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          }`}
        >
          {isEditMode ? <><HiOutlineCheck className="text-lg" /> Finish</> : <><HiOutlineBolt className="text-emerald-500" /> Edit Skills</>}
        </button>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 relative z-10 flex-1">
        <AnimatePresence mode="popLayout">
          {localSkills.map((skill, index) => {
            const edited = editedSkills[index];
            const isModified = !!edited?.newSvgFile;

            return (
              <motion.div
                key={skill._id || index}
                layout
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group/card relative bg-white/[0.02] border border-white/5 p-6 rounded-[2.5rem] flex flex-col items-center gap-4 hover:bg-white/[0.04] hover:border-emerald-500/30 transition-all duration-500 hover:-translate-y-1 shadow-lg hover:shadow-emerald-500/5"
              >
                <div className="relative">
                  <div className="w-20 h-20 bg-black/40 border border-white/10 rounded-3xl flex items-center justify-center p-4 relative z-10 group-hover/card:scale-110 transition-transform duration-500 overflow-hidden">
                    {(isEditMode && edited?.previewSvgUrl) || skill.svg?.url ? (
                      <img src={(isEditMode && edited?.previewSvgUrl) || skill.svg.url} alt={skill.title} className="w-full h-full object-contain" />
                    ) : (
                      <HiOutlinePhoto className="text-gray-800 text-3xl" />
                    )}
                  </div>
                  <div className="absolute -inset-2 bg-emerald-500/10 blur-xl rounded-full opacity-0 group-hover/card:opacity-100 transition-opacity"></div>
                </div>

                <div className="text-center w-full">
                   <h3 className="text-xs font-black text-white uppercase tracking-widest truncate px-1">{skill.title}</h3>
                   {isEditMode && (
                     <div className="mt-4 flex flex-col gap-2">
                        <label className="cursor-pointer bg-white/5 border border-white/10 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest text-gray-500 hover:text-white hover:bg-white/10 transition-colors inline-block w-full">
                           Change Icon
                           <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSvgChange(index, e.target.files[0])} />
                        </label>
                        {isModified && (
                          <button onClick={() => handleUpdate(index)} disabled={loadingIndex === index} className="w-full bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 py-1.5 rounded-xl text-[9px] font-black uppercase tracking-widest hover:bg-emerald-500 hover:text-black transition-all">
                            Save Icon
                          </button>
                        )}
                     </div>
                   )}
                </div>

                {isEditMode && (
                  <button
                    onClick={() => handleDelete(index, skill._id)}
                    disabled={loadingIndex === index}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl opacity-0 group-hover/card:opacity-100 transition-opacity translate-x-2 -translate-y-2 group-hover/card:translate-x-0 group-hover/card:translate-y-0"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!localSkills.length && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
          <HiOutlineBolt className="mx-auto text-6xl text-gray-800 mb-4" />
          <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No skills added yet</p>
        </div>
      )}
    </motion.div>
  );
};
