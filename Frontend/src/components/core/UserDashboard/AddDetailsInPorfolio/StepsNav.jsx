import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { setStep } from "../../../../slices/PortfolioSlice";
import { useDispatch } from "react-redux";

const StepsNav = ({ steps, currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {/* Navbar for Desktop & Tablets */}
      {/* Navbar for Desktop & Tablets */}
<div className="hidden sm:flex fixed top-72 left-1/2 transform -translate-x-1/2 justify-center items-center bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0f0f0f] backdrop-blur-lg p-5 rounded-xl shadow-xl mb-6 border border-gray-600 w-[95%] max-w-6xl overflow-x-auto z-40">
  {steps.map((step, index) => (
    <div key={index} className="flex items-center">
      <button
        onClick={() => dispatch(setStep(index))}
        className={`relative px-6 py-3 text-sm sm:text-md font-semibold rounded-full transition-all duration-300 ease-in-out transform 
          ${
            currentStep === index
              ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white scale-110 shadow-xl"
              : "bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
          }`}
      >
        {step}
      </button>
      {index < steps.length - 1 && (
        <div className="w-8 sm:w-12 h-px bg-gray-300 mx-3 sm:mx-4 opacity-60"></div>
      )}
    </div>
  ))}
</div>



      {/* Mobile Navbar with Hamburger Menu */}
   {/* Mobile Navbar – Steps in One Line, No Sidebar */}
<div className="sm:hidden fixed top-72 left-1/2 transform -translate-x-1/2 bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0f0f0f] backdrop-blur-lg p-2 rounded-xl shadow-lg border border-gray-600 w-[95%] overflow-x-auto flex space-x-2 items-center justify-start z-50 no-scrollbar">
  {steps.map((step, index) => (
    <button
      key={index}
      onClick={() => dispatch(setStep(index))}
      className={`flex-shrink-0 px-3 py-1 text-sm font-medium rounded-full transition-all duration-200 ${
        currentStep === index
          ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white shadow"
          : "bg-gray-900 text-gray-300 hover:bg-gray-700 hover:text-white"
      }`}
    >
      {step}
    </button>
  ))}
</div>



    </>
  );
};

export default StepsNav;
