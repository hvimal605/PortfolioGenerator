import React, { useEffect, useState } from "react";
import { useForm, useFieldArray } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "sonner";
import Upload from "../../../common/Upload";
import { addPersonalDetails } from "../../../../services/operations/PortfolioApi";
import { setPortfolio, setStep } from "../../../../slices/PortfolioSlice";
import { useNavigate } from "react-router-dom";
import {
  HiOutlineUser,
  HiOutlineEnvelope,
  HiOutlinePhone,
  HiOutlineChatBubbleBottomCenterText,
  HiOutlineIdentification,
  HiOutlineLink,
  HiOutlinePlus,
  HiOutlineTrash,
  HiOutlineRocketLaunch,
  HiOutlineArrowTopRightOnSquare,
  HiOutlineSparkles
} from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { getSocialIcon } from "../../../../utils/GetSocialIcon";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { templateId, aiData, resumeFile, portfolio, aiLoading } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (!templateId) {
      navigate("/portfolioCreate");
    }
  }, [templateId, navigate]);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    control,
    reset,
    formState: { errors },
  } = useForm({
    defaultValues: {
      socialLinks: []
    }
  });

  const { fields, append, remove } = useFieldArray({
    control,
    name: "socialLinks",
  });

  // Autofill from AI Data
  useEffect(() => {
    if (aiData?.personalDetails) {
      const details = aiData.personalDetails;

      console.log("Applying AI Data to Form:", JSON.stringify(aiData, null, 2));

      // Basic Info - use existing if AI is empty
      if (details.FirstName) setValue("FirstName", details.FirstName);
      if (details.LastName) setValue("LastName", details.LastName);
      if (details.email) setValue("email", details.email);
      if (details.phone) setValue("phone", details.phone);
      if (details.aboutme) setValue("aboutme", details.aboutme);

      // Roles Normalization
      if (details.roles) {
        const rolesStr = Array.isArray(details.roles) ? details.roles.join(", ") : details.roles;
        setValue("roles", rolesStr);
      }

      // Social Links — set entire array atomically (avoids remove+append timing bugs)
      if (aiData.socialLinks && Array.isArray(aiData.socialLinks)) {
        const mappedLinks = aiData.socialLinks
          .filter(link => link.platform && link.url && link.url.length > 5 && !link.url.includes("..."))
          .map(link => ({ label: link.platform, url: link.url }));

        console.log("Setting social links:", mappedLinks);

        if (mappedLinks.length > 0) {
          // Use setValue to replace the entire array at once — much more reliable than remove+append
          setValue("socialLinks", mappedLinks, { shouldValidate: false });
        }
      }

      // Sync Resume File if available from AI upload
      if (resumeFile) {
        setValue("resume", resumeFile);
        console.log("Syncing resume file from AI upload component");
      }

      toast.success("Intelligence data mapped to form!");
    }
  }, [aiData, resumeFile, setValue]);

  // Handle Persistence/Editing from existing Portfolio
  useEffect(() => {
    if (portfolio && !aiData) {
      console.log("Populating form from existing portfolio:", portfolio);

      if (portfolio.FirstName) setValue("FirstName", portfolio.FirstName);
      if (portfolio.LastName) setValue("LastName", portfolio.LastName);
      if (portfolio.email) setValue("email", portfolio.email);
      if (portfolio.phone) setValue("phone", portfolio.phone);
      if (portfolio.aboutme) setValue("aboutme", portfolio.aboutme);

      if (portfolio.roles) {
        setValue("roles", portfolio.roles.join(", "));
      }

      if (portfolio.avatar) setValue("avatar", portfolio.avatar);
      if (portfolio.resume) setValue("resume", portfolio.resume);

      if (portfolio.socialLinks && Array.isArray(portfolio.socialLinks)) {
        setValue("socialLinks", portfolio.socialLinks);
      }
    }
  }, [portfolio, aiData, setValue]);

  const socialLinksWatch = watch("socialLinks");

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] && key !== "avatar" && key !== "resume" && key !== "socialLinks") {
        if (key === "roles") {
          const rolesArray = data[key].split(",").map((role) => role.trim());
          rolesArray.forEach((role) => formData.append("roles", role));
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    if (!data.avatar) {
      return toast.error("Profile image required");
    }

    formData.append("avatar", data.avatar);
    formData.append("resume", data.resume);
    formData.append("templateId", templateId);

    if (data.socialLinks && Array.isArray(data.socialLinks)) {
      data.socialLinks.forEach((link) => {
        if (link.label && link.url) {
          formData.append("socialLinks", JSON.stringify(link));
        }
      });
    }

    try {
      const result = await addPersonalDetails(formData, token);
      if (result) {
        dispatch(setStep(1));
        dispatch(setPortfolio(result));
        reset();
        toast.success("Profile saved");
      }
    } catch (error) {
      toast.error("Failed to save profile");
    }
  };

  return (
    <div className="max-w-[1100px] mx-auto space-y-12 pb-20 relative">
      <div className={`transition-all duration-1000 ${aiLoading ? 'blur-2xl grayscale scale-[0.95] pointer-events-none opacity-40' : ''}`}>
        {/* Cinematic Header */}
        <div className="text-center space-y-4 pt-8">

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.1 }}
            className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-2xl mb-10"
          >
            Personal <span className="text-white/40 italic font-medium">Information</span>
          </motion.h2>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="flex flex-col gap-8 max-w-5xl mx-auto w-full">
          {/* Section 1: Profile & Identity */}
          <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 hover:border-amber-500/40 transition-all duration-500 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden group">
            <div className="absolute top-0 right-0 w-[40%] h-[40%] bg-amber-500/5 blur-[100px] rounded-full pointer-events-none"></div>

            <header className="mb-10 border-b border-white/5 pb-6">
              <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                  <HiOutlineIdentification className="text-xl" />
                </div>
                Basic Details
              </h3>
              <p className="text-base font-medium text-gray-500 mt-2 ml-14">Manage your public profile information</p>
            </header>

            <div className="flex flex-col md:flex-row gap-12 items-start relative z-10">
              {/* Avatar Upload Container */}
              <div className="w-full md:w-1/3 xl:w-[30%] space-y-4">
                <Upload
                  color="amber"
                  name="avatar"
                  label="Profile Picture"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                />
                <p className="text-xs text-gray-500 text-center font-medium mx-auto max-w-[200px]">
                  High-res square images work best. Max 5MB.
                </p>
              </div>

              {/* Identity Fields */}
              <div className="w-full md:w-2/3 xl:w-[70%] space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-base font-bold text-gray-400 ml-1">First Name</label>
                    <div className="relative">
                      <input
                        {...register("FirstName", { required: true })}
                        placeholder="e.g. John"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium capitalize focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 placeholder:normal-case shadow-inner"
                      />
                      <HiOutlineUser className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-bold text-gray-400 ml-1">Last Name</label>
                    <div className="relative">
                      <input
                        {...register("LastName", { required: true })}
                        placeholder="e.g. Doe"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium capitalize focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 placeholder:normal-case shadow-inner"
                      />
                    </div>
                  </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-3">
                    <label className="text-base font-bold text-gray-400 ml-1">Email Address</label>
                    <div className="relative">
                      <input
                        {...register("email", { required: true })}
                        placeholder="email@domain.com"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 shadow-inner"
                      />
                      <HiOutlineEnvelope className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600" />
                    </div>
                  </div>
                  <div className="space-y-3">
                    <label className="text-base font-bold text-gray-400 ml-1">Phone Number</label>
                    <div className="relative">
                      <input
                        {...register("phone", { required: true })}
                        placeholder="+xx xxxxx xxxxx"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 shadow-inner"
                      />
                      <HiOutlinePhone className="absolute right-5 top-1/2 -translate-y-1/2 text-gray-600" />
                    </div>
                  </div>
                </div>

                <div className="space-y-3">
                  <label className="text-base font-bold text-gray-400 ml-1">Professional Perspectives (Roles)</label>
                  <div className="relative">
                    <input
                      {...register("roles", { required: true })}
                      placeholder="e.g. Product Architect, Systems Engineer, UI Designer"
                      className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-5 py-4 text-white text-base font-medium focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 shadow-inner"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Section 2: Bio & Resume */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-stretch">
            <div className="lg:col-span-8 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/20 hover:border-amber-500/40 transition-all duration-500 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden flex flex-col group">
              <header className="mb-8 border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <HiOutlineChatBubbleBottomCenterText className="text-xl" />
                  </div>
                  Biography
                </h3>
              </header>
              <div className="flex-1 flex flex-col space-y-3 relative z-10">
                <label className="text-base font-bold text-gray-400 ml-1">Personal Narrative</label>
                <textarea
                  {...register("aboutme", { required: true })}
                  placeholder="Tell us about yourself and your experience..."
                  className="w-full h-full min-h-[160px] bg-white/[0.02] border border-white/10 rounded-3xl px-6 py-5 text-white text-base leading-relaxed focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500 resize-none shadow-inner flex-1"
                />
              </div>
            </div>

            <div className="lg:col-span-4 bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] p-8 border border-white/20 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative flex flex-col hover:border-amber-500/40 transition-all duration-500 group">
              <header className="mb-8 border-b border-white/5 pb-4">
                <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-amber-500/10 flex items-center justify-center text-amber-500 border border-amber-500/20">
                    <HiOutlineIdentification className="text-xl" />
                  </div>
                  Resume
                </h3>
              </header>
              <div className="flex-1 flex flex-col items-center justify-center relative z-10 space-y-4">
                <Upload
                  color="amber"
                  name="resume"
                  label="Resume / CV (PDF)"
                  register={register}
                  setValue={setValue}
                  watch={watch}
                  errors={errors}
                  accept="application/pdf"
                />
                <p className="text-xs text-gray-500 text-center font-medium max-w-[200px]">
                  Ensure your resume showcases your latest achievements.
                </p>
              </div>
            </div>
          </div>

          {/* Section 3: Social Links */}
          <div className="bg-white/[0.03] backdrop-blur-3xl rounded-[2.5rem] border border-white/20 p-8 md:p-10 shadow-[0_20px_50px_rgba(0,0,0,0.5)] relative overflow-hidden hover:border-amber-500/40 transition-all duration-500 group">
            <header className="flex flex-col md:flex-row items-start md:items-center justify-between gap-4 mb-8 border-b border-white/5 pb-6">
              <div>
                <h3 className="text-2xl font-black text-white tracking-tight flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-gray-900 flex items-center justify-center text-gray-500 border border-white/10">
                    <HiOutlineLink className="text-xl" />
                  </div>
                  Online Presence
                </h3>
                <p className="text-base font-medium text-gray-500 mt-2 ml-14">Connect your portfolio with your external profiles</p>
              </div>
              <button
                type="button"
                onClick={() => append({ label: "", url: "" })}
                className="flex items-center gap-2 px-5 py-3 bg-white/[0.05] border border-white/10 text-white rounded-xl text-sm font-semibold tracking-wide hover:bg-amber-500 hover:border-amber-500 hover:text-black transition-all active:scale-95 shadow-lg"
              >
                <HiOutlinePlus className="text-lg" /> Add link
              </button>
            </header>

            <div className="space-y-4 relative z-10 w-full">
              <AnimatePresence mode="popLayout">
                {fields.map((field, index) => (
                  <motion.div
                    key={field.id}
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    exit={{ opacity: 0, scale: 0.95 }}
                    layout
                    className="flex flex-col md:flex-row gap-4 items-center w-full"
                  >
                    <div className="w-full md:w-[35%] xl:w-[40%] relative">
                      <div className="absolute left-4 top-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-black/60 shadow-inner flex items-center justify-center">
                        {getSocialIcon(socialLinksWatch?.[index]?.label)}
                      </div>
                      <input
                        {...register(`socialLinks.${index}.label`, { required: true })}
                        placeholder="Platform Name (e.g. Github)"
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl pl-[3.5rem] pr-6 py-4 text-white text-base font-medium focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500"
                      />
                    </div>
                    <div className="w-full md:w-[65%] xl:w-[60%] flex items-center gap-4">
                      <input
                        {...register(`socialLinks.${index}.url`, { required: true })}
                        placeholder="https://..."
                        className="w-full bg-white/[0.02] border border-white/10 rounded-2xl px-6 py-4 text-amber-500 text-base font-medium focus:border-amber-500/40 focus:bg-white/[0.04] outline-none transition-all placeholder:text-gray-500"
                      />
                      <button
                        type="button"
                        onClick={() => remove(index)}
                        className="w-14 h-14 shrink-0 rounded-2xl bg-red-500/10 text-red-500 flex items-center justify-center hover:bg-red-500 hover:text-white transition-all border border-red-500/20 hover:border-red-500 shadow-sm"
                        title="Remove link"
                      >
                        <HiOutlineTrash className="text-xl" />
                      </button>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>

              {fields.length === 0 && (
                <div className="text-center py-10 opacity-30 italic text-sm font-medium">
                  No links added yet. Connect social profiles to stand out.
                </div>
              )}
            </div>
          </div>

          {/* Global Action Footer */}
          <div className="flex flex-col items-center justify-center pt-8 border-t border-white/5 w-full">
            <button
              type="submit"
              className="group relative flex items-center justify-center gap-3 px-12 py-4 bg-white text-black rounded-2xl font-bold tracking-wide hover:bg-amber-500 hover:text-white transition-all shadow-xl transform active:scale-95 hover:shadow-amber-500/20"
            >
              <div className="absolute -inset-1 bg-amber-500/20 blur-xl rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
              <HiOutlineArrowTopRightOnSquare className="text-xl group-hover:scale-110 transition-transform" />
              <span className="text-lg font-bold">Save and Continue</span>
            </button>
            <p className="text-center mt-4 text-xs font-medium text-gray-500">
              Phase 01: Setup completed successfully
            </p>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PersonalDetails;
