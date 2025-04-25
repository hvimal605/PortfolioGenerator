import React, { useEffect } from "react";
import { useForm } from "react-hook-form";
import { useSelector, useDispatch } from "react-redux";
import { toast } from "react-hot-toast";
import Upload from "../../../common/Upload";
import { addPersonalDetails } from "../../../../services/operations/PortfolioApi";
import { setPortfolio, setStep } from "../../../../slices/PortfolioSlice";
import { useNavigate } from "react-router-dom";
import { FaUserAlt } from "react-icons/fa";

const PersonalDetails = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { token } = useSelector((state) => state.auth);
  const { templateId } = useSelector((state) => state.portfolio);

  useEffect(() => {
    if (!templateId) {
      navigate("/portfolioCreate");
    }
  }, []);

  const {
    register,
    handleSubmit,
    setValue,
    watch,
    reset,
    formState: { errors },
  } = useForm();

  const handleFileSelect = (file, name) => {
    setValue(name, file);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    Object.keys(data).forEach((key) => {
      if (data[key] && key !== "avatar" && key !== "resume") {
        if (key === "roles") {
          const rolesArray = data[key].split(",").map((role) => role.trim());
          rolesArray.forEach((role) => formData.append("roles", role));
        } else {
          formData.append(key, data[key]);
        }
      }
    });

    if (!data.avatar ) {
      return toast.error("Profile imageis required!");
    }

    formData.append("avatar", data.avatar);
    formData.append("resume", data.resume);
    formData.append("templateId", templateId);

    const result = await addPersonalDetails(formData, token);
    if (result) {
      dispatch(setStep(1));
      dispatch(setPortfolio(result));
      reset();
      setValue("avatar", null);
      setValue("resume", null);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] border border-yellow-400/30 text-white p-10 rounded-2xl shadow-[0_0_15px_#FFD700] max-w-3xl mx-auto mb-2">

      <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-yellow-400 flex justify-center items-center gap-2 ">
      <FaUserAlt/>  Personal Details
      </h2>

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
        {/* Name */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block mb-2 text-yellow-300">First Name</label>
    <input
      {...register("FirstName", { required: true })}
      placeholder="First Name"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
  <div>
    <label className="block mb-2 text-yellow-300">Last Name</label>
    <input
      {...register("LastName", { required: true })}
      placeholder="Last Name"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
</div>

{/* Email & Phone */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block mb-2 text-yellow-300">Email</label>
    <input
      {...register("email", { required: true })}
      placeholder="Email"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
  <div>
    <label className="block mb-2 text-yellow-300">Phone Number</label>
    <input
      {...register("phone", { required: true })}
      placeholder="Phone Number"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
</div>

{/* About Me */}
<div>
  <label className="block mb-2 text-yellow-300">About Me</label>
  <textarea
    {...register("aboutme", { required: true })}
    placeholder="Write something about yourself..."
    rows={6}
    className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
</div>

{/* Roles */}
<div>
  <label className="block mb-2 text-yellow-300">Roles</label>
  <input
    {...register("roles", { required: true })}
    placeholder="Roles (e.g.,Coder, Developer, Designer)"
    className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
  />
</div>

{/* Social Links */}
<div className="grid grid-cols-1 md:grid-cols-2 gap-6">
  <div>
    <label className="block mb-2 text-yellow-300">LinkedIn</label>
    <input
      {...register("linkedIn")}
      placeholder="LinkedIn"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
  <div>
    <label className="block mb-2 text-yellow-300">GitHub</label>
    <input
      {...register("github")}
      placeholder="GitHub"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
  <div>
    <label className="block mb-2 text-yellow-300">Twitter</label>
    <input
      {...register("twitter")}
      placeholder="Twitter"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
  <div>
    <label className="block mb-2 text-yellow-300">Personal Website</label>
    <input
      {...register("personalWebsite")}
      placeholder="Personal Website"
      className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-yellow-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-yellow-500"
    />
  </div>
</div>


        {/* File Uploads */}
        <div className="flex flex-col md:flex-row justify-center items-center gap-8">
          <Upload
          color="yellow"
            name="avatar"
            label="Upload Profile Picture"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            onFileSelect={(file) => handleFileSelect(file, "avatar")}
       
          />
          <Upload
           color='yellow'
            name="resume"
            label="Upload Resume (PDF only)"
            register={register}
            setValue={setValue}
            watch={watch}
            errors={errors}
            accept="application/pdf"
            onFileSelect={(file) => handleFileSelect(file, "resume")}
          />

        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-8 py-4 bg-yellow-500 hover:bg-yellow-600 text-white font-bold rounded-xl shadow-lg transition duration-300 ease-in-out"
          >
             Save & Continue
          </button>
        </div>
      </form>
    </div>



  );
};

export default PersonalDetails;
