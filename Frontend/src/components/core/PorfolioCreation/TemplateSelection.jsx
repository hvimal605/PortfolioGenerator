import { useEffect, useState } from "react";
import TemplateCardFortemplates from "../Template/TempalteCardFortemplates";
import { getAllTemplates } from "../../../services/operations/TemplateApi";
import { motion } from "framer-motion";

export default function TemplateSelection({ onTemplateSelect }) {
  const [templates, setTemplates] = useState([]);
  const [selectedTemplateId, setSelectedTemplateId] = useState(null);

  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getAllTemplates();
      if (result) setTemplates(result);
    };
    fetchTemplates();
  }, []);

  const handleSelect = (template) => {
    // When a template is clicked from the card's action button
    setSelectedTemplateId(template._id);
    onTemplateSelect(template);
  };

  return (
    <div className="space-y-12">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-10 lg:gap-14 max-w-5xl mx-auto">
        {templates.map((template) => (
          <motion.div
            key={template._id}
            layout
            className={`relative transition-all duration-500 rounded-[3rem] ${
              selectedTemplateId === template._id
                ? "ring-4 ring-indigo-500 shadow-[0_0_60px_rgba(79,70,229,0.4)] scale-[1.02]"
                : "ring-0"
            }`}
          >
            {selectedTemplateId === template._id && (
               <motion.div 
                 initial={{ scale: 0 }}
                 animate={{ scale: 1 }}
                 className="absolute -top-3 -right-3 bg-indigo-500 text-white text-lg font-black rounded-full w-12 h-12 flex items-center justify-center shadow-2xl z-[100] border-4 border-[#111111]"
               >
                 ✓
               </motion.div>
            )}

            <div className="w-full h-full pointer-events-auto">
               <TemplateCardFortemplates
                 template={template}
                 onSelect={handleSelect}
               />
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
