import { useEffect, useState } from "react";
import { HiOutlineUser, HiOutlineCamera, HiOutlineGlobe, HiOutlineMail, HiOutlinePhone, HiOutlinePencilAlt, HiOutlineTrash, HiCheck, HiOutlinePencil, HiPlus } from "react-icons/hi";
import { motion, AnimatePresence } from 'framer-motion';
import { useSelector } from "react-redux";
import { updatePortfolioDetails } from "../../../../services/operations/PortfolioApi";
import ResumeViewer from "./ResumeViewer";
import iconMap from "../../../common/IconMap";

export const PersonalportfolioData = ({ portfolioData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...portfolioData });
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    setFormData({ ...portfolioData });
  }, [portfolioData]);

  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes("contactDetails")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactDetails: { ...prev.contactDetails, [key]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profileImage") {
      setProfileImageFile(files[0]);
      setFormData((prev) => ({ ...prev, profileImage: URL.createObjectURL(files[0]) }));
    }
    if (name === "resume") {
      setResumeFile(files[0]);
      setFormData((prev) => ({ ...prev, resume: URL.createObjectURL(files[0]) }));
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("portfolioId", portfolioId);
      form.append("FirstName", formData.FirstName);
      form.append("LastName", formData.LastName);
      form.append("phone", formData.contactDetails.phone);
      form.append("email", formData.contactDetails.email);
      form.append("socialLinks", JSON.stringify(formData.socialLinks));
      form.append("aboutme", formData.aboutme || "");
      
      if (formData.roles?.length) {
        formData.roles.forEach((role) => form.append("roles[]", role));
      }
      
      if (profileImageFile) form.append("avatar", profileImageFile);
      if (resumeFile) form.append("resume", resumeFile);

      const response = await updatePortfolioDetails(form, token);
      if (response?.success) {
        setFormData(response.updatedPortfolio || formData);  
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating portfolio details:", error);
    }
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="relative bg-white/[0.03] backdrop-blur-3xl p-8 md:p-12 rounded-[3.5rem] border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden group"
    >
      {/* Cinematic Accent */}
      <div className="absolute top-0 right-0 w-64 h-64 bg-yellow-500/10 blur-[100px] rounded-full pointer-events-none transition-opacity duration-1000 group-hover:opacity-100 opacity-50"></div>

      <header className="flex flex-col md:flex-row md:items-end justify-between gap-6 mb-12 border-b border-white/5 pb-8 relative z-10">
        <div className="space-y-1">
          <p className="text-sm font-bold text-yellow-500 tracking-wider mb-2">Profile Overview</p>
          <h2 className="text-4xl md:text-5xl font-black tracking-tighter text-white drop-shadow-2xl">
            Personal <span className="text-white/40 italic font-medium">Details</span>
          </h2>
        </div>

        <button
          onClick={() => isEditing ? handleSave() : setIsEditing(true)}
          className={`flex items-center gap-2 px-8 py-4 rounded-2xl font-bold text-sm tracking-tight transition-all ${
            isEditing 
            ? "bg-yellow-500 text-black hover:bg-yellow-400 shadow-xl shadow-yellow-500/20" 
            : "bg-white/5 text-white hover:bg-white/10 border border-white/10"
          }`}
        >
          {isEditing ? <><HiCheck className="text-xl" /> Save Changes</> : <><HiOutlinePencil className="text-xl" /> Edit Profile</>}
        </button>
      </header>

      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 relative z-10">
        {/* Profile Identity Card */}
        <div className="lg:col-span-4 space-y-6">
          <div className="relative group/avatar inline-block mx-auto lg:mx-0">
            <motion.img
              layoutId="profile-img"
              src={formData.profileImage}
              alt="Profile"
              className="w-48 h-48 md:w-56 md:h-56 object-cover border-8 border-black rounded-[3rem] shadow-2xl relative z-10"
            />
            <div className="absolute -inset-2 bg-gradient-to-tr from-yellow-500 to-amber-600 rounded-[3.2rem] blur-lg opacity-20 group-hover/avatar:opacity-40 transition-opacity"></div>
            
            {isEditing && (
              <label className="absolute bottom-4 right-4 z-20 cursor-pointer w-12 h-12 bg-yellow-500 text-black rounded-2xl flex items-center justify-center shadow-2xl hover:scale-110 active:scale-95 transition-transform">
                <HiOutlineCamera className="text-2xl" />
                <input type="file" accept="image/*" name="profileImage" onChange={handleFileChange} className="hidden" />
              </label>
            )}
          </div>

          <div className="space-y-6 pt-6">
             <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                  <HiOutlineMail className="text-xl shrink-0" />
                </div>
                {isEditing ? (
                  <input type="email" name="contactDetails.email" value={formData.contactDetails?.email || ""} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-mono text-white outline-none focus:border-yellow-500/40 transition-all placeholder:text-gray-700" placeholder="your.email@studio.com" />
                ) : (
                  <span className="text-sm font-medium font-mono tracking-tight break-all">{formData.contactDetails?.email}</span>
                )}
             </div>
             <div className="flex items-center gap-4 text-white/60">
                <div className="w-10 h-10 rounded-xl bg-yellow-500/10 flex items-center justify-center text-yellow-500">
                  <HiOutlinePhone className="text-xl shrink-0" />
                </div>
                {isEditing ? (
                  <input type="text" name="contactDetails.phone" value={formData.contactDetails?.phone || ""} onChange={handleChange} className="w-full bg-white/5 border border-white/10 px-4 py-3 rounded-xl text-sm font-mono text-white outline-none focus:border-yellow-500/40 transition-all placeholder:text-gray-700" placeholder="+x (xxx) xxx-xxxx" />
                ) : (
                  <span className="text-sm font-medium font-mono tracking-tight">{formData.contactDetails?.phone}</span>
                )}
             </div>
          </div>
        </div>

        {/* Narrative & Details Area */}
        <div className="lg:col-span-8 flex flex-col gap-8">
           <AnimatePresence mode="wait">
             {isEditing ? (
               <motion.div 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, x: -20 }}
                 className="grid grid-cols-1 md:grid-cols-2 gap-6"
               >
                  <div className="space-y-3">
                     <label className="text-sm font-bold text-gray-400 ml-1">First Name</label>
                     <input type="text" name="FirstName" value={formData.FirstName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-[1.5rem] text-white text-base outline-none focus:border-yellow-500/50" />
                  </div>
                  <div className="space-y-3">
                     <label className="text-sm font-bold text-gray-400 ml-1">Last Name</label>
                     <input type="text" name="LastName" value={formData.LastName} onChange={handleChange} className="w-full bg-white/5 border border-white/10 p-5 rounded-[1.5rem] text-white text-base outline-none focus:border-yellow-500/50" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                     <label className="text-sm font-bold text-gray-400 ml-1">Roles</label>
                     <input type="text" name="roles" value={Array.isArray(formData.roles) ? formData.roles.join(', ') : formData.roles || ""} onChange={(e) => setFormData({...formData, roles: e.target.value.split(',')})} placeholder="e.g. Lead Designer, Visual Architect (Comma separated)" className="w-full bg-white/5 border border-white/10 p-5 rounded-[1.5rem] text-white text-base outline-none focus:border-yellow-500/50 transition-all placeholder:text-gray-700" />
                  </div>
                  <div className="md:col-span-2 space-y-3">
                     <label className="text-sm font-bold text-gray-400 ml-1">About Me</label>
                     <textarea name="aboutme" value={formData.aboutme || ""} onChange={handleChange} rows={6} className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-white text-base outline-none focus:border-yellow-500/50 resize-none leading-relaxed transition-all placeholder:text-gray-700 font-medium" placeholder="Draft your professional narrative..." />
                  </div>
               </motion.div>
             ) : (
               <motion.article 
                 initial={{ opacity: 0, x: 20 }}
                 animate={{ opacity: 1, x: 0 }}
                 className="space-y-6"
               >
                 <div className="inline-flex flex-wrap gap-2 mb-4">
                    {formData.roles?.map((role, idx) => (
                       <span key={idx} className="px-4 py-1.5 bg-yellow-500/10 text-yellow-400 text-sm font-bold tracking-wider rounded-full border border-yellow-500/20">{role}</span>
                    ))}
                 </div>
                 <h3 className="text-3xl font-bold text-white tracking-tight">{formData.FirstName} {formData.LastName}</h3>
                 <p className="text-white/40 text-lg leading-relaxed font-medium italic">"{formData.aboutme}"</p>
               </motion.article>
             )}
           </AnimatePresence>

           <div className="border-t border-white/5 pt-8">
              <ResumeViewer isEditing={isEditing} resumeFile={resumeFile} formData={formData} handleFileChange={handleFileChange} />
           </div>
        </div>
      </div>

      {/* Social Network Grid */}
      <div className="mt-20 pt-16 border-t border-white/5 relative">
        <h4 className="text-xl font-black text-white/30 mb-12 text-center tracking-tighter italic">Social Links</h4>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 xl:grid-cols-4 gap-6">
          <AnimatePresence>
            {formData.socialLinks?.map((link, idx) => (
              <motion.div
                key={link._id || idx}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                className="group/link relative p-6 bg-white/[0.02] border border-white/5 rounded-3xl hover:bg-white/[0.05] hover:border-yellow-500/30 transition-all duration-500"
              >
                <div className="flex items-center gap-4 mb-4">
                  <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center text-xl text-yellow-500 shadow-inner group-hover/link:scale-110 transition-transform">
                    {iconMap[link.platform?.toLowerCase()] || <HiOutlineGlobe />}
                  </div>
                  {isEditing ? (
                    <input
                      type="text"
                      value={link.platform}
                      placeholder="e.g. LinkedIn"
                      className="bg-transparent text-sm font-bold text-white outline-none w-full"
                      onChange={(e) => {
                        const updated = [...formData.socialLinks];
                        updated[idx].platform = e.target.value;
                        setFormData({ ...formData, socialLinks: updated });
                      }}
                    />
                  ) : (
                    <span className="text-sm font-bold text-white/50">{link.platform}</span>
                  )}
                  {isEditing && (
                    <button onClick={() => {
                        const updated = formData.socialLinks.filter((_, i) => i !== idx);
                        setFormData({ ...formData, socialLinks: updated });
                      }} className="text-red-500 hover:text-red-400"><HiOutlineTrash /></button>
                  )}
                </div>
                {isEditing ? (
                  <input
                    type="url"
                    value={link.url}
                    placeholder="https://studio.com/profile"
                    className="w-full bg-black/40 border border-white/5 px-4 py-3 rounded-2xl text-[11px] font-mono text-gray-500 outline-none focus:border-yellow-500/30"
                    onChange={(e) => {
                        const updated = [...formData.socialLinks];
                        updated[idx].url = e.target.value;
                        setFormData({ ...formData, socialLinks: updated });
                      }}
                  />
                ) : (
                  <a href={link.url} target="_blank" rel="noreferrer" className="text-xs font-medium text-yellow-500/60 truncate block hover:text-yellow-500 transition-colors">{link.url}</a>
                )}
              </motion.div>
            ))}
          </AnimatePresence>
          
          {isEditing && (
            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              onClick={() => setFormData({ ...formData, socialLinks: [...(formData.socialLinks || []), { platform: "", url: "" }] })}
              className="p-6 border-2 border-dashed border-white/5 rounded-3xl flex flex-col items-center justify-center gap-2 text-gray-500 hover:text-yellow-500 hover:border-yellow-500/30 hover:bg-yellow-500/5 transition-all"
            >
              <HiPlus className="text-2xl" />
              <span className="text-xs font-bold text-gray-400">Add Connection</span>
            </motion.button>
          )}
        </div>
      </div>
    </motion.div>
  );
};
