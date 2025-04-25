import { useState, useEffect } from "react";
import { AiOutlineDelete } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { deleteSoftwareApp, updateSoftwareApp } from "../../../../services/operations/PortfolioApi";
import { AiOutlineEdit, AiOutlineCheck } from "react-icons/ai";
import { FaImage } from "react-icons/fa6";
import { AiOutlineFileAdd } from "react-icons/ai";
import { FaLaptopCode } from "react-icons/fa";
export const SoftwareApplications = ({ software }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localSoftware, setLocalSoftware] = useState([]);
  const [editedSoftware, setEditedSoftware] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setLocalSoftware(software);
    setEditedSoftware(
      software.map((app) => ({
        ...app,
        newSvgFile: null,
        previewSvgUrl: app.svg?.url || null,
      }))
    );
  }, [software]);

  const handleSvgChange = (index, file) => {
    const updated = [...editedSoftware];
    updated[index].newSvgFile = file;
    updated[index].previewSvgUrl = URL.createObjectURL(file);
    setEditedSoftware(updated);
  };

  const handleDelete = async (index, id) => {
    try {
      setLoadingIndex(index);
      const success = await deleteSoftwareApp({ softwareId: id, portfolioId, token });
      if (success) {
        const updatedSoftware = [...localSoftware];
        updatedSoftware.splice(index, 1);
        setLocalSoftware(updatedSoftware);

        const updatedEdited = [...editedSoftware];
        updatedEdited.splice(index, 1);
        setEditedSoftware(updatedEdited);
        toast.success("Software application deleted");
      }
    } catch (error) {
      console.error("Error deleting software application:", error);
      toast.error("Failed to delete software application");
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleUpdate = async (index) => {
    const app = editedSoftware[index];

    const isUnchanged = !app.newSvgFile;

    if (isUnchanged) {
      toast("No changes to update");
      return;
    }

    const formData = new FormData();
    formData.append("softwareId", app._id);
    formData.append("portfolioId", portfolioId);
    if (app.newSvgFile) {
      formData.append("svg", app.newSvgFile);
    }

    try {
      setLoadingIndex(index);
      const response = await updateSoftwareApp(formData, token);

      if (response?.success) {
        const updatedSoftware = [...localSoftware];
        if (app.newSvgFile) {
          updatedSoftware[index].svg = {
            url: app.previewSvgUrl,
          };
        }

        setLocalSoftware(updatedSoftware);
        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error updating software application:", error);
      toast.error("Failed to update software application");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="w-full mt-6 border  p-4 rounded-lg bg-black border-blue-700 shadow-[0_0_10px_#1f2937]">
    <div className="flex flex-col sm:flex-row justify-center sm:justify-between items-center border-b border-blue-700 pb-3 gap-3">
  {/* Heading with Icon */}
  <h2 className="text-2xl font-semibold text-blue-400 text-center sm:text-left mb-2 sm:mb-0 flex items-center justify-center sm:justify-start gap-2">
    {/* Icon in Heading */}
    <FaLaptopCode size={26} className="text-blue-400" />
    Software App
  </h2>

  {/* Button */}
  <button
    className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:brightness-125 text-white px-4 py-2 rounded-lg shadow-md transition-all duration-300 flex items-center gap-2 mt-1 sm:mt-0"
    onClick={() => setIsEditMode(!isEditMode)}
  >
    {/* Conditional Icon */}
    {isEditMode ? (
      <AiOutlineCheck size={20} />
    ) : (
      <AiOutlineEdit size={20} />
    )}
    <span>{isEditMode ? "Done" : "Manage"}</span>
  </button>
</div>

  
    <div className="p-2 rounded-lg w-full">
    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
  {localSoftware.map((app, index) => {
    const edited = editedSoftware[index];
    return (
      <div
        key={index}
        className="relative flex flex-col items-center bg-[#1e1e1e] p-6 rounded-lg border border-[#333] transition-transform transform hover:shadow-md hover:shadow-[#ff0080] overflow-hidden"
      >
        {/* Display the app name */}
        <span className="text-white font-semibold text-center mb-4 text-lg">
          {app.name}
        </span>

        {/* Display the original or preview SVG image for the app */}
        {edited?.previewSvgUrl ? (
          <img
            src={edited.previewSvgUrl}
            alt="Preview"
            className="w-20 h-20 mt-2 object-contain rounded-lg border-2 border-[#444] shadow-md"
          />
        ) : (
          app.svg?.url && (
            <img
              src={app.svg.url}
              alt={app.name}
              className="w-20 h-20 mt-2 object-contain rounded-lg border-2 border-[#444] shadow-md"
            />
          )
        )}

        {/* Edit Mode: Show Delete button */}
        {isEditMode && (
          <button
            onClick={() => handleDelete(index, app._id)}
            disabled={loadingIndex === index}
            className="absolute top-3 right-3 text-red-500 hover:text-red-600 transition-all duration-200 ease-in-out disabled:opacity-50"
          >
            <AiOutlineDelete size={20} />
          </button>
        )}

        {/* Edit Mode: Show SVG file input */}
        {isEditMode && (
  <>
    <label
      htmlFor={`file-input-${index}`}
      className="mt-3 text-sm bg-[#6b7dff] text-white px-4 py-2 rounded-lg cursor-pointer hover:bg-[#5a6bff] transition-all flex items-center justify-center"
    >
      <AiOutlineFileAdd size={20}  />
      {/* {edited?.newSvgFile ? "Change Image" : "Choose Image"} */}
    </label>
    <input
      id={`file-input-${index}`}
      type="file"
      accept="image/*"
      className="hidden"
      onChange={(e) => handleSvgChange(index, e.target.files[0])}
    />

    {/* Update Button */}
    <button
      onClick={() => handleUpdate(index)}
      className="mt-4 text-xs bg-[#28a745] hover:bg-[#218838] text-white px-6 py-2 rounded-lg disabled:opacity-50 transition-all flex items-center justify-center"
      disabled={loadingIndex === index || !edited?.newSvgFile}
    >
      <AiOutlineCheck size={18} className="mr-2" />
     
    </button>
  </>
)}
      </div>
    );
  })}
</div>

    </div>
  </div>
  

  );
};
