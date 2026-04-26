import React from "react";
import { HiOutlineArrowDownTray, HiOutlineCheckCircle, HiOutlineXCircle, HiOutlineClock } from "react-icons/hi2";
import { motion } from "framer-motion";

const statusConfig = {
  Approved: {
    label: "Approved",
    color: "emerald",
    icon: <HiOutlineCheckCircle />,
    glow: "rgba(16,185,129,0.3)"
  },
  Rejected: {
    label: "Rejected",
    color: "pink",
    icon: <HiOutlineXCircle />,
    glow: "rgba(236,72,153,0.3)"
  },
  Pending: {
    label: "Pending",
    color: "amber",
    icon: <HiOutlineClock />,
    glow: "rgba(245,158,11,0.3)"
  },
};

const TemplateReqCard = ({ template, onStatusChange }) => {
  const { status } = template;
  const config = statusConfig[status] || statusConfig["Pending"];

  return (
    <motion.div 
      whileHover={{ y: -5 }}
      className="group relative bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/10 rounded-[2.5rem] p-8 shadow-[0_20px_50px_rgba(0,0,0,0.5)] overflow-hidden transition-all"
    >
      {/* Status Accent Glow */}
      <div 
         className={`absolute top-0 right-0 w-40 h-40 blur-[100px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700
            ${config.color === 'emerald' ? 'bg-emerald-500/20' : 
              config.color === 'pink' ? 'bg-pink-500/20' : 'bg-amber-500/20'}`}
      ></div>

      <div className="relative z-10 flex flex-col gap-6">
        {/* Header Area */}
        <div className="flex justify-between items-start">
           <div className="flex flex-col gap-1">
              <h3 className="text-xl font-black tracking-tight text-white">{template.name}</h3>
              <p className="text-zinc-500 text-xs font-medium italic truncate max-w-[200px]">{template.description}</p>
           </div>
           <div className={`flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/5 border border-white/10 text-[10px] font-black uppercase tracking-widest
               ${config.color === 'emerald' ? 'text-emerald-400 border-emerald-500/20 shadow-[0_0_15px_rgba(16,185,129,0.2)]' : 
                 config.color === 'pink' ? 'text-pink-400 border-pink-500/20 shadow-[0_0_15px_rgba(236,72,153,0.2)]' : 
                 'text-amber-400 border-amber-500/20 shadow-[0_0_15px_rgba(245,158,11,0.2)]'}`}
           >
              <span className="text-sm">{config.icon}</span>
              {config.label}
           </div>
        </div>

        {/* Submission Details */}
        <div className="grid grid-cols-2 gap-4 py-6 border-y border-white/5">
           <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Creator</span>
              <span className="text-xs font-bold text-white truncate">{template.createdBy.firstName} {template.createdBy.lastName}</span>
           </div>
           <div className="flex flex-col gap-1">
              <span className="text-[9px] font-black uppercase tracking-[0.3em] text-white/30">Submitted</span>
              <span className="text-xs font-bold text-white">{new Date(template.createdAt).toLocaleDateString()}</span>
           </div>
        </div>

        {/* Action Controls */}
        <div className="flex items-center gap-3 mt-2">
           <a
             href={template.uploadedUrl}
             target="_blank"
             rel="noopener noreferrer"
             className="flex-1 h-12 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center gap-3 text-xs font-black uppercase tracking-widest text-zinc-400 hover:text-white hover:bg-white/10 transition-all group/dl"
           >
              <HiOutlineArrowDownTray className="text-lg group-hover/dl:scale-110 transition-transform" />
              Download Build
           </a>

           <div className="relative group/sel">
              <select
                value={status}
                onChange={(e) => onStatusChange(template._id, e.target.value)}
                className={`h-12 w-14 rounded-2xl bg-white/5 border border-white/10 flex items-center justify-center text-zinc-400 appearance-none text-center focus:outline-none focus:ring-1 focus:ring-white/20 transition-all group-hover/sel:bg-white/10 cursor-pointer
                    ${status === 'Approved' ? 'text-emerald-400 border-emerald-500/20' : 
                      status === 'Rejected' ? 'text-pink-400 border-pink-500/20' : 'text-amber-400 border-amber-500/20'}`}
              >
                <option value="Pending">P</option>
                <option value="Approved">A</option>
                <option value="Rejected">R</option>
              </select>
              <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none">
                 <span className="text-[9px] font-black opacity-0 group-hover/sel:opacity-40 uppercase">Status</span>
              </div>
           </div>
        </div>
      </div>

    </motion.div>
  );
};

export default TemplateReqCard;
