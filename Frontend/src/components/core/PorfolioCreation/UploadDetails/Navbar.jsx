import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { setStep } from "../../../../slices/PortfolioSlice";
import { useDispatch } from "react-redux";

const Navbar = ({ steps, currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  return (
    <>
      {/* Navbar for Desktop & Tablets */}
      {/* Navbar for Desktop & Tablets */}
<div className="hidden sm:flex fixed top-24 left-1/2 transform -translate-x-1/2 justify-center items-center bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0f0f0f] backdrop-blur-lg p-5 rounded-xl shadow-xl mb-6 border border-gray-600 w-[95%] max-w-6xl overflow-x-auto z-40">
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
      <div className="sm:hidden fixed top-24 left-0 right-0 mx-auto w-[95%] max-w-md flex justify-between items-center bg-gradient-to-br from-[#1a1a1a] via-[#111] to-[#0f0f0f] backdrop-blur-lg p-4 rounded-xl shadow-xl border border-gray-600 z-50">
  <h1 className="text-white text-lg font-semibold">Portfolio Steps</h1>
  <button onClick={() => setIsOpen(!isOpen)}>
    {isOpen ? <FaTimes size={28} className="text-white" /> : <FaBars size={28} className="text-white" />}
  </button>
</div>


      {/* Sidebar Menu for Mobile */}
      <div
        className={`fixed top-20 left-0 w-64 h-full bg-black bg-opacity-90 p-6 transform ${isOpen ? "translate-x-0" : "-translate-x-full"} transition-transform duration-300 ease-in-out sm:hidden z-50`}
      >
        <button className="absolute top-4 right-4" onClick={() => setIsOpen(false)}>
          <FaTimes size={28} className="text-white" />
        </button>
        <ul className="mt-12 space-y-4">
          {steps.map((step, index) => (
            <li key={index}>
              <button
                onClick={() => {
                  dispatch(setStep(index));
                  setIsOpen(false);
                }}
                className={`block w-full text-left px-6 py-3 text-lg font-medium rounded-lg ${
                  currentStep === index
                    ? "bg-gradient-to-r from-blue-500 to-purple-500 text-white"
                    : "bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white"
                }`}
              >
                {step}
              </button>
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default Navbar;
