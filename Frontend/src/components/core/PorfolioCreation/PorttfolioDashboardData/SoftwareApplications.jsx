import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlineCheck, HiOutlinePencil, HiOutlineCube, HiPhotograph, HiOutlineUpload } from "react-icons/hi";
import { useSelector } from "react-redux";
import { toast } from "sonner";
import { motion, AnimatePresence } from "framer-motion";
import { deleteSoftwareApp, updateSoftwareApp } from "../../../../services/operations/PortfolioApi";

export const SoftwareApplications = ({ software }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localSoftware, setLocalSoftware] = useState([]);
  const [editedSoftware, setEditedSoftware] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setLocalSoftware(software);
    setEditedSoftware(
      software.map((app) => ({
        ...app,
        newSvgFile: null,
        previewSvgUrl: app.svg?.url || null,
      }))
    );
  }, [software]);

  const handleSvgChange = (index, file) => {
    const updated = [...editedSoftware];
    updated[index].newSvgFile = file;
    updated[index].previewSvgUrl = URL.createObjectURL(file);
    setEditedSoftware(updated);
  };

  const handleDelete = async (index, id) => {
    try {
      setLoadingIndex(index);
      const success = await deleteSoftwareApp({ softwareId: id, portfolioId, token });
      if (success) {
        setLocalSoftware(prev => prev.filter((_, i) => i !== index));
        setEditedSoftware(prev => prev.filter((_, i) => i !== index));
        toast.success("Tool removed");
      }
    } catch (error) {
      toast.error("Removal failed");
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleUpdate = async (index) => {
    const app = editedSoftware[index];
    if (!app.newSvgFile) return;
    const formData = new FormData();
    formData.append("softwareId", app._id);
    formData.append("portfolioId", portfolioId);
    formData.append("svg", app.newSvgFile);
    try {
      setLoadingIndex(index);
      const response = await updateSoftwareApp(formData, token);
      if (response?.success) {
        setLocalSoftware(prev => {
          const updated = [...prev];
          updated[index].svg = { url: app.previewSvgUrl };
          return updated;
        });
        toast.success("Update successful");
      }
    } catch (error) {
      toast.error("Update failed");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      className="bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-8 md:p-10 rounded-[3.5rem] border border-white/5 shadow-2xl relative group h-full flex flex-col"
    >
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none opacity-40"></div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-4 mb-8 border-b border-white/5 pb-6 relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-blue-500 tracking-[0.4em]">Software Tools</p>
          <h2 className="text-3xl md:text-4xl font-black tracking-tighter text-white">
            Software <span className="text-gray-500 italic font-medium">Applications</span>
          </h2>
        </div>

        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
            isEditMode 
            ? "bg-blue-500 text-white hover:bg-blue-400 shadow-lg shadow-blue-500/20" 
            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          }`}
        >
          {isEditMode ? <><HiOutlineCheck className="text-lg" /> Done</> : <><HiOutlinePencil className="text-lg" /> Edit Tools</>}
        </button>
      </header>

      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-6 relative z-10 flex-1">
        <AnimatePresence mode="popLayout">
          {localSoftware.map((app, index) => {
            const edited = editedSoftware[index];
            const isChanged = !!edited?.newSvgFile;

            return (
              <motion.div
                key={app._id || index}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.8 }}
                className="group/tool relative aspect-square bg-white/[0.01] border border-white/[0.05] rounded-[3rem] p-8 flex flex-col items-center justify-center gap-4 hover:bg-white/[0.03] hover:border-blue-500/40 transition-all duration-700 hover:shadow-2xl hover:shadow-blue-500/5"
              >
                <div className="relative">
                  <div className="w-24 h-24 bg-white rounded-[2rem] flex items-center justify-center p-5 relative z-10 group-hover/tool:rotate-6 group-hover/tool:scale-110 transition-all duration-500 shadow-2xl shadow-black/50">
                    {edited?.previewSvgUrl || app.svg?.url ? (
                      <img src={edited?.previewSvgUrl || app.svg.url} alt={app.name} className="w-full h-full object-contain filter drop-shadow-2xl" />
                    ) : (
                      <HiPhotograph className="text-gray-800 text-4xl" />
                    )}
                  </div>
                  <div className="absolute -inset-4 bg-blue-500/10 blur-2xl rounded-full opacity-0 group-hover/tool:opacity-100 transition-opacity"></div>
                </div>

                <div className="text-center">
                  <h3 className="text-sm font-black text-white uppercase tracking-widest">{app.name}</h3>
                  {isEditMode && (
                    <div className="mt-4 flex flex-col gap-2">
                      <label className="cursor-pointer bg-white/5 border border-white/10 px-4 py-2 rounded-xl text-[10px] font-black uppercase text-gray-500 hover:text-white transition-all flex items-center justify-center gap-2">
                        <HiOutlineUpload /> New Logo
                        <input type="file" className="hidden" accept="image/*" onChange={(e) => handleSvgChange(index, e.target.files[0])} />
                      </label>
                      {isChanged && (
                        <button onClick={() => handleUpdate(index)} disabled={loadingIndex === index} className="bg-blue-500/20 text-blue-400 border border-blue-500/30 px-4 py-2 rounded-xl text-[10px] font-black uppercase hover:bg-blue-500 hover:text-white transition-all">
                          Save Changes
                        </button>
                      )}
                    </div>
                  )}
                </div>

                {isEditMode && (
                  <button
                    onClick={() => handleDelete(index, app._id)}
                    disabled={loadingIndex === index}
                    className="absolute -top-2 -right-2 w-8 h-8 rounded-full bg-red-500 text-white flex items-center justify-center shadow-xl z-30 opacity-0 group-hover/tool:opacity-100 transition-all hover:scale-110"
                  >
                    <HiOutlineTrash className="text-sm" />
                  </button>
                )}
              </motion.div>
            );
          })}
        </AnimatePresence>
      </div>

      {!localSoftware.length && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[4rem]">
          <HiOutlineCube className="mx-auto text-6xl text-gray-800 mb-4" />
          <p className="text-gray-600 font-black uppercase tracking-widest text-xs italic">No tools added yet</p>
        </div>
      )}
    </motion.div>
  );
};
