import { useState, useEffect } from "react";
import { HiOutlineTrash, HiOutlinePencilAlt, HiCheck, HiOutlineClock, HiOutlineCalendar, HiPlus } from "react-icons/hi";
import { deleteTimeline, updateTimeline as updateTimelineAPI } from "../../../../services/operations/PortfolioApi";
import { useSelector } from "react-redux";
import { motion, AnimatePresence } from "framer-motion";

export const Timeline = ({ timeline }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [loadingIndex, setLoadingIndex] = useState(null);
  const [localTimeline, setLocalTimeline] = useState([]);
  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setLocalTimeline(timeline);
  }, [timeline]);

  const handleDelete = async (index, id) => {
    try {
      setLoadingIndex(index);
      const success = await deleteTimeline({ Timelineid: id, portfolioId, token });
      if (success) {
        const updatedTimeline = [...localTimeline];
        updatedTimeline.splice(index, 1);
        setLocalTimeline(updatedTimeline);
      }
    } catch (err) {
      console.error("Failed to delete timeline event:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleFieldChange = (index, field, value) => {
    const updatedTimeline = JSON.parse(JSON.stringify(localTimeline));
    if (field === "from" || field === "to") {
      updatedTimeline[index].timeline[field] = value;
    } else {
      updatedTimeline[index][field] = value;
    }
    setLocalTimeline(updatedTimeline);
  };

  const handleUpdate = async (index, id) => {
    const item = localTimeline[index];
    const { title, description, timeline: { from, to } } = item;
    try {
      setLoadingIndex(index);
      const updated = await updateTimelineAPI({ timelineId: id, title, description, from, to, token });
      if (updated) {
        const updatedTimeline = [...localTimeline];
        updatedTimeline[index] = updated;
        setLocalTimeline(updatedTimeline);
      }
    } catch (err) {
      console.error("Error updating timeline:", err);
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 bg-gradient-to-br from-[#0a0a0a] to-[#050505] p-8 md:p-12 rounded-[3.5rem] border border-white/5 shadow-2xl relative overflow-hidden group"
    >
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] bg-pink-500/5 blur-[120px] rounded-full pointer-events-none opacity-40"></div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8 relative z-10">
        <div className="space-y-1">
          <p className="text-[10px] font-black uppercase text-pink-500 tracking-[0.4em]">Experience Timeline</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
            Your <span className="text-gray-500 italic font-medium">Timeline</span>
          </h2>
        </div>

        <button
          onClick={() => setIsEditMode(!isEditMode)}
          className={`flex items-center gap-2 px-6 py-3 rounded-2xl font-black text-xs uppercase tracking-widest transition-all ${
            isEditMode 
            ? "bg-pink-500 text-white hover:bg-pink-400 shadow-lg shadow-pink-500/20" 
            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          }`}
        >
          {isEditMode ? <><HiCheck className="text-lg" /> Save Changes</> : <><HiOutlinePencilAlt className="text-lg" /> Edit Timeline</>}
        </button>
      </header>

      <div className="relative z-10 space-y-8">
        <AnimatePresence>
          {localTimeline.map((event, index) => (
            <motion.div
              layout
              key={event._id || index}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              className="flex flex-col md:flex-row gap-6 p-6 rounded-3xl bg-white/[0.02] border border-white/5 hover:bg-white/[0.04] hover:border-pink-500/20 transition-all group/item"
            >
              {/* Date Column */}
              <div className="md:w-56 shrink-0 flex flex-col justify-center items-center md:items-start border-b md:border-b-0 md:border-r border-white/5 pb-4 md:pb-0 md:pr-6">
                <div className="flex items-center gap-2 text-[10px] font-black text-pink-500 uppercase tracking-widest mb-2">
                   <HiOutlineCalendar className="text-sm" /> Date
                </div>
                {isEditMode ? (
                  <div className="space-y-4 w-full pt-1">
                    <div className="space-y-1 relative">
                      <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest pl-1">Start month</label>
                      <input 
                        type="month" 
                        value={event.timeline.from ? String(event.timeline.from).substring(0, 7) : ""} 
                        onChange={(e) => handleFieldChange(index, "from", e.target.value)} 
                        className="w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs text-white uppercase font-black tracking-wider focus:border-pink-500/50 outline-none transition-all [color-scheme:dark]" 
                      />
                    </div>
                    
                    <div className="space-y-1 relative">
                      <div className="flex items-center justify-between pb-1">
                        <label className="text-[9px] text-gray-500 font-bold uppercase tracking-widest pl-1">End month</label>
                        <label className="flex items-center gap-1.5 cursor-pointer group">
                          <div className="relative flex items-center justify-center">
                            <input
                              type="checkbox"
                              checked={String(event.timeline.to).toLowerCase() === "present"}
                              onChange={(e) => handleFieldChange(index, "to", e.target.checked ? "Present" : "")}
                              className="appearance-none w-3.5 h-3.5 rounded-[3px] border border-white/20 bg-white/5 checked:bg-pink-500 checked:border-pink-500 transition-all outline-none cursor-pointer peer"
                            />
                            <svg className="absolute w-2.5 h-2.5 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                               <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                            </svg>
                          </div>
                          <span className="text-[9px] font-black text-pink-500/70 group-hover:text-pink-500 transition-colors uppercase tracking-wider">Currently here</span>
                        </label>
                      </div>
                      
                      <input 
                        type={String(event.timeline.to).toLowerCase() === "present" ? "text" : "month"} 
                        value={String(event.timeline.to).toLowerCase() === "present" ? "Present" : (event.timeline.to ? String(event.timeline.to).substring(0, 7) : "")} 
                        onChange={(e) => handleFieldChange(index, "to", e.target.value)} 
                        disabled={String(event.timeline.to).toLowerCase() === "present"}
                        className={`w-full bg-black/40 border border-white/10 rounded-xl px-3 py-2.5 text-xs uppercase font-black tracking-wider focus:border-pink-500/50 outline-none transition-all [color-scheme:dark] ${String(event.timeline.to).toLowerCase() === "present" ? "text-pink-500/50 cursor-not-allowed opacity-60" : "text-white"}`} 
                      />
                    </div>
                  </div>
                ) : (
                  <div className="text-center md:text-left">
                    <p className="text-xl font-black text-white tracking-widest">{new Date(event.timeline.from).getFullYear()}</p>
                    <p className="text-[10px] font-bold text-gray-500 uppercase italic">to {(!event.timeline.to || String(event.timeline.to).toLowerCase() === "present") ? "Present" : new Date(event.timeline.to).getFullYear()}</p>
                  </div>
                )}
              </div>

              {/* Content Column */}
              <div className="flex-1 space-y-3">
                {isEditMode ? (
                  <input
                    type="text"
                    value={event.title}
                    onChange={(e) => handleFieldChange(index, "title", e.target.value)}
                    className="w-full bg-transparent text-2xl font-black text-white outline-none border-b border-pink-500/30 pb-1"
                  />
                ) : (
                  <h3 className="text-2xl font-black text-white tracking-tight group-hover/item:text-pink-400 transition-colors">{event.title}</h3>
                )}

                {isEditMode ? (
                  <textarea
                    value={event.description}
                    onChange={(e) => handleFieldChange(index, "description", e.target.value)}
                    className="w-full bg-black/20 border border-white/5 p-4 rounded-2xl text-gray-400 text-sm leading-relaxed outline-none focus:border-pink-500/30 resize-none"
                    rows={3}
                  />
                ) : (
                  <p className="text-gray-500 leading-relaxed font-medium italic opacity-80 break-words line-clamp-3">"{event.description}"</p>
                )}
              </div>

              {/* Action Column */}
              {isEditMode && (
                <div className="md:w-16 flex md:flex-col justify-center items-center gap-4 border-t md:border-t-0 md:border-l border-white/5 pt-4 md:pt-0 md:pl-6 shrink-0">
                  <button
                    onClick={() => handleUpdate(index, event._id)}
                    disabled={loadingIndex === index}
                    className="w-10 h-10 rounded-xl bg-green-500/10 text-green-500 flex items-center justify-center hover:bg-green-500 hover:text-black transition-all"
                  >
                    <HiCheck className="text-xl" />
                  </button>
                  <button
                    onClick={() => handleDelete(index, event._id)}
                    disabled={loadingIndex === index}
                    className="w-10 h-10 rounded-xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all shadow-lg"
                  >
                    <HiOutlineTrash className="text-xl" />
                  </button>
                </div>
              )}
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {!localTimeline.length && (
        <div className="text-center py-20 border-2 border-dashed border-white/5 rounded-[3rem]">
          <HiOutlineClock className="mx-auto text-6xl text-gray-800 mb-4" />
          <p className="text-gray-600 font-black uppercase tracking-widest text-xs">No experience added yet</p>
        </div>
      )}
    </motion.div>
  );
};
