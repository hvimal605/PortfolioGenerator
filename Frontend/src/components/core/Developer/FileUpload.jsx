import React, { useState, useEffect } from "react";
import { useDropzone } from "react-dropzone";
import { FcFolder } from "react-icons/fc";
import { RiFolderZipLine } from "react-icons/ri";

const ZipUpload = ({ onFileUpload, resetTrigger }) => {
  const [file, setFile] = useState(null);

  useEffect(() => {
    // Reset file state when resetTrigger changes
    setFile(null);
  }, [resetTrigger]);

  const { getRootProps, getInputProps, isDragActive } = useDropzone({
    accept: { "application/zip": [".zip"] },
    multiple: false,
    onDrop: (acceptedFiles) => {
      const uploadedFile = acceptedFiles[0];
      setFile(uploadedFile);
      onFileUpload(uploadedFile);
    },
  });

  const formatFileSize = (size) => {
    if (size < 1024) return `${size} B`;
    if (size < 1024 * 1024) return `${(size / 1024).toFixed(2)} KB`;
    return `${(size / (1024 * 1024)).toFixed(2)} MB`;
  };

  return (
    <div className="flex flex-col items-center justify-center space-y-4 mt-4">
      <div className="relative w-72 h-72 flex items-center justify-center">
        <div className="absolute w-full h-full border-4 border-dashed border-t-pink-300 border-l-pink-300 border-b-cyan-300 border-r-cyan-400 rounded-full animate-[spin_20s_linear_infinite]" />
        <div
          {...getRootProps()}
          className={`relative w-64 h-64 flex flex-col items-center justify-center rounded-full border-4 border-dashed cursor-pointer transition-all bg-gray-100 ${
            isDragActive ? "border-black bg-gray-300" : "border-transparent"
          }`}
        >
          <input {...getInputProps({ accept: ".zip" })} />

          <div className="flex flex-col items-center text-center">
            {file ? (
              <>
                <FcFolder size={75} className="mb-2" />
                <p className="text-black text-md">{file.name}</p>
                <p className="text-gray-900 text-sm">Size: {formatFileSize(file.size)}</p>
              </>
            ) : (
              <>
                <RiFolderZipLine size={75} className="text-yellow-600 mb-2" />
                <p className="text-gray-800 text-md font-semibold">
                  Drag and drop your site output <span className="text-green-500">ZIP</span> folder here.
                </p>
                <p className="text-blue-500 text-md underline underline-offset-4 hover:no-underline">
                  Browse to upload
                </p>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ZipUpload;
