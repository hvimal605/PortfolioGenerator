import { motion } from "framer-motion";
import { HiOutlineArrowDownTray, HiOutlineCalendar, HiOutlineCheckCircle, HiOutlineInformationCircle } from "react-icons/hi2";
import { format } from "date-fns";

export default function TemplateCardDeveloper({ template }) {
  const status = template.status;
  
  const formattedDate = (date) =>
    date && date !== "Pending" && date !== "Rejected"
      ? format(new Date(date), "MMM dd, yyyy")
      : "--";

  const statusConfig = {
    Approved: {
       color: "text-emerald-400",
       bg: "bg-emerald-500/10",
       border: "border-emerald-500/20",
       glow: "group-hover:shadow-[0_0_30px_rgba(16,185,129,0.15)] group-hover:border-emerald-500/30"
    },
    Pending: {
       color: "text-amber-400",
       bg: "bg-amber-500/10",
       border: "border-amber-500/20",
       glow: "group-hover:shadow-[0_0_30px_rgba(245,158,11,0.15)] group-hover:border-amber-500/30"
    },
    Rejected: {
       color: "text-rose-400",
       bg: "bg-rose-500/10",
       border: "border-rose-500/20",
       glow: "group-hover:shadow-[0_0_30px_rgba(244,63,94,0.15)] group-hover:border-rose-500/30"
    },
  };

  const currentStatus = statusConfig[status] || statusConfig.Pending;

  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      transition={{ duration: 0.3 }}
      className={`group relative flex flex-col bg-[#0A0A0A]/60 backdrop-blur-3xl border border-white/5 rounded-[2rem] p-6 transition-all duration-500 overflow-hidden ${currentStatus.glow}`}
    >
      {/* Background Status Glow */}
      <div className={`absolute top-0 right-0 w-32 h-32 ${currentStatus.bg} blur-3xl rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-700 pointer-events-none`}></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-6 z-10">
        <div className="space-y-1">
           <h3 className="text-xl font-bold text-white tracking-tight leading-tight group-hover:text-cyan-400 transition-colors">
              {template.name}
           </h3>
           <p className="text-sm text-zinc-500 font-medium line-clamp-2">
              {template.description}
           </p>
        </div>
        
        {/* Sleek Download Button */}
        <a
          href={template.uploadedUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="flex-shrink-0 w-10 h-10 rounded-full bg-white/5 flex items-center justify-center border border-white/10 text-white/70 hover:text-white hover:bg-cyan-500 hover:border-cyan-400 transition-all duration-300"
          title="Download Package"
        >
          <HiOutlineArrowDownTray className="text-lg" />
        </a>
      </div>

      <div className="flex-1"></div>

      {/* Status Footer */}
      <div className="flex flex-col gap-4 mt-6 z-10">
         
         <div className="flex items-center justify-between border-t border-white/5 pt-4">
            <div className="flex flex-col gap-1">
               <div className="flex items-center gap-2 text-zinc-500">
                  <HiOutlineCalendar className="text-[14px]" />
                  <span className="text-[10px] font-bold uppercase tracking-widest">Submitted</span>
               </div>
               <span className="text-xs font-semibold text-white/80">{formattedDate(template.createdAt)}</span>
            </div>

            <div className="flex flex-col gap-1 items-end">
               <div className="flex items-center gap-2 text-zinc-500">
                  <span className="text-[10px] font-bold uppercase tracking-widest">Status</span>
                  <HiOutlineInformationCircle className="text-[14px]" />
               </div>
               <div className={`px-3 py-1 rounded-full ${currentStatus.bg} ${currentStatus.border} border`}>
                  <span className={`text-[10px] font-black uppercase tracking-wider ${currentStatus.color}`}>
                     {status}
                  </span>
               </div>
            </div>
         </div>

      </div>
    </motion.div>
  );
}
