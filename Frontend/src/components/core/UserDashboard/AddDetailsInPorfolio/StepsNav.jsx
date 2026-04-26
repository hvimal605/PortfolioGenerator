import React from "react";
import { setStep } from "../../../../slices/PortfolioSlice";
import { useDispatch } from "react-redux";
import { HiOutlineChevronRight } from "react-icons/hi2";
import { MdSwipeRight } from "react-icons/md";

const StepsNav = ({ steps, currentStep }) => {
  const dispatch = useDispatch();

  return (
    <div className="relative w-full md:w-max max-w-full flex justify-start md:justify-center mx-auto">
      
      {/* Mobile Swipe Hint Overlay */}
      <div className="md:hidden absolute right-0 top-0 bottom-0 w-20 bg-gradient-to-l from-[#050505] via-black/80 to-transparent pointer-events-none z-50 rounded-r-[2rem] flex items-center justify-end pr-4">
        <MdSwipeRight className="text-cyan-400/60 animate-pulse text-xl drop-shadow-md" />
      </div>

      <div className="flex bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-[2rem] p-2 px-3 shadow-[0_15px_40px_rgba(0,0,0,0.5)] overflow-x-auto [&::-webkit-scrollbar]:hidden w-full md:w-max z-40">
        <div className="flex w-max pr-12 md:pr-0">
          {steps.map((step, index) => {
            const isActive = currentStep === index;
            return (
              <div key={index} className="flex items-center">
                <button
                  onClick={() => dispatch(setStep(index))}
                  className={`relative px-5 py-2.5 text-[0.8rem] md:text-sm font-bold tracking-widest uppercase transition-all duration-300 rounded-[1.5rem] whitespace-nowrap
                    ${isActive 
                      ? "bg-cyan-500/20 text-cyan-400 shadow-[inset_0_0_20px_rgba(34,211,238,0.2)] border border-cyan-400/30" 
                      : "bg-transparent text-neutral-400 hover:text-white hover:bg-white/5 border border-transparent hover:border-white/10"}
                  `}
                >
                  {step}
                </button>
                {index < steps.length - 1 && (
                  <div className="mx-1 md:mx-3 text-white/20">
                    <HiOutlineChevronRight className="text-xl drop-shadow-md" />
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>

    </div>
  );
};

export default StepsNav;
