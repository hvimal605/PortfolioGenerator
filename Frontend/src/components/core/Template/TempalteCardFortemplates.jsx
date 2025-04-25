import { motion } from "framer-motion";
import AnimatedButton2 from "../../common/AnimatedButton2";
import { FaArrowCircleRight } from "react-icons/fa";

export default function TemplateCardFortemplates({ template, onSelect }) {
  const truncatedDescription = template.description.split(" ").length > 12
    ? template.description.split(" ").slice(0, 10).join(" ") + "..."
    : template.description;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative group cursor-pointer bg-black backdrop-blur-xl rounded-2xl overflow-hidden shadow-md hover:shadow-white transition duration-300 border border-white border-dashed"
    >
      {/* Template Preview Image with Overlay */}
      <div className="relative w-full h-64 overflow-hidden p-4  flex items-center justify-center">
        <img
          src={template.previewImage}
          alt={template.name}
          className="max-h-full max-w-full object-contain transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0 bg-gradient-to-t  to-transparent pointer-events-none"></div>
      </div>

      {/* Template Info */}
      <div className="p-5 text-white">
        <h2 className="text-xl font-bold tracking-wide text-blue-400 group-hover:text-green-400 transition duration-300">
          {template.name}
        </h2>
        <p className="text-sm text-gray-300 mt-2 leading-relaxed">
          {truncatedDescription}
        </p>
        <p className="text-xs text-gray-400 mt-3">
          Created by:{" "}
          <span className="font-medium text-gray-200">
            {template.CreatedBy?.firstName} {template.CreatedBy?.lastName}
          </span>
        </p>

        {/* Buttons */}
        <div className="mt-5 flex flex-col lg:flex-row items-center justify-center gap-4">
          <a
            href={template.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full lg:w-auto"
          >
            <AnimatedButton2 text="Preview Template" />
          </a>
          <button
            onClick={() => onSelect(template)}
            className="flex items-center gap-2 px-5 py-2 bg-gray-900 text-white font-semibold rounded-lg shadow-md hover:bg-pink-700 transition duration-300"
          >
            <FaArrowCircleRight className="text-xl" />
            Create
          </button>
        </div>
      </div>
    </motion.div>
  );
}
