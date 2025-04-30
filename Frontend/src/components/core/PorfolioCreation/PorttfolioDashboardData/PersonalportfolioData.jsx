import { useEffect, useState } from "react";
import {
  FaLinkedin,
  FaFacebook,
  FaInstagram,
  FaTwitter,
  FaGithub,
  FaUserAlt,
} from "react-icons/fa";

import { motion } from 'framer-motion';


import { FaCamera } from "react-icons/fa";

import { IoIosLink } from "react-icons/io";
import { useSelector } from "react-redux";
import { updatePortfolioDetails } from "../../../../services/operations/PortfolioApi";
import { MdDeleteOutline, MdDone } from "react-icons/md";
import { AiOutlineEdit } from "react-icons/ai";
import ResumeViewer from "./ResumeViewer";
// import socialIcons from "../../../common/SocialIcons";
import iconMap from "../../../common/IconMap";


export const PersonalportfolioData = ({ portfolioData }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({ ...portfolioData });
  
  const [profileImageFile, setProfileImageFile] = useState(null);
  const [resumeFile, setResumeFile] = useState(null);

  useEffect(() => {
    setFormData({ ...portfolioData });
  }, [portfolioData]);

  const { portfolio } = useSelector((state) => state.portfolio);
  const portfolioId = portfolio._id;
  const { token } = useSelector((state) => state.auth);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name.includes("contactDetails")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        contactDetails: {
          ...prev.contactDetails,
          [key]: value,
        },
      }));
    } else if (name.includes("socialLinks")) {
      const key = name.split(".")[1];
      setFormData((prev) => ({
        ...prev,
        socialLinks: {
          ...prev.socialLinks,
          [key]: value,
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleFileChange = (e) => {
    const { name, files } = e.target;
    if (name === "profileImage") {
      setProfileImageFile(files[0]);
      setFormData((prev) => ({
        ...prev,
        profileImage: URL.createObjectURL(files[0]),
      }));
    }
    if (name === "resume") {
      setResumeFile(files[0]);
      setFormData((prev) => ({
        ...prev,
        resume: URL.createObjectURL(files[0]),
      }));
    }
  };

  const handleSave = async () => {
    try {
      const form = new FormData();
      form.append("portfolioId", portfolioId);
      form.append("FirstName", formData.FirstName);
      form.append("LastName", formData.LastName);
      form.append("phone", formData.contactDetails.phone);
      form.append("email", formData.contactDetails.email);
     
      form.append("socialLinks", JSON.stringify(formData.socialLinks));


      form.append("aboutme", formData.aboutme || "");
      form.append("roles", formData.roles.join(","));

      // Update roles
      if (formData.roles?.length) {
        formData.roles.forEach((role) => {
          form.append("roles[]", role);
        });

      }
     


      if (profileImageFile) form.append("avatar", profileImageFile);
      if (resumeFile) form.append("resume", resumeFile);

      const response = await updatePortfolioDetails(form, token);

      if (response?.success) {
        setFormData(response.updatedPortfolio || formData);  
        setIsEditing(false);
      }
    } catch (error) {
      console.error("Error updating portfolio details:", error);
    }
  };

  useEffect(() => {
    setFormData({ ...portfolioData });
   
    setResumeFile(null); 
  }, [portfolioData]); 
  
  // const socialIcons = {
  //   linkedin: <FaLinkedin className="text-blue-500" />,
  //   github: <FaGithub className="text-gray-200" />,
  //   twitter: <FaTwitter className="text-blue-400" />,
  //   personalwebsite: <IoIosLink className="text-pink-500" />,
  //   facebook: <FaFacebook className="text-blue-600" />,
  //   instagram: <FaInstagram className="text-pink-600" />,
  // };



  return (
    <div className="mt-6 bg-black p-6 sm:p-8 rounded-2xl text-white  border border-yellow-700 max-w-6xl mx-auto shadow-[0_0_10px_#1f2937]">
      <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center items-center text-center gap-4 mb-4 border-b pb-3 border-yellow-700 ">
  {/* Heading with Icon */}
  <h2 className="text-3xl font-semibold text-yellow-400 flex items-center gap-2">
    <FaUserAlt size={24} className="text-yellow-400" />
    Personal Details
  </h2>

  {/* Toggle Button with Icon */}
  <button
    onClick={() => setIsEditing(!isEditing)}
    className="flex items-center gap-2 bg-gradient-to-r from-blue-700 to-cyan-600 hover:brightness-125 text-white px-5 py-2 rounded-lg transition duration-200 mx-auto md:mx-0"
  >
    {isEditing ? (
       <>
              <MdDone size={18} />
              Done
            </>
    ) : (
      <>
        <AiOutlineEdit size={20} />
        Manage 
      </>
    )}
  </button>
</div>


      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
        {/* Profile Image */}
 

<div className="flex flex-col items-center md:items-start gap-4 " >
  <motion.img
    initial={{ scale: 0.8, opacity: 0 }}
    animate={{ scale: 1, opacity: 1 }}
    transition={{ duration: 0.5, ease: 'easeOut' }}
    src={formData.profileImage}
    alt="Profile"
    className="w-36 h-36 md:w-48 md:h-48 object-cover border-4 border-yellow-600 rounded-full shadow-[0_0_20px_4px_rgba(234,179,8,0.4)]"
  />
  
  {isEditing && (
    <label
      htmlFor="profileImage"
      className="cursor-pointer text-yellow-400 flex items-center gap-2 px-4 py-2 rounded-lg border border-yellow-600 hover:bg-gray-800"
    >
      <FaCamera />
      Upload Profile Image
      <input
        type="file"
        accept="image/*"
        name="profileImage"
        onChange={handleFileChange}
        id="profileImage"
        className="hidden"
      />
    </label>
  )}
</div>


        {/* Textual Info */}
        <div className="space-y-4">
  {isEditing ? (
    <>
      <div>
        <label className="block text-sm text-gray-400 mb-1">First Name</label>
        <input
          type="text"
          name="FirstName"
          value={formData.FirstName}
          onChange={handleChange}
          placeholder="e.g. Harsh"
          className="input-style"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Last Name</label>
        <input
          type="text"
          name="LastName"
          value={formData.LastName}
          onChange={handleChange}
          placeholder="e.g. Vimal"
          className="input-style"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">About Me</label>
        <textarea
          name="aboutme"
          value={formData.aboutme || ""}
          onChange={handleChange}
          placeholder="Short bio or description"
          rows={6}
          className="input-style resize-none"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Roles (comma separated)</label>
        <input
          type="text"
          name="roles"
          value={formData.roles?.join(", ") || ""}
          onChange={(e) => {
            const rolesArray = e.target.value.split(",").map((r) => r.trim());
            setFormData((prev) => ({ ...prev, roles: rolesArray }));
          }}
          placeholder="e.g. Frontend Developer, UI/UX Designer"
          className="input-style"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Email</label>
        <input
          type="email"
          name="contactDetails.email"
          value={formData.contactDetails.email}
          onChange={handleChange}
          placeholder="e.g. harsh@example.com"
          className="input-style"
        />
      </div>
      <div>
        <label className="block text-sm text-gray-400 mb-1">Phone</label>
        <input
          type="text"
          name="contactDetails.phone"
          value={formData.contactDetails.phone}
          onChange={handleChange}
          placeholder="e.g. +91 9876543210"
          className="input-style"
        />
      </div>
    </>
  ) : (
    <>
      <p><strong className="text-gray-400">Name:</strong> {formData.FirstName} {formData.LastName}</p>
      <p><strong className="text-gray-400">About:</strong> {formData.aboutme}</p>
      <p><strong className="text-gray-400">Roles:</strong> {formData.roles?.join(", ")}</p>
      <p><strong className="text-gray-400">Email:</strong> <a className="text-blue-400" href={`mailto:${formData.contactDetails.email}`}>{formData.contactDetails.email}</a></p>
      <p><strong className="text-gray-400">Phone:</strong> <a className="text-blue-400" href={`tel:${formData.contactDetails.phone}`}>{formData.contactDetails.phone}</a></p>
      
    </>
  )}
</div>


    {/* Resume Section */}
    
    <ResumeViewer
  isEditing={isEditing}
  resumeFile={resumeFile}
  formData={formData}
  handleFileChange={handleFileChange}
/>


      </div>

   


{/* Social Links */}
<div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 mt-8 text-lg">
  {formData.socialLinks?.map((linkObj, index) => (
    <div
      key={linkObj._id || index}
      className="p-6 bg-gradient-to-br from-gray-900 to-gray-800 rounded-2xl space-y-4 border border-transparent hover:border-yellow-500 transition-all ease-in-out duration-300 shadow-lg hover:shadow-yellow-500/30 group"
    >
      {/* First Line: Icon + Platform + Remove */}
      <div className="flex items-center gap-3">
        {iconMap[linkObj.platform?.toLowerCase()] || iconMap["default"]}

        {isEditing ? (
          <>
            <input
              required
              type="text"
              value={linkObj.platform}
              placeholder="Platform (e.g. GitHub)"
              className="w-44 bg-gray-800 text-white border border-gray-700 rounded-lg px-3 py-2 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
              onChange={(e) => {
                const updatedLinks = [...formData.socialLinks];
                updatedLinks[index].platform = e.target.value;
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: updatedLinks,
                }));
              }}
            />
            <button
              onClick={() => {
                const updatedLinks = formData.socialLinks.filter(
                  (_, i) => i !== index
                );
                setFormData((prev) => ({
                  ...prev,
                  socialLinks: updatedLinks,
                }));
              }}
              className="ml-auto text-red-500 hover:text-red-400 text-2xl transition-all duration-200"
            >
              <MdDeleteOutline />
            </button>
          </>
        ) : (
          <span className="text-white font-semibold">{linkObj.platform}</span>
        )}
      </div>

      {/* Second Line: URL Input */}
      {isEditing ? (
        <input
          required
          type="url"
          value={linkObj.url}
          placeholder="https://your-link.com"
          className="w-full bg-gray-800 text-white border border-gray-700 rounded-lg px-4 py-3 transition duration-200 focus:outline-none focus:ring-2 focus:ring-yellow-500"
          onChange={(e) => {
            const updatedLinks = [...formData.socialLinks];
            updatedLinks[index].url = e.target.value;
            setFormData((prev) => ({
              ...prev,
              socialLinks: updatedLinks,
            }));
          }}
        />
      ) : (
        <a
          href={linkObj.url}
          target="_blank"
          rel="noopener noreferrer"
          className="block text-blue-400 hover:text-blue-300 hover:underline break-words transition-all duration-200"
        >
          {linkObj.url}
        </a>
      )}
    </div>
  ))}

  {/* Add New Link Button */}
  {isEditing && (
    <button
      type="button"
      onClick={() =>
        setFormData((prev) => ({
          ...prev,
          socialLinks: [...prev.socialLinks, { platform: "", url: "" }],
        }))
      }
      className="p-4 border-2 border-dashed border-yellow-400 rounded-xl text-yellow-400 hover:text-yellow-300 hover:border-yellow-300 transition-all ease-in-out duration-300 flex items-center justify-center text-xl font-semibold"
    >
      + Add Social Link
    </button>
  )}
</div>









      {/* Save Button */}
      {isEditing && (
        <div className="flex sm:justify-end justify-center mt-8">
          <button
            onClick={handleSave}
            className="bg-gradient-to-r from-blue-700 to-cyan-600 hover:brightness-125 px-6 py-2 rounded-lg text-white font-medium"
          >
            Save Changes
          </button>
        </div>
      )}
    </div>

  );
};
