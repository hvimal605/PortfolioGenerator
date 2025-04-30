import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import TemplateSelection from "../components/core/PorfolioCreation/TemplateSelection";

import AnimatedButton5 from "../components/common/AnimatedButton5";
import ShineText from "../components/common/ShineText";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { setTemplateId } from "../slices/PortfolioSlice";
import ConfirmationModal from "../components/common/ConfirmationModal";


const PortfolioCreatePage = () => {
  
  const { token } = useSelector((state) => state.auth)

  const [step, setStep] = useState(1);
  const navigate = useNavigate()
  const [selectedTemplate, setSelectedTemplate] = useState(null);

  const [confirmationModal, setConfirmationModal] = useState(null)

  const dispatch = useDispatch();





  const handleTemplateSelect = (template) => {
    setSelectedTemplate(template);
    // console.log("ye hai ji template",template._id)
    dispatch(setTemplateId(template._id));
    setStep(2);
  };

  const handleUploadDetails = () => {

    

    if (token) {
      navigate('/PortfolioCreate/UploadDetails');
   
      return;
    }

    setConfirmationModal({
      text1: "You are not logged in!",
      text2: "Please login to Create Portfolio",
      btn1Text: "Login",
      btn2Text: "Cancel",
      btn1Handler: () => navigate("/login"),
      btn2Handler: () => setConfirmationModal(null),
    })
  };

  return (
    <div className="relative flex flex-col items-center justify-center h-[94vh] bg-black text-white font-sans  overflow-hidden">
      {/* Dotted animated background */}
      <div className="absolute inset-0 bg-dot-pattern opacity-30 animate-moveDots"></div>

      <AnimatePresence mode="wait">
        {step === 1 && (
          <motion.div
            key="step1"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.5 }}
            className="text-center space-y-5 mb-8 relative"
          >
            <h1 className="text-4xl md:text-6xl font-bold">
              Welcome to Your <ShineText text={"Portfolio"} /> Journey
            </h1>
            <p className="text-base md:text-lg lg:text-xl">
              Ready to create your professional portfolio? Let's get started!
            </p>
            <motion.button
              whileTap={{ scale: 0.95 }}
              onClick={() => setStep(2)}
            >
              <AnimatedButton5 text={"Select Template"} />
            </motion.button>
          </motion.div>
        )}

        {step === 2 && (
          <motion.div
            key="step2"
            initial={{ opacity: 0, x: 200 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -200 }}
            transition={{ duration: 0.5 }}
            className="text-center w-full relative flex justify-center flex-col items-center"
          >
            {/* Select Template Title */}

            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl font-extrabold text-center text-transparent bg-clip-text bg-gradient-to-r from-cyan-500 via-purple-500 to-pink-500 transition-all duration-300">
  Click on a Template to Select It
</h2>

            {/* Template Selection Section */}
            <div className=" w-full h-[70vh] overflow-y-auto  p-2 rounded-lg">
              <TemplateSelection onTemplateSelect={handleTemplateSelect} />
            </div>

            {selectedTemplate && (
              <motion.button
                type="button"
                className="mt-3"
                whileTap={{ scale: 0.95 }}
                onClick={handleUploadDetails}
              >
                <AnimatedButton5 text={'Upload Details'} />
              </motion.button>
            )}
          </motion.div>
        )}


      </AnimatePresence>
      <div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>
    </div>
  );
};

export default PortfolioCreatePage;
