import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllRequestedTemplates,
  reviewTemplateRequest,
} from "../../../services/operations/TemplateApi";
import TemplateReqCard from "./TemplateReqCard";
import { motion, AnimatePresence } from "framer-motion";

const TemplateRequests = () => {
  const [templates, setTemplates] = useState([]);
  const [filter, setFilter] = useState("All");
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await getAllRequestedTemplates(token);
        if (res && Array.isArray(res)) {
          setTemplates(res);
        }
      } catch (err) {
        console.error("Failed to fetch templates", err);
      }
    };
    fetchTemplates();
  }, [token]);

  const handleStatusChange = async (templateId, newStatus) => {
    try {
      const res = await reviewTemplateRequest(templateId, newStatus, token);
      if (res?.success) {
        setTemplates((prev) =>
          prev.map((t) =>
            t._id === templateId
              ? { ...t, status: newStatus, reviewedAt: new Date().toISOString() }
              : t
          )
        );
      }
    } catch (err) {
      console.error("Failed to update status", err);
    }
  };

  const filterOptions = ["All", "Pending", "Approved", "Rejected"];

  const filteredTemplates =
    filter === "All"
      ? templates
      : templates.filter((t) => t.status === filter);

  return (
    <div className="flex flex-col gap-10">
      
      {/* Header Area */}
      <div className="flex flex-col gap-2">
         <h2 className="text-4xl font-black tracking-tighter text-white">
           Review <span className="text-white/40">Submissions</span>
         </h2>
         <p className="text-zinc-500 font-medium text-sm italic">
           Approve or reject developer builds for the platform library.
         </p>
      </div>

      {/* Pill-based Navigation Filter */}
      <div className="flex flex-wrap items-center gap-4 border-b border-white/5 pb-8 overflow-x-auto scrollbar-none">
         {filterOptions.map((option) => (
            <button
               key={option}
               onClick={() => setFilter(option)}
               className={`relative h-11 px-8 rounded-full font-bold text-xs uppercase tracking-[0.2em] transition-all duration-300
                  ${filter === option 
                    ? "text-white" 
                    : "text-zinc-500 hover:text-white"}`}
            >
               <span className="relative z-10">{option}</span>
               {filter === option && (
                  <motion.div 
                     layoutId="filter-pill"
                     className="absolute inset-0 bg-white/5 border border-white/10 rounded-full shadow-[0_4px_20px_rgba(0,0,0,0.5)]"
                  />
               )}
            </button>
         ))}
      </div>

      {/* Content Section */}
      <div className="min-h-[400px]">
         <AnimatePresence mode="wait">
            {filteredTemplates.length > 0 ? (
               <motion.div 
                  key={filter}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -10 }}
                  className="grid grid-cols-1 md:grid-cols-2 gap-8"
               >
                  {filteredTemplates.map((template) => (
                     <TemplateReqCard
                        key={template._id}
                        template={template}
                        onStatusChange={handleStatusChange}
                     />
                  ))}
               </motion.div>
            ) : (
               <motion.div 
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex flex-col items-center justify-center py-32 text-center"
               >
                  <div className="w-16 h-16 rounded-full bg-white/5 border border-white/10 flex items-center justify-center mb-6">
                     <span className="text-2xl text-zinc-600">👀</span>
                  </div>
                  <h3 className="text-white font-black text-lg tracking-tight">No submissions found</h3>
                  <p className="text-zinc-500 text-sm italic mt-1">There are currently no {filter.toLowerCase()} requests queueing.</p>
               </motion.div>
            )}
         </AnimatePresence>
      </div>

    </div>
  );
};

export default TemplateRequests;
