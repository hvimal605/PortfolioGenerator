import React from 'react';
import { useSelector } from 'react-redux';
import { motion, AnimatePresence } from 'framer-motion';

import Timeline from '../../PorfolioCreation/UploadDetails/Timeline';
import Skills from '../../PorfolioCreation/UploadDetails/Skills';
import SoftwareApplicationForm from '../../PorfolioCreation/UploadDetails/SoftwareApplication';
import Projects from '../../PorfolioCreation/UploadDetails/Projects';
import StepsNav from './StepsNav';

const AddDetails = () => {
  const { step } = useSelector((state) => state.portfolio);
  const steps = ["Timeline", "Skills", "Projects", "Software Stack"];

  return (
    <div className="w-full flex justify-center pb-10">
      <div className="w-full max-w-5xl mx-auto flex flex-col items-center">
        
        {/* Navigation Toolbar */}
        <div className="w-full flex justify-center mb-12">
          <StepsNav steps={steps} currentStep={step} />
        </div>

        {/* Content Area */}
        <div className="w-full relative min-h-[400px]">
          <AnimatePresence mode="wait">
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -15 }}
              transition={{ duration: 0.3 }}
              className="w-full"
            >
              {step === 0 && <Timeline />}
              {step === 1 && <Skills />}
              {step === 2 && <Projects />}
              {step === 3 && <SoftwareApplicationForm />}

              {(step !== 0 && step !== 1 && step !== 2 && step !== 3) && (
                <div className="flex justify-center items-center h-48 border border-white/5 bg-black/20 rounded-[2rem]">
                  <p className="text-neutral-400 font-medium">Please select a section above to continue.</p>
                </div>
              )}
            </motion.div>
          </AnimatePresence>
        </div>

      </div>
    </div>
  );
};

export default AddDetails;
