import React from "react";
import { FaCheckCircle } from "react-icons/fa";
import { FiAlertTriangle } from "react-icons/fi";

const Instructions = () => {
  const instructionsData = {
    title: "Portfolio Template Submission Instructions",
    steps: [
      "Upload a ZIP file containing your portfolio template.",
      "The template should be built using React .",
      
      "Do not hardcode values for projects, about me, skills, or timeline—use sample JSON data instead.",
     
      "Once uploaded, our team will review your template and make necessary backend integrations.",
      "The review process takes 5-7 days. You’ll receive an email once your template is published on our platform.",
      "Your template must include the following sections:",
    ],
    sections: [
      "Hero Section (User's Name & Image)",
      "About Me (Fetch data dynamically)",
      "Projects (Use JSON for project details)",
      "Skills (Dynamic skill display)",
      "Timeline (Fetched from JSON data)",
      "Contact Form"
    ],
    note: "Ensure your template is fully responsive and optimized before submission."
  };

  return (
    
    <div className="blinking-border max-w-xl mx-auto bg-gray-900 text-gray-200 shadow-lg rounded-xl p-6 my-2 border border-gray-700">
      {/* Title */}
      <h2 className="text-2xl font-bold bg-gradient-to-r from-green-400 to-blue-500 bg-clip-text text-transparent mb-6 flex items-center">
        <FaCheckCircle className="text-green-400 mr-2 text-3xl animate-pulse" />
        {instructionsData.title}
      </h2>

      {/* Instructions List */}
      <ol className="list-decimal pl-4 space-y-3 text-gray-300 text-base leading-relaxed">
        {instructionsData.steps.map((step, index) => (
          <li
            key={index}
            className="transition-all hover:text-blue-400 hover:translate-x-1 duration-300 font-medium"
          >
            {step}
          </li>
        ))}
      </ol>

      {/* Sections Breakdown */}
      <div className="mt-6 bg-gray-800 p-4 rounded-lg shadow-md border border-gray-700">
        <h3 className="text-lg font-semibold text-gray-100 mb-3 underline decoration-green-400">
          Required Sections:
        </h3>
        <ul className="list-disc pl-4 space-y-2 text-base">
          {instructionsData.sections.map((section, index) => (
            <li
              key={index}
              className="text-gray-400 hover:text-green-300 transition-all hover:translate-x-1 duration-300 font-medium"
            >
              {section}
            </li>
          ))}
        </ul>
      </div>

      {/* Important Note */}
      <div className="mt-6 p-4 bg-red-800 border-l-4 border-red-500 text-red-200 rounded-lg flex items-center shadow-md">
        <FiAlertTriangle className="mr-3 text-2xl animate-pulse" />
        <span className="text-base font-semibold">{instructionsData.note}</span>
      </div>
    </div>
  );
};

export default Instructions;
