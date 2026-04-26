import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../../../services/operations/PortfolioApi";
import { setStep } from "../../../../slices/PortfolioSlice";
import { useDropzone } from "react-dropzone";
import {
   HiOutlineFolderOpen,
   HiOutlinePencilSquare,
   HiOutlineCodeBracket,
   HiOutlineLink,
   HiOutlineArrowTopRightOnSquare,
   HiPlus,
   HiOutlineCube,
   HiOutlineRocketLaunch,
   HiOutlineSquare3Stack3D,
   HiOutlineXMark,
   HiOutlineSparkles,
   HiOutlineArrowRight
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";
import COMMON_SKILLS from "../../../../data/skills.json";
import { findSkill, filterSkills } from "../../../../utils/skillMatcher";

const ProjectForm = () => {
   const { token } = useSelector((state) => state.auth);
   const { portfolio, aiData } = useSelector((state) => state.portfolio);
   const portfolioId = portfolio?._id;

   const navigate = useNavigate();
   const dispatch = useDispatch();

   useEffect(() => {
      if (!portfolio) {
         navigate("/PortfolioCreate/UploadDetails");
         dispatch(setStep(0));
      }
   }, [portfolio, navigate, dispatch]);

   const [project, setProject] = useState({
      title: "",
      description: "",
      githubLink: "",
      projectLink: "",
      projectBanners: [],
   });

   const [selectedTech, setSelectedTech] = useState([]);
   const [searchTerm, setSearchTerm] = useState("");
   const [customTechTerm, setCustomTechTerm] = useState("");

   const [errors, setErrors] = useState({});
   const [bannerPreviews, setBannerPreviews] = useState([]);

   // Suggested Items Tracking
   const [suggestedProjects, setSuggestedProjects] = useState([]);

   useEffect(() => {
     if (aiData?.projects) {
       setSuggestedProjects(aiData.projects);
     }
   }, [aiData]);

   const addSuggestedProject = (item) => {
     setProject({
       title: item.title || "",
       description: item.description || "",
       githubLink: item.githubLink || item.link || "",
       projectLink: item.liveLink || "",
       projectBanners: [], 
     });

     if (item.techStack && Array.isArray(item.techStack)) {
        const techsToAdd = item.techStack.map(tech => {
           const librarySkill = findSkill(tech);
           return librarySkill || { title: tech, iconUrl: null };
        });
        setSelectedTech(techsToAdd);
     }
     
     // Filter out from suggestions
     setSuggestedProjects(prev => prev.filter(i => i !== item));
     toast.info("Project populated from resume! Add screenshots to save.");
   };

   const handleChange = (e) => {
      setProject((prev) => ({
         ...prev,
         [e.target.name]: e.target.value,
      }));
   };

   const onDrop = (acceptedFiles) => {
      if (acceptedFiles.length > 0) {
         setProject((prev) => ({
            ...prev,
            projectBanners: [...prev.projectBanners, ...acceptedFiles],
         }));

         const newPreviews = acceptedFiles.map(file => URL.createObjectURL(file));
         setBannerPreviews((prev) => [...prev, ...newPreviews]);
      }
   };

   const removeBanner = (index) => {
      setProject((prev) => {
         const newBanners = [...prev.projectBanners];
         newBanners.splice(index, 1);
         return { ...prev, projectBanners: newBanners };
      });
      setBannerPreviews((prev) => {
         const newPreviews = [...prev];
         newPreviews.splice(index, 1);
         return newPreviews;
      });
   };

   const { getRootProps, getInputProps, isDragActive } = useDropzone({
      accept: { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"], "image/webp": [".webp"] },
      onDrop,
   });

   const handleSubmit = async (e) => {
      e.preventDefault();

      const newErrors = {};
      if (!project.title) newErrors.title = "Project Name required";
      if (!project.description) newErrors.description = "Description required";
      if (selectedTech.length === 0) newErrors.technologies = "Technologies required";
      if (!project.githubLink) newErrors.githubLink = "GitHub Link required";
      if (project.projectBanners.length === 0) newErrors.projectBanners = "At least one screenshot required";

      setErrors(newErrors);
      if (Object.keys(newErrors).length > 0) {
         toast.error("Please fill all required fields");
         return;
      }

      const finalTechString = selectedTech.map(t => t.title).join(", ");

      const formData = new FormData();
      formData.append("title", project.title);
      formData.append("description", project.description);
      formData.append("technologies", finalTechString);
      formData.append("gitRepoLink", project.githubLink);
      formData.append("projectLink", project.projectLink);

      project.projectBanners.forEach(file => {
         formData.append("projectBanners", file);
      });

      formData.append("portfolioId", portfolioId);

      try {
         const res = await addProject(formData, token);
         if (res) {
            setProject({
               title: "",
               description: "",
               githubLink: "",
               projectLink: "",
               projectBanners: [],
            });
            setSelectedTech([]);
            setSearchTerm("");
            setCustomTechTerm("");
            setBannerPreviews([]);
            setErrors({});
            toast.success("Project Added");
         }
      } catch (err) {
         toast.error("Failed to add project");
      }
   };

   return (
      <div className="max-w-[1100px] mx-auto space-y-12 pb-20">
         {/* Cinematic Header */}
         <div className="text-center space-y-4 pt-8">
          
            <motion.h2
               initial={{ opacity: 0, y: 20 }}
               animate={{ opacity: 1, y: 0 }}
               transition={{ delay: 0.1 }}
               className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl"
            >
               Add <span className="text-white/40 italic font-medium">projects</span>
            </motion.h2>
         </div>

         <form onSubmit={handleSubmit} className="bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-white/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative mb-0 group">
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-indigo-500/30 to-transparent"></div>

            <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 items-stretch">
               {/* Left Col: Project Intel (7 cols) */}
               <div className="lg:col-span-7 p-8 md:p-12 space-y-12 bg-white/[0.01]">

                  {/* Section 1: details */}
                  <div className="space-y-10 relative z-10">
                     <header className="flex items-center gap-5 relative z-10 border-b border-white/5 pb-8">
                        <div className="w-14 h-14 rounded-2xl bg-indigo-500/10 flex items-center justify-center text-indigo-500 border border-indigo-500/20 shadow-xl">
                           <HiOutlineCube className="text-3xl" />
                        </div>
                        <div>
                           <h3 className="text-2xl font-bold text-white tracking-tight">Project details</h3>
                           <p className="text-sm text-gray-500 font-medium tracking-wide">Tell us what you've built</p>
                        </div>
                     </header>

                     {/* AI Suggestions Section */}
                     <AnimatePresence>
                        {suggestedProjects.length > 0 && (
                           <motion.div 
                              initial={{ opacity: 0, height: 0 }}
                              animate={{ opacity: 1, height: "auto" }}
                              exit={{ opacity: 0, height: 0 }}
                              className="mb-10 p-6 bg-indigo-500/5 border border-indigo-500/20 rounded-3xl"
                           >
                              <h4 className="text-[10px] font-black text-indigo-400 uppercase tracking-widest mb-4 flex items-center gap-2">
                                 <HiOutlineSparkles /> Suggested from Resume
                              </h4>
                              <div className="flex flex-wrap gap-3">
                                 {suggestedProjects.map((item, idx) => (
                                    <button
                                       key={idx}
                                       type="button"
                                       onClick={() => addSuggestedProject(item)}
                                       className="px-4 py-2 bg-indigo-500/10 border border-indigo-500/20 rounded-xl text-xs font-bold text-white hover:bg-indigo-500/30 transition-all flex flex-col items-start gap-1 text-left"
                                    >
                                       <div className="flex items-center gap-2">
                                          <span className="text-white">{item.title}</span>
                                          <HiPlus className="text-[10px] text-indigo-400" />
                                       </div>
                                       {item.techStack && item.techStack.length > 0 && (
                                          <div className="flex flex-wrap gap-1">
                                             {item.techStack.slice(0, 3).map((tech, i) => (
                                                <span key={i} className="text-[8px] px-1.5 py-0.5 bg-indigo-500/10 border border-indigo-500/20 rounded-md text-indigo-400/70">
                                                   {tech}
                                                </span>
                                             ))}
                                             {item.techStack.length > 3 && (
                                                <span className="text-[8px] text-indigo-400/50">+{item.techStack.length - 3}</span>
                                             )}
                                          </div>
                                       )}
                                    </button>
                                 ))}
                              </div>
                           </motion.div>
                        )}
                     </AnimatePresence>

                     <div className="space-y-8 relative z-10">
                        <div className="space-y-3">
                           <label className="text-sm font-medium text-gray-400 ml-4">Project title</label>
                           <div className="relative group">
                              <input
                                 type="text"
                                 name="title"
                                 value={project.title}
                                 onChange={handleChange}
                                 placeholder="e.g. Personal Portfolio"
                                 className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-8 py-5 text-white text-base font-medium focus:border-indigo-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500"
                              />
                              <HiOutlinePencilSquare className="absolute right-6 top-1/2 -translate-y-1/2 text-gray-700" />
                              <AnimatePresence>
                                 {errors.title && <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="absolute -bottom-6 left-4 text-[8px] font-black text-red-500 uppercase tracking-widest">{errors.title}</motion.p>}
                              </AnimatePresence>
                           </div>
                        </div>

                         <div className="space-y-3">
                            <div className="flex items-center justify-between ml-1">
                               <label className="text-sm font-medium text-gray-400 flex items-center gap-2">
                                  <HiOutlineCodeBracket className="text-indigo-500" /> Technologies used
                               </label>
                               {errors.technologies && <span className="text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.technologies}</span>}
                            </div>

                            {/* Unified Search Input */}
                            <div className="relative">
                               <input
                                  type="text"
                                  placeholder="Search or type a technology... (Enter to add)"
                                  value={searchTerm}
                                  onChange={(e) => { setSearchTerm(e.target.value); setCustomTechTerm(e.target.value); }}
                                  onKeyDown={(e) => {
                                     if(e.key === "Enter") {
                                        e.preventDefault();
                                        const term = searchTerm.trim();
                                        if(!term) return;
                                        const existingCommonSkill = findSkill(term);
                                        if(!selectedTech.some(t => t.title.toLowerCase() === term.toLowerCase())) {
                                           setSelectedTech([...selectedTech, existingCommonSkill || { title: term, iconUrl: null }]);
                                        }
                                        setSearchTerm(""); setCustomTechTerm("");
                                     }
                                  }}
                                  className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white text-base font-medium focus:border-indigo-500/50 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-600 shadow-inner pr-36"
                               />
                               {/* In-library badge */}
                               <AnimatePresence>
                                  {searchTerm.trim() && findSkill(searchTerm.trim()) && (
                                     <motion.div initial={{ opacity: 0, x: 10 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 10 }}
                                        className="absolute right-[4.5rem] top-1/2 -translate-y-1/2 flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/30 px-2.5 py-1.5 rounded-xl pointer-events-none">
                                        <img src={findSkill(searchTerm.trim()).iconUrl} className="w-4 h-4" alt="" />
                                        <span className="text-[9px] font-black text-indigo-400 uppercase tracking-widest">In library</span>
                                     </motion.div>
                                  )}
                               </AnimatePresence>
                               <button type="button"
                                  onClick={() => {
                                     const term = searchTerm.trim();
                                     if(!term) return;
                                     const existingCommonSkill = findSkill(term);
                                     if(!selectedTech.some(t => t.title.toLowerCase() === term.toLowerCase())) {
                                        setSelectedTech([...selectedTech, existingCommonSkill || { title: term, iconUrl: null }]);
                                     }
                                     setSearchTerm(""); setCustomTechTerm("");
                                  }}
                                  className="absolute right-3 top-1/2 -translate-y-1/2 bg-indigo-500 hover:bg-indigo-400 text-black px-4 py-2.5 rounded-xl font-bold text-xs uppercase tracking-widest transition-all shadow-lg"
                               >
                                  Add
                               </button>
                            </div>

                            {/* Dropdown Suggestions */}
                            <AnimatePresence>
                               {searchTerm.trim() && (
                                  <motion.div initial={{ opacity: 0, y: -8 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -8 }}
                                     className="flex flex-wrap gap-2 p-4 bg-black/60 border border-white/10 backdrop-blur-xl rounded-2xl shadow-2xl max-h-[180px] overflow-y-auto custom-scrollbar">
                                     {filterSkills(searchTerm).slice(0, 18).map(skill => {
                                        const isAdded = selectedTech.some(t => t.title === skill.title);
                                        return (
                                           <motion.button
                                              type="button"
                                              key={skill.title}
                                              whileHover={!isAdded ? { scale: 1.05 } : {}}
                                              onClick={() => {
                                                 if(isAdded) return;
                                                 setSelectedTech([...selectedTech, skill]);
                                                 setSearchTerm(""); setCustomTechTerm("");
                                              }}
                                              className={`flex items-center gap-2 px-3 py-2 rounded-xl transition-all border ${
                                                 isAdded
                                                    ? "bg-green-500/10 border-green-500/20 cursor-default opacity-80"
                                                    : "bg-white/[0.03] border-white/[0.07] hover:bg-indigo-500/10 hover:border-indigo-500/30 cursor-pointer group"
                                              }`}
                                           >
                                              <img src={skill.iconUrl} alt={skill.title} className={`w-5 h-5 transition-all ${isAdded ? "grayscale-0 opacity-100" : "grayscale group-hover:grayscale-0"}`} />
                                              <span className={`text-xs font-semibold ${isAdded ? "text-green-400" : "text-gray-400 group-hover:text-white"}`}>{skill.title}</span>
                                              {isAdded && (
                                                 <span className="ml-1 flex items-center gap-1 text-[9px] font-black text-green-500 uppercase tracking-widest">
                                                    <svg className="w-3 h-3" viewBox="0 0 14 10" fill="none"><path d="M1 5L4.5 8.5L13 1" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/></svg>
                                                    Added
                                                 </span>
                                              )}
                                           </motion.button>
                                        );
                                     })}
                                     {filterSkills(searchTerm).length === 0 && (
                                        <div className="w-full text-center py-2">
                                           <p className="text-[10px] font-bold text-gray-600 uppercase tracking-widest">Not in library — press Enter or Add to use custom</p>
                                        </div>
                                     )}
                                  </motion.div>
                               )}
                            </AnimatePresence>

                            {/* Selected Tech Chips */}
                            <AnimatePresence>
                               {selectedTech.length > 0 && (
                                  <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex flex-wrap gap-2 pt-1">
                                     {selectedTech.map((tech) => (
                                        <motion.div key={tech.title} layout initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.7, opacity: 0 }}
                                           className="flex items-center gap-2 bg-indigo-500/10 border border-indigo-500/20 hover:border-indigo-500/40 px-3 py-2 rounded-xl group transition-all">
                                           {tech.iconUrl && <img src={tech.iconUrl} alt={tech.title} className="w-4 h-4 grayscale group-hover:grayscale-0 transition-all" />}
                                           {!tech.iconUrl && <div className="w-4 h-4 rounded-full bg-indigo-500/30 border border-indigo-500/40 flex items-center justify-center text-[8px] font-black text-indigo-400">{tech.title[0]}</div>}
                                           <span className="text-xs font-bold text-indigo-400 tracking-wide">{tech.title}</span>
                                           <button type="button" onClick={() => setSelectedTech(selectedTech.filter(t => t.title !== tech.title))}
                                              className="text-indigo-400/30 hover:text-red-400 transition-colors ml-0.5">
                                              <HiOutlineXMark className="text-sm" />
                                           </button>
                                        </motion.div>
                                     ))}
                                  </motion.div>
                               )}
                            </AnimatePresence>
                         </div>

                        <div className="space-y-3">
                           <label className="text-sm font-medium text-gray-400 ml-4">Project description</label>
                           <div className="relative group">
                              <textarea
                                 name="description"
                                 value={project.description}
                                 onChange={handleChange}
                                 rows={5}
                                 placeholder="Tell us about the project, the challenges, and the impact..."
                                 className="w-full bg-white/[0.02] border border-white/10 rounded-[2.5rem] px-8 py-6 text-white text-base leading-relaxed focus:border-indigo-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 resize-none"
                              />
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* Divider inside the left pane */}
                  <div className="w-full h-px bg-white/5"></div>

                  <div className="space-y-8 relative z-10">
                     <header className="flex items-center gap-5 border-b border-white/5 pb-8">
                        <div className="w-12 h-12 rounded-xl bg-gray-900 flex items-center justify-center text-gray-500 border border-white/10">
                           <HiOutlineLink className="text-2xl" />
                        </div>
                        <div>
                           <h3 className="text-xl font-bold text-white tracking-tight">Project links</h3>
                           <p className="text-sm text-gray-500 font-medium tracking-wide">Connect your source code & live demo</p>
                        </div>
                     </header>

                     <div className="space-y-6 relative z-10">
                        <div className="space-y-3">
                           <label className="text-sm font-medium text-gray-400 ml-4">GitHub link</label>
                           <div className="relative group">
                              <input
                                 type="url"
                                 name="githubLink"
                                 value={project.githubLink}
                                 onChange={handleChange}
                                 placeholder="https://github.com/..."
                                 className="w-full bg-white/[0.01] border border-white/5 rounded-2xl px-6 py-4 text-indigo-500 text-base font-mono focus:border-indigo-500/40 outline-none transition-all"
                              />
                              <HiOutlineArrowTopRightOnSquare className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" />
                           </div>
                        </div>
                        <div className="space-y-3">
                           <label className="text-sm font-medium text-gray-400 ml-4">Live demo link</label>
                           <div className="relative group">
                              <input
                                 type="url"
                                 name="projectLink"
                                 value={project.projectLink}
                                 onChange={handleChange}
                                 placeholder="https://demo.app/..."
                                 className="w-full bg-white/[0.01] border border-white/5 rounded-2xl px-6 py-4 text-indigo-500 text-base font-mono focus:border-indigo-500/40 outline-none transition-all"
                              />
                              <HiOutlineArrowTopRightOnSquare className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-800" />
                           </div>
                        </div>
                     </div>
                  </div>
               </div>

               {/* Right Col: Visual Assets & Action (5 cols) */}
               <div className="lg:col-span-12 xl:col-span-5 p-8 md:p-12 space-y-10 relative overflow-hidden bg-indigo-500/[0.02] flex flex-col justify-between">
                  <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-indigo-500/10 blur-[80px] rounded-full pointer-events-none"></div>

                  <div className="space-y-6 relative z-10 flex-grow flex flex-col">
                     <header className="flex flex-col gap-2 mb-4">
                        <h3 className="text-xl font-bold text-white tracking-tight flex items-center justify-between">
                           <span>Project gallery</span>
                           <div className="flex items-center gap-3">
                              {bannerPreviews.length > 0 && (
                                 <button
                                    type="button"
                                    onClick={() => { setProject(p => ({ ...p, projectBanners: [] })); setBannerPreviews([]); }}
                                    className="text-[10px] font-black text-gray-600 capitalize tracking-widest hover:text-red-500 transition-colors"
                                 >
                                    Clear all
                                 </button>
                              )}
                              <span className="text-xs font-semibold px-3 py-1 bg-white/5 rounded-full text-gray-400 border border-white/10">{project.projectBanners.length} added</span>
                           </div>
                        </h3>
                        <p className="text-sm text-gray-500 font-medium tracking-wide">Upload multiple screenshots to showcase your work.</p>
                     </header>

                     {/* Dropzone Area */}
                     <div
                        {...getRootProps()}
                        className={`mt-4 relative group cursor-pointer border-2 border-dashed rounded-[2.5rem] p-10 flex flex-col items-center justify-center text-center transition-all bg-white/[0.02] overflow-hidden ${isDragActive ? "border-indigo-500 bg-indigo-500/10" : errors.projectBanners ? "border-red-500/50 bg-red-500/5" : "border-white/10 hover:border-indigo-500/50 hover:bg-white/[0.04]"
                           }`}
                     >
                        <input {...getInputProps()} />
                        <div className="w-16 h-16 rounded-2xl bg-white/5 flex items-center justify-center text-gray-400 mb-6 group-hover:scale-110 group-hover:text-indigo-400 transition-all shadow-xl">
                           <HiPlus className="text-3xl" />
                        </div>
                        <p className="text-sm font-semibold text-gray-300">
                           {isDragActive ? "Drop images here..." : "Click or drag images here"}
                        </p>
                        <p className="text-xs text-gray-500 mt-2 font-medium tracking-wide">
                           PNG, JPG, WEBP up to 5MB each
                        </p>
                        {errors.projectBanners && <p className="absolute bottom-4 text-[10px] font-black text-red-500 uppercase tracking-widest">{errors.projectBanners}</p>}
                     </div>

                     {/* Previews Gallery Sub-section */}
                     {bannerPreviews.length > 0 && (
                        <div className="mt-8 flex-grow">
                           <h4 className="text-xs font-bold text-gray-500 capitalize tracking-widest mb-4">Gallery previews</h4>
                           <div className="grid grid-cols-2 gap-3 max-h-[320px] overflow-y-auto pr-2 custom-scrollbar">
                              <AnimatePresence>
                                 {bannerPreviews.map((preview, idx) => (
                                    <motion.div
                                       key={preview + idx}
                                       initial={{ opacity: 0, scale: 0.8 }}
                                       animate={{ opacity: 1, scale: 1 }}
                                       exit={{ opacity: 0, scale: 0.5 }}
                                       className="relative aspect-video rounded-xl overflow-hidden border border-white/10 group shadow-xl bg-black"
                                    >
                                       <img src={preview} alt="preview" className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                       {idx === 0 && (
                                          <div className="absolute top-2 left-2 bg-indigo-500/80 backdrop-blur-md text-[8px] font-black text-white px-2 py-0.5 rounded-full border border-white/20 uppercase tracking-widest z-20">
                                             Cover
                                          </div>
                                       )}
                                       <button
                                          type="button"
                                          onClick={(e) => { e.stopPropagation(); removeBanner(idx); }}
                                          className="absolute top-2 right-2 w-6 h-6 bg-black/60 backdrop-blur-md rounded-full flex items-center justify-center text-white opacity-0 group-hover:opacity-100 hover:bg-red-500 transition-all z-20"
                                       >
                                          <HiOutlineXMark className="text-xs" />
                                       </button>
                                       <div className="absolute inset-0 border-2 border-transparent group-hover:border-indigo-500/50 rounded-xl pointer-events-none transition-colors"></div>
                                    </motion.div>
                                 ))}
                              </AnimatePresence>
                           </div>
                        </div>
                     )}
                  </div>
               </div>
            </div>

            {/* Full-width Footer Area (outside the grid, inside the form) */}
            <div className="p-8 md:p-12 bg-white/[0.02] border-t border-white/5 flex flex-col md:flex-row items-center justify-end gap-8 relative z-10">
               <div className="flex flex-col sm:flex-row items-center gap-4 w-full md:w-auto">
                  <button
                     type="submit"
                     className="group relative flex items-center justify-center gap-2 px-8 py-3 bg-indigo-500 text-white rounded-xl font-bold tracking-wide hover:bg-indigo-400 transition-all shadow-xl transform active:scale-95 shadow-indigo-500/20 w-full md:w-auto"
                  >
                     <span className="text-sm">Add project</span>
                     <HiOutlineRocketLaunch className="text-lg group-hover:-translate-y-1 transition-transform" />
                  </button>
                  <button
                     type="button"
                     onClick={() => dispatch(setStep(4))}
                     className="group relative flex items-center justify-center gap-2 px-8 py-3 border border-white/10 bg-white/[0.02] text-gray-400 rounded-xl font-medium tracking-wide hover:bg-white/[0.08] hover:text-white transition-all w-full md:w-auto"
                  >
                     <span className="text-sm">Next section</span>
                     <HiOutlineArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
                  </button>

                  
               </div>
            </div>
         </form>
      </div>
   );
};

export default ProjectForm;
