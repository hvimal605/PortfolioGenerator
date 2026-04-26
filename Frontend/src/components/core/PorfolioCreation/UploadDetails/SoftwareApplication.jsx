import React, { useEffect, useState, useRef } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import Upload from "../../../common/Upload";
import { addBulkSoftwareApps } from "../../../../services/operations/PortfolioApi";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../slices/PortfolioSlice";
import {
  HiOutlineBolt,
  HiOutlineMagnifyingGlass,
  HiOutlineXMark,
  HiPlus,
  HiOutlineCpuChip,
  HiOutlineCubeTransparent,
  HiOutlineCheckBadge,
  HiOutlineCommandLine,
  HiOutlineSquare3Stack3D,
  HiOutlineArrowRight
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import COMMON_APPS from "../../../../data/software-apps.json";

const SoftwareApplicationForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { portfolio, aiData } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [searchTerm, setSearchTerm] = useState("");
  const [selectedApps, setSelectedApps] = useState([]);
  const [customApps, setCustomApps] = useState([]);
  const [suggestedLogo, setSuggestedLogo] = useState(null);
  const hasPopulatedAiApps = useRef(false);

  // AI Applications Population
  useEffect(() => {
    if (hasPopulatedAiApps.current) return;
    if (aiData?.softwareApplications && Array.isArray(aiData.softwareApplications)) {
      hasPopulatedAiApps.current = true;
      const appsToSelect = [];
      const appsToCustom = [];

      aiData.softwareApplications.forEach(appName => {
          const libraryApp = COMMON_APPS.find(a => a.name.toLowerCase() === appName.toLowerCase().trim());
          if (libraryApp) {
              if (!appsToSelect.some(a => a.name.toLowerCase() === libraryApp.name.toLowerCase())) {
                  appsToSelect.push(libraryApp);
              }
          } else {
              if (!appsToCustom.some(a => a.name.toLowerCase() === appName.toLowerCase())) {
                  const name = appName.toLowerCase().trim().replace(/\s+/g, '-');
                  appsToCustom.push({
                      name: appName,
                      iconUrl: `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-original.svg`,
                      isSuggested: true
                  });
              }
          }
      });

      if (appsToSelect.length > 0) setSelectedApps(appsToSelect);
      if (appsToCustom.length > 0) setCustomApps(appsToCustom);
      
      if (appsToSelect.length > 0 || appsToCustom.length > 0) {
          toast.success("Software tools populated from resume!");
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
  const customName = watch("name");

  // Smart Logo Fetching for Custom Apps
  useEffect(() => {
    if (customName && customName.length > 1) {
      const name = customName.toLowerCase().trim().replace(/\s+/g, '-');
      const logoUrl = `https://raw.githubusercontent.com/devicons/devicon/master/icons/${name}/${name}-original.svg`;

      const img = new Image();
      img.onload = () => setSuggestedLogo(logoUrl);
      img.onerror = () => setSuggestedLogo(null);
      img.src = logoUrl;
    } else {
      setSuggestedLogo(null);
    }
  }, [customName]);

  const filteredApps = COMMON_APPS.filter(
    (app) =>
      app.name.toLowerCase().includes(searchTerm.trim().toLowerCase()) &&
      !selectedApps.some((a) => a.name === app.name)
  ).slice(0, searchTerm.trim() === "" ? 18 : 50);

  const handleSelectApp = (app) => {
    if (!selectedApps.find((a) => a.name === app.name)) {
      setSelectedApps([...selectedApps, app]);
      setSearchTerm("");
    }
  };

  const handleRemoveApp = (name) => {
    setSelectedApps(selectedApps.filter((a) => a.name !== name));
  };

  // Check if custom app already exists in common library
  const existingCommonApp = customName ? COMMON_APPS.find(a => a.name.toLowerCase() === customName.toLowerCase().trim()) : null;

  const handleAddCustomApp = (data) => {
    if (!data.name) {
      toast.error("Process designation required");
      return;
    }

    if (existingCommonApp) {
      handleSelectApp(existingCommonApp);
      reset({ name: "", applicationSvg: null });
      setSuggestedLogo(null);
      return;
    }

    if (suggestedLogo && !data.applicationSvg) {
      const newCustomApp = {
        name: data.name,
        iconUrl: suggestedLogo,
        isSuggested: true
      };
      setCustomApps([...customApps, newCustomApp]);
    } else if (data.applicationSvg) {
      const newCustomApp = {
        name: data.name,
        iconFile: data.applicationSvg,
        iconPreview: URL.createObjectURL(data.applicationSvg),
      };
      setCustomApps([...customApps, newCustomApp]);
    } else {
      toast.error("Provide an icon or use suggested logo");
      return;
    }

    reset({ name: "", applicationSvg: null });
    setSuggestedLogo(null);
  };

  const handleRemoveCustomApp = (index) => {
    setCustomApps(customApps.filter((_, i) => i !== index));
  };

  const onSubmit = async () => {
    if (selectedApps.length === 0 && customApps.length === 0) {
      toast.error("Deploy at least one application node");
      return;
    }

    const formData = new FormData();
    formData.append("portfolioId", portfolioId);

    const appsArray = [];
    selectedApps.forEach((app) => {
      appsArray.push({ name: app.name, iconUrl: app.iconUrl });
    });
    customApps.forEach((app) => {
      if (app.isSuggested) {
        appsArray.push({ name: app.name, iconUrl: app.iconUrl });
      } else {
        appsArray.push({ name: app.name });
        formData.append(`appSvg_${app.name}`, app.iconFile);
      }
    });

    formData.append("softwareApps", JSON.stringify(appsArray));

    try {
      const success = await addBulkSoftwareApps(formData, token);
      if (success) {
        setSelectedApps([]);
        setCustomApps([]);
        toast.success("Tech Intelligence Updated");
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
          Softwares <span className="text-white/44 italic font-medium">& tools</span>
        </motion.h2>
      </div>

      <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[3rem] border border-white/20 overflow-hidden shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative group">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-transparent via-blue-500/30 to-transparent"></div>
        <div className="grid grid-cols-1 lg:grid-cols-12 divide-y lg:divide-y-0 lg:divide-x divide-white/10 items-stretch">

          {/* Left: Search & Discovery (7 cols) */}
          <div className="lg:col-span-7 p-8 md:p-12 space-y-8 bg-white/[0.01]">
            <header className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-500/10 flex items-center justify-center text-blue-400 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                  <HiOutlineCommandLine className="text-2xl" />
                </div>
                <div>
                  <h3 className="text-xl font-black text-white capitalize tracking-tight">Software & tools</h3>
                  <p className="text-[10px] text-gray-500 font-bold capitalize tracking-widest">Universal tools & ides</p>
                </div>
              </div>
            </header>

            <div className="relative group">
              <div className="absolute inset-y-0 left-6 flex items-center pointer-events-none">
                <HiOutlineMagnifyingGlass className="text-gray-500 text-xl group-focus-within:text-blue-500 transition-colors" />
              </div>
              <input
                type="text"
                placeholder="Scan for software applications..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-16 pr-8 py-6 text-white text-base font-medium focus:border-blue-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-600 shadow-inner"
              />
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 max-h-[420px] overflow-y-auto p-2 custom-scrollbar pr-4">
              <AnimatePresence mode="popLayout">
                {filteredApps.map((app, idx) => (
                  <motion.button
                    key={app.name}
                    layout
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.9 }}
                    transition={{ delay: idx * 0.02 }}
                    whileHover={{ scale: 1.02, backgroundColor: "rgba(59, 130, 246, 0.05)", borderColor: "rgba(59, 130, 246, 0.3)" }}
                    onClick={() => handleSelectApp(app)}
                    className="flex flex-col items-center justify-center gap-3 p-6 bg-white/[0.02] border border-white/5 rounded-[2rem] transition-all group relative overflow-hidden"
                  >
                    <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity"></div>
                    <img src={app.iconUrl} alt={app.name} className="w-8 h-8 grayscale group-hover:grayscale-0 group-hover:scale-110 transition-all duration-500 relative z-10" />
                    <span className="text-[11px] font-bold tracking-widest capitalize text-gray-500 group-hover:text-white relative z-10">{app.name}</span>
                    <div className="absolute bottom-3 right-3 opacity-0 group-hover:opacity-100 transition-all transform translate-y-2 group-hover:translate-y-0">
                      <HiPlus className="text-blue-500 text-lg" />
                    </div>
                  </motion.button>
                ))}
              </AnimatePresence>
            </div>
          </div>

          {/* Right: Bespoke Creation (5 cols) */}
          <div className="lg:col-span-5 p-8 md:p-12 space-y-10 bg-black/20">
            <header className="flex items-center gap-4">
              <div className="w-12 h-12 rounded-2xl bg-gray-900 flex items-center justify-center text-gray-400 border border-white/10 shadow-xl">
                <HiOutlineCpuChip className="text-2xl" />
              </div>
              <div>
                <h3 className="text-xl font-black text-white capitalize tracking-tight">Custom Software</h3>
                <p className="text-[10px] text-gray-500 font-bold capitalize tracking-widest">Add bespoke technology</p>
              </div>
            </header>

            <div className="space-y-8">
              <div className="space-y-3">
                <label className="text-[10px] font-black text-gray-500 capitalize tracking-widest ml-1">Application name</label>
                <div className="relative">
                  <input
                    {...register("name")}
                    placeholder="e.g. Cursor AI"
                    className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-5 text-white text-base font-medium focus:border-blue-500/40 outline-none transition-all placeholder:text-gray-700 shadow-inner"
                  />
                  <AnimatePresence>
                    {suggestedLogo && (
                      <motion.div
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: 20 }}
                        className="absolute right-4 top-1/2 -translate-y-1/2 flex items-center gap-3 bg-black/80 backdrop-blur-md border border-blue-500/30 px-3 py-2 rounded-xl"
                      >
                        <img src={suggestedLogo} className="w-6 h-6 object-contain" alt="Smart Suggestion" />
                        <div className="w-[1px] h-4 bg-white/10"></div>
                        <HiOutlineBolt className="text-blue-500 text-sm" />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              </div>

              {existingCommonApp ? (
                <div className="p-6 bg-blue-500/5 border border-blue-500/20 rounded-2xl flex items-center gap-4 border-dashed">
                  <img src={existingCommonApp.iconUrl} className="w-10 h-10" alt="match" />
                  <div className="space-y-1">
                    <p className="text-sm font-bold text-blue-500 capitalize tracking-wide">{existingCommonApp.name} found in Library!</p>
                    <p className="text-xs text-gray-400 font-medium tracking-wide">Ready for Quick Add.</p>
                  </div>
                </div>
              ) : (
                <Upload
                  color="blue"
                  name="applicationSvg"
                  label="Software Icon"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                />
              )}

              <button
                type="button"
                onClick={handleSubmit(handleAddCustomApp)}
                className={`w-full py-5 text-sm font-black capitalize tracking-widest rounded-2xl transition-all shadow-xl shadow-black/20 transform active:scale-95 ${existingCommonApp ? 'bg-blue-500 text-white hover:bg-blue-400' : 'bg-white text-black hover:bg-blue-500 hover:text-white'
                  }`}
              >
                {existingCommonApp ? `Add ${existingCommonApp.name} to selected` : "Add to selected"}
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
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-[2px] bg-gradient-to-r from-transparent via-blue-500/20 to-transparent"></div>

        <div className="flex flex-col items-center justify-center space-y-12">
          <header className="text-center space-y-2">
            <h3 className="text-3xl font-black text-white capitalize tracking-tighter">Tools  <span className="text-gray-500 italic font-medium">Selected</span></h3>
            <div className="flex items-center justify-center gap-4 text-[10px] font-black text-gray-600 capitalize tracking-[0.4em]">
              <span>Total tools: {selectedApps.length + customApps.length}</span>
              <span className="w-1 h-1 rounded-full bg-white/20"></span>
              <span>Status: Active</span>
            </div>
          </header>

          <div className="flex flex-wrap justify-center gap-8 min-h-[120px] w-full">
            <AnimatePresence mode="popLayout">
              {selectedApps.map((app) => (
                <motion.div
                  key={app.name}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative group w-32 h-32 bg-white/[0.02] border border-white/5 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-blue-500/30 transition-all shadow-2xl shadow-black"
                >
                  <img src={app.iconUrl} alt={app.name} className="w-10 h-10 group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-xs font-semibold text-gray-400 tracking-wide text-center px-4">{app.name}</span>
                  <button
                    onClick={() => handleRemoveApp(app.name)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110"
                  >
                    <HiOutlineXMark className="text-lg" />
                  </button>
                </motion.div>
              ))}

              {customApps.map((app, index) => (
                <motion.div
                  key={`custom-${app.name}-${index}`}
                  layout
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  exit={{ scale: 0.8, opacity: 0 }}
                  className="relative group w-32 h-32 bg-blue-500/[0.02] border border-blue-500/10 rounded-[2.5rem] flex flex-col items-center justify-center gap-3 hover:border-blue-500/40 transition-all shadow-2xl shadow-black"
                >
                  <img src={app.isSuggested ? app.iconUrl : app.iconPreview} alt={app.name} className="w-10 h-10 object-contain group-hover:scale-110 transition-transform duration-500" />
                  <span className="text-xs font-semibold text-blue-500/70 tracking-wide text-center px-4">{app.name}</span>
                  <div className="absolute -bottom-2 bg-blue-500 text-[8px] font-black capitalize text-white px-3 py-1 rounded-full border border-black shadow-lg">Custom</div>
                  <button
                    onClick={() => handleRemoveCustomApp(index)}
                    className="absolute -top-2 -right-2 w-8 h-8 bg-red-500 text-white rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all shadow-xl hover:scale-110"
                  >
                    <HiOutlineXMark className="text-lg" />
                  </button>
                </motion.div>
              ))}
            </AnimatePresence>

            {selectedApps.length === 0 && customApps.length === 0 && (
              <div className="flex flex-col items-center justify-center gap-2 text-gray-500 py-12 w-full">
                <div className="w-24 h-24 rounded-[2rem] bg-white/[0.02] flex items-center justify-center border border-white/5 mb-4 shadow-xl">
                  <HiOutlineSquare3Stack3D className="text-5xl text-gray-400 opacity-80" />
                </div>
                <p className="text-base font-bold capitalize tracking-wide text-gray-300">No applications added yet</p>
                <p className="text-sm text-gray-600 font-medium tracking-wide">Sync your tech stack with the registry.</p>
              </div>
            )}
          </div>

          <div className="flex flex-col flex-col-reverse md:flex-row items-center justify-center gap-6 pt-10 w-full">
            {(selectedApps.length > 0 || customApps.length > 0) && (
              <>
                <button
                  type="button"
                  onClick={() => { setSelectedApps([]); setCustomApps([]); }}
                  className="text-xs font-bold capitalize tracking-wide text-gray-500 hover:text-red-500 transition-colors mr-2"
                >
                  Clear Selection
                </button>
                <button
                  type="button"
                  onClick={onSubmit}
                  className="group relative flex items-center justify-center gap-2 px-8 py-3 bg-blue-500 text-white rounded-xl font-bold tracking-wide hover:bg-blue-400 transition-all shadow-xl transform active:scale-95 shadow-blue-500/20 w-full md:w-auto"
                >
                  <span className="text-sm font-medium">Add tools</span>
                  <HiOutlineBolt className="text-lg group-hover:rotate-12 transition-transform text-white" />
                </button>
              </>
            )}

            <button
              type="button"
              onClick={() => dispatch(setStep(5))}
              className="group relative flex items-center justify-center gap-2 px-8 py-3 border border-white/10 bg-white/[0.02] text-gray-400 rounded-xl font-medium tracking-wide hover:bg-white/[0.08] hover:text-white transition-all w-full md:w-auto"
            >
              <span className="text-sm font-black capitalize tracking-widest">Preview portfolio</span>
              <HiOutlineArrowRight className="text-lg group-hover:translate-x-1 transition-transform" />
            </button>
          </div>
        </div>
      </motion.div>
    </div>
  );
};

export default SoftwareApplicationForm;
