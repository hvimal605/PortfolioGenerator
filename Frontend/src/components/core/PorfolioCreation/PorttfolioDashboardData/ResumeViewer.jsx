import { Worker, Viewer } from '@react-pdf-viewer/core';
import '@react-pdf-viewer/core/lib/styles/index.css';
import '@react-pdf-viewer/default-layout/lib/styles/index.css';
import { CiImageOn } from 'react-icons/ci';
import { ImNewTab } from "react-icons/im";

const ResumeViewer = ({ isEditing, resumeFile, formData, handleFileChange }) => {
  const resumeUrl = resumeFile ? URL.createObjectURL(resumeFile) : formData.resume;

  return (
    <div className="flex flex-col items-center md:items-start gap-4 w-full">
      {isEditing ? (
        <>
          {/* Open in New Tab Button */}
          {resumeUrl && (
            <div className="flex justify-center md:justify-end w-full">
              <button
                onClick={() => window.open(resumeUrl, '_blank')}
                className="border-amber-400 border px-6 py-2 rounded-lg text-yellow-500 font-medium hover:text-amber-500 hover:bg-amber-100"
              >
                <span className="flex gap-2 justify-center items-center">
                  <ImNewTab className="text-xl" />
                  Open Resume
                </span>
              </button>
            </div>
          )}

          {/* Preview the selected PDF file */}
          {resumeUrl && (
            <div className="w-full max-w-full sm:max-w-full md:max-w-[800px] h-[500px] border border-gray-700 rounded-lg shadow-md overflow-hidden">
              <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                <Viewer fileUrl={resumeUrl} />
              </Worker>
            </div>
          )}

          {/* File upload input */}
          <div className="flex justify-center w-full">
            <label
              htmlFor="resume"
              className="cursor-pointer flex items-center gap-2 px-4 py-2 rounded-lg border text-yellow-400 border-yellow-600 hover:bg-gray-800 mt-2"
            >
              <CiImageOn className='text-xl'/>
              Upload Resume (PDF)
              <input
                type="file"
                accept=".pdf"
                name="resume"
                onChange={handleFileChange}
                id="resume"
                className="hidden"
              />
            </label>
          </div>
        </>
      ) : (
        <>
          {formData.resume ? (
            <>
              <p className="text-gray-400 text-center md:text-left">Resume:</p>

              {/* Open in New Tab Button */}
              <div className="flex justify-center md:justify-end w-full">
                <button
                  onClick={() => window.open(formData.resume, '_blank')}
                  className="border-amber-400 border px-6 py-2 rounded-lg text-yellow-500 font-medium hover:text-amber-500 hover:bg-amber-100"
                >
                  <span className="flex gap-2 justify-center items-center">
                    <ImNewTab className="text-xl" />
                    Open Resume
                  </span>
                </button>
              </div>

              {/* PDF Preview */}
              <div className="w-full max-w-full sm:max-w-full md:max-w-[900px] h-[400px] border border-gray-700 rounded-lg shadow-md overflow-hidden">
                <Worker workerUrl="https://unpkg.com/pdfjs-dist@3.11.174/build/pdf.worker.min.js">
                  <Viewer fileUrl={formData.resume} />
                </Worker>
              </div>
            </>
          ) : (
            <p className="text-gray-400">No resume uploaded</p>
          )}
        </>
      )}
    </div>
  );
};

export default ResumeViewer;
