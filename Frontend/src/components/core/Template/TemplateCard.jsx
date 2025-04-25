import { motion } from "framer-motion";
import AnimatedButton2 from "../../common/AnimatedButton2";
import { Link } from "react-router-dom";

export default function TemplateCard({ template, onSelect, onSeeDetails }) {
  const truncatedDescription =
    template.description.split(" ").length > 12
      ? template.description.split(" ").slice(0, 12).join(" ") + "..."
      : template.description;

  return (
    <motion.div
      whileHover={{ scale: 1.03 }}
      className="relative group cursor-pointer bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-2xl rounded-3xl overflow-hidden shadow-[0_8px_24px_rgba(255,0,128,0.3)] hover:shadow-pink-500/60 transition duration-300 border border-pink-500/20 hover:border-white/20 flex flex-col"
      style={{ minHeight: "480px" }}
    >
      {/* Image Preview */}
      <div className="relative w-full h-60 overflow-hidden">
        <img
          src={template.previewImage}
          alt={template.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-transparent" />
      </div>

      {/* Info Content */}
      <div className="p-6 text-white text-center flex flex-col justify-between flex-grow">
        <div>
          <h2 className="text-2xl font-bold text-white/90 group-hover:text-white transition duration-300 mb-2">
            {template.name}
          </h2>
          <p className="text-sm text-gray-300 leading-relaxed min-h-[48px]">
            {truncatedDescription}
          </p>
          <p className="text-xs text-gray-400 mt-3">
            Created by:{" "}
            <span className="font-semibold text-white">
              {template.CreatedBy?.firstName} {template.CreatedBy?.lastName}
            </span>
          </p>
        </div>

        {/* Buttons */}
        <div className="mt-6 flex flex-col sm:flex-row items-center justify-center gap-4">
          <Link
            to={template.previewUrl}
            target="_blank"
            rel="noopener noreferrer"
          >
            <AnimatedButton2 text=" Preview Template" />
          </Link>

          <button
            onClick={(e) => {
              e.stopPropagation();
              onSeeDetails(template);
            }}
            className="px-4 py-2 text-sm font-medium rounded-xl bg-black/80 hover:bg-black/60 text-white shadow-md transition-all duration-300 hover:scale-105"
          >
            👁 See Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}
