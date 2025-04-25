import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import {
  getAllRequestedTemplates,
  reviewTemplateRequest,
} from "../../../services/operations/TemplateApi";
import TemplateReqCard from "./TemplateReqCard";

const TemplateRequests = () => {
  const [templates, setTemplates] = useState([]);
  const [filter, setFilter] = useState("All");
  const { token } = useSelector((state) => state.auth);

  useEffect(() => {
    const fetchTemplates = async () => {
      try {
        const res = await getAllRequestedTemplates(token);
        if (Array.isArray(res)) {
          setTemplates(res);
        } else {
          console.warn("Unexpected response:", res);
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

  const filteredTemplates =
    filter === "All"
      ? templates
      : templates.filter((t) => t.status === filter);

  return (
    <div className="p-6 bg-black text-white">
      {/* Heading */}
      <div className="mb-8 text-center">
        <h1 className="text-3xl md:text-4xl font-bold bg-gradient-to-r from-purple-500 via-pink-500 to-blue-500 text-transparent bg-clip-text">
          Template Review Requests
        </h1>
        <div className="mt-2 h-[2px] w-24 mx-auto bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 rounded-full animate-pulse"></div>
      </div>

      {/* Filter Dropdown */}
      <div className="mb-8 flex justify-center">
  <div className="relative w-64">
    <select
      value={filter}
      onChange={(e) => setFilter(e.target.value)}
      className="w-full appearance-none bg-gray-900 text-white px-5 py-3 pr-10 rounded-xl border border-gray-700 shadow-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition duration-300 text-base"
    >
      <option value="All">🌐 All</option>
      <option value="Pending">⏳ Pending</option>
      <option value="Approved">✅ Approved</option>
      <option value="Rejected">❌ Rejected</option>
    </select>

    {/* Down Arrow Icon */}
    <div className="absolute inset-y-0 right-3 flex items-center pointer-events-none">
      <svg
        className="w-5 h-5 text-gray-400"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        viewBox="0 0 24 24"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
      </svg>
    </div>
  </div>
</div>


      {/* Filter Title */}
      {filter !== "All" && (
        <h2 className="text-center text-lg text-gray-300 mb-4">
          Showing <span className="text-white font-semibold">{filter}</span> Templates
        </h2>
      )}

      {/* Content */}
      {filteredTemplates.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredTemplates.map((template, index) => (
            <div
              key={template._id}
              className="animate-fade-in"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <TemplateReqCard
                template={template}
                onStatusChange={handleStatusChange}
              />
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center text-gray-400 mt-20">
          <p className="text-lg">No {filter !== "All" ? filter.toLowerCase() : ""} template requests found 👀</p>
          <p className="text-sm mt-2">
            Once developers submit templates, you’ll see them here.
          </p>
        </div>
      )}
    </div>
  );
};

export default TemplateRequests;
