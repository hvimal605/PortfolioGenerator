import { useEffect, useState } from "react";
import { toast } from "react-hot-toast";
import { deleteProject, updateProject } from "../../../../services/operations/PortfolioApi";
import { useSelector } from "react-redux";
import ProjectEditModal from "./ProjectEditModal";
import { motion } from "framer-motion";
import { MdDone } from 'react-icons/md';
import { AiOutlineEdit } from 'react-icons/ai';
import { FaEye } from "react-icons/fa6";
import { FiEdit } from "react-icons/fi";
import { AiTwotoneDelete } from "react-icons/ai";
import { FaProjectDiagram } from "react-icons/fa";
export const Projects = ({ projects }) => {
  const [manageMode, setManageMode] = useState(false);
  const [projectList, setProjectList] = useState(projects);
  const [previewImage, setPreviewImage] = useState(null);
  const [editingProject, setEditingProject] = useState(null);
  const [isViewOnly, setIsViewOnly] = useState(false);

  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;

  useEffect(() => {
    setProjectList(projects);
  }, [projects]);

  const handleDelete = async (projectId) => {
    try {
      const res = await deleteProject({ projectId, portfolioId, token });
      if (res) {
        setProjectList((prev) => prev.filter((proj) => proj._id !== projectId));
      }
    } catch (err) {
      toast.error("Something went wrong!");
    }
  };

  const handleEditModalOpen = (project, viewOnly = false) => {
    setIsViewOnly(viewOnly);
    setEditingProject(project);
  };

  const handleEditModalClose = () => {
    setEditingProject(null);
    setIsViewOnly(false);
  };

  const updateProjectList = (updatedProject) => {
    setProjectList((prev) =>
      prev.map((proj) => (proj?._id === updatedProject?._id ? updatedProject : proj))
    );
  };

  const handleSave = async () => {
    if (!editingProject) return;

    const formData = new FormData();
    formData.append("title", editingProject.title);
    formData.append("description", editingProject.description);
    formData.append("technologies", editingProject.technologies);
    formData.append("gitRepoLink", editingProject.gitRepoLink);
    formData.append("projectLink", editingProject.projectLink);
    formData.append("projectId", editingProject._id);

    if (editingProject.projectBanner instanceof File) {
      formData.append("projectBanner", editingProject.projectBanner);
    }

    try {
      const response = await updateProject(formData, token);

      if (response && response.projectRes) {
        updateProjectList(response.projectRes);
        toast.success("Project updated successfully!");
        setEditingProject(null);
        setIsViewOnly(false);
      }
    } catch (error) {
      toast.error("Failed to update the project!");
      console.error("Error updating project:", error);
    }
  };

  return (
    <div className="w-full mt-6 p-6 bg-black border border-purple-700 rounded-lg shadow-[0_0_10px_#1f2937] ">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-center text-center gap-4 mb-4 border-b pb-3 border-purple-700">
        <h2 className="text-3xl font-semibold text-purple-400 flex justify-center items-center gap-3">
        <FaProjectDiagram className="text-2xl" />Projects</h2>

        <button
          className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:brightness-125 text-white px-4 py-2 rounded-lg transition-all duration-200"
          onClick={() => setManageMode((prev) => !prev)}
        >
          {manageMode ? (
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

      <div className="p-4 rounded-lg shadow-lg overflow-x-auto">
      <table className="w-full border-collapse border border-purple-700 text-white text-sm">
  <thead>
    <tr className="bg-gray-800 text-left">
      <th className="p-2 md:p-4 border border-purple-700">Title</th>
      <th className="p-2 md:p-4 border border-purple-700 max-w-[200px] hidden md:table-cell">Description</th>
      <th className="p-2 md:p-4 border border-purple-700 max-w-[180px] hidden md:table-cell">Technologies</th>
      <th className="p-2 md:p-4 border border-purple-700 hidden md:table-cell">Banner</th>
      <th className="p-2 md:p-4 border border-purple-700">Links</th>
      <th className="p-2 md:p-4 border border-purple-700">Actions</th>
    </tr>
  </thead>

  <tbody>
    {projectList.map((project) => {
      if (!project || !project._id) return null;
      return (
        <tr key={project._id} className="hover:bg-gray-800 transition-all duration-300">
          <td className="p-2 md:p-4 border border-purple-700">{project.title}</td>

          <td
            className="p-2 md:p-4 border border-purple-700 max-w-[200px] truncate hidden md:table-cell"
            title={project.description}
          >
            {project.description}
          </td>

          <td
            className="p-2 md:p-4 border border-purple-700 max-w-[180px] truncate hidden md:table-cell"
            title={
              Array.isArray(project.technologies)
                ? project.technologies.join(", ")
                : project.technologies
            }
          >
            {Array.isArray(project.technologies)
              ? project.technologies.join(", ")
              : project.technologies}
          </td>

          <td className="p-2 border border-purple-700 hidden md:table-cell">
            <img
              src={project.projectBanner?.url}
              alt="Banner"
              onClick={() => setPreviewImage(project.projectBanner?.url)}
              className="w-20 h-16 object-cover rounded shadow cursor-pointer hover:scale-105 transition-all duration-300"
            />
          </td>

          <td className="p-2 md:p-4 border border-purple-700">
            <div className="flex flex-col md:flex-row gap-2 md:gap-3">
              {project.gitRepoLink && (
                <a
                  href={project.gitRepoLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-blue-400 hover:underline text-xs md:text-sm"
                >
                  GitHub
                </a>
              )}
              {project.projectLink && (
                <a
                  href={project.projectLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-green-400 hover:underline text-xs md:text-sm"
                >
                  Live
                </a>
              )}
            </div>
          </td>

          <td className="p-2 md:p-4 flex flex-wrap gap-2 justify-center mt-2">
            <button
              className="bg-yellow-600 hover:bg-yellow-700 px-3 py-1.5 rounded-full text-white text-xs hover:scale-105 transition-all duration-300 flex items-center gap-1 shadow"
              onClick={() => handleEditModalOpen(project, true)}
            >
              <FaEye />
              <span className="hidden md:inline">View</span>
            </button>

            {manageMode && (
              <>
                <button
                  className="bg-blue-600 hover:bg-blue-700 px-3 py-1.5 rounded-full text-white text-xs hover:scale-105 transition-all duration-300 flex items-center gap-1 shadow"
                  onClick={() => handleEditModalOpen(project, false)}
                >
                  <FiEdit />
                  <span className="hidden md:inline">Edit</span>
                </button>

                <button
                  className="bg-red-500 hover:bg-red-700 px-3 py-1.5 rounded-full text-white text-xs hover:scale-105 transition-all duration-300 flex items-center gap-1 shadow"
                  onClick={() => handleDelete(project._id)}
                >
                  <AiTwotoneDelete />
                  <span className="hidden md:inline">Delete</span>
                </button>
              </>
            )}
          </td>
        </tr>
      );
    })}
  </tbody>
</table>



      </div>

      {editingProject && (
        <motion.div
          initial={{ opacity: 0, scale: 0.5 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.5 }}
          transition={{ duration: 0.3 }}
          className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50"
        >
          <ProjectEditModal
            isOpen={!!editingProject}
            editData={editingProject}
            setEditData={setEditingProject}
            onClose={handleEditModalClose}
            onSave={handleSave}
            readOnly={isViewOnly} 
          />
        </motion.div>
      )}
    </div>
  );
};
