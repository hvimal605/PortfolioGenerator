import { useEffect, useState } from "react";
import { useDropzone } from "react-dropzone";
import { HiOutlineCloudArrowUp, HiOutlineDocumentText, HiOutlineXMark, HiOutlinePhoto } from "react-icons/hi2";
import { motion, AnimatePresence } from "framer-motion";
import { toast } from "sonner";

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
  color = "amber",
  accept,
}) {
  const [previewSource, setPreviewSource] = useState("");
  const [isPdf, setIsPdf] = useState(false);
  const [fileName, setFileName] = useState("");

  // Determine accepted file types
  const isPdfUpload = accept === "application/pdf";
  const acceptConfig = isPdfUpload
    ? { "application/pdf": [".pdf"] }
    : { "image/png": [".png"], "image/jpeg": [".jpg", ".jpeg"] };

  const allowedLabel = isPdfUpload ? "PDF only" : "JPG, PNG only";

  const onDrop = (acceptedFiles, rejectedFiles) => {
    if (rejectedFiles.length > 0) {
      toast.error(`Only ${allowedLabel} files are allowed`);
      return;
    }

    if (acceptedFiles.length > 0) {
      const file = acceptedFiles[0];
      previewFile(file);
      setValue(name, file);
      setFileName(file.name);
      if (onFileSelect) onFileSelect(file);
      if (clearErrors) clearErrors(name);
    }
  };

  const { getRootProps, getInputProps, open, isDragActive } = useDropzone({
    accept: acceptConfig,
    maxFiles: 1,
    onDrop,
  });

  const previewFile = (file) => {
    if (file.type.startsWith("image")) {
      const reader = new FileReader();
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

  const handleRemove = (e) => {
    e.stopPropagation();
    setPreviewSource("");
    setFileName("");
    setIsPdf(false);
    setValue(name, null);
    if (onFileSelect) onFileSelect(null);
  };

  useEffect(() => {
    register(name);
  }, [register, name]);

  useEffect(() => {
    const val = watch ? watch(name) : null;
    if (val instanceof File) {
      setFileName(val.name);
      if (val.type.startsWith("image")) {
        const reader = new FileReader();
        reader.readAsDataURL(val);
        reader.onloadend = () => {
          setPreviewSource(reader.result);
          setIsPdf(false);
        };
      } else if (val.type === "application/pdf") {
        setPreviewSource(val.name);
        setIsPdf(true);
      }
    } else if (typeof val === "string" && val.startsWith("http")) {
      setPreviewSource(val);
      setFileName(val.split("/").pop().split("?")[0]);
      setIsPdf(val.toLowerCase().endsWith(".pdf"));
    } else if (!val) {
      setPreviewSource("");
      setIsPdf(false);
      setFileName("");
    }
  }, [watch ? watch(name) : null]);

  // Theme colors
  const themes = {
    amber: {
      accent: "text-amber-400",
      accentBg: "bg-amber-500/10",
      border: "border-amber-500/20",
      borderActive: "border-amber-500/40",
      ring: "ring-amber-500/20",
    },
    indigo: {
      accent: "text-indigo-400",
      accentBg: "bg-indigo-500/10",
      border: "border-indigo-500/20",
      borderActive: "border-indigo-500/40",
      ring: "ring-indigo-500/20",
    },
    emerald: {
      accent: "text-emerald-400",
      accentBg: "bg-emerald-500/10",
      border: "border-emerald-500/20",
      borderActive: "border-emerald-500/40",
      ring: "ring-emerald-500/20",
    },
    blue: {
      accent: "text-blue-400",
      accentBg: "bg-blue-500/10",
      border: "border-blue-500/20",
      borderActive: "border-blue-500/40",
      ring: "ring-blue-500/20",
    },
    rose: {
      accent: "text-rose-400",
      accentBg: "bg-rose-500/10",
      border: "border-rose-500/20",
      borderActive: "border-rose-500/40",
      ring: "ring-rose-500/20",
    },
  };

  const t = themes[color] || themes.amber;

  return (
    <div className="flex flex-col gap-1.5 w-full">
      <label className={`text-sm font-medium text-gray-400 ml-1`}>
        {label}
      </label>

      <motion.div
        {...getRootProps()}
        whileHover={{ scale: 1.01 }}
        whileTap={{ scale: 0.99 }}
        className={`relative group cursor-pointer rounded-2xl border-2 border-dashed transition-all duration-300 overflow-hidden ${
          isDragActive
            ? `${t.borderActive} bg-white/[0.04]`
            : `border-white/10 bg-white/[0.02] hover:border-white/20 hover:bg-white/[0.03]`
        }`}
      >
        <input {...getInputProps()} />

        <AnimatePresence mode="wait">
          {previewSource ? (
            <motion.div
              key="preview"
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="p-4"
            >
              {isPdf ? (
                /* PDF preview */
                <div className="flex items-center gap-4 p-4 bg-white/[0.03] rounded-xl border border-white/5">
                  <div className={`w-12 h-12 rounded-xl ${t.accentBg} flex items-center justify-center`}>
                    <HiOutlineDocumentText className={`text-2xl ${t.accent}`} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm font-medium text-white truncate">{fileName}</p>
                    <p className="text-xs text-gray-500">PDF Document</p>
                  </div>
                </div>
              ) : (
                /* Image preview */
                <div className="relative">
                  <img
                    src={previewSource}
                    alt="Preview"
                    className="w-full h-48 object-contain rounded-xl bg-black/50"
                  />
                  <p className="text-xs text-gray-500 mt-2 text-center truncate">{fileName}</p>
                </div>
              )}

              {/* Remove button */}
              <button
                type="button"
                onClick={handleRemove}
                className="absolute top-3 right-3 w-8 h-8 rounded-lg bg-black/60 backdrop-blur text-gray-400 hover:text-red-400 hover:bg-red-500/10 flex items-center justify-center transition-all border border-white/10"
              >
                <HiOutlineXMark className="text-lg" />
              </button>
            </motion.div>
          ) : (
            /* Drop zone */
            <motion.div
              key="dropzone"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="flex flex-col items-center py-10 px-6"
            >
              <div className={`w-14 h-14 rounded-2xl ${t.accentBg} flex items-center justify-center mb-4`}>
                {isPdfUpload ? (
                  <HiOutlineDocumentText className={`text-2xl ${t.accent}`} />
                ) : (
                  <HiOutlinePhoto className={`text-2xl ${t.accent}`} />
                )}
              </div>

              <p className="text-sm text-gray-300 text-center">
                Drag and drop or{" "}
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    open();
                  }}
                  className={`font-semibold ${t.accent} hover:underline`}
                >
                  browse
                </button>
              </p>

              <div className="flex items-center gap-2 mt-3">
                <span className="text-xs text-gray-500 px-2 py-0.5 bg-white/5 rounded-md">
                  {allowedLabel}
                </span>
                {!isPdfUpload && (
                  <span className="text-xs text-gray-600">
                    Max 5MB
                  </span>
                )}
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.div>

      {/* Error message */}
      {errors?.[name] && (
        <p className="text-xs text-red-400 ml-1">
          {errors[name]?.message || "This field is required"}
        </p>
      )}
    </div>
  );
}
