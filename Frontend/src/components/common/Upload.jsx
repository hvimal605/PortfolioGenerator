import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { FiUploadCloud } from "react-icons/fi";
import { motion, AnimatePresence } from "framer-motion";

export default function Upload({
  name,
  label,
  register,
  setValue,
  errors,
  onFileSelect,
  watch,
  clearErrors,
  setError,
  color = "yellow",
}) {
  const [previewSource, setPreviewSource] = useState("");
  const [isPdf, setIsPdf] = useState(false);

  const onDrop = (acceptedFiles) => {
    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      previewFile(file);
      setValue(name, file);
      onFileSelect(file);

      if (file.type.startsWith("image")) {
        clearErrors(name);
      } else if (file.type === "application/pdf") {
        // PDF is optional, so no validation
      } else {
        setError(name, { type: "manual", message: "Only image or PDF files are allowed" });
      }
    }
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: {
      "image/*": [ ".png", ".jpeg", ".jpg"],
      "application/pdf": [".pdf"],
    },
    onDrop,
  });

  const previewFile = (file) => {
    const reader = new FileReader();
    if (file.type.startsWith("image")) {
      reader.readAsDataURL(file);
      reader.onloadend = () => {
        setPreviewSource(reader.result);
        setIsPdf(false);
      };
    } else if (file.type === "application/pdf") {
      setPreviewSource(file.name);
      setIsPdf(true);
    }
  };

  useEffect(() => {
    register(name); // No "required" here
  }, [register, name]);

  useEffect(() => {
    if (!watch(name)) {
      setPreviewSource("");
      setIsPdf(false);
    }
  }, [watch(name)]);

  const colorMap = {
    yellow: {
      border: "border-yellow-400/40",
      iconBg: "bg-yellow-500/10",
      iconColor: "text-yellow-400",
      text: "text-yellow-200",
      subText: "text-yellow-300",
      cancel: "text-yellow-300",
      cancelHover: "hover:text-yellow-400",
      imgBorder: "border-yellow-400/20",
      label: "text-yellow-300",
    },
    blue: {
      border: "border-blue-400/40",
      iconBg: "bg-blue-500/10",
      iconColor: "text-blue-400",
      text: "text-blue-200",
      subText: "text-blue-300",
      cancel: "text-blue-300",
      cancelHover: "hover:text-blue-400",
      imgBorder: "border-blue-400/20",
      label: "text-blue-300",
    },
    green: {
      border: "border-green-400/40",
      iconBg: "bg-green-500/10",
      iconColor: "text-green-400",
      text: "text-green-200",
      subText: "text-green-300",
      cancel: "text-green-300",
      cancelHover: "hover:text-green-400",
      imgBorder: "border-green-400/20",
      label: "text-green-300",
    },
    purple: {
      border: "border-purple-400/40",
      iconBg: "bg-purple-500/10",
      iconColor: "text-purple-400",
      text: "text-purple-200",
      subText: "text-purple-300",
      cancel: "text-purple-300",
      cancelHover: "hover:text-purple-400",
      imgBorder: "border-purple-400/20",
      label: "text-purple-300",
    },
  };

  const theme = colorMap[color] || colorMap.yellow;

  return (
    <div className="flex flex-col space-y-2 w-full max-w-md">
      <label className={`text-sm font-semibold mb-1 ${theme.label}`}>{label}</label>

      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.02 }}
        className={`${
          isDragActive ? "bg-[#1d1d1d]" : "bg-black/30"
        } transition-all duration-300 border-2 border-dashed rounded-2xl ${theme.border} shadow-md min-h-[260px] flex items-center justify-center cursor-pointer overflow-hidden`}
      >
        <input {...getInputProps()} />

        <AnimatePresence>
          {previewSource ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              className="flex flex-col w-full p-4"
            >
              {isPdf ? (
                <div className="text-white">
                  <p>{previewSource}</p>
                </div>
              ) : (
                <img
                  src={previewSource}
                  alt="Preview"
                  className={`max-h-64 w-full object-contain bg-neutral-900 rounded-lg border ${theme.imgBorder}`}
                />
              )}
              <motion.button
                type="button"
                whileHover={{ scale: 1.05 }}
                onClick={() => {
                  setPreviewSource("");
                  setValue(name, null);
                  onFileSelect(null);
                }}
                className={`mt-3 text-sm underline self-start ${theme.cancel} ${theme.cancelHover}`}
              >
                Cancel
              </motion.button>
            </motion.div>
          ) : (
            <motion.div
              key="drop"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="flex flex-col items-center p-6 text-white text-sm"
            >
              <div className={`grid aspect-square w-14 place-items-center rounded-full ${theme.iconBg} shadow-inner`}>
                <FiUploadCloud className={`text-2xl ${theme.iconColor}`} />
              </div>
              <p className={`mt-3 text-center ${theme.text}`}>
                Drag and drop or{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className={`font-bold underline ${theme.cancelHover}`}
                >
                  browse
                </button>
              </p>
              <ul className={`mt-6 space-y-1 text-xs text-center ${theme.subText}`}>
                <li>Supported: PNG, JPG, PDF</li>
                <li>Recommended size: 1024x576 for images</li>
              </ul>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {errors[name] && (
        <span className="text-xs text-pink-300 font-medium ml-1">
          {errors[name]?.message}
        </span>
      )}
    </div>
  );
}
