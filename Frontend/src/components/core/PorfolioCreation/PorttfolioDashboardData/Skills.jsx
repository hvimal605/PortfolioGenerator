import { useState, useEffect } from "react";
import { CircularProgressbar, buildStyles } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";
import { AiOutlineDelete, AiOutlineCloudUpload ,AiOutlineEdit } from "react-icons/ai";
import { useSelector } from "react-redux";
import { toast } from "react-hot-toast";
import { BsFillImageFill } from "react-icons/bs";
import { FaCheckCircle } from "react-icons/fa"
import { HiOutlineLightningBolt } from "react-icons/hi";
import { MdEdit, MdDone } from "react-icons/md";
import {
  deleteSkill,
  updateSkill,
} from "../../../../services/operations/PortfolioApi";

export const Skills = ({ skills }) => {
  const [isEditMode, setIsEditMode] = useState(false);
  const [localSkills, setLocalSkills] = useState([]);
  const [editedSkills, setEditedSkills] = useState([]);
  const [loadingIndex, setLoadingIndex] = useState(null);

  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setLocalSkills(skills);
    setEditedSkills(
      skills.map((skill) => ({
        ...skill,
        newProficiency: skill.proficiency,
        newSvgFile: null,
        previewSvgUrl: skill.svg?.url || null,
      }))
    );
  }, [skills]);

  const handleProficiencyChange = (index, value) => {
    const updated = [...editedSkills];
    updated[index].newProficiency = value;
    setEditedSkills(updated);
  };

  const handleSvgChange = (index, file) => {
    const updated = [...editedSkills];
    updated[index].newSvgFile = file;
    updated[index].previewSvgUrl = URL.createObjectURL(file);
    setEditedSkills(updated);
  };

  const handleDelete = async (index, id) => {
    try {
      setLoadingIndex(index);
      const success = await deleteSkill({ skillId: id, portfolioId, token });
      if (success) {
        const updatedSkills = [...localSkills];
        updatedSkills.splice(index, 1);
        setLocalSkills(updatedSkills);

        const updatedEdited = [...editedSkills];
        updatedEdited.splice(index, 1);
        setEditedSkills(updatedEdited);
        toast.success("Skill deleted");
      }
    } catch (error) {
      console.error("Error deleting skill:", error);
      toast.error("Failed to delete skill");
    } finally {
      setLoadingIndex(null);
    }
  };

  const handleUpdate = async (index) => {
    const skill = editedSkills[index];

    // Validation
    if (
      skill.newProficiency < 0 ||
      skill.newProficiency > 100 ||
      isNaN(skill.newProficiency)
    ) {
      toast.error("Proficiency must be a number between 0 and 100");
      return;
    }

    const isUnchanged =
      skill.newProficiency === localSkills[index].proficiency &&
      !skill.newSvgFile;

    if (isUnchanged) {
      toast("No changes to update");
      return;
    }

    const formData = new FormData();
    formData.append("skillId", skill._id);
    formData.append("portfolioId", portfolioId);
    formData.append("proficiency", skill.newProficiency || 0);
    if (skill.newSvgFile) {
      formData.append("svg", skill.newSvgFile);
    }

    try {
      setLoadingIndex(index);
      const response = await updateSkill(formData, token);

      if (response?.success) {
        const updatedSkills = [...localSkills];
        updatedSkills[index].proficiency = skill.newProficiency;
        if (skill.newSvgFile) {
          updatedSkills[index].svg = {
            url: skill.previewSvgUrl,
          };
        }

        setLocalSkills(updatedSkills);

        setIsEditMode(false);
      }
    } catch (error) {
      console.error("Error updating skill:", error);
      toast.error("Failed to update skill");
    } finally {
      setLoadingIndex(null);
    }
  };

  return (
    <div className="w-full bg-black text-white p-6 rounded-xl  border border-green-700 mt-5 shadow-[0_0_10px_#1f2937]">
  {/* Header Section */}
  <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-center text-center gap-4 mb-4 border-b pb-3 border-green-700">
  <h2 className="text-3xl font-bold flex items-center gap-2 text-green-400">
    <HiOutlineLightningBolt className="text-green-500" size={26} />
    Skills
  </h2>

  <button
    className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:brightness-125 text-white px-4 py-2 rounded-lg transition-all duration-200"
    onClick={() => setIsEditMode(!isEditMode)}
  >
    {isEditMode ? (
      <>
        <MdDone size={18} />
        Done
      </>
    ) : (
      <>
        <AiOutlineEdit size={18} />
        Manage
      </>
    )}
  </button>
</div>


  {/* Skills Grid */}
  <div className="p-2 rounded-lg grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-x-6 gap-y-8">
    {localSkills.map((skill, index) => {
      const edited = editedSkills[index];
      const isUnchanged =
        edited?.newProficiency === skill.proficiency && !edited?.newSvgFile;

      return (
        <div
          key={index}
          className="flex flex-col items-center relative group bg-[#1e293b] border border-gray-700 rounded-2xl p-4 hover:scale-[1.05] transition-transform duration-300 ease-in-out shadow-lg hover:shadow-blue-500/20"
        >
          {/* Progressbar */}
          <div className="w-20 h-20 sm:w-24 sm:h-24">
            <CircularProgressbar
              value={isEditMode ? edited?.newProficiency || 0 : skill.proficiency}
              text={`${isEditMode ? edited?.newProficiency || 0 : skill.proficiency}%`}
              styles={buildStyles({
                textColor: "#fff",
                pathColor: "#22c55e",
                trailColor: "#334155",
              })}
            />
          </div>

          {/* Skill Title */}
          <span className="mt-3 text-center text-lg font-semibold text-gray-100 break-words">
            {skill.title}
          </span>

          {isEditMode ? (
            <>
              {/* Proficiency Input */}
              <input
                type="number"
                min="0"
                max="100"
                className="mt-2 w-20 text-sm text-black rounded-md px-3 py-1 bg-gray-100 focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={edited?.newProficiency || ""}
                onChange={(e) => handleProficiencyChange(index, e.target.value)}
              />

              {/* SVG Upload */}
              <label
                htmlFor={`file-input-${index}`}
                className="mt-3 flex items-center gap-2 text-sm bg-blue-600 text-white px-3 py-1.5 rounded-lg cursor-pointer hover:bg-blue-700 transition"
              >
                <BsFillImageFill size={18} />
                
              </label>
              <input
                id={`file-input-${index}`}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={(e) => handleSvgChange(index, e.target.files[0])}
              />

              {/* Preview */}
              {edited?.previewSvgUrl && (
                <img
                  src={edited.previewSvgUrl}
                  alt="Preview"
                  className="w-16 h-16 mt-2 object-contain rounded-lg border border-gray-600"
                />
              )}

              {/* Update Button */}
              <button
                onClick={() => handleUpdate(index)}
                disabled={loadingIndex === index || isUnchanged}
                className="mt-3 flex items-center gap-2 text-xs bg-green-500 hover:bg-green-600 text-white px-4 py-1.5 rounded-lg transition-all disabled:opacity-50"
              >
               update <AiOutlineCloudUpload size={14} />
               
              </button>
            </>
          ) : (
            skill.svg?.url && (
              <img
                src={skill.svg.url}
                alt={skill.title}
                className="w-24 h-24 mt-3 object-contain rounded-xl border border-gray-700 shadow-inner"
              />
            )
          )}

          {/* Delete Button */}
          {isEditMode && (
            <button
              onClick={() => handleDelete(index, skill._id)}
              disabled={loadingIndex === index}
              className="absolute top-2 right-2 text-red-500 hover:text-red-700 bg-gray-900 p-2 rounded-full shadow-lg transition-all duration-200 disabled:opacity-50"
            >
              <AiOutlineDelete size={18} />
            </button>
          )}
        </div>
      );
    })}
  </div>
</div>

  );
};
