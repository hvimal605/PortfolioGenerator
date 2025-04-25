import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import Upload from "../../../common/Upload";
import { addSoftwareApplication } from "../../../../services/operations/PortfolioApi";
import { useNavigate } from "react-router-dom";
import { setStep } from "../../../../slices/PortfolioSlice";
import { FaLaptopCode } from "react-icons/fa";

const SoftwareApplicationForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio)
  const portfolioId = portfolio?._id;


  const { register, handleSubmit, setValue, watch, formState: { errors } } = useForm();


  const navigate = useNavigate();
  const dispatch = useDispatch();
  // console.log("ye aagya porfolio time line ke ander  ",portfolio)


   useEffect(() => {
        if ( !portfolio) {
          navigate("/PortfolioCreate/UploadDetails");

          dispatch(setStep(0));
        }
      }, []);

  const [application, setApplication] = useState({
    name: "",
    applicationSvg: null,
  });

  // Handle Text Input
  const handleChange = (e) => {
    setApplication({ ...application, [e.target.name]: e.target.value });
  };

  // Handle File Selection
  const handleFileSelect = (file) => {
    if (file) {
      const newFile = new File([file], file.name, { type: file.type }); // Ensure it's a valid File object
      setApplication((prev) => ({ ...prev, applicationSvg: newFile }));
      setValue("applicationSvg", newFile);
    }
  };

  const onSubmit = async (data) => {
    if (!application.applicationSvg) {
      alert("Please upload an application image file.");
      return;
    }

    if (!portfolioId) {
      toast.error("Portfolio ID not found. Please try again.");
      return;
    }

    const formData = new FormData();
    formData.append("name", application.name);
    formData.append("applicationSvg", application.applicationSvg);
    formData.append("portfolioId", portfolioId);

    try {
      await addSoftwareApplication(formData, token);

      setApplication({ name: "", applicationSvg: null });
      setValue("applicationSvg", null);
      setValue("name", "");
      onFileSelect(null);
    } catch (error) {
      console.error("Error submitting form:", error);
    }
  };



  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] mb-3 via-[#111] to-[#1a1a1a] border border-blue-500/30 text-white p- rounded-2xl shadow-[0_0_15px_#3B82F6] max-w-3xl mx-auto p-8 mt-1">
    <h2 className="text-2xl md:text-4xl font-extrabold mb-4 text-center text-blue-400 flex justify-center items-center gap-3">
     <FaLaptopCode/> Software App
    </h2>
  
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
      {/* Application Name */}
      <div>
        <label className="block text-blue-300 font-semibold mb-2">Application Name</label>
        <input
          type="text"
          name="name"
          value={application.name}
          onChange={handleChange}
          className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-blue-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500"
          required
          placeholder="Enter application name"
        />
      </div>
  
      {/* File Upload */}
      <div className=" flex justify-center mt-10">
        <Upload
        color="blue"
          name="applicationSvg"
          label="Upload Application Image ( PNG, JPG)"
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
          className="mt-6 px-8 py-4 bg-blue-500 hover:bg-blue-600 text-white font-bold rounded-xl shadow-lg transition duration-300 ease-in-out"
        >
           Add Software App
        </button>
      </div>
    </form>
  </div>
  
  );
};

export default SoftwareApplicationForm;
