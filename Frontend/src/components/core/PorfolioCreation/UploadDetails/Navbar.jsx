import React, { useState } from "react";
import { FaBars, FaTimes } from "react-icons/fa";
import { setStep } from "../../../../slices/PortfolioSlice";
import { useDispatch } from "react-redux";

const Navbar = ({ steps, currentStep }) => {
  const [isOpen, setIsOpen] = useState(false);
  const dispatch = useDispatch();

  const progress = ((currentStep + 1) / steps.length) * 100;

  return (
    <>
      {/* 🚀 Main Sticky Header (PortfolioCraft + Progress) */}
      <div className="fixed top-0 left-0 w-full bg-[#030712]/80 backdrop-blur-2xl border-b border-white/5 z-[60] px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 bg-indigo-600 rounded-lg flex items-center justify-center shadow-lg shadow-indigo-600/20">
            <span className="text-white font-black text-xs italic">PG</span>
          </div>
          <h1 className="text-white text-lg font-black tracking-tighter uppercase italic">PortfolioCraft</h1>
        </div>

        <div className="flex items-center gap-6">
          <div className="hidden sm:flex flex-col items-end gap-1">
             <span className="text-[10px] font-black text-white/40 uppercase tracking-widest">Progress</span>
             <div className="flex items-center gap-3">
                <span className="text-xs font-black text-white">Step {currentStep + 1} <span className="text-white/20">of {steps.length}</span></span>
                <div className="w-24 h-1.5 bg-white/5 rounded-full overflow-hidden border border-white/5">
                  <div 
                    className="h-full bg-indigo-500 transition-all duration-700 ease-out" 
                    style={{ width: `${progress}%` }}
                  />
                </div>
             </div>
          </div>
          
          <div className="sm:hidden flex items-center gap-3">
            <span className="text-[10px] font-black text-white">Step {currentStep + 1}/{steps.length}</span>
            <div className="w-16 h-1 bg-white/5 rounded-full overflow-hidden">
               <div className="h-full bg-indigo-500" style={{ width: `${progress}%` }} />
            </div>
          </div>
        </div>
      </div>

      {/* Desktop Navbar (Stay as is but positioned below main header) */}
      <div className="hidden sm:flex fixed top-24 left-1/2 transform -translate-x-1/2 justify-center items-center bg-[#0a0a0a]/80 backdrop-blur-2xl p-4 px-6 rounded-full shadow-[0_20px_50px_rgba(0,0,0,0.5)] border border-white/10 w-[95%] max-w-6xl overflow-x-auto z-40 no-scrollbar">
        {steps.map((step, index) => (
          <div key={index} className="flex items-center shrink-0">
            <button
              onClick={() => dispatch(setStep(index))}
              className={`relative px-8 py-3 text-[11px] font-black uppercase tracking-[0.2em] rounded-full transition-all duration-500 
                ${
                  currentStep === index
                    ? "bg-white text-black shadow-[0_0_30px_rgba(255,255,255,0.2)]"
                    : "text-white/40 hover:text-white hover:bg-white/5"
                }`}
            >
              {step}
            </button>

            {index < steps.length - 1 && (
              <div className="w-10 h-px bg-white/10 mx-2"></div>
            )}
          </div>
        ))}
      </div>

      {/* Mobile Navbar (Redesigned with Steps 1, 2, 3, 4) */}
      <div className="sm:hidden fixed top-24 left-1/2 -translate-x-1/2 w-[92%] flex items-center justify-between bg-[#0a0a0a]/90 backdrop-blur-3xl p-3 px-5 rounded-[2rem] shadow-2xl border border-white/10 z-50 transition-all duration-500">
        <div className="flex items-center gap-2.5 overflow-x-auto no-scrollbar py-1">
           {steps.map((_, index) => (
             <button 
               key={index} 
               onClick={() => dispatch(setStep(index))}
               className={`w-9 h-9 shrink-0 flex items-center justify-center rounded-full text-[11px] font-black transition-all duration-500 ${
                 currentStep === index 
                 ? "bg-white text-black shadow-lg shadow-white/10 scale-110" 
                 : "bg-white/5 text-white/30 border border-white/5"
               }`}
             >
               {index + 1}
             </button>
           ))}
        </div>

        <div className="w-px h-6 bg-white/10 mx-4 shrink-0" />

        <button 
          onClick={() => setIsOpen(!isOpen)}
          className={`w-10 h-10 shrink-0 flex items-center justify-center rounded-full border transition-all duration-500 ${
            isOpen ? "bg-white text-black border-white" : "bg-white/5 text-white border-white/10"
          }`}
        >
          {isOpen ? <FaTimes size={16} /> : <FaBars size={16} />}
        </button>
      </div>

      {/* Premium Sidebar Mobile */}
      <div
        className={`fixed inset-0 bg-black/60 backdrop-blur-sm z-[60] transition-opacity duration-500 sm:hidden ${
          isOpen ? "opacity-100" : "opacity-0 pointer-events-none"
        }`}
        onClick={() => setIsOpen(false)}
      />
      
      <div
        className={`fixed top-0 right-0 w-[80%] max-w-xs h-full bg-[#0a0a0a] p-8 transform ${
          isOpen ? "translate-x-0" : "translate-x-full"
        } transition-transform duration-700 cubic-bezier(0.4, 0, 0.2, 1) sm:hidden z-[70] border-l border-white/5 shadow-2xl`}
      >
        <div className="flex items-center justify-between mb-12">
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white/40">Creation Steps</span>
          <button onClick={() => setIsOpen(false)} className="w-10 h-10 flex items-center justify-center bg-white/5 rounded-full text-white">
            <FaTimes size={18} />
          </button>
        </div>

        <div className="space-y-4">
          {steps.map((step, index) => (
            <button
              key={index}
              onClick={() => {
                dispatch(setStep(index));
                setIsOpen(false);
              }}
              className={`w-full flex items-center gap-4 px-6 py-5 rounded-2xl transition-all duration-500 text-left border ${
                currentStep === index
                  ? "bg-white text-black border-white shadow-xl shadow-white/5"
                  : "bg-white/5 text-white/40 border-transparent hover:bg-white/10 hover:text-white"
              }`}
            >
              <span className={`w-6 h-6 flex items-center justify-center rounded-full text-[10px] font-black ${
                currentStep === index ? "bg-black text-white" : "bg-white/10 text-white/60"
              }`}>
                {index + 1}
              </span>
              <span className="text-[11px] font-bold uppercase tracking-[0.1em]">{step}</span>
            </button>
          ))}
        </div>
      </div>

      {/* Hide Scrollbar */}
      <style jsx>{`
        .no-scrollbar::-webkit-scrollbar {
          display: none;
        }
        .no-scrollbar {
          -ms-overflow-style: none;
          scrollbar-width: none;
        }
      `}</style>
    </>
  );
};

export default Navbar;
