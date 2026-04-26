import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { createTimeline } from "../../../../services/operations/PortfolioApi";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../slices/PortfolioSlice";
import { HiOutlineClock, HiOutlineCalendar, HiOutlinePencilSquare, HiOutlineArrowTopRightOnSquare, HiOutlinePlus, HiOutlineArrowRight, HiOutlineSparkles } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";

const Timeline = () => {
   const { token } = useSelector((state) => state.auth);
   const { portfolio, aiData } = useSelector((state) => state.portfolio);
   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!portfolio) {
         navigate("/PortfolioCreate/UploadDetails");
         dispatch(setStep(0));
      }
   }, [portfolio, navigate, dispatch]);

   const [timeLine, setTimeLine] = useState({
      title: "",
      description: "",
      from: "",
      to: "",
   });
   const [isPresent, setIsPresent] = useState(false);

   // Suggested Items Tracking
   const [suggestedEducation, setSuggestedEducation] = useState([]);
   const [suggestedExperience, setSuggestedExperience] = useState([]);

   useEffect(() => {
     if (aiData) {
       console.log("AI Data received in Timeline:", aiData);
       
       if (Array.isArray(aiData.education)) {
         setSuggestedEducation(aiData.education.filter(item => item && item.title));
       }
       
       if (Array.isArray(aiData.experience)) {
         setSuggestedExperience(aiData.experience.filter(item => item && item.title));
       }
     }
   }, [aiData]);

   // Normalize date strings from AI to YYYY-MM format for month input
   const normalizeDateToMonth = (dateStr) => {
      if (!dateStr || dateStr === "Present") return dateStr;
      const trimmed = dateStr.trim();
      // Already in YYYY-MM format
      if (/^\d{4}-\d{2}$/.test(trimmed)) return trimmed;
      // Year only (e.g. "2022") → default to January
      if (/^\d{4}$/.test(trimmed)) return `${trimmed}-01`;
      // Try to parse other formats
      const parsed = new Date(trimmed);
      if (!isNaN(parsed.getTime())) {
         const y = parsed.getFullYear();
         const m = String(parsed.getMonth() + 1).padStart(2, '0');
         return `${y}-${m}`;
      }
      return trimmed;
   };

   const addSuggestedItem = (item) => {
      const fromDate = normalizeDateToMonth(item.startDate || "");
      const toDate = normalizeDateToMonth(item.endDate || "");

      setTimeLine({
        title: item.title || "",
        description: `${item.organization ? item.organization + ' - ' : ''}${item.description || ""}`,
        from: fromDate,
        to: item.endDate === "Present" ? "" : toDate,
      });
      if (item.endDate === "Present") setIsPresent(true);
      else setIsPresent(false);
      
      // No longer need to filter broad timeline state here since categorized lists handle their own removal
      toast.info("Suggestion applied to form. Click 'Add timeline' to save.");
   };

   const handleChange = (e) => {
      setTimeLine({ ...timeLine, [e.target.name]: e.target.value });
   };

   const handleSubmit = async (e) => {
      e.preventDefault();
      const portfolioId = portfolio._id;
      if (!portfolioId) {
         toast.error("Portfolio ID synchronization failed");
         return;
      }
      try {
         const timeLineData = { ...timeLine, portfolioId };
         if (isPresent) timeLineData.to = "Present";
         await createTimeline(timeLineData, token);
         setTimeLine({
            title: "",
            description: "",
            from: "",
            to: "",
         });
         setIsPresent(false);
         toast.success("Experience Added");
      } catch (error) {
         toast.error("Failed to add experience");
      }
   };

   // Calculate progress for the "Journey Line"
   const getProgress = () => {
      let count = 0;
      if (timeLine.title.trim()) count++;
      if (timeLine.description.trim()) count++;
      if (timeLine.from) count++;
      if (timeLine.to) count++;
      return (count / 4) * 100;
   };

   return (
      <div className="max-w-[1000px] mx-auto space-y-12 pb-20">
         {/* Cinematic Header */}
         <div className="text-center space-y-4 pt-8">
            
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl"
            >
               Professional <span className="text-white/40 italic font-medium">Timeline</span>
            </motion.h2>
         </div>

         <div className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
            <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 hover:border-rose-500/40 transition-all duration-500 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
               <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-rose-500/5 blur-[100px] rounded-full pointer-events-none"></div>

               <header className="mb-10 border-b border-white/5 pb-6">
                  <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                     <div className="w-10 h-10 rounded-xl bg-rose-500/10 flex items-center justify-center text-rose-500 border border-rose-500/20">
                        <HiOutlineClock className="text-xl" />
                     </div>
                     Add Experience
                  </h3>
                  <p className="text-sm text-gray-400 mt-2 ml-14">Share your career journey, jobs, and projects</p>
               </header>

               {/* AI Suggestions Section */}
               <AnimatePresence>
                  {(suggestedEducation.length > 0 || suggestedExperience.length > 0) && (
                     <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        exit={{ opacity: 0, height: 0 }}
                        className="mb-10 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl space-y-6"
                     >
                        <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest flex items-center gap-2">
                           <HiOutlineSparkles /> Suggested from Resume
                        </h4>

                        <div className="space-y-4">
                           {suggestedEducation.length > 0 && (
                              <div className="space-y-3">
                                 <h5 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Education</h5>
                                 <div className="flex flex-wrap gap-3">
                                    {suggestedEducation.map((item, idx) => (
                                       <button
                                          key={`edu-${idx}`}
                                          type="button"
                                          onClick={() => {
                                             addSuggestedItem(item);
                                             setSuggestedEducation(prev => prev.filter(i => i !== item));
                                          }}
                                          className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-bold text-white hover:bg-indigo-500/30 transition-all flex flex-col items-start gap-1 text-left"
                                       >
                                          <div className="flex items-center gap-2">
                                             <span className="text-white">{item.title}</span>
                                             <HiOutlinePlus className="text-[10px] text-indigo-400" />
                                          </div>
                                          {item.organization && (
                                             <span className="text-[10px] text-indigo-400/60 font-medium">@ {item.organization}</span>
                                          )}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           )}

                           {suggestedExperience.length > 0 && (
                              <div className="space-y-3">
                                 <h5 className="text-[9px] font-bold text-gray-500 uppercase tracking-wider ml-1">Experience</h5>
                                 <div className="flex flex-wrap gap-3">
                                    {suggestedExperience.map((item, idx) => (
                                       <button
                                          key={`exp-${idx}`}
                                          type="button"
                                          onClick={() => {
                                             addSuggestedItem(item);
                                             setSuggestedExperience(prev => prev.filter(i => i !== item));
                                          }}
                                          className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-bold text-white hover:bg-indigo-500/30 transition-all flex flex-col items-start gap-1 text-left"
                                       >
                                          <div className="flex items-center gap-2">
                                             <span className="text-white">{item.title}</span>
                                             <HiOutlinePlus className="text-[10px] text-indigo-400" />
                                          </div>
                                          {item.organization && (
                                             <span className="text-[10px] text-indigo-400/60 font-medium">@ {item.organization}</span>
                                          )}
                                       </button>
                                    ))}
                                 </div>
                              </div>
                           )}
                        </div>
                     </motion.div>
                  )}
               </AnimatePresence>

               <form onSubmit={handleSubmit} className="space-y-8 relative z-10">
                  {/* Job Title */}
                  <div className="space-y-2">
                     <label className="text-sm font-medium text-gray-400 ml-2">Job title / role</label>
                     <div className="relative">
                        <input
                           type="text"
                           name="title"
                           value={timeLine.title}
                           onChange={handleChange}
                           placeholder="e.g. Senior Frontend Engineer"
                           required
                           className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium focus:border-rose-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 shadow-inner"
                       />
                       <HiOutlinePencilSquare className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600" />
                     </div>
                  </div>

                  {/* Dates */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                     <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-400 ml-2">Start month</label>
                         <div className="relative">
                            <input
                               type="month"
                               name="from"
                               value={timeLine.from}
                               onChange={handleChange}
                               required
                               className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium focus:border-rose-500/40 outline-none transition-all [color-scheme:dark] shadow-inner"
                           />
                           <HiOutlineCalendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />
                        </div>
                     </div>
                     <div className="space-y-2">
                         <div className="flex items-center justify-between ml-2">
                            <label className="text-sm font-medium text-gray-400">End month</label>
                            <label className="flex items-center gap-2 cursor-pointer group">
                                <div className="relative flex items-center justify-center">
                                    <input 
                                        type="checkbox" 
                                        checked={isPresent}
                                        onChange={() => setIsPresent(!isPresent)}
                                        className="appearance-none w-4 h-4 rounded-[4px] border border-white/20 bg-white/5 checked:bg-rose-500 checked:border-rose-500 transition-all outline-none cursor-pointer peer"
                                    />
                                    <svg className="absolute w-3 h-3 text-white opacity-0 peer-checked:opacity-100 pointer-events-none" viewBox="0 0 14 10" fill="none">
                                        <path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
                                    </svg>
                                </div>
                                <span className="text-[10px] font-black text-rose-500/70 group-hover:text-rose-500 transition-colors uppercase tracking-wider">Currently here</span>
                            </label>
                         </div>
                         <div className="relative">
                            <input
                               type={isPresent ? "text" : "month"}
                               name="to"
                               value={isPresent ? "Present" : timeLine.to}
                               onChange={handleChange}
                               required={!isPresent}
                               disabled={isPresent}
                               className={`w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-base font-medium outline-none transition-all [color-scheme:dark] shadow-inner ${isPresent ? 'text-rose-500/50 cursor-not-allowed opacity-60' : 'text-white focus:border-rose-500/40'}`}
                           />
                           {!isPresent && <HiOutlineCalendar className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600 pointer-events-none" />}
                        </div>
                     </div>
                  </div>

                  {/* Description */}
                  <div className="space-y-2">
                      <label className="text-sm font-medium text-gray-400 ml-2">Description</label>
                      <div className="relative">
                         <textarea
                            name="description"
                            value={timeLine.description}
                            onChange={handleChange}
                            placeholder="Describe your achievements and impact..."
                            required
                            rows={5}
                            className="w-full h-full min-h-[160px] bg-white/[0.02] border border-white/10 rounded-3xl px-6 py-5 text-white text-base leading-relaxed focus:border-rose-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 resize-none shadow-inner"
                        />
                     </div>
                  </div>

                  <div className="flex flex-col flex-col-reverse md:flex-row items-center justify-between pt-6 border-t border-white/5 gap-4">
                      <p className="text-xs font-medium text-gray-500 hidden md:block">
                        Build your professional history sequentially
                     </p>

                     <div className="flex flex-col md:flex-row items-center justify-end gap-4 w-full md:w-auto">
                        <button
                           type="submit"
                           className="group relative flex items-center justify-center gap-2 px-8 py-3 bg-rose-500 text-white rounded-xl font-bold tracking-wide hover:bg-rose-400 transition-all shadow-xl transform active:scale-95 shadow-rose-500/20 w-full md:w-auto"
                        >
                           <span className="text-sm">Add timeline</span>
                           <HiOutlinePlus className="text-lg group-hover:scale-110 transition-transform" />
                        </button>

                        <button
                           type="button"
                           onClick={() => dispatch(setStep(2))}
                           className="group relative flex items-center justify-center gap-2 px-8 py-3 border border-white/10 bg-white/[0.02] text-gray-400 rounded-xl font-medium tracking-wide hover:bg-white/[0.08] hover:text-white transition-all w-full md:w-auto"
                        >
                           <span className="text-sm">Next Section</span>
                           <HiOutlineArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                        </button>
                     </div>
                  </div>
               </form>
            </div>
         </div>
      </div>
   );
};

export default Timeline;
