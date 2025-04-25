import React from "react";
import { FaDownload, FaCheckCircle, FaTimesCircle } from "react-icons/fa";
import { MdPending } from "react-icons/md";
import { Link } from "react-router-dom";

const statusStyle = {
  Approved: {
    label: "Approved",
    color: "text-green-400",
    icon: <FaCheckCircle className="text-green-400" size={16} />,
    border: "border-green-500/50",
    glow: "shadow-[0_0_10px_#22c55e33]",
  },
  Rejected: {
    label: "Rejected",
    color: "text-red-400",
    icon: <FaTimesCircle className="text-red-400" size={16} />,
    border: "border-red-500/50",
    glow: "shadow-[0_0_10px_#ef444433]",
  },
  Pending: {
    label: "Pending",
    color: "text-yellow-400",
    icon: <MdPending className="text-yellow-400" size={18} />,
    border: "border-yellow-500/50",
    glow: "shadow-[0_0_10px_#eab30833]",
  },
};

const TemplateReqCard = ({ template, onStatusChange }) => {
  const { status } = template;
  const style = statusStyle[status] || statusStyle["Pending"];

  return (
    <div className={`relative bg-[#0e1014]/60 backdrop-blur-md border ${style.border} ${style.glow} rounded-2xl p-6 text-white shadow-xl hover:scale-[1.02] transition-transform duration-300`}>
      
      {/* Top shimmer border */}
      <div className="absolute -top-[1px] left-1/2 -translate-x-1/2 w-1/2 h-[2px] bg-gradient-to-r from-pink-500 via-purple-500 to-blue-500 blur-sm animate-pulse"></div>

      {/* Header */}
      <div className="flex justify-between items-start mb-3">
        <div>
          <h2 className="text-xl font-bold tracking-tight">{template.name}</h2>
          <p className="text-sm text-gray-400 mt-1">{template.description}</p>
        </div>
        <div
          className={`flex items-center gap-2 text-xs font-semibold px-3 py-1 rounded-full bg-black/30 border ${style.border}`}
        >
          {style.icon}
          {style.label}
        </div>
      </div>

      {/* Metadata */}
      <div className="text-sm space-y-1 text-gray-300 mb-4">
        <p>
          Uploaded by:{" "}
          <span className="text-white font-medium">
            {template.createdBy.firstName} {template.createdBy.lastName}
          
          </span>
          
        </p>

        <p>
          DeveloperId:{" "}
          <span className="text-white font-medium">
            {template.createdBy._id} 
          
          </span>
          
        </p>
        <p>
          Created at:{" "}
          <span className="text-white">
            {new Date(template.createdAt).toLocaleString()}
          </span>
        </p>
        {template.reviewedAt && (
          <p>
            Reviewed at:{" "}
            <span className="text-blue-400">
              {new Date(template.reviewedAt).toLocaleString()}
            </span>
          </p>
        )}
      </div>

      {/* Actions */}
      <div className="flex flex-wrap gap-3">
        

        <Link
          to={`${template.uploadedUrl}`}
          download
          className="flex items-center gap-2 bg-gray-900 hover:bg-gray-800 px-4 py-2 rounded-lg text-sm shadow-sm"
        >
          <FaDownload size={14} />
          Download
        </Link>

        <select
          value={status}
          onChange={(e) => onStatusChange(template._id, e.target.value)}
          className="bg-gray-900 border border-gray-700 rounded-lg px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="Pending">Pending</option>
          <option value="Approved">Approved</option>
          <option value="Rejected">Rejected</option>
        </select>
      </div>
    </div>
  );
};

export default TemplateReqCard;
