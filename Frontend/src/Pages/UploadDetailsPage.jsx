import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import Navbar from '../components/core/PorfolioCreation/UploadDetails/Navbar';
import PersonalDetails from '../components/core/PorfolioCreation/UploadDetails/PersonalDetails';
import Timeline from '../components/core/PorfolioCreation/UploadDetails/Timeline';
import Skills from '../components/core/PorfolioCreation/UploadDetails/Skills';
import Projects from '../components/core/PorfolioCreation/UploadDetails/Projects';
import SoftwareApplication from '../components/core/PorfolioCreation/UploadDetails/SoftwareApplication';
import PortfolioDashboardData from '../components/core/PorfolioCreation/PorttfolioDashboardData/PortfolioDashboardData';
import { setStep } from '../slices/PortfolioSlice';
import { ACCOUNT_TYPE } from '../utils/constants';
import ConfirmationModal from '../components/common/ConfirmationModal';
import { useNavigate } from 'react-router-dom';
import { logout } from '../services/operations/authApi';


const UploadDetailsPage = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { step } = useSelector((state) => state.portfolio);
  const { user } = useSelector((state) => state.profile)
  const {token} = useSelector((state)=>state.auth)

  const [confirmationModal, setConfirmationModal] = useState(null)
  // console.log("ye hai hamara user", user)

  const handleLogout = () => {
      dispatch(logout(navigate));
    };
  

  const steps = ["Personal Details", "Timeline", "Skills", "Projects", "Software App", "Dashboard"];

  useEffect(() => {
    if (!token) {
      setConfirmationModal({
        text1: "You are not logged in.",
        text2: "Please log in first to create a portfolio.",
        btn1Text: "Login",
        btn2Text: "Cancel",
        btn1Handler: () => navigate("/login"),
        btn2Handler: () => navigate("/"),
      });
      return;
    }
  
    if (user?.accountType !== ACCOUNT_TYPE.USER) {
      setConfirmationModal({
        text1: "You are logged in as a Developer.",
        text2: "To create a portfolio, please log in with a regular User account.",
        btn1Text: "Logout",
        btn1Handler: () => handleLogout(),
      });
    }
  }, []);
  

  return (
    <div className="min-h-screen h-full w-full bg-black pt-12 relative ">
      <div className="w-[90%] mx-auto md:w-[85%]  ">
        <Navbar steps={steps} currentStep={step} />
      </div>

      <div className="max-w-5xl mx-auto p-2 md:p-6 mt-18">
        {step === 0 && <PersonalDetails />}
        {step === 1 && <Timeline />}
        {step === 2 && <Skills />}
        {step === 3 && <Projects />}
        {step === 4 && <SoftwareApplication />}
        {step === 5 && <PortfolioDashboardData />}
      </div>
      <div>
        {confirmationModal && <ConfirmationModal modalData={confirmationModal} />}
      </div>

    </div>
  );
};

export default UploadDetailsPage;
