import { useEffect, useState } from "react";
import TemplateCard from "../Template/TemplateCard";
import { getAllTemplates } from "../../../services/operations/TemplateApi";
import Button from "../../common/AnimatedButton";

import { motion } from "framer-motion";
import { AiOutlineClose } from "react-icons/ai";

export default function TemplateSelection({ onTemplateSelect }) {

  const [templates, setTemplates] = useState([]);
  const [selectedTemplate, setSelectedTemplate] = useState(null);
  const [modalTemplate, setModalTemplate] = useState(null);


  useEffect(() => {
    const fetchTemplates = async () => {
      const result = await getAllTemplates();
      // console.log("ye hai apne sb templates",result)
      if (result) {
        setTemplates(result)
      }
    }
    fetchTemplates()
  }, [])




  const handleSelect = (template) => {
    setSelectedTemplate(template);
    onTemplateSelect(template); // Pass the selected template back to PortfolioCreatePage
  };
  return (
    <div className="p-4">
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {templates.map((template) => (
          <div
            key={template._id}
            onClick={() => handleSelect(template)} // Clicking the card selects
            className={`relative transition-transform duration-300 ease-in-out ${selectedTemplate?._id === template._id
              ? "border-8 border-green-600 scale-105 shadow-lg"
              : "border border-transparent"
              } rounded-xl`}
          >
            {selectedTemplate?._id === template._id && (
              <div className="absolute top-2 right-2 bg-green-600 border-green-300 border-2  text-white text-sm font-bold rounded-full w-8 h-8 flex items-center justify-center shadow-md z-10">
                ✓
              </div>
            )}

            <TemplateCard
              template={template}
              onSelect={handleSelect}
              onSeeDetails={(template) => setModalTemplate(template)}
            />
          </div>
        ))}

      </div>

      {modalTemplate && (
        <motion.div
          className="fixed inset-0 bg-black/70 backdrop-blur-sm z-50 flex items-center justify-center p-4"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
        >
          <motion.div
            className="bg-gradient-to-br from-gray-800 via-gray-900 to-black border border-white/10 backdrop-blur-xl text-white p-6 rounded-2xl shadow-2xl w-full max-w-lg relative"
            initial={{ scale: 0.8 }}
            animate={{ scale: 1 }}
            transition={{ type: "spring", stiffness: 200 }}
          >
        

            <button
              onClick={() => setModalTemplate(null)}
              className="absolute top-3 right-4 text-white hover:text-white transition"
            >
              <AiOutlineClose className="text-3xl" />
            </button>

            <h2 className="text-3xl font-bold mb-2">{modalTemplate.name}</h2>
            <p className="text-sm text-gray-300">{modalTemplate.description}</p>
            <p className="text-xs text-gray-400 mt-1">
              Created by:{" "}
              <span className="font-semibold text-white">
                {modalTemplate.CreatedBy?.firstName} {modalTemplate.CreatedBy?.lastName}
              </span>
            </p>
            {/* Fixed image size with hover effect */}
            <div className="mt-4 max-h-64 overflow-hidden rounded-lg">
              <div className="mt-4 rounded-lg border border-white/10 shadow-lg overflow-hidden">
                <div className="w-full aspect-video">
                  <img
                    src={modalTemplate.previewImage}
                    alt={modalTemplate.name}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>

            </div>
          </motion.div>
        </motion.div>
      )}



    </div>
  );
}
