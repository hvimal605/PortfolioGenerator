import { motion } from "framer-motion";
import { FaDownload } from "react-icons/fa";
import { SlCalender } from "react-icons/sl";
import { MdDone } from "react-icons/md";
import { TbInfoCircle } from "react-icons/tb";
import AnimatedButton2 from "../../common/AnimatedButton2";
import { format } from "date-fns";

export default function TemplateCardDeveloper({ template }) {
  const status = template.status;
  const formattedDate = (date) =>
    date && date !== "Pending" && date !== "Rejected"
      ? format(new Date(date), "dd MMM yyyy")
      : date;

  const statusColor = {
    Approved: "text-green-400 bg-green-700/20",
    Pending: "text-yellow-400 bg-yellow-600/20",
    Rejected: "text-red-500 bg-red-700/20",
  };

  return (
    <motion.div
      className="relative group bg-gradient-to-br from-black/60 via-gray-900/40 to-black/80 border border-pink-700 rounded-2xl overflow-hidden shadow-[0_0_15px_#ec4899] transition-all duration-300 hover:scale-[1.015] w-full max-w-2xl mx-auto"
      whileHover={{ scale: 1.025 }}
    >
      {/* Shine Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-white/5 via-transparent to-white/5 pointer-events-none" />

      {/* Card Content */}
      <div className="relative p-5 sm:p-6 md:p-8 text-white space-y-5 z-10">
        {/* Header */}
        <div className="flex flex-col gap-1 items-center text-center">
          <h2 className="text-xl sm:text-2xl font-bold text-white/90 tracking-wide group-hover:text-white transition">
            {template.name}
          </h2>
          <p className="text-sm sm:text-base text-gray-400">{template.description}</p>
        </div>

        {/* Status & Date Info */}
        <div className="text-sm sm:text-base space-y-2 text-gray-400">
          <div className="flex items-center gap-2">
            <SlCalender />
            <span className="text-white">Submitted:</span>{" "}
            {formattedDate(template.createdAt)}
          </div>

          {template.reviewedAt && (
            <div className="flex items-center gap-2">
              <MdDone className="text-green-400" />
              <span className="text-white">Reviewed:</span>{" "}
              {formattedDate(template.reviewedAt)}
            </div>
          )}

          <div className="flex items-center gap-2 mt-2 font-semibold">
            <TbInfoCircle />
            <span>Status:</span>
            <span
              className={`px-3 py-1 rounded-full font-semibold text-sm ${statusColor[status]} transition-all duration-300`}
            >
              {status}
            </span>
          </div>
        </div>

        {/* Buttons Row */}
      {/* Buttons Row */}
<div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center sm:items-start gap-4 pt-4">
  <a
    href={template.previewUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="w-full sm:w-auto flex justify-center"
  >
    <AnimatedButton2 text="Preview Template" />
  </a>

  <a
    href={template.uploadedUrl}
    target="_blank"
    rel="noopener noreferrer"
    className="text-white hover:text-pink-500 text-2xl transition duration-300 flex justify-center"
    title="Download Template"
  >
    <FaDownload />
  </a>
</div>

      </div>
    </motion.div>
  );
}
