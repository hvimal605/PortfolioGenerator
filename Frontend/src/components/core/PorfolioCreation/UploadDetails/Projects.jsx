import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addProject } from "../../../../services/operations/PortfolioApi";
import { setStep } from "../../../../slices/PortfolioSlice";
import Upload from "../../../common/Upload";
import { FaProjectDiagram } from "react-icons/fa";

const ProjectForm = () => {
  const { token } = useSelector((state) => state.auth);
  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio?._id;

  const navigate = useNavigate();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!portfolio) {
      navigate("/PortfolioCreate/UploadDetails");
      dispatch(setStep(0));
    }
  }, [portfolio, navigate, dispatch]);

  const [project, setProject] = useState({
    title: "",
    description: "",
    technologies: "",
    githubLink: "",
    projectLink: "",
    projectBanner: null,
  });

  const [errors, setErrors] = useState({});
  const [watchBanner, setWatchBanner] = useState(null); // Used to mimic react-hook-form's watch

  const handleChange = (e) => {
    setProject((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleFileSelect = (file) => {
    setProject((prev) => ({
      ...prev,
      projectBanner: file,
    }));
    setWatchBanner(file);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newErrors = {};
    if (!project.title) newErrors.title = "Title is required";
    if (!project.description) newErrors.description = "Description is required";
    if (!project.technologies) newErrors.technologies = "Technologies are required";
    if (!project.githubLink) newErrors.githubLink = "GitHub link is required";
    if (!project.projectBanner) newErrors.projectBanner = "Project banner is required";

    setErrors(newErrors);
    if (Object.keys(newErrors).length > 0) return;

    const formData = new FormData();
    formData.append("title", project.title);
    formData.append("description", project.description);
    formData.append("technologies", project.technologies);
    formData.append("gitRepoLink", project.githubLink);
    formData.append("projectLink", project.projectLink);
    formData.append("projectBanner", project.projectBanner);
    formData.append("portfolioId", portfolioId);

    try {
      await addProject(formData, token);
      setProject({
        title: "",
        description: "",
        technologies: "",
        githubLink: "",
        projectLink: "",
        projectBanner: null,
      });
      setWatchBanner(null);
    } catch (err) {
      console.error("Add Project Failed:", err);
    }
  };

  return (
    <div className="bg-gradient-to-br from-[#0f0f0f] via-[#111] to-[#1a1a1a] border border-purple-500/30 text-white p-10 rounded-2xl shadow-[0_0_15px_#8B5CF6] max-w-3xl mx-auto">
      <h2 className="text-3xl md:text-4xl font-extrabold mb-8 text-center text-purple-400 flex justify-center items-center gap-3">
        <FaProjectDiagram/> Project
      </h2>

      <form onSubmit={handleSubmit} className="space-y-8">
        {/* Title */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2">Project Title</label>
          <input
            type="text"
            name="title"
            value={project.title}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter project title"
          />
          {errors.title && <span className="text-xs text-pink-300 ml-1">{errors.title}</span>}
        </div>

        {/* Description */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2">Description</label>
          <textarea
            name="description"
            value={project.description}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter project description"
          />
          {errors.description && <span className="text-xs text-pink-300 ml-1">{errors.description}</span>}
        </div>

        {/* Technologies */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2">Technologies Used</label>
          <input
            type="text"
            name="technologies"
            value={project.technologies}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter technologies used"
          />
          {errors.technologies && <span className="text-xs text-pink-300 ml-1">{errors.technologies}</span>}
        </div>

        {/* GitHub Link */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2">GitHub Repository Link</label>
          <input
            type="url"
            name="githubLink"
            value={project.githubLink}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter GitHub repo link"
          />
          {errors.githubLink && <span className="text-xs text-pink-300 ml-1">{errors.githubLink}</span>}
        </div>

        {/* Live Project Link */}
        <div>
          <label className="block text-purple-300 font-semibold mb-2">Project Link</label>
          <input
            type="url"
            name="projectLink"
            value={project.projectLink}
            onChange={handleChange}
            className="w-full p-4 bg-black/30 text-white placeholder-gray-400 border border-purple-500/30 rounded-xl focus:outline-none focus:ring-2 focus:ring-purple-500"
            placeholder="Enter live project link (optional)"
          />
        </div>

        {/* File Upload */}
        <div className="flex justify-center mt-10">
          <Upload
          color="purple"
            name="projectBanner"
            label="Upload Project Banner (SVG, PNG, JPG)"
            onFileSelect={handleFileSelect}
            register={() => {}} // noop since you're not using it
            setValue={(name, file) => {
              handleFileSelect(file);
            }}
            watch={() => watchBanner}
            errors={{ projectBanner: errors.projectBanner }}
          />
        </div>

        {/* Submit */}
        <div className="text-center">
          <button
            type="submit"
            className="mt-6 px-8 py-4 bg-purple-500 hover:bg-purple-600 text-white font-bold rounded-xl shadow-lg transition duration-300 ease-in-out"
          >
             Add Project
          </button>
        </div>
      </form>
    </div>
  );
};

export default ProjectForm;
