import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Upload from "../../../common/Upload";
import { addBulkSkills } from "../../../../services/operations/PortfolioApi";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../slices/PortfolioSlice";
import {
  HiOutlineBolt,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiPlus,
  HiOutlineWrenchScrewdriver,
  HiOutlineSquare3Stack3D,
  HiOutlineCheckBadge,
  HiOutlineArrowRight
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import COMMON_SKILLS from "../../../../data/skills.json";
import { findSkill, filterSkills } from "../../../../utils/skillMatcher";

const SkillForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { portfolio, aiData } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedSkills, setSelectedSkills] = useState([]);
  const [customSkills, setCustomSkills] = useState([]);
  const [suggestedLogo, setSuggestedLogo] = useState(null);
  const hasPopulatedAiSkills = useRef(false);

  // AI Skills Population (runs only once per aiData change)
  useEffect(() => {
    if (hasPopulatedAiSkills.current) return;
    if (aiData?.skills && Array.isArray(aiData.skills)) {
      hasPopulatedAiSkills.current = true;
      const skillsToSelect = [];
      const skillsToCustom = [];

      aiData.skills.forEach(skillTitle => {
          const librarySkill = findSkill(skillTitle);
          if (librarySkill) {
              if (!skillsToSelect.some(s => s.title.toLowerCase() === librarySkill.title.toLowerCase())) {
                  skillsToSelect.push(librarySkill);
              }
          } else {
              if (!skillsToCustom.some(s => s.title.toLowerCase() === skillTitle.toLowerCase())) {
                  const name = skillTitle.toLowerCase().trim().replace(/\s+/g, '-');
                  skillsToCustom.push({
                      title: skillTitle,
                      iconUrl: `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-original.svg`,
                      isSuggested: true
                  });
              }
          }
      });

      if (skillsToSelect.length > 0) setSelectedSkills(skillsToSelect);
      if (skillsToCustom.length > 0) setCustomSkills(skillsToCustom);
      
      if (skillsToSelect.length > 0 || skillsToCustom.length > 0) {
          toast.success("Skills populated from resume!");
      }
    }
  }, [aiData]);

  useEffect(() => {
    if (!portfolio) {
      navigate("/PortfolioCreate/UploadDetails");
      dispatch(setStep(0));
    }
  }, [portfolio, navigate, dispatch]);

  const { register, handleSubmit, setValue, watch, formState: { errors }, reset } = useForm();
  const customTitle = watch("title");

  // Smart Logo Fetching for Custom Skills
  useEffect(() => {
    if (customTitle && customTitle.length > 1) {
      const name = customTitle.toLowerCase().trim().replace(/\s+/g, '-');
      const logoUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-original.svg`;

      const img = new Image();
      img.onload = () => setSuggestedLogo(logoUrl);
      img.onerror = () => setSuggestedLogo(null);
      img.src = logoUrl;
    } else {
      setSuggestedLogo(null);
    }
  }, [customTitle]);

  const existingCommonSkill = customTitle?.trim() ? findSkill(customTitle.trim()) : null;

  const filteredSkills = (searchTerm.trim() === ""
    ? COMMON_SKILLS
    : filterSkills(searchTerm.trim())
  ).filter(
    (skill) => !selectedSkills.some((s) => s.title === skill.title)
  ).slice(0, searchTerm.trim() === "" ? 18 : 50);

  const handleSelectSkill = (skill) => {
    if (!selectedSkills.find((s) => s.title === skill.title)) {
      setSelectedSkills([...selectedSkills, skill]);
      setSearchTerm("");
    }
  };

  const handleRemoveSkill = (title) => {
    setSelectedSkills(selectedSkills.filter((s) => s.title !== title));
  };

  const handleAddCustomSkill = (data) => {
    if (!data.title) {
      toast.error("Designation required");
      return;
    }

    const titleTrimmed = data.title.trim();
    const isLibrarySkill = findSkill(titleTrimmed);

    if (isLibrarySkill) {
      if (!selectedSkills.find((s) => s.title === isLibrarySkill.title)) {
        setSelectedSkills([...selectedSkills, isLibrarySkill]);
        toast.success(`${isLibrarySkill.title} added from library!`);
      } else {
        toast.error(`${isLibrarySkill.title} is already added`);
      }
      reset({ title: "", skillSvg: null });
      setSuggestedLogo(null);
      return;
    }

    let finalIcon = data.skillSvg;
    let finalPreview = null;

    if (suggestedLogo && !data.skillSvg) {
      // Use suggested logo as a URL string or fetch it? 
      // The backend expects a file or a URL. 
      // For simplicity, if suggestedLogo exists, we'll store the URL.
      const newCustomSkill = {
        title: data.title,
        iconUrl: suggestedLogo,
        isSuggested: true
      };
      setCustomSkills([...customSkills, newCustomSkill]);
    } else if (data.skillSvg) {
      const newCustomSkill = {
        title: data.title,
        iconFile: data.skillSvg,
        iconPreview: URL.createObjectURL(data.skillSvg),
      };
      setCustomSkills([...customSkills, newCustomSkill]);
    } else {
      toast.error("Provide an icon or use suggested logo");
      return;
    }

    reset({ title: "", skillSvg: null });
    setSuggestedLogo(null);
  };

  const handleRemoveCustomSkill = (index) => {
    setCustomSkills(customSkills.filter((_, i) => i !== index));
  };

  const validateIcons = async (skills) => {
    const checkIcon = (url) => {
      return new Promise((resolve) => {
        const img = new Image();
        img.onload = () => resolve(true);
        img.onerror = () => resolve(false);
        img.src = url;
      });
    };

    for (const skill of skills) {
      if (skill.iconUrl) {
        const isValid = await checkIcon(skill.iconUrl);
        if (!isValid) {
          return skill.title;
        }
      }
    }
    return null;
  };

  const onSubmit = async () => {
    if (selectedSkills.length === 0 && customSkills.length === 0) {
      toast.error("Add at least one skill");
      return;
    }

    const skillsArray = [];
    selectedSkills.forEach((skill) => {
      skillsArray.push({ title: skill.title, iconUrl: skill.iconUrl });
    });

    customSkills.forEach((skill) => {
      if (skill.isSuggested) {
        skillsArray.push({ title: skill.title, iconUrl: skill.iconUrl });
      } else {
        skillsArray.push({ title: skill.title });
      }
    });

    // 🚀 High-Fidelity Validation: Check if icons actually exist on the CDN
    toast.loading("Verifying tech icons...", { id: "icon-val" });
    const failingSkill = await validateIcons(skillsArray);
    toast.dismiss("icon-val");

    if (failingSkill) {
      toast.error(
        <div className="flex flex-col gap-1">
          <span className="font-black text-xs uppercase tracking-widest text-red-400">System Error</span>
          <span className="text-[13px] font-bold text-white">Your skill <span className="text-red-500">"{failingSkill}"</span> does not have a valid icon in our library.</span>
          <span className="text-[11px] text-gray-400">Please remove it or add it using a custom icon upload.</span>
        </div>,
        { duration: 6000 }
      );
      return;
    }

    const formData = new FormData();
    formData.append("portfolioId", portfolioId);

    // Re-append files for custom skills that are NOT suggested
    customSkills.forEach((skill) => {
      if (!skill.isSuggested) {
        formData.append(`skillSvg_${skill.title}`, skill.iconFile);
      }
    });

    formData.append("skills", JSON.stringify(skillsArray));

    try {
      const success = await addBulkSkills(formData, token);
      if (success) {
        setSelectedSkills([]);
        setCustomSkills([]);
        toast.success("Intelligence Grid Updated");
      }
    } catch (error) {
      toast.error("Synchronization failed");
    }
  };

  return (
    <div className="max-w-[1200px] mx-auto space-y-12 pb-20">
      {/* Cinematic Header */}
      <div className="text-center space-y-4 pt-8">
        
        <motion.h2
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.1 }}
          className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl"
        >
          My <span className="text-white/40 italic font-medium">skills</span>
        </motion.h2>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-white/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative mb-0 group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/30 to-transparent"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 items-stretch">
          {/* Left: Search & Discovery (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 space-y-8 bg-white/[0.01]">
              <header className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 flex items-center justify-center text-emerald-500 border border-emerald-500/20">
                    <HiOutlineMagnifyingGlass className="text-2xl" />
                  </div>
                  <div>
                    <h3 className="text-xl font-bold text-white capitalize tracking-tight">Select skills</h3>
                    <p className="text-xs text-gray-500 font-medium capitalize tracking-wide">Choose from our library</p>
                  </div>
                </div>
              </header>

              <div className="relative group">
                <input
                  type="text"
                  placeholder="Search for skills..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="w-full bg-white/[0.02] border border-white/10 rounded-3xl px-8 py-6 text-white text-base font-medium focus:border-emerald-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500"
                />
                <div className="absolute top-1/2 right-6 -translate-y-1/2 flex items-center gap-2">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
                </div>
              </div>

              <div className="flex flex-wrap gap-3 max-h-[400px] overflow-y-auto p-2 custom-scrollbar">
                <AnimatePresence mode="popLayout">
                  {filteredSkills.map((skill) => (
                    <motion.button
                      key={skill.title}
                      layout
                      initial={{ opacity: 0, scale: 0.9 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0.9 }}
                      whileHover={{ y: -4, backgroundColor: "rgba(16, 185, 129, 0.1)", borderColor: "rgba(16, 185, 129, 0.3)" }}
                      onClick={() => handleSelectSkill(skill)}
                      className="flex items-center gap-3 px-6 py-3 bg-white/[0.02] border border-white/5 rounded-2xl transition-all group"
                    >
                      <div className="w-8 h-8 rounded-lg bg-white flex items-center justify-center p-1.5 shadow-xl transition-transform group-hover:scale-110">
                        <img src={skill.iconUrl} alt={skill.title} className="w-full h-full object-contain grayscale group-hover:grayscale-0 transition-all duration-500" />
                      </div>
                      <span className="text-sm font-semibold tracking-wide text-gray-400 group-hover:text-white">{skill.title}</span>
                      <HiPlus className="text-emerald-500 opacity-0 group-hover:opacity-100 transition-all text-xl" />
                    </motion.button>
                  ))}
                </AnimatePresence>
              </div>
          </div>

          {/* Right: Custom Protocol (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-12 space-y-8 relative overflow-hidden bg-emerald-500/[0.02]">
            <div className="absolute top-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-500/10 blur-[80px] rounded-full pointer-events-none"></div>

            <header className="flex items-center gap-4 relative z-10">
              <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-500 border border-white/10">
                <HiOutlineWrenchScrewdriver className="text-xl" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-white capitalize tracking-tight">Add custom skill</h3>
                <p className="text-xs text-gray-500 font-medium capitalize tracking-wide">Add a skill not in our list</p>
              </div>
            </header>

            <div className="space-y-6 relative z-10">
              <div className="space-y-2">
                <label className="text-sm font-medium text-gray-400 ml-4">Skill name</label>
                <div className="relative">
                  <input
                    {...register("title")}
                    placeholder="e.g. GraphQL"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-white text-base font-medium focus:border-emerald-500/40 outline-none transition-all placeholder:text-gray-500"
                  />

                  <AnimatePresence>
                    {existingCommonSkill ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-2 bg-emerald-500/10 border border-emerald-500/30 px-3 py-1.5 rounded-xl pointer-events-none"
                      >
                        <img src={existingCommonSkill.iconUrl} className="w-5 h-5" alt="Library" />
                        <span className="text-[10px] font-black text-emerald-500 capitalize tracking-widest">In library</span>
                      </motion.div>
                    ) : suggestedLogo ? (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black border border-emerald-500/30 px-3 py-2 rounded-xl"
                      >
                        <img src={suggestedLogo} className="w-6 h-6" alt="AI Suggestion" />
                        <HiOutlineCheckBadge className="text-emerald-500 text-xl" title="Branded logo detected" />
                      </motion.div>
                    ) : null}
                  </AnimatePresence>
                </div>
              </div>

              {existingCommonSkill ? (
                <div className="py-6 border border-emerald-500/20 bg-emerald-500/5 rounded-2xl flex flex-col items-center justify-center gap-3 text-center">
                   <img src={existingCommonSkill.iconUrl} alt="Library" className="w-10 h-10 drop-shadow-lg" />
                   <div className="space-y-1">
                     <p className="text-sm font-bold text-emerald-500 capitalize tracking-wide">{existingCommonSkill.title} found in Library!</p>
                     <p className="text-xs text-gray-400 font-medium tracking-wide">No custom icon upload required.</p>
                   </div>
                </div>
              ) : (
                <Upload
                  color="emerald"
                  name="skillSvg"
                  label="Skill Icon"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                />
              )}

              <button
                type="button"
                onClick={handleSubmit(handleAddCustomSkill)}
                className={`w-full py-5 text-sm font-bold tracking-wide rounded-2xl transition-all shadow-xl shadow-black/20 transform active:scale-95 ${
                    existingCommonSkill ? 'bg-emerald-500 text-black hover:bg-emerald-400' : 'bg-white text-black hover:bg-emerald-500 hover:text-white'
                }`}
              >
                {existingCommonSkill ? `Add ${existingCommonSkill.title} to your skills` : "Add to list"}
              </button>
            </div>
          </div>
        </div>
      </div>

      {/* Deployment Area (Full Width) */}
      <motion.div
        layout
        className="bg-white/[0.02] backdrop-blur-2xl p-10 md:p-16 rounded-[4rem] border border-white/10 relative overflow-hidden group shadow-[0_20px_50px_rgba(0,0,0,0.3)]"
      >
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-emerald-500/20 to-transparent"></div>

        <div className="flex flex-col items-center justify-center space-y-12">
          <header className="text-center space-y-2">
            <h3 className="text-3xl font-black text-white capitalize tracking-tighter">Your <span className="text-gray-500 italic font-medium">skills</span></h3>
            <div className="flex items-center justify-center gap-4 text-[11px] font-bold text-gray-500 capitalize tracking-widest">
              <span>Total: {selectedSkills.length + customSkills.length}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>Status: Ready</span>
            </div>
          </header>

          <div className="flex flex-wrap justify-center gap-8 min-h-[120px] w-full">
            <AnimatePresence mode="popLayout">
              {selectedSkills.map((skill) => (
                <motion.div
                  key={skill.title}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative group w-32 h-32 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-emerald-500/30 transition-all shadow-2xl shadow-black"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-2xl shadow-black/50 group-hover:scale-110 transition-transform duration-500">
                    <img src={skill.iconUrl} alt={skill.title} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-semibold text-gray-400 tracking-wide text-center px-4">{skill.title}</span>
                  <button
                    onClick={() => handleRemoveSkill(skill.title)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-all shadow-xl hover:scale-110 z-20"
                  >
                    <HiOutlineXMark className="text-lg" />
                  </button>
                </motion.div>
              ))}

              {customSkills.map((skill, index) => (
                <motion.div
                  key={`custom-${skill.title}-${index}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative group w-32 h-32 bg-emerald-500/[0.02] border border-emerald-500/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-emerald-500/40 transition-all shadow-2xl shadow-black"
                >
                  <div className="w-16 h-16 rounded-2xl bg-white flex items-center justify-center p-3 shadow-2xl shadow-black/50 group-hover:scale-110 transition-transform duration-500">
                    <img src={skill.isSuggested ? skill.iconUrl : skill.iconPreview} alt={skill.title} className="w-full h-full object-contain" />
                  </div>
                  <span className="text-xs font-semibold text-emerald-500/70 tracking-wide text-center px-4">{skill.title}</span>
                  <div className="absolute -bottom-2 bg-emerald-500 text-[9px] font-bold capitalize text-black px-3 py-1 rounded-full border border-black shadow-lg">Custom</div>
                  <button
                    onClick={() => handleRemoveCustomSkill(index)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center lg:opacity-0 lg:group-hover:opacity-100 transition-all shadow-xl hover:scale-110 z-20"
                  >
                    <HiOutlineXMark className="text-lg" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {selectedSkills.length === 0 && customSkills.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500 py-12 w-full">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] flex items-center justify-center border border-white/5 mb-4 shadow-xl">
                  <HiOutlineSquare3Stack3D className="text-5xl text-gray-400 opacity-80" />
                </div>
                <p className="text-base font-bold capitalize tracking-wide text-gray-300">No skills added yet</p>
                <p className="text-sm text-gray-600 font-medium tracking-wide">Select from our library or add your own.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col flex-col-reverse md:flex-row items-center justify-center gap-6 pt-10 w-full">
            {(selectedSkills.length > 0 || customSkills.length > 0) && (
              <>
                <button
                  onClick={() => { setSelectedSkills([]); setCustomSkills([]); }}
                  className="text-xs font-bold capitalize tracking-wide text-gray-500 hover:text-red-500 transition-colors mr-2"
                >
                  Clear all
                </button>
                <button
                  onClick={onSubmit}
                  className="group relative flex items-center justify-center gap-2 px-8 py-3 bg-emerald-500 text-black rounded-xl font-bold tracking-wide hover:bg-emerald-400 transition-all shadow-xl transform active:scale-95 shadow-emerald-500/20 w-full md:w-auto"
                >
                  <span className="text-sm font-medium">Save skills</span>
                  <HiOutlineBolt className="text-lg group-hover:rotate-12 transition-transform text-black" />
                </button>
              </>
            )}

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
      </motion.div>
    </div>
  );
};

export default SkillForm;
