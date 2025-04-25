import React from 'react';
import { useSelector, useDispatch } from 'react-redux';

import Timeline from '../../PorfolioCreation/UploadDetails/Timeline';
import Skills from '../../PorfolioCreation/UploadDetails/Skills';
import SoftwareApplicationForm from '../../PorfolioCreation/UploadDetails/SoftwareApplication';
import Projects from '../../PorfolioCreation/UploadDetails/Projects';
import StepsNav from './StepsNav';



const AddDetails = () => {

  const { step } = useSelector((state) => state.portfolio);

  const steps = ["Timeline", "Skill", "Project", "Software App"];



  return (
    <div className="min-h-screen h-full w-full bg-black pt-8 relative ">
      <div className="w-[90%] mx-auto md:w-[85%] sticky top-1 ">
        <StepsNav steps={steps} currentStep={step} />

      </div>

      <div className="max-w-5xl mx-auto p-0 md:p-6 mt-5">

        {step === 0 && <Timeline />}
        {step === 1 && <Skills />}
        {step === 2 && <Projects />}
        {step === 3 && <SoftwareApplicationForm />}

        {(step !== 0 && step !== 1 && step !== 2 && step !== 3) && (
          <p className="text-white text-center">Please select a section to continue.</p>
        )}

      </div>


    </div>
  );
};

export default AddDetails;
