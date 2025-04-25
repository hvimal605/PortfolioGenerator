import React, { useState, useEffect } from 'react';
import axios from 'axios';
import PersonalDetails from './PersonalDetails';
import AboutMe from './AboutMe';
import Timeline from './Timeline';
import Projects from './Projects';
import Navbar from './Navbar';

const UploadDetails = () => {
  const [currentStep, setCurrentStep] = useState(0);
  const [addedPersonalDetails, setAddedPersonalDetails] = useState([]);
  const [addedAboutMe, setAddedAboutMe] = useState('');
  const [addedTimeline, setAddedTimeline] = useState([]);
  const [addedProjects, setAddedProjects] = useState([]);

  // Fetch data for each section
  useEffect(() => {
    if (currentStep === 0) {
      axios.get('/api/personalDetails').then((response) => setAddedPersonalDetails(response.data));
    } else if (currentStep === 1) {
      axios.get('/api/aboutMe').then((response) => setAddedAboutMe(response.data));
    } else if (currentStep === 2) {
      axios.get('/api/timeline').then((response) => setAddedTimeline(response.data));
    } else if (currentStep === 3) {
      axios.get('/api/projects').then((response) => setAddedProjects(response.data));
    }
  }, [currentStep]);

  const handleNext = () => setCurrentStep((prevStep) => prevStep + 1);

  return (
    <div className="max-w-4xl mx-auto p-6">
      <Navbar currentStep={currentStep} setCurrentStep={setCurrentStep} />
      
      {currentStep === 0 && (
        <PersonalDetails
          addedPersonalDetails={addedPersonalDetails}
          handleNext={handleNext}
        />
      )}
      {currentStep === 1 && (
        <AboutMe
          addedAboutMe={addedAboutMe}
          handleNext={handleNext}
        />
      )}
      {currentStep === 2 && (
        <Timeline
          addedTimeline={addedTimeline}
          handleNext={handleNext}
        />
      )}
      {currentStep === 3 && (
        <Projects
          addedProjects={addedProjects}
          handleNext={handleNext}
        />
      )}
    </div>
  );
};

export default UploadDetails;
