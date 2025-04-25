import React, { useState, useEffect, useRef } from "react";
import ZipUpload from "./FileUpload";
import Confetti from "react-confetti";
import AnimatedButton4 from "../../common/AnimatedButton4";
import { useSelector } from "react-redux";
import { createTemplateRequest } from "../../../services/operations/TemplateApi";


const UploadTemplate = () => {
  const [formData, setFormData] = useState({
    portfolioName: "",
    description: "",
    previewLink: "",
  });

  const [zipFile, setZipFile] = useState(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const containerRef = useRef(null);
  const [containerSize, setContainerSize] = useState({ width: 0, height: 0 });
  const { token } = useSelector((state) => state.auth);
  const [resetKey, setResetKey] = useState(0)

  useEffect(() => {
    const updateContainerSize = () => {
      if (containerRef.current) {
        setContainerSize({
          width: containerRef.current.offsetWidth,
          height: containerRef.current.offsetHeight,
        });
      }
    };
    updateContainerSize();
    window.addEventListener("resize", updateContainerSize);
    return () => window.removeEventListener("resize", updateContainerSize);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleZipUpload = (file) => {
    setZipFile(file);
  };

  const handleConfetti = () => {
    setIsSubmitted(true);
    setTimeout(() => setIsSubmitted(false), 7000);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.portfolioName || !formData.description || !zipFile) {
      return alert("All fields are required including the ZIP file.");
    }

    const res = await createTemplateRequest(
      {
        name: formData.portfolioName,
        description: formData.description,
       
        zipFile,
      },
      token
    );
  
    if(res?.success){
      handleConfetti();
    }

    setFormData({
      portfolioName: "",
      description: "",
      
    });
    setZipFile(null);
    setResetKey(prev => prev + 1); 

   
  };

  return (
    <div
      ref={containerRef}
      className="relative flex justify-center items-center form-container"
    >
      {isSubmitted && (
        <Confetti
          width={containerSize.width}
          height={containerSize.height}
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            zIndex: 10,
          }}
        />
      )}

      <div className="w-full max-w-xl text-gray-200 p-5">
        <h2 className="text-2xl text-center">
          <span className="font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-pink-500 via-purple-400 to-cyan-400 drop-shadow-[0_0_12px_rgba(255,255,255,0.25)] animate-pulse mb-6 tracking-wider">Upload Template</span> 
        </h2>

        <form
          onSubmit={handleSubmit}
          className="space-y-6 p-2 backdrop-blur-lg w-full max-w-xl mx-auto mt-10"
        >
          <div>
            <label
              className="block mb-1 text-sm font-semibold text-pink-300 tracking-wide"
              htmlFor="portfolioName"
            >
               Portfolio Template Name
            </label>
            <input
              type="text"
              id="portfolioName"
              name="portfolioName"
              value={formData.portfolioName}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/40 text-white rounded-lg border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200"
              placeholder="e.g., Harsh's Web Dev Portfolio"
              required
            />
          </div>

          <div>
            <label
              className="block mb-1 text-sm font-semibold text-pink-300 tracking-wide"
              htmlFor="description"
            >
               Description
            </label>
            <textarea
              id="description"
              name="description"
              value={formData.description}
              onChange={handleInputChange}
              className="w-full px-4 py-2.5 bg-black/40 text-white rounded-lg border border-white/10 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-pink-500/50 focus:border-transparent transition-all duration-200"
              placeholder="A short description of your project"
              rows="3"
              required
            />
          </div>

          
          <ZipUpload onFileUpload={handleZipUpload} resetTrigger={resetKey} />


          <div className="flex justify-center mt-8">
            <div className="rounded-2xl bg-black/60 border-2 border-pink-500 hover:shadow-pink-500/30 hover:shadow-md transition-all duration-300 px-2 py-1">
              <AnimatedButton4 text="Upload" />
            </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default UploadTemplate;
