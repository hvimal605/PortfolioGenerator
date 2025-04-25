import React, { useState } from "react";
import { useDropzone } from "react-dropzone";

const FileUpload = ({ setSvg }) => {
  const [svgPreview, setSvgPreview] = useState("");
  const onDrop = (acceptedFiles) => {
    const file = acceptedFiles[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = () => {
      setSvgPreview(reader.result);
      setSvg(file);
    };
  };

  return (
    <div className="w-full col-span-full">
      <label className="block text-sm font-medium leading-6 text-gray-900">
        Skill Svg
      </label>
      <div className="mt-2 flex justify-center rounded-lg border-2 border-dashed border-gray-500 px-2 py-8">
        <div className="text-center" {...useDropzone({ onDrop })}>
          <input type="file" onChange={(e) => onDrop(e.target.files)} />
          {svgPreview ? (
            <img className="mx-auto h-36 w-36 text-gray-300" src={svgPreview} alt="Preview" />
          ) : (
            <>
              <span className="text-blue-400 font-semibold text-xl">Upload</span>
              <p> PNG, JPG, GIF up to 10MB</p>
              <p className="mt-1 text-sm text-gray-600">Drag 'n' drop an image here, or click to select one</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default FileUpload;