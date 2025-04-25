import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import FileUpload from "../../../common/FileUpload";
import { addSkill } from "../../../../services/operations/PortfolioApi";
import Upload from "../../../common/Upload";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../slices/PortfolioSlice";
import { HiOutlineLightningBolt } from "react-icons/hi";

const SkillForm = () => {
  const { token } = useSelector((state) => state.auth);
  const {portfolio} = useSelector((state)=>state.portfolio)
  const portfolioId = portfolio?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("ye aagya porfolio time line ke ander  ",portfolio)


     useEffect(() => {
          if ( !portfolio) {
            navigate("/PortfolioCreate/UploadDetails");
            
            dispatch(setStep(0));
          }
        }, []);


    const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();

  const [skill, setSkill] = useState({
    title: "",
    proficiency: "",
    skillSvg: null,
  });

  // Handle Text Input
  const handleChange = (e) => {
    setSkill({ ...skill, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const handleFileSelect = (file) => {
    if (file) {
      const newFile = new File([file], file.name, { type: file.type });
      setSkill((prev) => ({ ...prev, skillSvg: newFile }));
      setValue("skillSvg", newFile);
    }
  };

  const onSubmit = async (data) => {
    if (!skill.skillSvg) {
      alert("Please upload a skill image file.");
      return;
    }
    if (!portfolioId) {
      toast.error("Portfolio ID not found. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("title", skill.title);
    formData.append("proficiency", skill.proficiency);
    formData.append("skillSvg", skill.skillSvg);
    formData.append("portfolioId", portfolioId);

    try {
      await addSkill(formData, token);
      setSkill({ title: "", proficiency: "", skillSvg: null });
      setValue("title", "");
      setValue("proficiency", "");
      setValue("skillSvg", null);
      handleFileSelect(null);
    } catch (error) {
      console.error("Error adding skill:", error);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] mb-3 via-[#111] to-[#1a1a1a] border border-green-500/30 text-white p-8 rounded-2xl shadow-[0_0_15px_#10B981] max-w-3xl mx-auto ">
  <h2 className="text-3xl md:text-4xl font-extrabold mb-5 text-center text-green-400 flex justify-center items-center gap-3">
   <HiOutlineLightningBolt />  Skill
  </h2>

  <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
    {/* Title */}
    <div>
      <label className="block text-green-300 font-semibold mb-2">Skill Title</label>
      <input
        type="text"
        name="title"
        value={skill.title}
        onChange={handleChange}
        className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-green-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        placeholder="Enter skill title"
      />
    </div>

    {/* Proficiency */}
    <div>
      <label className="block text-green-300 font-semibold mb-2">Proficiency (%)</label>
      <input
        type="number"
        name="proficiency"
        value={skill.proficiency}
        onChange={handleChange}
        className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-green-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-green-500"
        required
        min="0"
        max="100"
        placeholder="Enter proficiency percentage"
      />
    </div>

    {/* Upload Skill Icon */}
    <div className=" flex justify-center mt-10 z-0">
      <Upload
      color="green"
        name="skillSvg"
        label="Upload Skill Icon (PNG, JPG )"
        register={register}
        setValue={setValue}
        watch={watch}
        errors={errors}
        onFileSelect={handleFileSelect}
      />
    </div>

    {/* Submit Button */}
    <div className="text-center">
      <button
        type="submit"
        className="mt-6 px-8 py-4 bg-green-500 hover:bg-green-600 text-white font-bold rounded-xl shadow-lg transition duration-300 ease-in-out"
      >
         Add Skill
      </button>
    </div>
  </form>
</div>

  );
};

export default SkillForm;