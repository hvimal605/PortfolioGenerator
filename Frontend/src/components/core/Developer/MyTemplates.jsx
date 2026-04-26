import React, { useEffect, useState } from 'react';
import TemplateCardDeveloper from '../Template/TemplateCardDeveloper';
import { useSelector } from 'react-redux';
import { getDeveloperTemplates } from '../../../services/operations/TemplateApi';
import { motion, AnimatePresence } from 'framer-motion';

const MyTemplates = () => {
  const [templates, setTemplates] = useState([]);
  const [filteredTemplates, setFilteredTemplates] = useState([]);
  const [selectedStatus, setSelectedStatus] = useState('All');
  const [loading, setLoading] = useState(true);

  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const data = await getDeveloperTemplates(token);
        setTemplates(data);
        setFilteredTemplates(data);
      } catch (error) {
        console.error("❌ Failed to fetch developer templates:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchTemplates();
  }, [token]);

  useEffect(() => {
    if (selectedStatus === 'All') {
      setFilteredTemplates(templates);
    } else {
      setFilteredTemplates(
        templates.filter(template => template.status === selectedStatus)
      );
    }
  }, [selectedStatus, templates]);

  const filters = ['All', 'Approved', 'Pending', 'Rejected'];

  return (
    <div className="w-full space-y-10 pb-20">
      
      {/* Page Header */}
      <div className="flex flex-col gap-1">
        <h1 className="text-4xl md:text-5xl font-black tracking-tighter text-white">
          Template <span className="text-white/40">Library</span>
        </h1>
        <p className="text-zinc-500 font-medium text-sm">
          Manage your uploaded templates and track their review status.
        </p>
      </div>

      {/* Sexy Horizontal Filter Pills */}
      <div className="flex items-center gap-3 overflow-x-auto pb-4 [&::-webkit-scrollbar]:hidden w-full">
         {filters.map((filter) => (
            <button
               key={filter}
               onClick={() => setSelectedStatus(filter)}
               className={`relative px-6 py-2.5 rounded-full text-xs font-bold uppercase tracking-widest transition-all duration-300 flex-shrink-0 ${
                  selectedStatus === filter 
                  ? 'text-black bg-white shadow-[0_0_20px_rgba(255,255,255,0.3)]' 
                  : 'text-zinc-500 bg-white/5 border border-white/10 hover:text-white hover:bg-white/10'
               }`}
            >
               {filter}
               {selectedStatus === filter && (
                  <motion.div 
                     layoutId="filter-pill"
                     className="absolute inset-0 border border-cyan-400 rounded-full scale-105 opacity-50"
                     transition={{ type: "spring", stiffness: 300, damping: 20 }}
                  />
               )}
            </button>
         ))}
      </div>

      {/* Templates Grid Container */}
      {loading ? (
        <div className="flex flex-col items-center justify-center py-20 gap-4">
           <div className="w-8 h-8 rounded-full border-t-2 border-r-2 border-cyan-500 animate-spin"></div>
           <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest">Syncing Library...</p>
        </div>
      ) : (
        <motion.div 
           layout
           className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6"
        >
          <AnimatePresence mode="popLayout">
            {filteredTemplates.length > 0 ? (
              filteredTemplates.map(template => (
                <TemplateCardDeveloper key={template._id} template={template} />
              ))
            ) : (
              <motion.div 
                 initial={{ opacity: 0 }}
                 animate={{ opacity: 1 }}
                 exit={{ opacity: 0 }}
                 className="col-span-full py-20 flex flex-col items-center justify-center border border-dashed border-white/10 rounded-[2.5rem] bg-[#0A0A0A]/40"
              >
                 <div className="w-16 h-16 rounded-full bg-white/5 flex items-center justify-center mb-4">
                    <span className="text-2xl opacity-40">📁</span>
                 </div>
                 <p className="text-white/40 font-semibold text-lg tracking-tight">No templates found</p>
                 <p className="text-zinc-600 text-sm mt-1">Try selecting a different filter above.</p>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      )}
    </div>
  );
};

export default MyTemplates;
