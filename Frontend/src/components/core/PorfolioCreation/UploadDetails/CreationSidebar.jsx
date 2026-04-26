import React from "react";
import { useDispatch } from "react-redux";
import { setStep } from "../../../../slices/PortfolioSlice";
import { motion } from "framer-motion";
import {
  HiOutlineUser,
  HiOutlineClock,
  HiOutlineBolt,
  HiOutlineRectangleGroup,
  HiOutlineComputerDesktop,
  HiOutlineRocketLaunch,
  HiOutlineCube,
  HiOutlineSparkles
} from "react-icons/hi2";

const CreationSidebar = ({ steps, currentStep }) => {
  const dispatch = useDispatch();

  const stepIcons = [
    <HiOutlineUser />,
    <HiOutlineClock />,
    <HiOutlineBolt />,
    <HiOutlineRectangleGroup />,
    <HiOutlineComputerDesktop />,
    <HiOutlineRocketLaunch />
  ];

  const stepColors = [
    "from-amber-400 to-amber-600",
    "from-rose-400 to-rose-600",
    "from-emerald-400 to-emerald-600",
    "from-indigo-400 to-indigo-600",
    "from-sky-400 to-sky-600",
    "from-slate-400 to-slate-600"
  ];

  return (
    <div className="hidden lg:flex flex-col w-96 bg-[#0a0a0c] border-r border-white/10 h-screen fixed left-0 top-0 overflow-y-auto no-scrollbar px-6 pb-6 pt-[120px] z-20">
      <div className="mb-6">
        <h1 className="text-3xl font-black tracking-tighter text-white flex items-center gap-3">
          <div className="w-10 h-10 bg-white text-black rounded-xl flex items-center justify-center shadow-2xl">
            <HiOutlineCube className="text-xl" />
          </div>
          Add Details
        </h1>
        <p className="text-xs font-bold text-white/40 tracking-wider mt-3 ml-1">Creation Steps</p>
      </div>

      <nav className="flex-1 space-y-2">
        {steps.map((step, index) => {
          const isActive = currentStep === index;
          const isCompleted = index < currentStep;

          return (
            <button
              key={index}
              onClick={() => dispatch(setStep(index))}
              className={`w-full group relative flex items-center gap-4 px-4 py-3 rounded-[1.25rem] transition-all duration-500 ${isActive
                ? "bg-white/[0.03] shadow-xl"
                : "hover:bg-white/[0.01]"
                }`}
            >
              {/* Active Indicator */}
              {isActive && (
                <motion.div
                  layoutId="sidebar-active"
                  className={`absolute left-0 w-1 h-8 rounded-full bg-gradient-to-b ${stepColors[index]}`}
                />
              )}

              {/* Icon */}
              <div className={`w-10 h-10 rounded-[1rem] flex items-center justify-center text-lg transition-all duration-700 ${isActive
                ? `bg-gradient-to-br ${stepColors[index]} text-black shadow-lg shadow-black/50`
                : isCompleted
                  ? "bg-white/10 text-white"
                  : "bg-white/[0.03] text-gray-700"
                }`}>
                {stepIcons[index]}
              </div>

              {/* Text */}
              <div className="text-left">
                <p className={`text-xs font-bold tracking-wider mb-0.5 ${isActive ? "text-amber-500/80" : "text-white/20"
                  }`}>Step 0{index + 1}</p>
                <h3 className={`text-base font-bold tracking-tight transition-colors ${isActive ? "text-white" : "text-white/40 group-hover:text-white/70"
                  }`}>{step}</h3>
              </div>

              {/* Status Indicator */}
              {isCompleted && (
                <div className="absolute right-4 w-1.5 h-1.5 rounded-full bg-emerald-500 shadow-[0_0_10px_rgba(16,185,129,0.4)]"></div>
              )}
            </button>
          );
        })}
      </nav>

      <div className="mt-auto pt-6 border-t border-white/5">
        <div className="bg-[#0a0a0a] p-5 rounded-[1.5rem] border border-white/5 relative overflow-hidden group">
          <div className="absolute -top-8 -right-8 w-24 h-24 bg-indigo-500/5 blur-2xl rounded-full group-hover:bg-indigo-500/10 transition-all duration-1000"></div>

          <header className="flex items-center justify-between mb-3">
            <div>
              <p className="text-[10px] font-bold text-white/40 tracking-wider mb-0.5">Total Progress</p>
              <span className="text-2xl font-black text-white">{Math.round(((currentStep + 1) / steps.length) * 100)}%</span>
            </div>
            <div className="w-8 h-8 rounded-full bg-white/5 flex items-center justify-center border border-white/5 text-sm">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 10, repeat: Infinity, ease: "linear" }}
                className="text-gray-600"
              >
                <HiOutlineSparkles />
              </motion.div>
            </div>
          </header>

          <div className="w-full h-2 bg-white/[0.03] rounded-full overflow-hidden">
            <motion.div
              animate={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
              className="h-full bg-gradient-to-r from-indigo-500 via-sky-500 to-emerald-500 shadow-[0_0_20px_rgba(99,102,241,0.4)]"
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CreationSidebar;
